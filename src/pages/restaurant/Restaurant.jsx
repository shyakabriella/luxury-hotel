import React, { useEffect, useMemo, useState } from "react";
import {
  BadgeDollarSign,
  CalendarDays,
  Mail,
  Minus,
  Phone,
  Plus,
  ShoppingCart,
  Trash2,
  User,
  UtensilsCrossed,
  Wallet,
} from "lucide-react";

const bannerImage =
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1600&auto=format&fit=crop";

const fallbackImage =
  "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop";

const BRAND_GOLD = "#b4945a";
const BRAND_GOLD_DARK = "#9f8045";

const money = (value) => `$${Number(value || 0).toFixed(2)}`;

export default function Restaurant() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [activeTab, setActiveTab] = useState("restaurant");
  const [activeCategory, setActiveCategory] = useState("All");
  const [showCustomDish, setShowCustomDish] = useState(false);

  const [menuItems, setMenuItems] = useState([]);
  const [loadingMenu, setLoadingMenu] = useState(false);
  const [menuError, setMenuError] = useState("");

  const [customer, setCustomer] = useState({
    fullName: "",
    phone: "",
    email: "",
    customDish: "",
    notes: "",
    bookingDate: "",
    bookingTime: "",
    partySize: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("counter");
  const [cart, setCart] = useState([]);

  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchMenuItems = async () => {
      try {
        setLoadingMenu(true);
        setMenuError("");

        const response = await fetch(
          `${API_BASE_URL}/restaurant-menu-items/active?tab=${activeTab}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
            signal: controller.signal,
          },
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result?.message || "Failed to fetch menu items.");
        }

        const normalized = Array.isArray(result?.data)
          ? result.data.map((item) => ({
              ...item,
              price: Number(item.price || 0),
              image: item.image_url || fallbackImage,
            }))
          : [];

        setMenuItems(normalized);
      } catch (error) {
        if (error.name !== "AbortError") {
          setMenuError(error.message || "Unable to load menu items.");
        }
      } finally {
        setLoadingMenu(false);
      }
    };

    if (API_BASE_URL) {
      fetchMenuItems();
    } else {
      setMenuError("VITE_API_BASE_URL is missing in .env");
    }

    return () => controller.abort();
  }, [API_BASE_URL, activeTab]);

  const categories = useMemo(() => {
    const unique = [...new Set(menuItems.map((item) => item.category).filter(Boolean))];
    return ["All", ...unique];
  }, [menuItems]);

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory =
        activeCategory === "All" || item.category === activeCategory;

      return matchesCategory;
    });
  }, [menuItems, activeCategory]);

  const getItemQty = (id) => {
    const found = cart.find((item) => item.id === id);
    return found ? found.quantity : 0;
  };

  const addOne = (menuItem) => {
    setBookingError("");
    setBookingSuccess(null);

    setCart((prev) => {
      const found = prev.find((item) => item.id === menuItem.id);

      if (found) {
        return prev.map((item) =>
          item.id === menuItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prev, { ...menuItem, quantity: 1 }];
    });
  };

  const removeOne = (menuItem) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === menuItem.id
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeLine = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
  }, [cart]);

  const total = subtotal;

  const handleCustomerChange = (e) => {
    const { name, value } = e.target;
    setBookingError("");
    setBookingSuccess(null);

    setCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetFormAfterSuccess = () => {
    setCart([]);
    setCustomer({
      fullName: "",
      phone: "",
      email: "",
      customDish: "",
      notes: "",
      bookingDate: "",
      bookingTime: "",
      partySize: "",
    });
    setPaymentMethod("counter");
  };

  const createBooking = async (bookingType) => {
    try {
      setBookingError("");
      setBookingSuccess(null);

      if (!customer.fullName || !customer.phone) {
        setBookingError("Please fill in your full name and phone number.");
        return;
      }

      if (cart.length === 0) {
        setBookingError("Please add at least one item to your order.");
        return;
      }

      if (!API_BASE_URL) {
        setBookingError("API base URL is missing in .env");
        return;
      }

      setBookingLoading(true);

      const payload = {
        customer_name: customer.fullName,
        phone: customer.phone,
        email: customer.email || null,
        booking_type: bookingType,
        payment_method: paymentMethod,
        booking_date: customer.bookingDate || null,
        booking_time: customer.bookingTime || null,
        party_size: customer.partySize ? Number(customer.partySize) : null,
        custom_dish: customer.customDish || null,
        notes: customer.notes || null,
        items: cart.map((item) => ({
          restaurant_menu_item_id: item.id,
          item_name: item.name,
          quantity: item.quantity,
          unit_price: Number(item.price),
        })),
      };

      const response = await fetch(`${API_BASE_URL}/restaurant-bookings`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result?.errors) {
          const firstKey = Object.keys(result.errors)[0];
          const firstError = result.errors[firstKey]?.[0];
          throw new Error(firstError || "Failed to create booking.");
        }

        throw new Error(result?.message || "Failed to create booking.");
      }

      setBookingSuccess({
        message:
          result?.message ||
          (bookingType === "buy_now"
            ? "Order created successfully."
            : "Table booking created successfully."),
        bookingCode: result?.data?.booking_code || "",
      });

      resetFormAfterSuccess();
    } catch (error) {
      setBookingError(error.message || "Something went wrong while creating booking.");
    } finally {
      setBookingLoading(false);
    }
  };

  const handleBuyNow = async () => {
    await createBooking("buy_now");
  };

  const handleBookTable = async () => {
    await createBooking("table");
  };

  return (
    <section
      className="min-h-screen bg-[#eaf4f7]"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      {/* BANNER */}
      <div className="relative h-[200px] w-full overflow-hidden sm:h-[230px] md:h-[260px]">
        <img
          src={bannerImage}
          alt="Restaurant banner"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0f4c81]/55" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-[1500px] px-4 md:px-6 lg:px-8">
            <div className="max-w-[760px] text-white">
              <p className="text-[11px] uppercase tracking-[0.28em] text-white/90">
                Restaurant • Bar • Order • Booking
              </p>
              <h1 className="mt-3 flex items-center gap-3 text-[24px] font-semibold md:text-[40px]">
                <UtensilsCrossed size={32} className="shrink-0" />
                <span>Restaurant — Order &amp; Book</span>
              </h1>
              <p className="mt-3 text-[14px] leading-[1.8] text-white/90 md:text-[16px]">
                Choose from our menu, add a custom request, and either buy now
                or reserve a table.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1500px] px-4 py-5 md:px-6 lg:px-8">
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_390px] 2xl:grid-cols-[minmax(0,1fr)_410px]">
          {/* LEFT SIDE */}
          <div className="space-y-5">
            {/* TOP TAB AREA */}
            <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      setActiveTab("restaurant");
                      setActiveCategory("All");
                    }}
                    className="rounded-full px-7 py-3 text-[17px] font-semibold text-white shadow-md transition"
                    style={{
                      backgroundColor:
                        activeTab === "restaurant" ? BRAND_GOLD : "#e5e7eb",
                      color: activeTab === "restaurant" ? "#ffffff" : "#334155",
                    }}
                  >
                    Our Restaurant
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab("bar");
                      setActiveCategory("All");
                    }}
                    className="rounded-full px-7 py-3 text-[17px] font-semibold shadow-md transition"
                    style={{
                      backgroundColor:
                        activeTab === "bar" ? BRAND_GOLD : "#e5e7eb",
                      color: activeTab === "bar" ? "#ffffff" : "#334155",
                    }}
                  >
                    Our Bar
                  </button>
                </div>

                <div className="flex flex-wrap justify-center gap-3">
                  {categories.map((category) => {
                    const isActive = activeCategory === category;

                    return (
                      <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className="rounded-full border px-5 py-3 text-[15px] transition"
                        style={{
                          borderColor: isActive ? BRAND_GOLD : "#cbd5e1",
                          backgroundColor: isActive ? BRAND_GOLD : "#ffffff",
                          color: isActive ? "#ffffff" : "#475569",
                        }}
                      >
                        {category}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* CUSTOM DISH */}
            <div className="rounded-[24px] border border-slate-200 bg-white shadow-sm">
              <button
                type="button"
                onClick={() => setShowCustomDish((prev) => !prev)}
                className="w-full px-5 py-5 text-left text-[17px] font-medium text-sky-700"
              >
                + Suggest a Custom Dish
              </button>

              {showCustomDish && (
                <div className="border-t border-slate-200 px-5 pb-5">
                  <textarea
                    name="customDish"
                    value={customer.customDish}
                    onChange={handleCustomerChange}
                    rows={4}
                    placeholder="Write your custom dish request here..."
                    className="mt-4 w-full rounded-xl border border-slate-200 px-4 py-4 text-[15px] outline-none"
                  />
                </div>
              )}
            </div>

            {/* MENU ITEMS */}
            {loadingMenu ? (
              <div className="rounded-2xl bg-white p-8 text-center text-slate-500 shadow-sm">
                Loading menu items...
              </div>
            ) : menuError ? (
              <div className="rounded-2xl bg-white p-8 text-center text-red-600 shadow-sm">
                {menuError}
              </div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {filteredItems.length === 0 ? (
                  <div className="col-span-full rounded-2xl bg-white p-8 text-center text-slate-500 shadow-sm">
                    No items found for this category.
                  </div>
                ) : (
                  filteredItems.map((item) => {
                    const qty = getItemQty(item.id);

                    return (
                      <div
                        key={item.id}
                        onClick={() => addOne(item)}
                        className="cursor-pointer overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                      >
                        <div className="flex min-h-[105px]">
                          <div className="w-[92px] shrink-0 overflow-hidden bg-slate-50 sm:w-[98px]">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-full w-full scale-110 object-cover"
                            />
                          </div>

                          <div className="flex flex-1 flex-col justify-between p-3">
                            <div>
                              <div className="flex items-start justify-between gap-2">
                                <h3 className="text-[14px] font-semibold leading-tight text-slate-900 sm:text-[15px]">
                                  {item.name}
                                </h3>
                                <span className="text-[14px] font-semibold text-slate-900">
                                  {money(item.price)}
                                </span>
                              </div>

                              <p className="mt-1 text-[11px] leading-[1.4] text-slate-600">
                                {item.description}
                              </p>

                              <p
                                className="mt-1 text-[11px]"
                                style={{ color: BRAND_GOLD_DARK }}
                              >
                                {item.category}
                              </p>
                            </div>

                            <div className="mt-2 flex items-center justify-end">
                              <div className="flex items-center overflow-hidden rounded-lg border border-slate-200">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeOne(item);
                                  }}
                                  className="flex h-7 w-8 items-center justify-center text-slate-700 transition hover:bg-slate-50"
                                >
                                  <Minus size={12} />
                                </button>

                                <div className="flex h-7 min-w-[28px] items-center justify-center text-[13px]">
                                  {qty}
                                </div>

                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    addOne(item);
                                  }}
                                  className="flex h-7 w-8 items-center justify-center text-slate-700 transition hover:bg-slate-50"
                                >
                                  <Plus size={12} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>

          {/* RIGHT SIDE ORDER PANEL */}
          <aside className="xl:sticky xl:top-4 xl:self-start">
            <div className="rounded-[24px] border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-4">
                <ShoppingCart size={22} className="text-sky-700" />
                <h2 className="text-[20px] font-semibold text-slate-900">
                  Your Order
                </h2>
              </div>

              <div className="space-y-4 p-4">
                {/* SUCCESS / ERROR */}
                {bookingSuccess && (
                  <div className="rounded-2xl border border-green-200 bg-green-50 p-3 text-[14px] text-green-700">
                    <p className="font-semibold">{bookingSuccess.message}</p>
                    {bookingSuccess.bookingCode ? (
                      <p className="mt-1">
                        Booking Code: <span className="font-semibold">{bookingSuccess.bookingCode}</span>
                      </p>
                    ) : null}
                  </div>
                )}

                {bookingError && (
                  <div className="rounded-2xl border border-red-200 bg-red-50 p-3 text-[14px] text-red-700">
                    {bookingError}
                  </div>
                )}

                {/* DETAILS */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3.5">
                  <div className="mb-3 flex items-center gap-2">
                    <User size={18} className="text-slate-600" />
                    <h3 className="text-[17px] font-semibold text-slate-900">
                      Your details
                    </h3>
                  </div>

                  <div className="space-y-2.5">
                    <div className="flex h-12 items-center rounded-xl border border-slate-200 bg-white px-3">
                      <User size={16} className="text-slate-400" />
                      <input
                        type="text"
                        name="fullName"
                        value={customer.fullName}
                        onChange={handleCustomerChange}
                        placeholder="Full name"
                        className="ml-3 w-full border-none bg-transparent text-[14px] outline-none placeholder:text-slate-400"
                      />
                    </div>

                    <div className="flex h-12 items-center rounded-xl border border-slate-200 bg-white px-3">
                      <Phone size={16} className="text-slate-400" />
                      <input
                        type="text"
                        name="phone"
                        value={customer.phone}
                        onChange={handleCustomerChange}
                        placeholder="Phone number"
                        className="ml-3 w-full border-none bg-transparent text-[14px] outline-none placeholder:text-slate-400"
                      />
                    </div>

                    <div className="flex h-12 items-center rounded-xl border border-slate-200 bg-white px-3">
                      <Mail size={16} className="text-slate-400" />
                      <input
                        type="email"
                        name="email"
                        value={customer.email}
                        onChange={handleCustomerChange}
                        placeholder="Email (optional)"
                        className="ml-3 w-full border-none bg-transparent text-[14px] outline-none placeholder:text-slate-400"
                      />
                    </div>

                    <textarea
                      name="notes"
                      value={customer.notes}
                      onChange={handleCustomerChange}
                      rows={3}
                      placeholder="Notes (optional)"
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-[14px] outline-none placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* TABLE BOOKING DETAILS */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3.5">
                  <div className="mb-3 flex items-center gap-2">
                    <CalendarDays size={18} className="text-slate-600" />
                    <h3 className="text-[17px] font-semibold text-slate-900">
                      Table booking info
                    </h3>
                  </div>

                  <div className="space-y-2.5">
                    <input
                      type="date"
                      name="bookingDate"
                      value={customer.bookingDate}
                      onChange={handleCustomerChange}
                      className="h-12 w-full rounded-xl border border-slate-200 bg-white px-3 text-[14px] outline-none"
                    />

                    <input
                      type="time"
                      name="bookingTime"
                      value={customer.bookingTime}
                      onChange={handleCustomerChange}
                      className="h-12 w-full rounded-xl border border-slate-200 bg-white px-3 text-[14px] outline-none"
                    />

                    <input
                      type="number"
                      min="1"
                      name="partySize"
                      value={customer.partySize}
                      onChange={handleCustomerChange}
                      placeholder="Party size"
                      className="h-12 w-full rounded-xl border border-slate-200 bg-white px-3 text-[14px] outline-none"
                    />
                  </div>
                </div>

                {/* PAYMENT */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3.5">
                  <div className="mb-3 flex items-center gap-2">
                    <Wallet size={18} className="text-slate-600" />
                    <h3 className="text-[17px] font-semibold text-slate-900">
                      Payment
                    </h3>
                  </div>

                  <div className="space-y-2.5">
                    <label className="flex items-center gap-3 text-[15px] text-slate-800">
                      <input
                        type="radio"
                        checked={paymentMethod === "counter"}
                        onChange={() => setPaymentMethod("counter")}
                      />
                      <span>Pay at counter</span>
                    </label>

                    <label className="flex items-center gap-3 text-[15px] text-slate-800">
                      <input
                        type="radio"
                        checked={paymentMethod === "room"}
                        onChange={() => setPaymentMethod("room")}
                      />
                      <span>Charge to room</span>
                    </label>

                    <label className="flex items-center gap-3 text-[15px] text-slate-800">
                      <input
                        type="radio"
                        checked={paymentMethod === "card"}
                        onChange={() => setPaymentMethod("card")}
                      />
                      <span>Pay now (card)</span>
                    </label>
                  </div>
                </div>

                {/* ORDER ITEMS */}
                <div className="space-y-3">
                  {cart.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-slate-300 p-4 text-[14px] text-slate-500">
                      No item added yet.
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-2.5 border-b border-slate-200 pb-3"
                      >
                        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <h4 className="truncate text-[14px] font-semibold text-slate-900">
                            {item.name}
                          </h4>
                          <p className="text-[12px] text-slate-500">
                            {money(item.price)}
                          </p>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <div className="flex items-center overflow-hidden rounded-lg border border-slate-200">
                            <button
                              onClick={() => removeOne(item)}
                              className="flex h-8 w-8 items-center justify-center hover:bg-slate-50"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="min-w-[26px] text-center text-[14px]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => addOne(item)}
                              className="flex h-8 w-8 items-center justify-center hover:bg-slate-50"
                            >
                              <Plus size={14} />
                            </button>
                          </div>

                          <button
                            onClick={() => removeLine(item.id)}
                            className="text-rose-500"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* TOTALS */}
                <div className="space-y-1.5 border-t border-slate-200 pt-3">
                  <div className="flex items-center justify-between text-[15px] text-slate-700">
                    <span>Subtotal</span>
                    <span>{money(subtotal)}</span>
                  </div>

                  <div className="flex items-center justify-between pt-1 text-[20px] font-semibold text-sky-700">
                    <span>Total</span>
                    <span>{money(total)}</span>
                  </div>
                </div>

                {/* ACTION BUTTONS */}
                <button
                  onClick={handleBuyNow}
                  disabled={bookingLoading}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl text-[16px] font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-70"
                  style={{ backgroundColor: BRAND_GOLD }}
                  onMouseEnter={(e) => {
                    if (!bookingLoading) {
                      e.currentTarget.style.backgroundColor = BRAND_GOLD_DARK;
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = BRAND_GOLD;
                  }}
                >
                  <BadgeDollarSign size={18} />
                  {bookingLoading ? "Processing..." : "Buy Now"}
                </button>

                <button
                  onClick={handleBookTable}
                  disabled={bookingLoading}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border text-[16px] font-medium transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-70"
                  style={{ borderColor: BRAND_GOLD, color: BRAND_GOLD_DARK }}
                >
                  <CalendarDays size={18} />
                  {bookingLoading ? "Processing..." : "Book Table"}
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
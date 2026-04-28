import React, { useEffect, useMemo, useState } from "react";
import {
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
  X,
} from "lucide-react";

const bannerImage =
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1600&auto=format&fit=crop";

const fallbackImage =
  "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop";

const BRAND_GOLD = "#b4945a";
const BRAND_GOLD_DARK = "#9f8045";

const money = (value) => {
  const amount = Number(value || 0);

  return `RWF ${amount.toLocaleString("en-RW", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
};

function buildImageUrl(path, apiBaseUrl) {
  if (!path) return fallbackImage;

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const apiRootUrl = apiBaseUrl?.replace(/\/api\/?$/, "") || "";

  if (path.startsWith("/storage/")) {
    return `${apiRootUrl}${path}`;
  }

  if (path.startsWith("storage/")) {
    return `${apiRootUrl}/${path}`;
  }

  return `${apiRootUrl}/storage/${path}`;
}

export default function Restaurant() {
  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

  const [activeTab, setActiveTab] = useState("restaurant");
  const [activeCategory, setActiveCategory] = useState("All");
  const [showCustomDish, setShowCustomDish] = useState(false);

  const [menuItems, setMenuItems] = useState([]);
  const [loadingMenu, setLoadingMenu] = useState(false);
  const [menuError, setMenuError] = useState("");

  const [selectedItem, setSelectedItem] = useState(null);
  const [checkoutMode, setCheckoutMode] = useState(null);

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
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result?.message || "Failed to fetch menu items.");
        }

        const normalized = Array.isArray(result?.data)
          ? result.data.map((item) => ({
              ...item,
              price: Number(item.price || 0),
              image: buildImageUrl(item.image_url || item.image, API_BASE_URL),
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
    const unique = [
      ...new Set(menuItems.map((item) => item.category).filter(Boolean)),
    ];

    return ["All", ...unique];
  }, [menuItems]);

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      return activeCategory === "All" || item.category === activeCategory;
    });
  }, [menuItems, activeCategory]);

  const subtotal = useMemo(() => {
    return cart.reduce(
      (sum, item) => sum + Number(item.price) * item.quantity,
      0
    );
  }, [cart]);

  const total = subtotal;

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
            : item
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
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeLine = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleBuyFromPopup = () => {
    if (!selectedItem) return;

    addOne(selectedItem);
    setSelectedItem(null);
  };

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

  const openCheckoutModal = (mode) => {
    setBookingError("");
    setBookingSuccess(null);

    if (cart.length === 0) {
      setBookingError("Please add at least one item to your order.");
      return;
    }

    setCheckoutMode(mode);
  };

  const createBooking = async () => {
    try {
      setBookingError("");
      setBookingSuccess(null");

      if (!checkoutMode) {
        setBookingError("Please choose Buy Now or Book Table.");
        return;
      }

      if (!customer.fullName || !customer.phone) {
        setBookingError("Please fill in your full name and phone number.");
        return;
      }

      if (checkoutMode === "table") {
        if (
          !customer.bookingDate ||
          !customer.bookingTime ||
          !customer.partySize
        ) {
          setBookingError(
            "Please fill table booking date, time, and party size."
          );
          return;
        }
      }

      if (cart.length === 0) {
        setBookingError("Please add at least one item to your order.");
        return;
      }

      setBookingLoading(true);

      const payload = {
        customer_name: customer.fullName,
        phone: customer.phone,
        email: customer.email || null,
        booking_type: checkoutMode,
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
          (checkoutMode === "buy_now"
            ? "Order created successfully."
            : "Table booking created successfully."),
        bookingCode: result?.data?.booking_code || "",
      });

      setCheckoutMode(null);
      resetFormAfterSuccess();
    } catch (error) {
      setBookingError(
        error.message || "Something went wrong while creating booking."
      );
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <section
      className="min-h-screen bg-[#eaf4f7]"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      {/* BANNER */}
      <div className="relative h-[160px] w-full overflow-hidden sm:h-[180px] md:h-[210px]">
        <img
          src={bannerImage}
          alt="Restaurant banner"
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-[#0f4c81]/55" />

        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-[1380px] px-4 md:px-6 lg:px-8">
            <div className="max-w-[680px] text-white">
              <p className="text-[10px] uppercase tracking-[0.24em] text-white/90">
                Restaurant • Bar • Order • Booking
              </p>

              <h1 className="mt-2 flex items-center gap-2 text-[22px] font-semibold md:text-[34px]">
                <UtensilsCrossed size={28} className="shrink-0" />
                <span>Restaurant — Order &amp; Book</span>
              </h1>

              <p className="mt-2 text-[13px] leading-[1.7] text-white/90 md:text-[15px]">
                Choose from our menu, open any item to view details, then add it
                to your order.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1380px] px-4 py-4 md:px-6 lg:px-8">
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px] 2xl:grid-cols-[minmax(0,1fr)_360px]">
          {/* LEFT SIDE */}
          <div className="space-y-4">
            {/* TOP TAB AREA */}
            <div className="rounded-[20px] border border-slate-200 bg-white p-3 shadow-sm">
              <div className="flex flex-col items-center justify-center gap-3">
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <button
                    onClick={() => {
                      setActiveTab("restaurant");
                      setActiveCategory("All");
                    }}
                    className="rounded-full px-5 py-2 text-[14px] font-semibold shadow-sm transition"
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
                    className="rounded-full px-5 py-2 text-[14px] font-semibold shadow-sm transition"
                    style={{
                      backgroundColor:
                        activeTab === "bar" ? BRAND_GOLD : "#e5e7eb",
                      color: activeTab === "bar" ? "#ffffff" : "#334155",
                    }}
                  >
                    Our Bar
                  </button>
                </div>

                <div className="flex flex-wrap justify-center gap-2">
                  {categories.map((category) => {
                    const isActive = activeCategory === category;

                    return (
                      <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className="rounded-full border px-4 py-2 text-[13px] font-medium transition"
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
            <div className="rounded-[20px] border border-slate-200 bg-white shadow-sm">
              <button
                type="button"
                onClick={() => setShowCustomDish((prev) => !prev)}
                className="w-full px-4 py-4 text-left text-[15px] font-medium text-sky-700"
              >
                + Suggest a Custom Dish
              </button>

              {showCustomDish && (
                <div className="border-t border-slate-200 px-4 pb-4">
                  <textarea
                    name="customDish"
                    value={customer.customDish}
                    onChange={handleCustomerChange}
                    rows={3}
                    placeholder="Write your custom dish request here..."
                    className="mt-4 w-full rounded-xl border border-slate-200 px-4 py-3 text-[14px] outline-none"
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
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
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
                        className="overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                      >
                        <button
                          type="button"
                          onClick={() => setSelectedItem(item)}
                          className="group relative block h-[155px] w-full overflow-hidden bg-slate-100 text-left md:h-[170px]"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                            onError={(e) => {
                              e.currentTarget.src = fallbackImage;
                            }}
                          />

                          <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/25" />

                          <div className="absolute bottom-2 left-2 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold text-slate-700 opacity-0 transition group-hover:opacity-100">
                            View details
                          </div>
                        </button>

                        <div className="p-3">
                          <div className="flex items-start justify-between gap-3">
                            <h3 className="text-[14px] font-bold leading-tight text-slate-900">
                              {item.name}
                            </h3>

                            <span className="shrink-0 text-[13px] font-bold text-slate-900">
                              {money(item.price)}
                            </span>
                          </div>

                          <div className="mt-3 flex items-center justify-between gap-3">
                            <button
                              type="button"
                              onClick={() => setSelectedItem(item)}
                              className="rounded-full border border-slate-200 px-3 py-1.5 text-[11px] font-semibold text-slate-600 transition hover:border-[#b4945a] hover:text-[#9f8045]"
                            >
                              View Details
                            </button>

                            {qty > 0 && (
                              <div className="flex items-center overflow-hidden rounded-lg border border-slate-200">
                                <button
                                  type="button"
                                  onClick={() => removeOne(item)}
                                  className="flex h-7 w-7 items-center justify-center text-slate-700 transition hover:bg-slate-50"
                                >
                                  <Minus size={12} />
                                </button>

                                <div className="flex h-7 min-w-[28px] items-center justify-center text-[12px] font-semibold">
                                  {qty}
                                </div>

                                <button
                                  type="button"
                                  onClick={() => addOne(item)}
                                  className="flex h-7 w-7 items-center justify-center text-slate-700 transition hover:bg-slate-50"
                                >
                                  <Plus size={12} />
                                </button>
                              </div>
                            )}
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
            <div className="rounded-[20px] border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center gap-3 border-b border-slate-200 px-4 py-3">
                <ShoppingCart size={20} className="text-sky-700" />

                <h2 className="text-[18px] font-semibold text-slate-900">
                  Your Order
                </h2>
              </div>

              <div className="space-y-3 p-3">
                {bookingSuccess && (
                  <div className="rounded-2xl border border-green-200 bg-green-50 p-3 text-[13px] text-green-700">
                    <p className="font-semibold">{bookingSuccess.message}</p>

                    {bookingSuccess.bookingCode ? (
                      <p className="mt-1">
                        Booking Code:{" "}
                        <span className="font-semibold">
                          {bookingSuccess.bookingCode}
                        </span>
                      </p>
                    ) : null}
                  </div>
                )}

                {bookingError && (
                  <div className="rounded-2xl border border-red-200 bg-red-50 p-3 text-[13px] text-red-700">
                    {bookingError}
                  </div>
                )}

                <div className="space-y-3">
                  {cart.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-slate-300 p-4 text-[13px] text-slate-500">
                      No item added yet.
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-2 border-b border-slate-200 pb-3"
                      >
                        <div className="h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = fallbackImage;
                            }}
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <h4 className="truncate text-[13px] font-semibold text-slate-900">
                            {item.name}
                          </h4>

                          <p className="text-[11px] text-slate-500">
                            {money(item.price)}
                          </p>
                        </div>

                        <div className="flex items-center gap-1">
                          <div className="flex items-center overflow-hidden rounded-lg border border-slate-200">
                            <button
                              onClick={() => removeOne(item)}
                              className="flex h-7 w-7 items-center justify-center hover:bg-slate-50"
                            >
                              <Minus size={13} />
                            </button>

                            <span className="min-w-[24px] text-center text-[13px]">
                              {item.quantity}
                            </span>

                            <button
                              onClick={() => addOne(item)}
                              className="flex h-7 w-7 items-center justify-center hover:bg-slate-50"
                            >
                              <Plus size={13} />
                            </button>
                          </div>

                          <button
                            onClick={() => removeLine(item.id)}
                            className="text-rose-500"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="space-y-1.5 border-t border-slate-200 pt-3">
                  <div className="flex items-center justify-between text-[14px] text-slate-700">
                    <span>Subtotal</span>
                    <span>{money(subtotal)}</span>
                  </div>

                  <div className="flex items-center justify-between pt-1 text-[18px] font-semibold text-sky-700">
                    <span>Total</span>
                    <span>{money(total)}</span>
                  </div>
                </div>

                <button
                  onClick={() => openCheckoutModal("buy_now")}
                  disabled={cart.length === 0}
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-xl text-[14px] font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-50"
                  style={{ backgroundColor: BRAND_GOLD }}
                >
                  <Wallet size={17} />
                  Buy Now
                </button>

                <button
                  onClick={() => openCheckoutModal("table")}
                  disabled={cart.length === 0}
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border text-[14px] font-medium transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                  style={{ borderColor: BRAND_GOLD, color: BRAND_GOLD_DARK }}
                >
                  <CalendarDays size={17} />
                  Book Table
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* ITEM DETAILS POPUP */}
      {selectedItem && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 px-4 py-5">
          <div className="relative max-h-[84vh] w-full max-w-[760px] overflow-y-auto rounded-[22px] bg-white shadow-2xl">
            <button
              type="button"
              onClick={() => setSelectedItem(null)}
              className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-md transition hover:bg-white"
            >
              <X size={17} />
            </button>

            <div className="grid gap-0 md:grid-cols-[1fr_0.9fr]">
              <div className="relative min-h-[220px] overflow-hidden bg-slate-100 md:min-h-[360px]">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = fallbackImage;
                  }}
                />

                <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-bold text-slate-700 shadow">
                  {selectedItem.category || activeTab}
                </div>
              </div>

              <div className="flex flex-col justify-center p-5 md:p-6">
                <p
                  className="text-[10px] font-bold uppercase tracking-[0.18em]"
                  style={{ color: BRAND_GOLD_DARK }}
                >
                  Menu Item
                </p>

                <h2 className="mt-2 text-[24px] font-bold leading-tight text-slate-950 md:text-[28px]">
                  {selectedItem.name}
                </h2>

                <p className="mt-2 text-[19px] font-bold text-slate-900">
                  {money(selectedItem.price)}
                </p>

                {selectedItem.description && (
                  <p className="mt-4 text-[14px] leading-6 text-slate-600">
                    {selectedItem.description}
                  </p>
                )}

                <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                  <button
                    type="button"
                    onClick={handleBuyFromPopup}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-[13px] font-bold text-white transition hover:opacity-90"
                    style={{ backgroundColor: BRAND_GOLD }}
                  >
                    <ShoppingCart size={16} />
                    Buy / Add
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedItem(null)}
                    className="inline-flex flex-1 items-center justify-center rounded-xl border border-slate-200 px-4 py-3 text-[13px] font-bold text-slate-700 transition hover:bg-slate-50"
                  >
                    Continue
                  </button>
                </div>

                {getItemQty(selectedItem.id) > 0 && (
                  <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-[13px] font-semibold text-emerald-700">
                    Already in order: {getItemQty(selectedItem.id)}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CHECKOUT MODAL */}
      {checkoutMode && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 px-4 py-5">
          <div className="relative max-h-[86vh] w-full max-w-[560px] overflow-y-auto rounded-[22px] bg-white p-4 shadow-2xl md:p-5">
            <button
              type="button"
              onClick={() => setCheckoutMode(null)}
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200"
            >
              <X size={17} />
            </button>

            <div className="pr-10">
              <p
                className="text-[11px] font-bold uppercase tracking-[0.18em]"
                style={{ color: BRAND_GOLD_DARK }}
              >
                {checkoutMode === "buy_now" ? "Buy Now" : "Book Table"}
              </p>

              <h2 className="mt-2 text-xl font-bold text-slate-950">
                Complete your details
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your order total is{" "}
                <span className="font-bold text-sky-700">{money(total)}</span>
              </p>
            </div>

            {bookingError && (
              <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">
                {bookingError}
              </div>
            )}

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <InputField
                icon={<User size={15} />}
                name="fullName"
                value={customer.fullName}
                onChange={handleCustomerChange}
                placeholder="Full name"
              />

              <InputField
                icon={<Phone size={15} />}
                name="phone"
                value={customer.phone}
                onChange={handleCustomerChange}
                placeholder="Phone number"
              />

              <InputField
                icon={<Mail size={15} />}
                type="email"
                name="email"
                value={customer.email}
                onChange={handleCustomerChange}
                placeholder="Email optional"
              />

              <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">
                <p className="mb-2 text-sm font-bold text-slate-800">
                  Payment
                </p>

                <div className="space-y-2 text-sm text-slate-700">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={paymentMethod === "counter"}
                      onChange={() => setPaymentMethod("counter")}
                    />
                    Pay at counter
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={paymentMethod === "room"}
                      onChange={() => setPaymentMethod("room")}
                    />
                    Charge to room
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                    />
                    Pay now
                  </label>
                </div>
              </div>

              {checkoutMode === "table" && (
                <>
                  <InputField
                    type="date"
                    name="bookingDate"
                    value={customer.bookingDate}
                    onChange={handleCustomerChange}
                  />

                  <InputField
                    type="time"
                    name="bookingTime"
                    value={customer.bookingTime}
                    onChange={handleCustomerChange}
                  />

                  <InputField
                    type="number"
                    min="1"
                    name="partySize"
                    value={customer.partySize}
                    onChange={handleCustomerChange}
                    placeholder="Party size"
                  />
                </>
              )}

              <textarea
                name="notes"
                value={customer.notes}
                onChange={handleCustomerChange}
                rows={3}
                placeholder="Notes optional"
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none md:col-span-2"
              />
            </div>

            <div className="mt-4 rounded-2xl bg-slate-50 p-3">
              <div className="flex items-center justify-between text-sm text-slate-600">
                <span>{cart.length} item line(s)</span>
                <span className="font-bold text-slate-950">{money(total)}</span>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setCheckoutMode(null)}
                className="inline-flex flex-1 items-center justify-center rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={createBooking}
                disabled={bookingLoading}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white transition disabled:cursor-not-allowed disabled:opacity-70"
                style={{ backgroundColor: BRAND_GOLD }}
              >
                {bookingLoading ? "Processing..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function InputField({
  icon,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  min,
}) {
  return (
    <div className="flex h-11 items-center rounded-xl border border-slate-200 bg-white px-3">
      {icon && <span className="text-slate-400">{icon}</span>}

      <input
        type={type}
        min={min}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${
          icon ? "ml-3" : ""
        } w-full border-none bg-transparent text-sm outline-none placeholder:text-slate-400`}
      />
    </div>
  );
}
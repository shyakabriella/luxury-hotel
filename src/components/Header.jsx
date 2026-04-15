import React, { useEffect, useState } from "react";

const LOGO_SRC = "/losgo.png";
const RESERVE_URL = "https://www.luxuryweb.ashbhub.com/";
const WEDDINGS_URL = "https://www.wedding.luxurygardenpalace.com/";
const APARTMENTS_URL = "https://www.groupmeeting.ashbhub.com/";
const RESTO_BAR_URL = "https://resto.luxurygardenpalace.com/";

const topNavLinks = [
  { label: "Wedding", href: WEDDINGS_URL },
  { label: "Restaurant", href: RESTO_BAR_URL },
  { label: "Apartments", href: APARTMENTS_URL },
  { label: "Gym & Pool", href: "#", comingSoon: true },
  { label: "Massage & SPA", href: "#", comingSoon: true },
];

const menuSections = [
  {
    title: "Our Services",
    links: [
      { label: "Wedding", href: WEDDINGS_URL },
      { label: "Restaurant", href: RESTO_BAR_URL },
      { label: "Apartments", href: APARTMENTS_URL },
      { label: "Children Leisure", href: "#", comingSoon: true },
      { label: "Sauna, Massage & Spa", href: "#", comingSoon: true },
      { label: "Gym & Pool", href: "#", comingSoon: true },
    ],
  },
  {
    title: "Facilities",
    links: [
      { label: "Enough Parking", href: "#", comingSoon: true },
      { label: "Recreation Center", href: "#", comingSoon: true },
    ],
  },
  {
    title: "Why Choose Us",
    links: [
      {
        label: "Convincing Elements On Site",
        href: "#",
        comingSoon: true,
      },
    ],
  },
  {
    title: "Food & Orders",
    links: [{ label: "Make Order & Menu", href: "#", comingSoon: true }],
  },
];

const bottomLinks = [
  { label: "About Us", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact Us", href: "/contact" },
];

function HeaderLogo({ isScrolled = false, menuVersion = false }) {
  return (
    <a href="/" className="shrink-0">
      <img
        src={LOGO_SRC}
        alt="Luxury Hotel Logo"
        className={`w-auto object-contain transition-all duration-300 drop-shadow-[0_8px_24px_rgba(0,0,0,0.55)] ${
          menuVersion
            ? "h-[62px] max-w-[250px] sm:h-[72px] md:h-[72px]"
            : isScrolled
            ? "h-[118px] max-w-[420px] md:h-[72px] lg:h-[82px]"
            : "h-[150px] max-w-[520px] md:h-[84px] lg:h-[96px]"
        }`}
      />
    </a>
  );
}

function MenuItem({ item, onClick }) {
  if (item.comingSoon) {
    return (
      <button
        type="button"
        onClick={() => onClick(item)}
        className="inline-block text-[18px] font-light leading-tight tracking-wide text-white transition hover:text-[#d8c29b] sm:text-[22px] md:text-[26px] lg:text-[30px]"
      >
        {item.label}
      </button>
    );
  }

  return (
    <a
      href={item.href}
      onClick={() => onClick(item)}
      className="inline-block text-[18px] font-light leading-tight tracking-wide text-white transition hover:text-[#d8c29b] sm:text-[22px] md:text-[26px] lg:text-[30px]"
    >
      {item.label}
    </a>
  );
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [comingSoonOpen, setComingSoonOpen] = useState(false);
  const [comingSoonTitle, setComingSoonTitle] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 18);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (menuOpen || comingSoonOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, comingSoonOpen]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setComingSoonOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const handleOpenFromBottomBar = () => {
      setMenuOpen(true);
    };

    window.addEventListener("open-mobile-bottom-menu", handleOpenFromBottomBar);

    return () => {
      window.removeEventListener(
        "open-mobile-bottom-menu",
        handleOpenFromBottomBar
      );
    };
  }, []);

  const handleItemClick = (item) => {
    if (item.comingSoon) {
      setMenuOpen(false);
      setComingSoonTitle(item.label);
      setComingSoonOpen(true);
      return;
    }

    setMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed left-0 right-0 z-[55] transition-all duration-300 ${
          isScrolled ? "top-0 md:top-[76px]" : "top-[56px] md:top-[76px]"
        } ${isScrolled ? "bg-[#1d3335] shadow-lg" : "bg-transparent"}`}
      >
        <div className="mx-auto max-w-[1600px] px-4 md:px-8 lg:px-12">
          <div
            className={`flex items-center justify-center md:justify-between transition-all duration-300 ${
              isScrolled
                ? "min-h-[124px] md:min-h-[104px]"
                : "min-h-[170px] md:min-h-[144px]"
            }`}
          >
            <div className="flex justify-center md:block">
              <HeaderLogo isScrolled={isScrolled} />
            </div>

            <nav className="hidden lg:flex items-center gap-5 xl:gap-7 2xl:gap-9">
              {topNavLinks.map((item) =>
                item.comingSoon ? (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => handleItemClick(item)}
                    className="text-[15px] xl:text-[17px] font-normal text-white/95 transition hover:text-[#d8c29b] whitespace-nowrap"
                  >
                    {item.label}
                  </button>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-[15px] xl:text-[17px] font-normal text-white/95 transition hover:text-[#d8c29b] whitespace-nowrap"
                  >
                    {item.label}
                  </a>
                )
              )}
            </nav>

            <div className="hidden md:flex items-center gap-6 lg:gap-8 shrink-0">
              <div className="flex flex-col items-end">
                <span className="text-sm uppercase tracking-wide text-white">
                  Phone: +250 780 443 787
                </span>

                <a
                  href={RESERVE_URL}
                  className="mt-3 inline-flex min-w-[180px] items-center justify-center bg-white px-8 py-3 text-[15px] font-semibold uppercase tracking-wide text-[#9b8957] transition hover:bg-[#f7f2eb]"
                >
                  Reserve
                </a>
              </div>

              <button
                onClick={() => setMenuOpen(true)}
                className="flex flex-col items-center text-white"
                aria-label="Open menu"
              >
                <span className="mb-3 flex flex-col gap-[6px]">
                  <span className="block h-[2px] w-11 bg-[#c5ad86]" />
                  <span className="block h-[2px] w-11 bg-[#c5ad86]" />
                  <span className="block h-[2px] w-11 bg-[#c5ad86]" />
                </span>
                <span className="text-[14px] uppercase tracking-widest text-white">
                  Menu
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[90] transition-all duration-500 ${
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <button
          aria-label="Close menu overlay"
          onClick={() => setMenuOpen(false)}
          className={`absolute inset-0 bg-black/35 transition-opacity duration-500 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        <div
          className={`absolute right-0 top-0 h-full w-full md:w-[78%] lg:w-[62%] xl:w-[57%] transform overflow-hidden bg-[#062f33] transition-transform duration-500 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(4,40,43,0.88), rgba(3,33,36,0.92)), url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center right",
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(9,93,96,0.18),transparent_55%)]" />

          <div className="relative flex h-full flex-col px-6 py-8 sm:px-10 md:px-14 lg:px-20">
            <div className="flex items-center justify-between">
              <HeaderLogo menuVersion />

              <button
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 text-white transition hover:text-[#d8c29b]"
              >
                <span className="text-[24px] leading-none">×</span>
                <span className="text-[16px] uppercase tracking-wide">
                  Close
                </span>
              </button>
            </div>

            <div className="mt-8 flex-1 overflow-y-auto pr-1">
              <div className="mx-auto w-full max-w-[760px] space-y-10">
                {menuSections.map((section) => (
                  <div key={section.title} className="text-center">
                    <div className="mb-4 flex items-center gap-4">
                      <span className="h-px flex-1 bg-white/20" />
                      <h3 className="text-[12px] uppercase tracking-[0.35em] text-[#d8c29b] sm:text-[13px]">
                        {section.title}
                      </h3>
                      <span className="h-px flex-1 bg-white/20" />
                    </div>

                    <ul className="space-y-3 md:space-y-4">
                      {section.links.map((item) => (
                        <li key={item.label}>
                          <MenuItem item={item} onClick={handleItemClick} />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 pb-2">
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-white">
                {bottomLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-[15px] transition hover:text-[#d8c29b] md:text-[16px]"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-[120] transition-all duration-300 ${
          comingSoonOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <button
          type="button"
          aria-label="Close coming soon popup"
          onClick={() => setComingSoonOpen(false)}
          className="absolute inset-0 bg-black/60"
        />

        <div className="absolute left-1/2 top-1/2 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white px-6 py-8 text-center shadow-2xl">
          <h3 className="text-2xl font-semibold text-[#1d3335]">
            Coming Soon
          </h3>
          <p className="mt-3 text-[16px] leading-7 text-gray-700">
            {comingSoonTitle} will be available soon.
          </p>

          <button
            type="button"
            onClick={() => setComingSoonOpen(false)}
            className="mt-6 inline-flex items-center justify-center rounded-md bg-[#1d3335] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#28484b]"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
}
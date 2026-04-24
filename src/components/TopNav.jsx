import React, { useEffect, useState } from "react";

export default function TopNav() {
  const [hideMobileTopNav, setHideMobileTopNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHideMobileTopNav(window.scrollY > 18);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed left-0 right-0 top-0 z-[60] border-b border-black/10 bg-[#f7f5f2]/95 backdrop-blur-sm transition-transform duration-300 ${
        hideMobileTopNav
          ? "-translate-y-full md:translate-y-0"
          : "translate-y-0"
      }`}
    >
      <div className="mx-auto max-w-[1600px] px-4 md:px-8 lg:px-12">

        {/* Mobile */}
        <div className="flex min-h-[56px] items-center justify-center md:hidden px-6">
          <div className="flex items-center gap-2 whitespace-nowrap overflow-hidden max-w-full">
            <p className="text-[9px] tracking-[0.06em] text-black/80 truncate">
              <span className="font-semibold text-[#9b896f] uppercase">
                A Golden Start to Your Forever
              </span>
              <span className="mx-2 text-black/30">—</span>
              Win a curated wedding bundle experience
            </p>

            <a href="https://direct-book.com/properties/luxurygardenpalace/about?locale=en&items[0][adults]=2&items[0][children]=0&items[0][infants]=0&currency=USD&checkInDate=2026-04-24&checkOutDate=2026-04-25&trackPage=yes" target="_blank" className="shrink-0 ml-2 text-[9px] font-semibold uppercase tracking-wide text-[#9b896f] hover:opacity-70 transition">
              Learn More
            </a>
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden h-[76px] items-center justify-center md:flex px-6 lg:px-10">

          <div className="flex items-center gap-4 whitespace-nowrap max-w-[1200px] w-full justify-center">

            <p className="text-[12px] md:text-[13px] tracking-wide text-black/45 text-center truncate">
              <span className="font-semibold text-[#a7865c] uppercase">
                A Golden Start to Your Forever
              </span>

              <span className="mx-3 text-black/30">—</span>

              Experience elevated luxury living in our apartments with comfort, style, and timeless elegance.
            </p>

            <div className="shrink-0 ml-3">
              <button className="h-11 md:h-12 rounded-full bg-[#9b8957] px-6 md:px-8 text-[12px] md:text-[14px] font-semibold uppercase tracking-wide text-white transition hover:opacity-90">
                Learn More
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
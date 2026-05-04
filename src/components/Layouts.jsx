import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import TopNav from "./TopNav";
import Header from "./Header";
import Footer from "./Footer";

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);

  return null;
}

function MobileBottomBar() {
  const handleOpenMenu = () => {
    window.dispatchEvent(new CustomEvent("open-mobile-bottom-menu"));
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-[90] md:hidden">
      <div className="grid h-[68px] grid-cols-3 overflow-hidden border-t border-white/10 bg-[#183236] shadow-[0_-8px_24px_rgba(0,0,0,0.28)]">
        <button
          type="button"
          onClick={handleOpenMenu}
          className="flex flex-col items-center justify-center border-r border-white/10 bg-white text-[#183236] transition hover:bg-[#f7f5f2]"
        >
          <span className="mb-1 inline-flex">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 7h16" />
              <path d="M4 12h16" />
              <path d="M4 17h16" />
            </svg>
          </span>

          <span className="text-[11px] font-semibold uppercase tracking-[0.14em]">
            Menu
          </span>
        </button>

        <a
          href="tel:+250780443787"
          className="flex flex-col items-center justify-center border-r border-white/10 bg-white text-[#183236] transition hover:bg-[#f7f5f2]"
        >
          <span className="mb-1 inline-flex">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.19 19 19.5 19.5 0 0 1 5 12.81 19.79 19.79 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.89.33 1.76.62 2.59a2 2 0 0 1-.45 2.11L8 9.65a16 16 0 0 0 6.35 6.35l1.23-1.23a2 2 0 0 1 2.11-.45c.83.29 1.7.5 2.59.62A2 2 0 0 1 22 16.92z" />
            </svg>
          </span>

          <span className="text-[11px] font-semibold uppercase tracking-[0.14em]">
            Call
          </span>
        </a>

        <a
          href="https://www.luxuryweb.ashbhub.com/"
          className="flex flex-col items-center justify-center bg-[#183236] px-4 text-white transition hover:bg-[#24474c]"
        >
          <span className="mb-1 inline-flex">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M8 2v4" />
              <path d="M16 2v4" />
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M3 10h18" />
            </svg>
          </span>

          <span className="text-[11px] font-semibold uppercase tracking-[0.14em]">
            Reserve
          </span>
        </a>
      </div>
    </div>
  );
}

function SideContactTab() {
  return (
    <a
      href="https://direct-book.com/properties/luxurygardenpalace/contact?locale=en"
      className="fixed left-0 top-1/2 z-[70] hidden -translate-y-1/2 rounded-r-md border border-black/20 bg-white px-2 py-4 text-[#555] shadow-md transition hover:bg-[#f7f5f2] sm:flex"
    >
      <span className="[writing-mode:vertical-rl] rotate-180 text-[12px] font-medium tracking-[0.08em] md:text-[13px]">
        Contact Us
      </span>
    </a>
  );
}

export default function Layouts() {
  const location = useLocation();

  const cleanPath = location.pathname.replace(/\/+$/, "") || "/";

  const bannerPages = ["/", "/spa", "/wedding", "/restaurant", "/career"];
  const isBannerPage = bannerPages.includes(cleanPath);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f3f2ed]">
      <ScrollToTop />

      {/* Keep header below portal modals */}
      <div className="relative z-[85]">
        <TopNav />
        <Header />
      </div>

      <SideContactTab />

      {/* Important: no z-0 here */}
      <main
        className={`relative ${
          isBannerPage ? "pt-[56px] md:pt-[76px]" : "pt-[206px] md:pt-[172px]"
        } pb-[74px] md:pb-0`}
      >
        <Outlet />
      </main>

      <Footer />

      <MobileBottomBar />
    </div>
  );
}
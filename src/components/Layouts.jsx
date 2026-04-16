import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import TopNav from "./TopNav";
import Header from "./Header";
import Footer from "./Footer";

function MobileBottomBar() {
  const handleOpenMenu = () => {
    window.dispatchEvent(new CustomEvent("open-mobile-bottom-menu"));
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-[80] md:hidden">
      <div className="grid h-[68px] grid-cols-3 overflow-hidden border-t border-white/10 bg-[#183236] shadow-[0_-8px_20px_rgba(0,0,0,0.25)]">
        <button
          type="button"
          onClick={handleOpenMenu}
          className="flex flex-col items-center justify-center border-r border-white/10 bg-white text-[#183236]"
        >
          <span className="mb-1 inline-flex">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 7h16" />
              <path d="M4 12h16" />
              <path d="M4 17h16" />
            </svg>
          </span>
          <span className="text-[11px] font-medium uppercase tracking-[0.14em]">
            Menu
          </span>
        </button>

        <a
          href="tel:+250780443787"
          className="flex flex-col items-center justify-center border-r border-white/10 bg-white text-[#183236]"
        >
          Call
        </a>

        <a
          href="https://www.luxuryweb.ashbhub.com/"
          className="flex items-center justify-center bg-[#183236] px-4 text-[15px] font-medium uppercase tracking-[0.18em] text-white"
        >
          Reserve
        </a>
      </div>
    </div>
  );
}

function SideContactTab() {
  return (
    <a
      href="https://direct-book.com/properties/luxurygardenpalace/contact?locale=en"
      className="fixed left-0 top-1/2 z-[75] -translate-y-1/2 rounded-r-md border border-black/20 bg-white px-2 py-4 text-[#555] shadow-md transition hover:bg-[#f7f5f2]"
    >
      <span className="[writing-mode:vertical-rl] rotate-180 text-[12px] font-medium tracking-[0.08em] md:text-[13px]">
        Contact Us
      </span>
    </a>
  );
}

export default function Layouts() {
  const location = useLocation();
  const bannerPages = ["/", "/spa", "/wedding", "/restaurant", "/career"];
  const isBannerPage = bannerPages.includes(location.pathname);

  return (
    <div className="min-h-screen bg-[#f3f2ed]">
      <div className="relative z-[100]">
        <TopNav />
        <Header />
      </div>

      <SideContactTab />

      <main
        className={`relative z-0 ${
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

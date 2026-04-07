import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import TopNav from "./TopNav";
import Header from "./Header";
import Footer from "./Footer";

export default function Layouts() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="min-h-screen bg-white">
      <TopNav />
      <Header />

      <main
        className={isHome ? "pt-[72px] md:pt-[76px]" : "pt-[160px] md:pt-[172px]"}
      >
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
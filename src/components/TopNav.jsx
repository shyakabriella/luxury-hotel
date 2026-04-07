import React from "react";

export default function TopNav() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[72px] md:h-[76px] border-b border-black/10 bg-[#f7f5f2]">
      <div className="mx-auto flex h-full max-w-[1600px] items-center justify-between gap-4 px-4 md:px-8 lg:px-12">
        <div className="hidden md:block min-w-[280px] lg:min-w-[420px]">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[#a7865c] md:text-[18px]">
            A GOLDEN START TO YOUR FOREVER
          </h2>
        </div>

        <div className="flex-1 text-center">
          <p className="mx-auto max-w-[760px] text-[11px] leading-5 text-black md:text-[16px]">
            We&apos;re giving away the ultimate wedding bundle to help you
            celebrate. Enter for a chance to win a curated collection of luxury
            hotel essentials for you and your guests.
          </p>
        </div>

        <div className="shrink-0">
          <button className="h-11 md:h-12 bg-[#9b8957] px-4 md:px-8 text-xs md:text-[15px] font-semibold uppercase tracking-wide text-white transition hover:opacity-90">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}
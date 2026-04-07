import React from "react";

export default function TopNav() {
  return (
    <div className="fixed left-0 right-0 top-0 z-[60] border-b border-black/10 bg-[#f7f5f2]">
      <div className="mx-auto max-w-[1600px] px-4 md:px-8 lg:px-12">
        {/* Mobile */}
        <div className="flex min-h-[118px] flex-col items-center justify-center py-3 text-center md:hidden">
          <h2 className="text-[12px] font-medium uppercase tracking-[0.12em] text-[#9b896f]">
            A GOLDEN START TO YOUR FOREVER
          </h2>

          <p className="mt-2 max-w-[310px] text-[11px] leading-5 text-black/85">
            We&apos;re giving away the ultimate wedding bundle to help you
            celebrate. Enter for a chance to win a curated collection of Wonder
            Valley essentials for you and your guests.
          </p>

          <button className="mt-3 h-[40px] bg-[#9b8957] px-6 text-[12px] font-semibold uppercase tracking-[0.1em] text-white transition hover:opacity-90">
            Learn More
          </button>
        </div>

        {/* Desktop */}
        <div className="hidden h-[76px] items-center justify-between gap-4 md:flex">
          <div className="min-w-[280px] lg:min-w-[420px]">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-[#a7865c] md:text-[18px]">
              A GOLDEN START TO YOUR FOREVER
            </h2>
          </div>

          <div className="flex-1 text-center">
            <p className="mx-auto max-w-[760px] text-[13px] leading-5 text-black md:text-[16px]">
              We&apos;re giving away the ultimate wedding bundle to help you
              celebrate. Enter for a chance to win a curated collection of
              Wonder Valley essentials for you and your guests.
            </p>
          </div>

          <div className="shrink-0">
            <button className="h-11 bg-[#9b8957] px-6 text-[13px] font-semibold uppercase tracking-wide text-white transition hover:opacity-90 md:h-12 md:px-8 md:text-[15px]">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
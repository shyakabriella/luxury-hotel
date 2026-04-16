import React from "react";

const features = ["No Resort Fees", "Free Wi-Fi & Parking", "Flexible Rates"];

function TreeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 md:h-5 md:w-5"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2c-1.6 0-2.8 1.3-2.8 2.8 0 .2 0 .5.1.7-2.2.3-3.8 2.2-3.8 4.4 0 .6.1 1.1.3 1.6-1.8.5-3.1 2.1-3.1 4.1 0 2.4 1.9 4.3 4.3 4.3h3.7V22h2.6v-2.9h3.7c2.4 0 4.3-1.9 4.3-4.3 0-1.9-1.3-3.6-3.1-4.1.2-.5.3-1 .3-1.6 0-2.2-1.6-4.1-3.8-4.4.1-.2.1-.5.1-.7C14.8 3.3 13.6 2 12 2Z" />
    </svg>
  );
}

export default function ResortBanner() {
  return (
    <section className="relative z-20 -mt-6 px-3 md:-mt-10 md:px-5 lg:px-8">
      <div
        className="mx-auto max-w-[1300px] overflow-hidden border border-[#cfc8bb]/60 bg-[#f2efe8]/80 shadow-[0_6px_20px_rgba(0,0,0,0.06)] backdrop-blur-sm"
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] lg:grid-cols-[260px_1fr]">
          {/* Left title */}
          <div className="flex items-center justify-center border-b border-[#cfc8bb]/60 px-3 py-3 text-center md:border-b-0 md:border-r md:px-4 md:py-4">
            <h3 className="text-[12px] font-normal tracking-[-0.02em] text-[#1f3d3f] md:text-[15px] lg:text-[17px]">
              Book With Us
            </h3>
          </div>

          {/* Right features */}
          <div className="grid grid-cols-1 sm:grid-cols-3">
            {features.map((item, index) => (
              <div
                key={item}
                className={`flex items-center justify-center gap-2 px-3 py-3 text-center ${
                  index !== features.length - 1
                    ? "border-b border-[#cfc8bb]/60 sm:border-b-0 sm:border-r"
                    : ""
                }`}
              >
                <span className="text-[#9b846b]">
                  <TreeIcon className="w-4 h-4" />
                </span>

                <span className="text-[11px] font-normal tracking-[-0.01em] text-[#3b342f] md:text-[13px]">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

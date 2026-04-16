import React, { useEffect, useState } from "react";

const testimonials = [
  {
    title: "Resident Stories",
    category: "LUXURY RESIDES",
    quote:
      "Living here has been a dream. The modern design, spacious rooms, and premium finishes make everyday feel special.",
    author: "-Sophia M, Resident",
  },
  {
    title: "Resident Stories",
    category: "CITY LIVING",
    quote:
      "The location is perfect—close to everything yet peaceful inside. Amenities like the gym and pool elevate the lifestyle.",
    author: "-Daniel K, Resident",
  },
  {
    title: "Resident Stories",
    category: "COMFORT & STYLE",
    quote:
      "From the concierge service to the rooftop lounge, every detail is thoughtfully designed for comfort and elegance.",
    author: "-Aisha R, Resident",
  },
];

export default function ResortSectionSix() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((p) => (p + 1) % testimonials.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const goNext = () => setCurrent((p) => (p + 1) % testimonials.length);
  const goPrev = () => setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length);

  return (
    <section
      className="relative overflow-hidden bg-[#173236] py-8 md:py-10"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#173236] via-[#173236] to-[#1b3a3e]" />

      <div className="relative mx-auto max-w-[900px] px-4 text-center">

        {/* Left arrow */}
        <button
          onClick={goPrev}
          className="absolute left-2 top-1/2 h-7 w-7 -translate-y-1/2 rounded-full border border-[#b18d49] text-[#b18d49] text-sm"
        >
          ←
        </button>

        {/* Content */}
        <div key={current} className="transition-all duration-700">
          <h2 className="text-[16px] md:text-[22px] text-[#b18d49] font-light">
            {testimonials[current].title}
          </h2>

          <p className="mt-2 text-[10px] md:text-[12px] uppercase tracking-wide text-white/70">
            {testimonials[current].category}
          </p>

          <p className="mt-3 text-[12px] md:text-[14px] leading-[1.5] text-white/80">
            “{testimonials[current].quote}”
          </p>

          <p className="mt-4 text-[11px] md:text-[12px] text-white/60">
            {testimonials[current].author}
          </p>
        </div>

        {/* Right arrow */}
        <button
          onClick={goNext}
          className="absolute right-2 top-1/2 h-7 w-7 -translate-y-1/2 rounded-full border border-[#b18d49] text-[#b18d49] text-sm"
        >
          →
        </button>

      </div>
    </section>
  );
}

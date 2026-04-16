import React, { useEffect, useState } from "react";

import homeseven from "../../assets/homepage/homeseven.jpg";
import homeeight from "../../assets/homepage/homeeight.JPG";
import homenine from "../../assets/homepage/welcomeToWedding.jpeg";
import hometen from "../../assets/homepage/hometen.png";

const slides = [
  {
    image: homeseven,
    eyebrow: "For Every Event",
    titleLine1: "Unforgettable",
    titleLine2: "Weddings",
    description:
      "Celebrate your special day in a beautiful setting designed for magical moments.",
  },
  {
    image: homeeight,
    eyebrow: "For Every Event",
    titleLine1: "Luxury",
    titleLine2: "Getaways",
    description:
      "Relax in scenic comfort with surroundings perfect for weekends and group escapes.",
  },
  {
    image: homenine,
    eyebrow: "For Every Event",
    titleLine1: "Outdoor",
    titleLine2: "Education",
    description:
      "Enjoy swimming, climbing, and kayaking in a natural learning environment.",
  },
  {
    image: hometen,
    eyebrow: "For Every Event",
    titleLine1: "Elegant",
    titleLine2: "Moments",
    description:
      "Create lasting memories in a calm atmosphere with thoughtful spaces.",
  },
];

export default function ResortSectionFour() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((p) => (p + 1) % slides.length);
    }, 3000); // shorter interval
    return () => clearInterval(timer);
  }, []);

  const goNext = () => setCurrent((p) => (p + 1) % slides.length);
  const goPrev = () => setCurrent((p) => (p - 1 + slides.length) % slides.length);

  return (
    <section className="relative mt-10 overflow-hidden bg-[#2c3119]" style={{ fontFamily: "Montserrat, sans-serif" }}>
      <div className="mx-auto max-w-[1100px]">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">

    {/* IMAGE */}
    <div className="relative min-h-[240px] md:min-h-[320px] lg:min-h-[380px] pr-4 lg:pr-6">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.titleLine1}
            className="h-full w-full object-cover"
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-black/30" />
    </div>

    {/* CONTENT */}
    <div className="flex items-center bg-[#2c3119]/80 pl-4 lg:pl-6">
      <div className="px-6 py-8">
        <p className="text-[13px] text-white/70">{slides[current].eyebrow}</p>
        <h2 className="mt-2 text-[22px] md:text-[26px] font-light text-white">
          {slides[current].titleLine1} {slides[current].titleLine2}
        </h2>
        <p className="mt-3 text-[14px] md:text-[15px] text-white/70 max-w-[360px]">
          {slides[current].description}
        </p>

        <div className="mt-5 flex items-center gap-3">
          <div className="ml-auto flex gap-2">
            <button
              onClick={goPrev}
              className="h-8 w-8 rounded-full border border-[#8c7a45] text-[#b39a5a]"
            >
              ←
            </button>
            <button
              onClick={goNext}
              className="h-8 w-8 rounded-full border border-[#8c7a45] text-[#b39a5a]"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</div>

    </section>
  );
}

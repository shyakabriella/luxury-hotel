import React, { useEffect, useState } from "react";
import homeeight from "../../assets/homepage/homeeight.JPG";
import homenine from "../../assets/homepage/homenine.png";
import homeone from "../../assets/homepage/homeone.png";
import hometen from "../../assets/homepage/hometen.png";
import homeEleven from "../../assets/homepage/welcomeToWedding.jpeg";
import homeTwelve from "../../assets/homepage/weddingCouple.jpeg";

const slides = [
  { image: homeeight, alt: "Resort view one" },
  { image: homenine, alt: "Resort view two" },
  { image: homeTwelve, alt: "Resort view four" },
  { image: homeone, alt: "Resort view three" },
  { image: hometen, alt: "Resort view four" },
  { image: homeEleven, alt: "Resort view four" },
];

export default function ResortSectionEight() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const goNext = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const goPrev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const getRelativePosition = (index) => {
    const total = slides.length;
    let diff = index - current;

    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    return diff;
  };

  return (
    <section
      className="overflow-hidden bg-[#efeee8] py-14 md:py-20 lg:py-24"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <div className="mx-auto max-w-[1900px] px-0 sm:px-4 md:px-6 lg:px-8">
        <div className="relative h-[240px] sm:h-[340px] md:h-[440px] lg:h-[560px] xl:h-[640px]">
          {slides.map((slide, index) => {
            const position = getRelativePosition(index);

            let className =
              "absolute top-1/2 overflow-hidden transition-all duration-1000 ease-in-out";

            if (position === 0) {
              className +=
                " left-1/2 z-30 w-[58%] -translate-x-1/2 -translate-y-1/2 opacity-100 scale-100";
            } else if (position === -1) {
              className +=
                " left-0 z-20 w-[19%] -translate-y-1/2 opacity-75 scale-[0.96]";
            } else if (position === 1) {
              className +=
                " right-0 z-20 w-[19%] -translate-y-1/2 opacity-75 scale-[0.96]";
            } else {
              className +=
                " pointer-events-none left-1/2 z-0 w-[18%] -translate-x-1/2 -translate-y-1/2 opacity-0 scale-90";
            }

            return (
              <div key={slide.image} className={className}>
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className={`h-[240px] w-full object-cover sm:h-[340px] md:h-[440px] lg:h-[560px] xl:h-[640px] ${
                    position === 0 ? "blur-0" : "blur-[1.5px]"
                  }`}
                />
              </div>
            );
          })}

          {/* Left arrow */}
          <button
            onClick={goPrev}
            aria-label="Previous slide"
            className="absolute left-[20%] top-1/2 z-40 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#b69a63] bg-[#efeee8]/85 text-[20px] text-[#b69a63] transition hover:bg-white md:h-14 md:w-14"
          >
            ←
          </button>

          {/* Right arrow */}
          <button
            onClick={goNext}
            aria-label="Next slide"
            className="absolute right-[20%] top-1/2 z-40 flex h-12 w-12 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#b69a63] bg-[#efeee8]/85 text-[20px] text-[#b69a63] transition hover:bg-white md:h-14 md:w-14"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
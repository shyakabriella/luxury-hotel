import React, { useEffect, useState } from "react";
import homeeight from "../../assets/homepage/homeeight.jpg";
import homenine from "../../assets/homepage/homenine.png";
import homeone from "../../assets/homepage/homeone.png";
import hometen from "../../assets/homepage/hometen.png";
import homeEleven from "../../assets/homepage/welcomeToWedding.jpeg";
import MassageOne from "../../assets/homepage/massage-sauna/massage-one.jpg";
import MassageThree from "../../assets/homepage/massage-sauna/massage-three.jpg";
import roomOne from "../../assets/homepage/room.jpg";
import roomTwo from "../../assets/homepage/sallon.jpg";
import gymOne from "../../assets/homepage/gym/gym-one.jpg";
import gymTwo from "../../assets/homepage/gym/gym-two.jpg";


const slides = [
  { image: homeeight, alt: "Resort view one" },
  { image: gymTwo, alt: "Gym view two" },
  { image: homenine, alt: "Resort view two" },
  { image: gymOne, alt: "Gym view one" },
  { image: MassageOne, alt: "Massage place" },
  { image: homeone, alt: "Resort view three" },
  { image: roomTwo, alt: "Resort view three" },
  { image: hometen, alt: "Resort view four" },
  { image: MassageThree, alt: "Another Massage place" },
  { image: homeEleven, alt: "Resort view four" },
  { image: roomOne, alt: "Resort view four" },
];

export default function ResortSectionEight() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((p) => (p + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const goNext = () => setCurrent((p) => (p + 1) % slides.length);
  const goPrev = () => setCurrent((p) => (p - 1 + slides.length) % slides.length);

  const getRelativePosition = (index) => {
    const total = slides.length;
    let diff = index - current;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  return (
    <section
      className="overflow-hidden bg-[#efeee8] py-8 md:py-10"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <div className="mx-auto max-w-[1400px] px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="relative h-[160px] sm:h-[220px] md:h-[280px] lg:h-[340px] xl:h-[380px]">

          {slides.map((slide, index) => {
            const position = getRelativePosition(index);

            let className =
              "absolute top-1/2 overflow-hidden transition-all duration-700 ease-in-out";

            if (position === 0) {
              className +=
                " left-1/2 z-30 w-[55%] -translate-x-1/2 -translate-y-1/2 opacity-100 scale-100";
            } else if (position === -1) {
              className +=
                " left-0 z-20 w-[18%] -translate-y-1/2 opacity-70 scale-[0.95]";
            } else if (position === 1) {
              className +=
                " right-0 z-20 w-[18%] -translate-y-1/2 opacity-70 scale-[0.95]";
            } else {
              className +=
                " pointer-events-none left-1/2 z-0 w-[15%] -translate-x-1/2 -translate-y-1/2 opacity-0 scale-90";
            }

            return (
              <div key={slide.image} className={className}>
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className={`h-[160px] rounded-md w-full object-cover sm:h-[220px] md:h-[280px] lg:h-[340px] xl:h-[380px] ${
                    position === 0 ? "" : "blur-[0.8px]"
                  }`}
                />
              </div>
            );
          })}

          {/* Left arrow */}
          <button
            onClick={goPrev}
            aria-label="Previous slide"
            className="absolute left-[12%] top-1/2 z-40 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-[#b69a63] bg-[#efeee8]/80 text-[#b69a63] transition hover:bg-white md:h-10 md:w-10"
          >
            ←
          </button>

          {/* Right arrow */}
          <button
            onClick={goNext}
            aria-label="Next slide"
            className="absolute right-[12%] top-1/2 z-40 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-[#b69a63] bg-[#efeee8]/80 text-[#b69a63] transition hover:bg-white md:h-10 md:w-10"
          >
            →
          </button>

        </div>
      </div>
    </section>
  );
}

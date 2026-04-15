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
      "Celebrate your special day in a remarkable locale with beautiful views, elegant spaces, and memorable surroundings designed to make every moment feel magical.",
    buttonText: "Learn More",
  },
  {
    image: homeeight,
    eyebrow: "For Every Event",
    titleLine1: "Luxury",
    titleLine2: "Getaways",
    description:
      "Enjoy scenic beauty, refined comfort, and a peaceful atmosphere perfect for meaningful gatherings, relaxing weekends, and unforgettable guest experiences.",
    buttonText: "Discover More",
  },
  {
    image: homenine,
    eyebrow: "For Every Event",
    titleLine1: "Outdoor",
    titleLine2: "Education",
    description:
      "Whether it's rock climbing, swimming, kayaking, or craft-making, our resort offers rich learning experiences in a natural setting designed for discovery.",
    buttonText: "Learn More",
  },
  {
    image: hometen,
    eyebrow: "For Every Event",
    titleLine1: "Elegant",
    titleLine2: "Moments",
    description:
      "Create lasting memories in a warm atmosphere where thoughtful details, scenic surroundings, and beautiful spaces come together in perfect harmony.",
    buttonText: "Explore Events",
  },
];

export default function ResortSectionFour() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 11000);

    return () => clearInterval(timer);
  }, []);

  const goNext = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const goPrev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section
      className="relative mt-16 overflow-hidden bg-[#2c3119] md:mt-20 lg:mt-24"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <style>
        {`
          @keyframes resortFourZoom {
            0% {
              transform: scale(1);
            }
            100% {
              transform: scale(1.05);
            }
          }

          @keyframes resortFourFadeUp {
            0% {
              opacity: 0;
              transform: translateY(18px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes resortFourGlow {
            0% {
              opacity: 0.18;
              transform: translate3d(0, 0, 0) scale(1);
            }
            50% {
              opacity: 0.32;
              transform: translate3d(10px, -6px, 0) scale(1.04);
            }
            100% {
              opacity: 0.18;
              transform: translate3d(0, 0, 0) scale(1);
            }
          }

          .resort-four-zoom {
            animation: resortFourZoom 11s linear forwards;
          }

          .resort-four-copy {
            animation: resortFourFadeUp 1.2s ease forwards;
          }

          .resort-four-glow {
            animation: resortFourGlow 12s ease-in-out infinite;
          }
        `}
      </style>

      {/* Soft moving glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="resort-four-glow absolute left-[6%] top-[18%] h-40 w-40 rounded-full bg-[#7b8450]/16 blur-[95px]" />
        <div className="resort-four-glow absolute right-[12%] top-[22%] h-52 w-52 rounded-full bg-[#596033]/16 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-[1720px]">
        <div className="grid min-h-[330px] grid-cols-1 lg:min-h-[430px] lg:grid-cols-[1.08fr_0.92fr] xl:min-h-[470px]">
          {/* IMAGE SIDE */}
          <div className="relative min-h-[250px] sm:min-h-[310px] md:min-h-[360px] lg:min-h-[430px] xl:min-h-[470px] overflow-hidden">
            {slides.map((slide, index) => (
              <div
                key={`${slide.image}-${index}`}
                className={`absolute inset-0 transition-opacity duration-[2200ms] ease-in-out ${
                  index === current ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.titleLine1}
                  className={`h-full w-full object-cover ${
                    index === current ? "resort-four-zoom" : ""
                  }`}
                />
              </div>
            ))}

            {/* overall olive tint */}
            <div className="pointer-events-none absolute inset-0 bg-[rgba(47,53,24,0.18)]" />

            {/* left blurred band like screenshot */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-[70px] bg-[rgba(44,49,25,0.82)] blur-[18px] md:w-[90px] lg:w-[110px]" />
            <div className="pointer-events-none absolute inset-y-0 left-[18px] w-[90px] bg-[rgba(73,81,40,0.22)] blur-[45px] md:left-[22px] md:w-[120px] lg:left-[30px] lg:w-[150px]" />

            {/* middle blend blur */}
            <div className="pointer-events-none absolute inset-y-0 right-[-8px] w-[80px] bg-[rgba(44,49,25,0.70)] blur-[24px] md:w-[110px] lg:w-[130px]" />
            <div className="pointer-events-none absolute inset-y-0 right-[10px] w-[110px] bg-[rgba(82,93,46,0.18)] blur-[55px] md:right-[18px] md:w-[150px] lg:right-[24px] lg:w-[180px]" />

            {/* soft edge fade */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[rgba(44,49,25,0.20)] via-transparent to-[rgba(44,49,25,0.10)]" />
          </div>

          {/* CONTENT SIDE */}
          <div className="relative flex items-center overflow-hidden">
            {/* main transparent glass background */}
            <div className="absolute inset-0 bg-[rgba(44,49,25,0.58)] backdrop-blur-[10px]" />

            {/* blur seam touching image */}
            <div className="pointer-events-none absolute inset-y-0 left-[-26px] w-[80px] bg-[rgba(56,63,31,0.45)] blur-[26px] md:left-[-32px] md:w-[110px] lg:left-[-38px] lg:w-[130px]" />
            <div className="pointer-events-none absolute inset-y-0 left-[12px] w-[90px] bg-[rgba(95,104,55,0.12)] blur-[55px] md:w-[120px] lg:w-[150px]" />

            {/* inner content tint */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[rgba(58,64,31,0.22)] via-[rgba(44,49,25,0.12)] to-[rgba(44,49,25,0.38)]" />

            <div className="relative w-full px-6 py-8 sm:px-8 md:px-10 lg:px-12 lg:py-10 xl:px-16">
              <div key={current} className="resort-four-copy max-w-[500px]">
                <p className="text-[15px] font-normal leading-[1.35] text-white/88 sm:text-[17px] md:text-[18px]">
                  {slides[current].eyebrow}
                </p>

                <h2 className="mt-4 text-[36px] font-light leading-[0.95] tracking-[-0.03em] text-white/92 sm:text-[42px] md:text-[54px] lg:text-[60px] xl:text-[68px]">
                  {slides[current].titleLine1}
                  <br />
                  {slides[current].titleLine2}
                </h2>

                <p className="mt-5 max-w-[460px] text-[15px] leading-[1.75] text-white/72 sm:text-[16px] md:text-[17px]">
                  {slides[current].description}
                </p>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-4 md:mt-8">
                <button className="min-w-[160px] bg-white/92 px-6 py-3 text-[15px] font-normal text-[#3e3e3e] transition duration-300 hover:bg-white sm:min-w-[180px] sm:text-[16px]">
                  {slides[current].buttonText}
                </button>

                <div className="ml-0 flex items-center gap-3 md:ml-auto">
                  <button
                    onClick={goPrev}
                    aria-label="Previous slide"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#8c7a45] text-[16px] text-[#b39a5a] transition hover:bg-white/5"
                  >
                    ←
                  </button>

                  <button
                    onClick={goNext}
                    aria-label="Next slide"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#8c7a45] text-[16px] text-[#b39a5a] transition hover:bg-white/5"
                  >
                    →
                  </button>
                </div>
              </div>

              <div className="mt-8 h-px w-full bg-[#b7a46d]/28" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
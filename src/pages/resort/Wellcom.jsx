import React, { useEffect, useState } from "react";

const slides = [
  {
    image: "/home1.jpg",
    title: "Unforgettable",
    subtitle: "Charm & Adventure",
  },
  {
    image: "/home2.jpg",
    title: "Luxury Escape",
    subtitle: "Peace, Beauty & Comfort",
  },
  {
    image: "/home3.jpg",
    title: "Elegant Stays",
    subtitle: "Timeless Hospitality",
  },
  {
    image: "/home4.jpg",
    title: "Memorable Moments",
    subtitle: "Where Dreams Feel Real",
  },
];

export default function Wellcom() {
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

  const goToSlide = (index) => {
    setCurrent(index);
  };

  return (
    <section className="relative min-h-[calc(100vh-92px)] overflow-hidden md:min-h-[calc(100vh-76px)]">
      <style>
        {`
          @keyframes fadeUp {
            0% {
              opacity: 0;
              transform: translateY(35px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes slowZoom {
            0% {
              transform: scale(1);
            }
            100% {
              transform: scale(1.08);
            }
          }

          .hero-text-animate {
            animation: fadeUp 1s ease forwards;
          }

          .hero-bg-animate {
            animation: slowZoom 5s linear forwards;
          }
        `}
      </style>

      {/* Background slides */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.image}
            className={`absolute inset-0 transition-opacity duration-[1400ms] ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className={`absolute inset-0 bg-cover bg-center bg-no-repeat ${
                index === current ? "hero-bg-animate" : ""
              }`}
              style={{
                backgroundImage: `url('${slide.image}')`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/28" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/18 via-black/8 to-black/45" />

      {/* Content */}
      <div className="relative z-10 flex min-h-[calc(100vh-92px)] items-center justify-center px-4 text-center md:min-h-[calc(100vh-76px)] md:items-end md:pb-20 lg:pb-24">
        <div
          key={current}
          className="hero-text-animate mx-auto flex max-w-5xl flex-col items-center justify-center"
        >
          <h1 className="text-[44px] font-extralight leading-none tracking-tight text-white drop-shadow-[0_3px_12px_rgba(0,0,0,0.55)] sm:text-[60px] md:text-[100px] lg:text-[130px]">
            {slides[current].title}
          </h1>

          <p className="mt-3 max-w-[90%] text-[16px] font-extralight uppercase tracking-[0.14em] text-white/95 drop-shadow-[0_3px_12px_rgba(0,0,0,0.55)] sm:text-[20px] md:text-[36px] lg:text-[50px]">
            {slides[current].subtitle}
          </p>
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={goPrev}
        className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-black/20 text-2xl text-white backdrop-blur-sm transition hover:bg-black/35 md:left-6 md:h-12 md:w-12"
        aria-label="Previous slide"
      >
        ‹
      </button>

      <button
        onClick={goNext}
        className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-black/20 text-2xl text-white backdrop-blur-sm transition hover:bg-black/35 md:right-6 md:h-12 md:w-12"
        aria-label="Next slide"
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-20 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 md:bottom-8">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2.5 w-2.5 rounded-full transition-all duration-300 md:h-3 md:w-3 ${
              index === current
                ? "scale-110 bg-white"
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
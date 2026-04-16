import React, { useEffect, useState, useRef } from "react";

import hometwo from "../../assets/homepage/hometwo.jpg";
import homethree from "../../assets/homepage/hometen.png";
import homefour from "../../assets/homepage/homefour.jpg";
import welcomeWedding from "../../assets/homepage/welcomeToWedding.jpeg";

const slides = [
  { image: welcomeWedding, title: "Unforgettable", subtitle: "Charm & Adventure" },
  { image: hometwo, title: "Luxury Escape", subtitle: "Peace, Beauty & Comfort" },
  { image: homethree, title: "Elegant Stays", subtitle: "Timeless Hospitality" },
  { image: homefour, title: "Memorable Moments", subtitle: "Where Dreams Feel Real" },
];

export default function Wellcom() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, []);

  const startAutoPlay = () => {
    stopAutoPlay(); // clear any existing interval
    intervalRef.current = setInterval(() => {
      setCurrent((p) => (p + 1) % slides.length);
    }, 2500);
  };

  const stopAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const goPrev = () => {
    stopAutoPlay();
    setCurrent((p) => (p - 1 + slides.length) % slides.length);
    startAutoPlay();
  };

  const goNext = () => {
    stopAutoPlay();
    setCurrent((p) => (p + 1) % slides.length);
    startAutoPlay();
  };

  const goToSlide = (i) => {
    stopAutoPlay();
    setCurrent(i);
    startAutoPlay();
  };

  return (
    <section className="relative h-[85vh] overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute inset-0">
        {slides.map((s, i) => (
          <div
            key={s.image}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              i === current ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${s.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ))}
      </div>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/30" />

      {/* CONTENT */}
      <div className="relative z-10 flex h-full items-center justify-center px-5 text-center">
        <div key={current} className="animate-[fadeUp_1s_ease]">
          <h1 className="text-[30px] sm:text-[40px] md:text-[50px] font-light text-white leading-[1.05]">
            {slides[current].title}
          </h1>
          <p className="mt-3 text-[10px] sm:text-[15px] md:text-[20px] tracking-[0.2em] text-white/90 uppercase">
            {slides[current].subtitle}
          </p>
        </div>
      </div>

      {/* ARROWS */}
      <button
        onClick={goPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-black/30 text-white flex items-center justify-center"
      >
        ‹
      </button>

      <button
        onClick={goNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-black/30 text-white flex items-center justify-center"
      >
        ›
      </button>

      {/* DOTS */}
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={`h-2 w-2 rounded-full transition ${
              i === current ? "bg-white scale-110" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

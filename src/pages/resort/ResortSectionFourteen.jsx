import React, { useEffect, useRef, useState } from "react";

import sauna1 from "../../assets/homepage/massage-sauna/massage-one.jpg";
import sauna2 from "../../assets/homepage/massage-sauna/massage-two.jpg";
import sauna3 from "../../assets/homepage/massage-sauna/massage-three.jpg";

export default function ResortSectionFourteen() {
  const sectionRef = useRef(null);
  const [show, setShow] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [sauna1, sauna2, sauna3];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShow(true);
      },
      { threshold: 0.25 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((p) => (p + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden flex items-center bg-black"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      {/* Images */}
      {images.map((img, i) => (
        <img
          key={i}
          src={img}
          alt="Sauna experience"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            i === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* content */}
      <div
        className={`relative z-10 max-w-[420px] px-4 transition-all duration-700 ${
          show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <p className="text-[#d6b38a] text-[12px] md:text-[13px] font-medium">
          Sauna & Massage Experience
        </p>

        <h2 className="mt-2 text-white font-light leading-[1.2] text-[22px] md:text-[28px] lg:text-[32px]">
          Relax.<br />Restore.<br />Rebalance.
        </h2>

        <p className="mt-3 text-white/75 text-[12px] md:text-[14px] leading-[1.5]">
          Step into calm where warmth and silence reset your body and mind.
          Designed to reduce stress and restore balance.
        </p>

        {/* dots */}
        <div className="mt-5 flex justify-center gap-2">
          {images.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentIndex ? "bg-white w-4" : "bg-white/40 w-2"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

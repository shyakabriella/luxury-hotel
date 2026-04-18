import React, { useEffect, useRef, useState } from "react";

import bar1 from "../../assets/homepage/resto-bar/res-bar-one.jpg";
import bar2 from "../../assets/homepage/resto-bar/res-bar-two.jpg";
import bar3 from "../../assets/homepage/resto-bar/res-bar-three.jpg";
import bar4 from "../../assets/homepage/resto-bar/res-bar-four.jpg";
import bar5 from "../../assets/homepage/resto-bar/res-bar-five.jpg";
import bar6 from "../../assets/homepage/resto-bar/res-bar-six.png";
import bar7 from "../../assets/homepage/resto-bar/res-bar-seven.jpg";
import bar8 from "../../assets/homepage/resto-bar/res-bar-eight.jpg";
import bar9 from "../../assets/homepage/resto-bar/res-bar-nine.png";
import bar10 from "../../assets/homepage/resto-bar/res-bar-ten.png";
import bar11 from "../../assets/homepage/resto-bar/res-bar-eleven.png";
import bar12 from "../../assets/homepage/resto-bar/res-bar-twelve.png";
import bar13 from "../../assets/homepage/resto-bar/res-bar-thirteen.jpg";
import bar14 from "../../assets/homepage/resto-bar/res-bar-fourteen.jpg";

export default function ResortSectionThirteen() {
  const sectionRef = useRef(null);
  const [show, setShow] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    bar1, bar2, bar6, bar7, bar3, bar8, bar9,
    bar5, bar10, bar11, bar12, bar13, bar4, bar14,
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShow(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((p) => (p + 1) % images.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const next = () => setCurrentIndex((p) => (p + 1) % images.length);
  const prev = () => setCurrentIndex((p) => (p - 1 + images.length) % images.length);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white py-8 md:py-10 overflow-hidden"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <div className="mx-auto max-w-[950px] px-5 md:px-8">

        {/* TEXT */}
        <div
          className={`text-center mb-8 transition-all duration-700 ${
            show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="text-[12px] md:text-[13px] text-[#b08a5a] font-medium">
            Restaurant & Bar Experience
          </p>

          <h2 className="mt-2 text-[20px] md:text-[24px] lg:text-[28px] font-light leading-[1.2] text-[#1f3d3f]">
            Taste. <span className="text-[#b08a5a]">Sip.</span> Enjoy.
          </h2>

          <p className="mt-3 max-w-[480px] mx-auto text-[12px] md:text-[14px] leading-[1.5] text-[#2d3b3c]">
            Crafted cocktails, gourmet dishes, and a relaxed atmosphere designed
            to elevate every evening.
          </p>
        </div>

        {/* SLIDER */}
        <div
          className={`relative mx-auto max-w-[650px] h-[220px] sm:h-[260px] md:h-[300px] lg:h-[340px] rounded-xl overflow-hidden shadow-md transition-all duration-700 ${
            show ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt="Bar experience"
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                i === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}

          <div className="absolute inset-0 bg-black/20" />

          {/* controls */}
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full bg-white/70 text-[#1f3d3f] text-sm"
          >
            ←
          </button>

          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full bg-white/70 text-[#1f3d3f] text-sm"
          >
            →
          </button>

          {/* counter */}
          <div className="absolute bottom-2 right-2 bg-white/80 px-2 py-1 text-[11px] rounded-full text-[#1f3d3f]">
            {currentIndex + 1} / {images.length}
          </div>
        </div>

      </div>
    </section>
  );
}

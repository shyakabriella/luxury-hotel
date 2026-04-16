import React, { useEffect, useRef, useState } from "react";

import kidsOne from "../../assets/homepage/children/children-one.png";
import kidsTwo from "../../assets/homepage/children/children-two.png";
import kidsThree from "../../assets/homepage/children/children-three.png";
import kidsFour from "../../assets/homepage/children/children-five.jpg";
import kidsFive from "../../assets/homepage/children/children-five.png";

export default function ResortSectionTwelve() {
  const sectionRef = useRef(null);
  const [show, setShow] = useState(false);

  const images = [kidsOne, kidsTwo, kidsThree, kidsFour, kidsFive];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShow(true);
      },
      { threshold: 0.2 }
    );
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((p) => (p + 1) % images.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#efeee8] py-8 md:py-10 overflow-hidden"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <div className="mx-auto max-w-[950px] px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

          {/* IMAGE */}
          <div
            className={`transition-all duration-700 ${
              show ? "opacity-100 translate-x-0" : "translate-x-8 opacity-0"
            }`}
          >
            <div className="relative h-[200px] sm:h-[240px] md:h-[280px] lg:h-[320px] overflow-hidden rounded-xl shadow-md">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="Kids leisure"
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
                    i === currentIndex ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          </div>

          {/* TEXT */}
          <div
            className={`transition-all duration-700 flex flex-col items-center text-center ${
              show ? "opacity-100 translate-x-0" : "-translate-x-8 opacity-0"
            }`}
          >
            <p className="text-[12px] md:text-[13px] font-medium text-[#b08a5a]">
              Family Experience & Kids Zone
            </p>

            <h2 className="mt-2 text-[20px] md:text-[24px] lg:text-[28px] font-light leading-[1.2] text-[#1f3d3f]">
              Where Joy Comes Alive
            </h2>

            <p className="mt-3 text-[12px] md:text-[14px] leading-[1.5] text-[#2d3b3c] max-w-[420px]">
              A safe, engaging space where kids explore, play, and create
              memories while families relax with peace of mind.
            </p>

            {/* tags */}
            <div className="mt-5 flex flex-wrap justify-center gap-2 text-[11px] md:text-[12px]">
              {["Safe Play", "Creative Fun", "Indoor & Outdoor", "Family Friendly"].map((item) => (
                <span
                  key={item}
                  className="px-2 py-1 bg-white/50 border border-[#e7dccb] rounded-full text-[#3b3b3b]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

import React, { useEffect, useRef, useState } from "react";

import gymOne from "../../assets/homepage/gym/gym-one.jpg";
import gymTwo from "../../assets/homepage/gym/gym-two.jpg";
import gymThree from "../../assets/homepage/gym/gym-three.jpg";
import gymFour from "../../assets/homepage/gym/gym-four.jpg";

export default function ResortSectionNine() {
  const sectionRef = useRef(null);
  const [show, setShow] = useState(false);

  const images = [gymOne, gymTwo, gymThree, gymFour];
  const [currentIndex, setCurrentIndex] = useState(0);

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
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full overflow-hidden bg-[#efeee8] py-8 md:py-10"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <div className="mx-auto grid max-w-[1000px] grid-cols-1 items-center gap-6 px-5 sm:px-6 md:px-8 lg:grid-cols-2 lg:gap-10">

        {/* TEXT */}
        <div
          className={`flex flex-col items-center text-center transition-all duration-700 ${
            show ? "opacity-100 translate-x-0" : "-translate-x-8 opacity-0"
          }`}
        >
          <p className="text-[13px] md:text-[14px] font-medium text-[#a17d5a]">
            Fitness Center & Wellness Zone
          </p>

          <h2 className="mt-2 text-[18px] md:text-[20px] lg:text-[24px] font-light leading-[1.2] text-[#1f3d3f]">
            Train Hard Stay Strong
          </h2>

          <p className="mt-3 text-[12px] md:text-[14px] leading-[1.5] text-[#2d3b3c] max-w-[420px]">
            Stay active in a fully equipped fitness space with modern machines,
            strength zones, and cardio areas designed for balance and focus.
          </p>
        </div>

        {/* IMAGE */}
        <div
          className={`flex justify-center transition-all duration-700 ${
            show ? "opacity-100 translate-x-0" : "translate-x-8 opacity-0"
          }`}
        >
          <div className="relative w-full max-w-[400px] h-[200px] sm:h-[240px] md:h-[280px] lg:h-[320px] overflow-hidden rounded-lg shadow-md">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="Gym training"
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
                  i === currentIndex ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
            <div className="absolute inset-0 bg-black/30" />
          </div>
        </div>

      </div>
    </section>
  );
}

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
      setCurrentIndex((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }, 2500);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[80vh] md:h-[90vh] overflow-hidden flex items-center bg-black"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >

      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt="Sauna experience"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      <div className="absolute inset-0 bg-black/50"></div>

      <div
        className={`relative z-10 max-w-[700px] px-6 md:px-16 transition-all duration-1000 ${
          show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <p className="text-[#d6b38a] text-[15px] md:text-[17px] font-medium">
          Sauna & Massage Experience
        </p>

        <h2 className="mt-4 text-white font-light leading-[1.05] text-[42px] md:text-[70px] lg:text-[85px]">
          Relax.
          <br />
          Restore.
          <br />
          Rebalance.
        </h2>

        <p className="mt-6 text-white/80 text-[16px] md:text-[18px] leading-[1.8]">
          Step into a world of calm where warmth, silence, and relaxation
          redefine your wellness journey. Our sauna and massage facilities
          are designed to relieve stress, improve circulation, and bring your
          body and mind back into perfect balance.
        </p>

        <div className="mt-8 flex gap-2">
          {images.map((_, i) => (
            <div
              key={i}
              className={`h-2 w-2 rounded-full transition-all ${
                i === currentIndex ? "bg-white w-6" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

    </section>
  );
}
import React, { useEffect, useRef, useState } from "react";

import bar1 from "../../assets/homepage/resto-bar/res-bar-one.JPG";
import bar2 from "../../assets/homepage/resto-bar/res-bar-two.JPG";
import bar3 from "../../assets/homepage/resto-bar/res-bar-three.JPG";
import bar4 from "../../assets/homepage/resto-bar/res-bar-four.JPG";
import bar5 from "../../assets/homepage/resto-bar/res-bar-five.JPG";
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
    bar1,
    bar2,
    bar6,
    bar7,
    bar3,
    bar8,
    bar9,
    bar5,
    bar10,
    bar11,
    bar12,
    bar13,
    bar4,
    bar14,
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShow(true);
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 2000);

    return () => clearInterval(interval);
  }, [images.length]);

  const next = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white py-10 md:py-15 overflow-hidden"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-10 lg:px-16">
        <div
          className={`text-center mb-12 transition-all duration-1000 ease-out ${
            show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-[#b08a5a] font-medium text-[15px] md:text-[17px]">
            Restaurant & Bar Experience
          </p>

          <h2 className="mt-4 text-[#1f3d3f] font-light leading-[1.05] text-[42px] md:text-[64px] lg:text-[78px]">
            Taste.
            <br />
            Sip.
            <br />
            Enjoy.
          </h2>

          <p className="mt-6 text-[#2d3b3c] max-w-[700px] mx-auto text-[16px] md:text-[18px] leading-[1.8]">
            Indulge in a refined dining and bar experience where flavor meets
            atmosphere. From crafted cocktails to gourmet dishes, every moment
            is designed to elevate your evenings into unforgettable experiences.
          </p>
        </div>

        <div
          className={`relative w-full max-w-[900px] mx-auto h-[450px] md:h-[550px] rounded-3xl overflow-hidden shadow-2xl transition-all duration-1000 ${
            show ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="Bar experience"
              className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}

          <div className="absolute inset-0 bg-black/25"></div>

          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-[#1f3d3f] p-3 rounded-full shadow"
          >
            ◀
          </button>

          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-[#1f3d3f] p-3 rounded-full shadow"
          >
            ▶
          </button>

          <div className="absolute bottom-4 right-4 bg-white/80 px-4 py-2 rounded-full text-sm text-[#1f3d3f]">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      </div>
    </section>
  );
}

// Children Leisure

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
    }, 2500);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#efeee8] py-10 md:py-14 lg:py-18 overflow-hidden"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 lg:grid-cols-2 gap-12 items-center px-6 md:px-10 lg:px-16">
        <div
          className={`transition-all duration-1000 ease-out ${
            show ? "opacity-100 translate-x-0" : "opacity-0 translate-x-16"
          }`}
        >
          <div className="relative w-full max-w-[560px] h-[320px] sm:h-[380px] md:h-[450px] lg:h-[520px] overflow-hidden rounded-3xl shadow-xl">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="Kids leisure"
                className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
                  index === currentIndex ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          </div>

          <p className="text-center mt-4 text-sm text-[#6b6b6b]">
            Safe • Fun • Creative • Memorable
          </p>
        </div>
        <div
          className={`transition-all duration-1000 ease-out ${
            show ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-16"
          }`}
        >
          <p className="text-[#b08a5a] font-medium text-[15px] md:text-[17px]">
            Family Experience
            <br />& Kids Leisure Zone
          </p>

          <h2 className="mt-4 text-[#1f3d3f] font-light leading-[1] text-[42px] md:text-[64px] lg:text-[78px]">
            Where Joy
            <br />
            Comes Alive
          </h2>

          <p className="mt-6 text-[#2d3b3c] text-[16px] md:text-[18px] leading-[1.8]">
            Designed to bring smiles, laughter, and unforgettable memories, our
            Children’s Leisure Zone offers a safe and engaging environment where
            kids can explore freely while families enjoy complete peace of mind.
            From interactive play areas to creative activities and fun-filled
            experiences, every moment is crafted to inspire joy, imagination,
            and connection.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {[
              "Safe Play Areas",
              "Creative Activities",
              "Indoor & Outdoor Fun",
              "Family Friendly",
            ].map((item, i) => (
              <span
                key={i}
                className="px-4 py-2 bg-white/60 border border-[#e7dccb] rounded-full text-sm text-[#3b3b3b]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

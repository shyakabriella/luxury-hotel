import React, { useEffect, useRef, useState } from "react";

import parkingImgOne from "../../assets/homepage/parking/parking-one.JPG";
import parkingImgTwo from "../../assets/homepage/parking/parking-two.png";

export default function ResortSectionTen() {
  const sectionRef = useRef(null);
  const [show, setShow] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const images = [parkingImgOne, parkingImgTwo];

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
      setCurrentImage((p) => (p + 1) % images.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="parking"
      ref={sectionRef}
      className="w-full bg-[#efeee8] py-8 md:py-10 overflow-hidden"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <div className="mx-auto max-w-[950px] px-5 md:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">

          {/* IMAGE */}
          <div
            className={`transition-all duration-700 ${
              show ? "opacity-100 translate-x-0" : "-translate-x-8 opacity-0"
            }`}
          >
            <div className="relative h-[200px] sm:h-[260px] md:h-[300px] lg:h-[340px] overflow-hidden rounded-xl shadow-md">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="Parking area"
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
                    i === currentImage ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
              <div className="absolute inset-0 bg-black/25" />
              <div className="absolute bottom-2 left-2 bg-white/85 px-2 py-1 text-[11px] text-[#1f3d3f] rounded-full">
                Secure Parking
              </div>
            </div>
          </div>

          {/* TEXT */}
          <div
            className={`flex flex-col items-center text-center transition-all duration-700 ${
              show ? "opacity-100 translate-x-0" : "translate-x-8 opacity-0"
            }`}
          >
            <p className="text-[12px] md:text-[13px] font-medium text-[#b08a5a]">
              Parking Facilities
            </p>

            <h2 className="mt-2 text-[18px] md:text-[22px] lg:text-[26px] font-light leading-[1.2] text-[#1f3d3f]">
              Safe Space For Your Journey
            </h2>

            <p className="mt-3 text-[12px] md:text-[14px] leading-[1.5] text-[#2d3b3c] max-w-[420px]">
              Secure, spacious parking designed for convenience and peace of mind
              with easy access and 24/7 safety monitoring.
            </p>

            {/* feature chips */}
            <div className="mt-5 grid grid-cols-2 gap-2 text-[11px] md:text-[12px] text-[#3b3b3b] max-w-[320px]">
              <div className="bg-white/50 border border-[#e7dccb] px-2 py-1.5 rounded-lg">🔒 24/7 Security</div>
              <div className="bg-white/50 border border-[#e7dccb] px-2 py-1.5 rounded-lg">🚗 Easy Access</div>
              <div className="bg-white/50 border border-[#e7dccb] px-2 py-1.5 rounded-lg">💡 Well Lit</div>
              <div className="bg-white/50 border border-[#e7dccb] px-2 py-1.5 rounded-lg">📍 Near Entrance</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

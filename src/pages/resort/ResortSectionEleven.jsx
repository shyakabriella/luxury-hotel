import React, { useEffect, useRef, useState } from "react";

import poolOne from "../../assets/homepage/pool/pool-1.jpeg";
import poolTwo from "../../assets/homepage/pool/pool-2.jpeg";

export default function ResortSectionEleven() {
  const sectionRef = useRef(null);
  const [show, setShow] = useState(false);

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

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#efeee8] py-8 md:py-10 overflow-hidden"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <div className="mx-auto max-w-[950px] px-4 md:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8">

          {/* Text */}
          <div
            className={`transition-all duration-700 ease-out flex flex-col items-center text-center ${
              show ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <p className="text-[#b08a5a] font-medium text-[12px] md:text-[13px]">
              Infinity Pool Experience
            </p>

            <h2 className="mt-2 text-[#1f3d3f] font-light leading-[1.2] text-[20px] md:text-[24px] lg:text-[28px]">
              Relax. <span className="text-[#b08a5a]">Refresh.</span> Repeat.
            </h2>

            <p className="mt-3 text-[#2d3b3c] text-[12px] md:text-[14px] leading-[1.5] max-w-[420px]">
              Unwind in our swimming pool area where luxury meets calm. Take a swim,
              enjoy the sunset, or just chill by the water — pure resort energy.
            </p>
          </div>

          {/* Images */}
          <div
            className={`flex justify-center transition-all duration-700 ease-out ${
              show ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="relative w-full max-w-[360px] h-[220px] sm:h-[260px] md:h-[300px] lg:h-[340px]">
              <div className="absolute top-4 left-4 w-full h-full rounded-xl overflow-hidden shadow-md rotate-[-3deg] z-0">
                <img
                  src={poolTwo}
                  alt="Pool view 2"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-0 left-0 w-full h-full rounded-xl overflow-hidden shadow-lg z-10">
                <img
                  src={poolOne}
                  alt="Pool view 1"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

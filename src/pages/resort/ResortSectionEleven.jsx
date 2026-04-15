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
      className="w-full bg-[#efeee8] py-16 md:py-24 overflow-hidden"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-10 lg:px-16">

        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-14">

          <div
            className={`transition-all duration-1000 ease-out ${
              show ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-16"
            }`}
          >
            <p className="text-[#b08a5a] font-medium text-[15px] md:text-[17px]">
              Infinity Pool Experience
            </p>

            <h2 className="mt-4 text-[#1f3d3f] font-light leading-[1.05] text-[42px] md:text-[64px] lg:text-[78px]">
              Relax.
              <br />
              Refresh.
              <br />
              Repeat.
            </h2>

            <p className="mt-6 text-[#2d3b3c] text-[16px] md:text-[18px] leading-[1.8]">
              Unwind in our beautifully designed swimming pool area where luxury
              meets tranquility. Whether you're taking a refreshing morning swim,
              enjoying a sunset dip, or simply relaxing by the water, the space
              is designed to bring calmness, comfort, and a true resort feeling.
            </p>
          </div>

          <div
            className={`flex justify-center transition-all duration-1000 ease-out ${
              show ? "opacity-100 translate-x-0" : "opacity-0 translate-x-16"
            }`}
          >
            <div className="relative w-full max-w-[520px] h-[420px] md:h-[520px]">

              <div className="absolute top-10 left-10 w-full h-full rounded-3xl overflow-hidden shadow-lg rotate-[-4deg] z-0">
                <img
                  src={poolTwo}
                  alt="Pool view 2"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute top-0 left-0 w-full h-full rounded-3xl overflow-hidden shadow-2xl z-10">
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
import React, { useEffect, useRef, useState } from "react";
import homefive from "../../assets/homepage/homefive.jpg";

export default function ResortSectionTwo() {
  const sectionRef = useRef(null);
  const [show, setShow] = useState(false);

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

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#efeee8] py-12 md:py-16 lg:py-18 overflow-hidden"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <div className="mx-auto max-w-[1100px] px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center text-center">

          {/* IMAGE */}
          <div
            className={`transition-all duration-700 flex justify-center ${
              show ? "opacity-100 translate-x-0" : "-translate-x-10 opacity-0"
            }`}
          >
            <img
              src={homefive}
              alt="Resort view"
              className="h-[250px] sm:h-[270px] md:h-[340px] lg:h-[390px] w-full object-cover rounded-md shadow-md"
            />
          </div>

          {/* TEXT */}
          <div
            className={`transition-all duration-700 flex flex-col items-center ${
              show ? "opacity-100 translate-x-0" : "translate-x-10 opacity-0"
            }`}
          >
            <p className="text-[13px] md:text-[15px] font-medium text-[#a17d5a]">
              Luxury Apartments & Conference Center
            </p>

            <h2 className="mt-3 text-[20px] md:text-[22px] lg:text-[27px] font-light leading-[1.2] text-[#1f3d3f]">
              Escape The Ordinary
            </h2>

            <p className="mt-4 text-[14px] md:text-[16px] leading-[1.6] text-[#2d3b3c] max-w-[520px]">
              Modern luxury living with calm surroundings, thoughtful design,
              and everyday comfort in a prime location.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

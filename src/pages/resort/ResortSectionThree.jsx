import React, { useEffect, useRef, useState } from "react";
import homeone from "../../assets/homepage/homeone.png";

export default function ResortSectionThree() {
  const sectionRef = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShow(true);
      },
      { threshold: 0.2 },
    );

    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#efeee8] py-12 md:py-16 overflow-hidden"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center justify-center text-center">
          {/* TEXT */}
          <div
            className={`transition-all duration-700 flex flex-col items-center ${
              show ? "opacity-100 translate-x-0" : "-translate-x-10 opacity-0"
            }`}
          >
            <p className="text-[13px] md:text-[15px] font-medium text-[#a17d5a]">
              On-Site Adventures
            </p>

            <h2 className="mt-3 text-[20px] md:text-[22px] lg:text-[27px] font-light leading-[1.2] text-[#1f3d3f]">
              Endless Activities
            </h2>

            <p className="mt-4 text-[14px] md:text-[16px] leading-[1.7] text-[#2d3b3c] max-w-[520px]">
              Experience a refined lifestyle with modern spaces, premium
              amenities, and curated activities designed for comfort and
              relaxation.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 justify-center">
              {/* Card 1 */}
              <div className="rounded-xl bg-white shadow-md hover:shadow-lg transition transform hover:-translate-y-1 p-6 flex items-center justify-center">
                <span className="text-[#1f3435] text-[15px] md:text-[16px] font-medium">
                  Seasonal Specials
                </span>
              </div>

              {/* Card 2 */}
              <div className="rounded-xl bg-white shadow-md hover:shadow-lg transition transform hover:-translate-y-1 p-6 flex items-center justify-center">
                <span className="text-[#1f3435] text-[15px] md:text-[16px] font-medium">
                  Discover exclusive offers
                </span>
              </div>
            </div>
          </div>

          {/* IMAGE */}
          <div
            className={`relative flex justify-center transition-all duration-700 ${
              show ? "opacity-100 translate-x-0" : "translate-x-10 opacity-0"
            }`}
          >
            <img
              src={homeone}
              alt="Resort activities"
              className="h-[250px] sm:h-[270px] md:h-[340px] lg:h-[390px] object-cover rounded-xl shadow-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

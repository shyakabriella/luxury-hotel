import React, { useEffect, useRef, useState } from "react";
import homenine from "../../assets/homepage/room.jpg";
import { Link } from "react-router-dom";

export default function ResortSectionFive() {
  const sectionRef = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const currentSection = sectionRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShow(true);
      },
      { threshold: 0.2 },
    );

    if (currentSection) observer.observe(currentSection);

    return () => {
      if (currentSection) observer.unobserve(currentSection);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#f4f2ed] py-10 md:py-14 lg:py-16"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-full lg:w-[55%] overflow-hidden">
        <img
          src="/home1.jpg"
          alt=""
          className="h-full w-full object-cover opacity-[0.1] grayscale"
        />
        <div className="absolute inset-0 bg-white/70" />
      </div>

      <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Text */}
          <div
            className={`transition-all duration-700 ease-out ${
              show ? "opacity-100 translate-x-0" : "-translate-x-10 opacity-0"
            }`}
          >
            <div className="max-w-[480px] mx-auto text-center flex flex-col items-center">
              <p className="text-[14px] md:text-[16px] font-medium text-[#a07d59]">
                Accommodations
              </p>

              <h2 className="mt-3 text-[20px] md:text-[22px] lg:text-[27px] font-light leading-[1.05] text-[#18393b]">
                Cozy Lodging
              </h2>

              <p className="mt-4 text-[14px] md:text-[16px] leading-[1.7] text-[#354344]">
                From cottages to hotel rooms, enjoy a calm stay with modern
                essentials like br Wi-Fi and in-room coffee service.
              </p>

              <Link to={'https://direct-book.com/properties/luxurygardenpalace'} target="_blank" className="mt-6 rounded-md inline-flex items-center justify-center bg-[#1f3435] px-6 py-3 text-[14px] md:text-[15px] text-white transition hover:opacity-90">
                View More
              </Link>
            </div>
          </div>

          {/* Image */}
          <div
            className={`transition-all duration-700 ease-out ${
              show ? "opacity-100 translate-x-0" : "translate-x-10 opacity-0"
            }`}
          >
            <div className="mx-auto w-full max-w-[600px] overflow-hidden shadow-md">
              <img
                src={homenine}
                alt="Cozy lodging room"
                className="h-[180px] sm:h-[220px] md:h-[260px] lg:h-[300px] rounded-md w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React, { useEffect, useRef, useState } from "react";

export default function ResortSectionFive() {
  const sectionRef = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const currentSection = sectionRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
        }
      },
      { threshold: 0.2 }
    );

    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#f4f2ed] py-14 md:py-20 lg:py-24"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      {/* Faded background image on left */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-full lg:w-[62%] overflow-hidden">
        <img
          src="/home1.jpg"
          alt="Accommodations background"
          className="h-full w-full object-cover opacity-[0.13] grayscale"
        />
        <div className="absolute inset-0 bg-white/65" />
      </div>

      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-6 md:px-10 lg:px-14 xl:px-20">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14 xl:gap-20">
          {/* Left content */}
          <div
            className={`relative z-10 transition-all duration-1000 ease-out ${
              show ? "translate-x-0 opacity-100" : "-translate-x-16 opacity-0"
            }`}
          >
            <div className="mx-auto max-w-[520px] text-center lg:mx-0 lg:text-left">
              <p className="text-[18px] font-medium text-[#a07d59] sm:text-[20px] md:text-[22px]">
                Accommodations
              </p>

              <h2 className="mt-5 text-[46px] font-light leading-[0.98] tracking-[-0.03em] text-[#18393b] sm:text-[58px] md:text-[70px] lg:text-[78px] xl:text-[84px]">
                Cozy Lodging
              </h2>

              <p className="mt-7 text-[17px] leading-[1.9] text-[#354344] sm:text-[18px] md:text-[19px]">
                From homelike cottages to resort-style hotel rooms, our resort
                offers classic accommodations for every guest. Settle into a
                traditional living space with all the thoughtful guest
                amenities, including complimentary Wi-Fi and in-room coffee
                service.
              </p>

              <button className="mt-9 inline-flex min-w-[210px] items-center justify-center bg-[#1f3435] px-8 py-4 text-[18px] font-normal text-white transition duration-300 hover:opacity-90">
                Learn More
              </button>
            </div>
          </div>

          {/* Right image */}
          <div
            className={`relative transition-all duration-1000 ease-out ${
              show ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
            }`}
          >
            <div className="mx-auto w-full max-w-[900px] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
              <img
                src="/home4.jpg"
                alt="Cozy lodging room"
                className="h-[280px] w-full object-cover sm:h-[360px] md:h-[460px] lg:h-[540px] xl:h-[600px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
import React, { useEffect, useRef, useState } from "react";
import homeeight from "../../assets/homepage/homeseven.jpg";

function TreeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-7 w-7 md:h-9 md:w-9"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2c-1.6 0-2.8 1.3-2.8 2.8 0 .2 0 .5.1.7-2.2.3-3.8 2.2-3.8 4.4 0 .6.1 1.1.3 1.6-1.8.5-3.1 2.1-3.1 4.1 0 2.4 1.9 4.3 4.3 4.3h3.7V22h2.6v-2.9h3.7c2.4 0 4.3-1.9 4.3-4.3 0-1.9-1.3-3.6-3.1-4.1.2-.5.3-1 .3-1.6 0-2.2-1.6-4.1-3.8-4.4.1-.2.1-.5.1-.7C14.8 3.3 13.6 2 12 2Z" />
    </svg>
  );
}

export default function ResortSectionSeven() {
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
      className="w-full overflow-hidden bg-[#efeee8] py-10 md:py-14 lg:py-16"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6 md:px-8 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* IMAGE */}
          <div
            className={`relative transition-all duration-700 ${
              show ? "opacity-100 translate-x-0" : "-translate-x-10 opacity-0"
            }`}
          >
            <img
              src={homeeight}
              alt="Resort landscape"
              className="h-[180px] w-full rounded-md object-cover sm:h-[240px] md:h-[300px] lg:h-[340px]"
            />
            
          </div>

          {/* CONTENT */}
          <div
            className={`transition-all duration-700 flex items-center justify-center ${
              show ? "opacity-100 translate-x-0" : "translate-x-10 opacity-0"
            }`}
          >
            <div className="max-w-[480px] text-center">
              <p className="text-[13px] md:text-[15px] font-medium text-[#a17d5a]">
                Luxury
              </p>

              <h2 className="mt-3 text-[20px] md:text-[22px] lg:text-[27px] font-light leading-[1.05] text-[#1e3b3d]">
                The Lay Of The Land
              </h2>

              <p className="mt-4 text-[14px] md:text-[16px] leading-[1.7] text-[#334243]">
                Discover vibrant event spaces, outdoor stages, and elegant venues across a fully equipped luxury property designed for celebration, connection, and unforgettable experiences.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

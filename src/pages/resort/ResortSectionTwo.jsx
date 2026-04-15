import React, { useEffect, useRef, useState } from "react";
import homefive from "../../assets/homepage/homefive.jpg";

export default function ResortSectionTwo() {
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
      { threshold: 0.2 },
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
      className="w-full overflow-hidden bg-[#efeee8] py-16 md:py-20 lg:py-24"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-10 px-5 sm:px-6 md:px-10 lg:grid-cols-2 lg:gap-16 lg:px-16">
        {/* Left Image */}
        <div
          className={`flex justify-center transition-all duration-1000 ease-out lg:justify-start ${
            show ? "translate-x-0 opacity-100" : "-translate-x-16 opacity-0"
          }`}
        >
          <div className="w-full max-w-[540px] overflow-hidden rounded-sm">
            <img
              src={homefive}
              alt="Resort adventure"
              className="h-[300px] w-full object-cover sm:h-[360px] md:h-[420px] lg:h-[440px]"
            />
          </div>
        </div>

        {/* Right Content */}
        <div
          className={`max-w-[620px] text-center transition-all duration-1000 ease-out lg:text-left ${
            show ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
          }`}
        >
          <p className="text-[15px] font-medium leading-[1.6] text-[#a17d5a] sm:text-[16px] md:text-[18px]">
            Luxury Apartments
            <br />
            &amp; Conference Center
          </p>

          <h2 className="mt-4 text-[44px] font-light leading-[0.95] tracking-[-0.03em] text-[#1f3d3f] sm:text-[58px] md:mt-5 md:text-[72px] lg:text-[86px] xl:text-[92px]">
            Escape The
            <br />
            Ordinary
          </h2>

          <p className="mt-6 text-[17px] leading-[1.9] text-[#2d3b3c] sm:text-[18px] md:mt-8 md:text-[20px]">
            Blending peaceful surroundings with modern sophistication, our
            Luxury Apartments offer an exceptional living experience designed
            for comfort and style. Set in a prime location, these residences
            provide a perfect balance of privacy and accessibility, allowing
            residents to enjoy a calm atmosphere while staying connected to the
            city. With thoughtfully designed interiors, quality finishes, and a
            focus on everyday convenience, it’s a place where elevated living
            comes naturally.
          </p>
        </div>
      </div>
    </section>
  );
}

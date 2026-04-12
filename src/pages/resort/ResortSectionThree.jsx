import React, { useEffect, useRef, useState } from "react";
import homeone from "../../assets/homepage/homeone.png";

export default function ResortSectionThree() {
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
      className="w-full overflow-hidden bg-[#efeee8] pt-14 md:pt-20 lg:pt-24 pb-0"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Left content */}
          <div
            className={`flex items-center transition-all duration-1000 ease-out ${
              show ? "translate-x-0 opacity-100" : "-translate-x-16 opacity-0"
            }`}
          >
            <div className="w-full px-6 sm:px-8 md:px-12 lg:px-16 xl:px-24">
              <p className="text-[16px] font-medium leading-[1.5] text-[#a17d5a] sm:text-[18px] md:text-[20px]">
                On-Site Adventures
              </p>

              <h2 className="mt-5 text-[42px] font-light leading-[0.95] tracking-[-0.03em] text-[#1f3d3f] sm:text-[54px] md:text-[66px] lg:text-[76px] xl:text-[84px]">
                Endless
                <br />
                Activities
              </h2>

              <p className="mt-7 max-w-[620px] text-[17px] leading-[1.9] text-[#2d3b3c] sm:text-[18px] md:text-[19px] lg:text-[20px]">
                Step into a refined living experience with our Luxury
                Apartments. From modern interiors and spacious layouts to
                premium amenities and beautifully designed communal spaces,
                everything is crafted to elevate your everyday lifestyle.
                Whether you're relaxing at home or enjoying the surrounding
                environment, you’ll find comfort, style, and convenience at
                every turn.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:w-fit md:mt-10">
                <button className="min-w-[240px] bg-[#1f3435] px-8 py-4 text-[17px] font-normal text-white transition duration-300 hover:opacity-90 sm:min-w-[280px] sm:text-[19px]">
                  View Our Specials
                </button>

                <button className="min-w-[240px] bg-[#1f3435] px-8 py-4 text-[17px] font-normal text-white transition duration-300 hover:opacity-90 sm:min-w-[280px] sm:text-[19px]">
                  See All Activities
                </button>
              </div>
            </div>
          </div>

          {/* Right image */}
          <div
            className={`relative min-h-[320px] sm:min-h-[420px] md:min-h-[500px] lg:min-h-[620px] transition-all duration-1000 ease-out ${
              show ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
            }`}
          >
            <img
              src={homeone}
              alt="People enjoying horseback activities at the resort"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

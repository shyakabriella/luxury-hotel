import React, { useEffect, useRef, useState } from "react";

function TreeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-10 w-10 md:h-12 md:w-12"
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
        if (entry.isIntersecting) {
          setShow(true);
        }
      },
      { threshold: 0.18 }
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
      className="w-full overflow-hidden bg-[#efeee8] py-14 md:py-20 lg:py-24"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <div className="mx-auto max-w-[1600px] px-5 sm:px-6 md:px-10 lg:px-14 xl:px-20">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 xl:gap-20">
          {/* Left image */}
          <div
            className={`relative transition-all duration-1000 ease-out ${
              show ? "translate-x-0 opacity-100" : "-translate-x-16 opacity-0"
            }`}
          >
            <div className="mx-auto w-full max-w-[980px] overflow-hidden">
              <img
                src="/home1.jpg"
                alt="Resort landscape"
                className="h-[260px] w-full object-cover sm:h-[340px] md:h-[430px] lg:h-[520px]"
              />
            </div>

            {/* Overlapping round badge */}
            <div className="absolute right-[-14px] top-1/2 hidden -translate-y-1/2 lg:flex">
              <div className="flex h-[92px] w-[92px] items-center justify-center rounded-full bg-[#f6f5f0] text-[#213739] shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
                <TreeIcon />
              </div>
            </div>
          </div>

          {/* Right content */}
          <div
            className={`transition-all duration-1000 ease-out ${
              show ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
            }`}
          >
            <div className="mx-auto max-w-[560px] text-center lg:mx-0 lg:text-left">
              <p className="text-[18px] font-medium text-[#a17d5a] sm:text-[20px] md:text-[22px]">
                Location
              </p>

              <h2 className="mt-5 text-[42px] font-light leading-[0.95] tracking-[-0.03em] text-[#1e3b3d] sm:text-[56px] md:text-[70px] lg:text-[82px] xl:text-[90px]">
                The Lay
                <br />
                Of The Land
              </h2>

              <p className="mt-7 max-w-[520px] text-[17px] leading-[1.9] text-[#334243] sm:text-[18px] md:text-[19px]">
                Our one-of-a-kind property sets the scene for exceptional
                activities with state-of-the-art facilities. We invite you to
                explore sports courts, horseshoe pits, swimming pools, biking
                trails, a trampoline center, a paintball course, and so much
                more.
              </p>

              <button className="mt-9 inline-flex min-w-[160px] items-center justify-center bg-[#213739] px-8 py-4 text-[18px] font-normal text-white transition duration-300 hover:opacity-90">
                Explore
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
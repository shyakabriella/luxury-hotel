import React, { useEffect, useRef, useState } from "react";
import gymOne from "../../assets/homepage/gym/gym-one.jpeg";
import gymTwo from "../../assets/homepage/gym/gym-three.jpeg";
import gymThree from "../../assets/homepage/gym/gym-two.jpeg";
import gymFour from "../../assets/homepage/gym/gym-four.jpeg";

export default function ResortSectionNine() {
  const sectionRef = useRef(null);
  const [show, setShow] = useState(false);

  const images = [gymOne, gymTwo, gymThree, gymFour];
  const [currentIndex, setCurrentIndex] = useState(0);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section
      ref={sectionRef}
      className="w-full overflow-hidden bg-[#efeee8] py-10 md:py-15 lg:py-18"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-10 px-5 sm:px-6 md:px-10 lg:grid-cols-2 lg:gap-16 lg:px-16">
        <div
          className={`max-w-[620px] text-center transition-all duration-1000 ease-out lg:text-left ${
            show ? "translate-x-0 opacity-100" : "-translate-x-16 opacity-0"
          }`}
        >
          <p className="text-[15px] font-medium leading-[1.6] text-[#a17d5a] sm:text-[16px] md:text-[18px]">
            Fitness Center
            <br />
            &amp; Wellness Zone
          </p>

          <h2 className="mt-4 text-[44px] font-light leading-[0.95] tracking-[-0.03em] text-[#1f3d3f] sm:text-[58px] md:mt-5 md:text-[72px] lg:text-[86px] xl:text-[92px]">
            Train Hard
            <br />
            Stay Strong
          </h2>

          <p className="mt-6 text-[17px] leading-[1.9] text-[#2d3b3c] sm:text-[18px] md:mt-8 md:text-[20px]">
            Stay active in a fully equipped fitness space designed to complement a modern luxury living experience. Whether you prefer strength training, cardio sessions, or functional workouts, everything you need is right at your doorstep. With state-of-the-art equipment, spacious training areas, and a calm yet energizing atmosphere, it’s the perfect balance of wellness and comfort—helping you stay fit, focused, and connected to an elevated lifestyle.
          </p>
        </div>

        <div
          className={`flex justify-center transition-all duration-1000 ease-out lg:justify-end ${
            show ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
          }`}
        >
          <div className="relative w-full max-w-[540px] h-[300px] sm:h-[360px] md:h-[420px] lg:h-[440px] overflow-hidden rounded-2xl shadow-lg">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="Gym training"
                className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
                  index === currentIndex ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}

            <div className="absolute inset-0 bg-black/50"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

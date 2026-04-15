import React, { useEffect, useRef, useState } from "react";
import parkingImg from "../../assets/homepage/parking/parking-1.jpg";

export default function ResortSectionTen() {
  const sectionRef = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShow(true);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#efeee8] py-14 md:py-18 overflow-hidden"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-10 lg:px-16">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          <div
            className={`transition-all duration-1000 ease-out ${
              show ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-16"
            }`}
          >
            <div className="relative w-full h-[320px] sm:h-[420px] md:h-[500px] rounded-3xl overflow-hidden shadow-xl">

              <img
                src={parkingImg}
                alt="Parking area"
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-black/20"></div>

              <div className="absolute bottom-4 left-4 bg-white/80 px-4 py-2 rounded-full text-sm font-medium text-[#1f3d3f]">
                Secure & Spacious Parking
              </div>

            </div>
          </div>

          <div
            className={`transition-all duration-1000 ease-out ${
              show ? "opacity-100 translate-x-0" : "opacity-0 translate-x-16"
            }`}
          >
            <p className="text-[#b08a5a] font-medium text-[15px] md:text-[17px]">
              Secure Parking Facilities
            </p>

            <h2 className="mt-4 text-[#1f3d3f] font-light leading-[1.05] text-[42px] md:text-[64px] lg:text-[78px]">
              Safe Space
              <br />
              For Your Journey
            </h2>

            <p className="mt-6 text-[#2d3b3c] text-[16px] md:text-[18px] leading-[1.8]">
              Enjoy peace of mind with our spacious and secure parking
              facilities designed for convenience and safety. Whether you're
              staying with us for a short visit or an extended stay, your
              vehicle is protected in a well-lit, easily accessible environment
              with 24/7 monitoring and smooth entry and exit access.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3 text-sm text-[#3b3b3b]">
              <div className="bg-white/60 border border-[#e7dccb] p-3 rounded-xl">
                🔒 24/7 Security
              </div>
              <div className="bg-white/60 border border-[#e7dccb] p-3 rounded-xl">
                🚗 Easy Access
              </div>
              <div className="bg-white/60 border border-[#e7dccb] p-3 rounded-xl">
                💡 Well Lit Area
              </div>
              <div className="bg-white/60 border border-[#e7dccb] p-3 rounded-xl">
                📍 Close to Entrance
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
import React, { useEffect, useState } from "react";

import resOne from "../../assets/homepage/resto-bar/res-bar-one.jpg";
import resTwo from "../../assets/homepage/resto-bar/res-bar-six.png";
import resThree from "../../assets/homepage/resto-bar/res-bar-three.jpg";

import barOne from "../../assets/homepage/resto-bar/res-bar-one.jpg";
import barTwo from "../../assets/homepage/resto-bar/res-bar-thirteen.jpg";
import barThree from "../../assets/homepage/resto-bar/res-bar-fourteen.jpg";

import cafeOne from "../../assets/homepage/resto-bar/res-bar-five.jpg";
import cafeThree from "../../assets/homepage/resto-bar/res-bar-eleven.png";
import cafeTwo from "../../assets/homepage/resto-bar/res-bar-fourteen.jpg";

// HERO
const restaurantHero =
  "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba";

// RESTAURANT SLIDES
const restaurantImages = [
  resOne,
  resTwo,
  resThree,
];

// BAR SLIDES
const barImages = [
  barOne,
  barTwo,
  barThree,
];

// CAFE SLIDES
const cafeImages = [
  cafeOne,
  cafeThree,
  cafeTwo,
];

export default function Restaurant() {
  const [restoIndex, setRestoIndex] = useState(0);
  const [barIndex, setBarIndex] = useState(0);
  const [cafeIndex, setCafeIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRestoIndex((p) => (p + 1) % restaurantImages.length);
      setBarIndex((p) => (p + 1) % barImages.length);
      setCafeIndex((p) => (p + 1) % cafeImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const imgClass =
    "w-full h-[240px] sm:h-[280px] object-cover transition-all duration-700 ease-in-out hover:scale-110";

  const imgWrapper = "overflow-hidden rounded-md";

  return (
    <div
      className="w-full overflow-hidden bg-[#f3f2ed] text-[#1c1c1c]"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      {/* HERO */}
      <section className="relative h-[75vh] md:h-screen overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${restaurantHero})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 flex h-full items-center justify-center text-center px-4">
          <div>
            <h1 className="text-[30px] md:text-[44px] font-light text-white">
              Dining & Lounge
            </h1>
            <p className="mt-3 text-[12px] tracking-[0.2em] text-white/90 uppercase">
              Restaurant • Bar • Café Experience
            </p>
          </div>
        </div>
      </section>

      {/* RESTAURANT */}
      <section className="max-w-[1100px] mx-auto px-6 py-16">
        <h2 className="text-center text-[28px] text-[#203549]">
          Restaurant
        </h2>

        <div className="mt-8 grid md:grid-cols-2 gap-8 items-center">
          <div className={imgWrapper}>
            <img
              src={restaurantImages[restoIndex]}
              className={imgClass}
              alt="restaurant"
            />
          </div>

          <p className="text-[13px] leading-[1.7] text-[#444]">
            Fine dining experience with international and local cuisine crafted
            by expert chefs in a calm luxury environment.
          </p>
        </div>
      </section>

      {/* BAR */}
      <section className="bg-[#fbfbfb] py-16">
        <div className="max-w-[1100px] mx-auto px-6">
          <h2 className="text-center text-[28px] text-[#203549]">
            Bar & Lounge
          </h2>

          <div className="mt-8 grid md:grid-cols-2 gap-8 items-center">
            <div className={imgWrapper}>
              <img
                src={barImages[barIndex]}
                className={imgClass}
                alt="bar"
              />
            </div>

            <div>
              <p className="text-[13px] leading-[1.7] text-[#444]">
                Premium cocktails, wines, and spirits served in a stylish
                evening atmosphere.
              </p>

              <p className="mt-4 text-[13px] text-[#333]">
                <span className="font-medium text-[#203549]">
                  Driver Option:
                </span>{" "}
                We can arrange safe transport after alcohol service upon request.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CAFE */}
      <section className="max-w-[1100px] mx-auto px-6 py-16">
        <h2 className="text-center text-[28px] text-[#203549]">
          Café
        </h2>

        <div className="mt-8 grid md:grid-cols-2 gap-8 items-center">
          <p className="text-[13px] leading-[1.7] text-[#444] order-2 md:order-1">
            Relaxed daytime café offering coffee, pastries, fresh juices, and
            light bites — perfect for meetings or chill breaks.
          </p>

          <div className={`order-1 md:order-2 ${imgWrapper}`}>
            <img
              src={cafeImages[cafeIndex]}
              className={imgClass}
              alt="cafe"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
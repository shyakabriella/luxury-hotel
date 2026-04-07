import React, { useEffect, useState } from "react";

const testimonials = [
  {
    title: "From The Horse's Mouth",
    category: "HORSE TRAIL & ARCHERY",
    quote:
      "It was our first time visiting this resort. We had a great time. The staff was very friendly and helpful. The property was beautiful. We will be going again! Highly recommend!",
    author: "-Lucia D, TripAdvisor",
  },
  {
    title: "From The Horse's Mouth",
    category: "FAMILY GETAWAY",
    quote:
      "Everything was peaceful, beautiful, and welcoming. The accommodations were comfortable, the activities were exciting, and the overall experience was truly unforgettable.",
    author: "-Emma R, TripAdvisor",
  },
  {
    title: "From The Horse's Mouth",
    category: "WEEKEND RETREAT",
    quote:
      "This place gave us the perfect mix of relaxation and adventure. The scenery was stunning, the staff was excellent, and every moment felt special from start to finish.",
    author: "-Michael T, TripAdvisor",
  },
];

export default function ResortSectionSix() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 7000);

    return () => clearInterval(timer);
  }, []);

  const goNext = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const goPrev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section
      className="relative overflow-hidden bg-[#173236] py-12 sm:py-14 md:py-16 lg:py-20"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <style>
        {`
          @keyframes testimonialFadeSlide {
            0% {
              opacity: 0;
              transform: translateY(18px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes softGlowMove {
            0% {
              opacity: 0.22;
              transform: translate3d(0, 0, 0) scale(1);
            }
            50% {
              opacity: 0.38;
              transform: translate3d(8px, -5px, 0) scale(1.04);
            }
            100% {
              opacity: 0.22;
              transform: translate3d(0, 0, 0) scale(1);
            }
          }

          .testimonial-copy-animate {
            animation: testimonialFadeSlide 0.8s ease forwards;
          }

          .testimonial-glow {
            animation: softGlowMove 10s ease-in-out infinite;
          }
        `}
      </style>

      {/* soft background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="testimonial-glow absolute left-[12%] top-[20%] h-32 w-32 rounded-full bg-[#28484c]/25 blur-[90px]" />
        <div className="testimonial-glow absolute right-[14%] top-[45%] h-40 w-40 rounded-full bg-[#1f4347]/25 blur-[100px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1b3538] via-[#173236] to-[#1d393c]" />
      </div>

      <div className="relative mx-auto flex max-w-[1100px] items-center justify-center px-6 sm:px-8 md:px-10">
        <button
          onClick={goPrev}
          aria-label="Previous testimonial"
          className="absolute left-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#b18d49] text-[14px] text-[#b18d49] transition hover:bg-white/5 sm:left-6 md:left-8"
        >
          ←
        </button>

        <div className="w-full max-w-[620px] text-center">
          <div key={current} className="testimonial-copy-animate">
            <h2 className="text-[20px] font-normal leading-tight text-[#b18d49] sm:text-[26px] md:text-[32px] lg:text-[38px]">
              {testimonials[current].title}
            </h2>

            <p className="mt-5 text-[12px] font-medium uppercase tracking-wide text-white sm:text-[13px] md:text-[14px]">
              “{testimonials[current].category}”
            </p>

            <p className="mx-auto mt-4 max-w-[620px] text-[13px] leading-[1.8] text-white/92 sm:text-[15px] md:text-[17px]">
              “{testimonials[current].quote}”
            </p>

            <p className="mt-8 text-[13px] text-white sm:text-[14px] md:text-[15px]">
              {testimonials[current].author}
            </p>
          </div>
        </div>

        <button
          onClick={goNext}
          aria-label="Next testimonial"
          className="absolute right-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#b18d49] text-[14px] text-[#b18d49] transition hover:bg-white/5 sm:right-6 md:right-8"
        >
          →
        </button>
      </div>
    </section>
  );
}
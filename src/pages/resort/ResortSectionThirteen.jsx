import React, { useEffect, useMemo, useRef, useState } from "react";

import bar1 from "../../assets/homepage/resto-bar/res-bar-one.jpg";
import bar2 from "../../assets/homepage/resto-bar/res-bar-two.jpg";
import bar3 from "../../assets/homepage/resto-bar/res-bar-three.jpg";
import bar4 from "../../assets/homepage/resto-bar/res-bar-four.jpg";
import bar5 from "../../assets/homepage/resto-bar/res-bar-five.jpg";
import bar6 from "../../assets/homepage/resto-bar/res-bar-six.png";
import bar7 from "../../assets/homepage/resto-bar/res-bar-seven.jpg";
import bar8 from "../../assets/homepage/resto-bar/res-bar-eight.jpg";
import bar9 from "../../assets/homepage/resto-bar/res-bar-nine.png";
import bar10 from "../../assets/homepage/resto-bar/res-bar-ten.png";
import bar11 from "../../assets/homepage/resto-bar/res-bar-eleven.png";
import bar12 from "../../assets/homepage/resto-bar/res-bar-twelve.png";
import bar13 from "../../assets/homepage/resto-bar/res-bar-thirteen.jpg";
import bar14 from "../../assets/homepage/resto-bar/res-bar-fourteen.jpg";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

const API_ROOT_URL = API_BASE_URL.replace(/\/api\/?$/, "");

const fallbackSlides = [
  {
    image: bar1,
    title: "Restaurant & Bar Experience",
    subtitle: "Taste. Sip. Enjoy.",
    description:
      "Crafted cocktails, gourmet dishes, and a relaxed atmosphere designed to elevate every evening.",
  },
  {
    image: bar2,
    title: "Restaurant & Bar Experience",
    subtitle: "Fresh Dining Moments",
    description:
      "Enjoy delicious meals, warm service, and a comfortable setting made for family, friends, and special nights.",
  },
  {
    image: bar6,
    title: "Restaurant & Bar Experience",
    subtitle: "Relaxed Bar Atmosphere",
    description:
      "Sip your favorite drinks in a calm and elegant space created for comfort and connection.",
  },
  {
    image: bar7,
    title: "Restaurant & Bar Experience",
    subtitle: "Tasteful Experiences",
    description:
      "Discover flavors, drinks, and a beautiful atmosphere that make every visit memorable.",
  },
  {
    image: bar3,
    title: "Restaurant & Bar Experience",
    subtitle: "Gourmet Dishes",
    description:
      "Enjoy carefully prepared dishes served in a welcoming and stylish environment.",
  },
  {
    image: bar8,
    title: "Restaurant & Bar Experience",
    subtitle: "Evening Comfort",
    description:
      "A peaceful restaurant and bar experience for relaxed evenings and joyful gatherings.",
  },
  {
    image: bar9,
    title: "Restaurant & Bar Experience",
    subtitle: "Sip And Celebrate",
    description:
      "Celebrate special moments with refreshing drinks, tasty meals, and a cozy atmosphere.",
  },
  {
    image: bar5,
    title: "Restaurant & Bar Experience",
    subtitle: "Elegant Dining",
    description:
      "A beautiful dining experience designed for comfort, taste, and unforgettable moments.",
  },
  {
    image: bar10,
    title: "Restaurant & Bar Experience",
    subtitle: "Premium Service",
    description:
      "Enjoy quality service, delicious meals, and drinks prepared with care.",
  },
  {
    image: bar11,
    title: "Restaurant & Bar Experience",
    subtitle: "Beautiful Setting",
    description:
      "Relax in a refined space perfect for meals, drinks, and meaningful conversations.",
  },
  {
    image: bar12,
    title: "Restaurant & Bar Experience",
    subtitle: "Memorable Nights",
    description:
      "Make every evening special with great taste, refreshing drinks, and a calm environment.",
  },
  {
    image: bar13,
    title: "Restaurant & Bar Experience",
    subtitle: "Tasteful Moments",
    description:
      "Enjoy a restaurant and bar setting created for pleasure, relaxation, and celebration.",
  },
  {
    image: bar4,
    title: "Restaurant & Bar Experience",
    subtitle: "Food And Drinks",
    description:
      "A warm place to enjoy delicious food, refreshing drinks, and quality time.",
  },
  {
    image: bar14,
    title: "Restaurant & Bar Experience",
    subtitle: "Sip. Taste. Enjoy.",
    description:
      "Discover a relaxing bar and dining atmosphere made for unforgettable experiences.",
  },
];

function buildImageUrl(path) {
  if (!path) return "";

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  if (path.startsWith("/storage/")) {
    return `${API_ROOT_URL}${path}`;
  }

  if (path.startsWith("storage/")) {
    return `${API_ROOT_URL}/${path}`;
  }

  return `${API_ROOT_URL}/storage/${path}`;
}

function getItems(data) {
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data)) return data;
  if (data?.data) return [data.data];

  return [];
}

function toBoolean(value) {
  return value === true || value === 1 || value === "1" || value === "true";
}

export default function ResortSectionThirteen() {
  const sectionRef = useRef(null);

  const [show, setShow] = useState(false);
  const [apiSlides, setApiSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = useMemo(() => {
    return apiSlides.length ? apiSlides : fallbackSlides;
  }, [apiSlides]);

  const currentSlide = slides[currentIndex] || slides[0];

  useEffect(() => {
    const fetchSectionNine = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/section9/restaurant-bar`, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data?.message || "Failed to load Section 9 Restaurant & Bar."
          );
        }

        const formattedSlides = getItems(data)
          .filter((item) => toBoolean(item.is_active ?? true))
          .sort(
            (a, b) => Number(a.sort_order ?? 0) - Number(b.sort_order ?? 0)
          )
          .map((item, index) => {
            const imageValue =
              item.image_url || item.image || item.image_path || "";

            return {
              id: item.id,
              image: imageValue ? buildImageUrl(imageValue) : "",
              title: item.title || fallbackSlides[0].title,
              subtitle: item.subtitle || fallbackSlides[0].subtitle,
              description: item.description || fallbackSlides[0].description,
              alt: item.title || `Restaurant and bar image ${index + 1}`,
            };
          })
          .filter((item) => item.image);

        if (formattedSlides.length) {
          setApiSlides(formattedSlides);
          setCurrentIndex(0);
        }
      } catch (error) {
        console.error("Section 9 Restaurant & Bar error:", error);
        setApiSlides([]);
      }
    };

    fetchSectionNine();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShow(true);
      },
      { threshold: 0.2 }
    );

    const currentSection = sectionRef.current;

    if (currentSection) observer.observe(currentSection);

    return () => {
      if (currentSection) observer.unobserve(currentSection);
    };
  }, []);

  useEffect(() => {
    if (!slides.length) return;

    const interval = setInterval(() => {
      setCurrentIndex((p) => (p + 1) % slides.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [slides.length]);

  const next = () => {
    setCurrentIndex((p) => (p + 1) % slides.length);
  };

  const prev = () => {
    setCurrentIndex((p) => (p - 1 + slides.length) % slides.length);
  };

  if (!slides.length) return null;

  return (
    <section
      ref={sectionRef}
      className="w-full overflow-hidden bg-white py-8 md:py-10"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <div className="mx-auto max-w-[950px] px-5 md:px-8">
        {/* TEXT */}
        <div
          className={`mb-8 text-center transition-all duration-700 ${
            show ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          {currentSlide?.title && (
            <p className="text-[12px] font-medium text-[#b08a5a] md:text-[13px]">
              {currentSlide.title}
            </p>
          )}

          {currentSlide?.subtitle && (
            <h2 className="mt-2 text-[20px] font-light leading-[1.2] text-[#1f3d3f] md:text-[24px] lg:text-[28px]">
              {currentSlide.subtitle.includes(".") ? (
                <>
                  {currentSlide.subtitle.split(".")[0]}.
                  <span className="text-[#b08a5a]">
                    {currentSlide.subtitle.split(".").slice(1).join(".")}
                  </span>
                </>
              ) : (
                currentSlide.subtitle
              )}
            </h2>
          )}

          {currentSlide?.description && (
            <p className="mx-auto mt-3 max-w-[480px] text-[12px] leading-[1.5] text-[#2d3b3c] md:text-[14px]">
              {currentSlide.description}
            </p>
          )}
        </div>

        {/* SLIDER */}
        <div
          className={`relative mx-auto h-[220px] max-w-[650px] overflow-hidden rounded-xl shadow-md transition-all duration-700 sm:h-[260px] md:h-[300px] lg:h-[340px] ${
            show ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
        >
          {slides.map((slide, index) => (
            <img
              key={slide.id || `${slide.image}-${index}`}
              src={slide.image}
              alt={slide.alt || "Bar experience"}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
              onError={(e) => {
                e.currentTarget.src = bar1;
              }}
            />
          ))}

          <div className="absolute inset-0 bg-black/20" />

          {slides.length > 1 && (
            <>
              {/* controls */}
              <button
                type="button"
                onClick={prev}
                aria-label="Previous restaurant and bar image"
                className="absolute left-2 top-1/2 h-7 w-7 -translate-y-1/2 rounded-full bg-white/70 text-sm text-[#1f3d3f]"
              >
                ←
              </button>

              <button
                type="button"
                onClick={next}
                aria-label="Next restaurant and bar image"
                className="absolute right-2 top-1/2 h-7 w-7 -translate-y-1/2 rounded-full bg-white/70 text-sm text-[#1f3d3f]"
              >
                →
              </button>

              {/* counter */}
              <div className="absolute bottom-2 right-2 rounded-full bg-white/80 px-2 py-1 text-[11px] text-[#1f3d3f]">
                {currentIndex + 1} / {slides.length}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
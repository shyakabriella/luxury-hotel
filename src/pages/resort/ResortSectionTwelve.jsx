import React, { useEffect, useMemo, useRef, useState } from "react";

import kidsOne from "../../assets/homepage/children/children-one.png";
import kidsTwo from "../../assets/homepage/children/children-two.png";
import kidsThree from "../../assets/homepage/children/children-three.png";
import kidsFour from "../../assets/homepage/children/children-five.jpg";
import kidsFive from "../../assets/homepage/children/children-five.png";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

const API_ROOT_URL = API_BASE_URL.replace(/\/api\/?$/, "");

const fallbackSlides = [
  {
    image: kidsOne,
    title: "Family Experience & Kids Zone",
    subtitle: "Where Joy Comes Alive",
    description:
      "A safe, engaging space where kids explore, play, and create memories while families relax with peace of mind.",
  },
  {
    image: kidsTwo,
    title: "Family Experience & Kids Zone",
    subtitle: "Creative Fun",
    description:
      "A safe and fun environment where children enjoy creative activities while families relax.",
  },
  {
    image: kidsThree,
    title: "Family Experience & Kids Zone",
    subtitle: "Indoor & Outdoor Joy",
    description:
      "Give your children a joyful space to play, learn, and create unforgettable family moments.",
  },
  {
    image: kidsFour,
    title: "Family Experience & Kids Zone",
    subtitle: "Safe Play",
    description:
      "A family-friendly area designed for comfort, fun, safety, and memorable experiences.",
  },
  {
    image: kidsFive,
    title: "Family Experience & Kids Zone",
    subtitle: "Family Friendly",
    description:
      "Relax with peace of mind while children enjoy safe and exciting play spaces.",
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

export default function ResortSectionTwelve() {
  const sectionRef = useRef(null);

  const [show, setShow] = useState(false);
  const [apiSlides, setApiSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = useMemo(() => {
    return apiSlides.length ? apiSlides : fallbackSlides;
  }, [apiSlides]);

  const currentSlide = slides[currentIndex] || slides[0];

  useEffect(() => {
    const fetchSectionTwelve = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/section12/family-kids`, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data?.message || "Failed to load Section 12 Family & Kids."
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
              alt: item.title || `Family and kids image ${index + 1}`,
            };
          })
          .filter((item) => item.image);

        if (formattedSlides.length) {
          setApiSlides(formattedSlides);
          setCurrentIndex(0);
        }
      } catch (error) {
        console.error("Section 12 Family & Kids error:", error);
        setApiSlides([]);
      }
    };

    fetchSectionTwelve();
  }, []);

  useEffect(() => {
    const el = sectionRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShow(true);
      },
      { threshold: 0.2 }
    );

    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  useEffect(() => {
    if (!slides.length) return;

    const interval = setInterval(() => {
      setCurrentIndex((p) => (p + 1) % slides.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [slides.length]);

  if (!slides.length) return null;

  return (
    <section
      ref={sectionRef}
      className="w-full overflow-hidden bg-[#efeee8] py-8 md:py-10"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <div className="mx-auto max-w-[950px] px-5 md:px-8">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
          {/* IMAGE */}
          <div
            className={`transition-all duration-700 ${
              show ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
            }`}
          >
            <div className="relative h-[200px] overflow-hidden rounded-xl shadow-md sm:h-[240px] md:h-[280px] lg:h-[320px]">
              {slides.map((slide, index) => (
                <img
                  key={slide.id || `${slide.image}-${index}`}
                  src={slide.image}
                  alt={slide.alt || "Kids leisure"}
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
                    index === currentIndex ? "opacity-100" : "opacity-0"
                  }`}
                  onError={(e) => {
                    e.currentTarget.src = kidsOne;
                  }}
                />
              ))}

              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

              {slides.length > 1 && (
                <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
                  {slides.map((_, index) => (
                    <button
                      type="button"
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      aria-label={`Go to family slide ${index + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? "w-4 bg-white"
                          : "w-2 bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* TEXT */}
          <div
            className={`flex flex-col items-center text-center transition-all duration-700 ${
              show ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
            }`}
          >
            {currentSlide?.title && (
              <p className="text-[12px] font-medium text-[#b08a5a] md:text-[13px]">
                {currentSlide.title}
              </p>
            )}

            {currentSlide?.subtitle && (
              <h2 className="mt-2 text-[20px] font-light leading-[1.2] text-[#1f3d3f] md:text-[24px] lg:text-[28px]">
                {currentSlide.subtitle}
              </h2>
            )}

            {currentSlide?.description && (
              <p className="mt-3 max-w-[420px] text-[12px] leading-[1.5] text-[#2d3b3c] md:text-[14px]">
                {currentSlide.description}
              </p>
            )}

            {/* tags */}
            <div className="mt-5 flex flex-wrap justify-center gap-2 text-[11px] md:text-[12px]">
              {[
                "Safe Play",
                "Creative Fun",
                "Indoor & Outdoor",
                "Family Friendly",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[#e7dccb] bg-white/50 px-2 py-1 text-[#3b3b3b]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
import React, { useEffect, useMemo, useRef, useState } from "react";

import gymOne from "../../assets/homepage/gym/gym-one.jpg";
import gymTwo from "../../assets/homepage/gym/gym-two.jpg";
import gymThree from "../../assets/homepage/gym/gym-three.jpg";
import gymFour from "../../assets/homepage/gym/gym-four.jpg";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

const API_ROOT_URL = API_BASE_URL.replace(/\/api\/?$/, "");

const fallbackSlides = [
  {
    image: gymOne,
    title: "Fitness Center & Wellness Zone",
    subtitle: "Train Hard Stay Strong",
    description:
      "Stay active in a fully equipped fitness space with modern machines, strength zones, and cardio areas designed for balance and focus.",
  },
  {
    image: gymTwo,
    title: "Fitness Center & Wellness Zone",
    subtitle: "Modern Training Space",
    description:
      "Enjoy a clean and comfortable training area designed for strength, cardio, balance, and wellness.",
  },
  {
    image: gymThree,
    title: "Fitness Center & Wellness Zone",
    subtitle: "Stay Active Every Day",
    description:
      "Keep your routine strong with quality equipment and a peaceful environment for healthy living.",
  },
  {
    image: gymFour,
    title: "Fitness Center & Wellness Zone",
    subtitle: "Wellness And Energy",
    description:
      "Recharge your body with a fitness experience created for focus, movement, and relaxation.",
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

export default function ResortSectionNine() {
  const sectionRef = useRef(null);

  const [show, setShow] = useState(false);
  const [apiSlides, setApiSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = useMemo(() => {
    return apiSlides.length ? apiSlides : fallbackSlides;
  }, [apiSlides]);

  const currentSlide = slides[currentIndex] || slides[0];

  useEffect(() => {
    const fetchSectionSeven = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/section7/fitness`, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.message || "Failed to load Section 7 Fitness.");
        }

        const formattedSlides = getItems(data)
          .filter((item) => toBoolean(item.is_active ?? true))
          .sort(
            (a, b) =>
              Number(a.sort_order ?? 0) - Number(b.sort_order ?? 0)
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
              alt: item.title || `Fitness image ${index + 1}`,
            };
          })
          .filter((item) => item.image);

        if (formattedSlides.length) {
          setApiSlides(formattedSlides);
          setCurrentIndex(0);
        }
      } catch (error) {
        console.error("Section 7 Fitness error:", error);
        setApiSlides([]);
      }
    };

    fetchSectionSeven();
  }, []);

  useEffect(() => {
    const currentSection = sectionRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShow(true);
      },
      { threshold: 0.2 }
    );

    if (currentSection) observer.observe(currentSection);

    return () => {
      if (currentSection) observer.unobserve(currentSection);
    };
  }, []);

  useEffect(() => {
    if (!slides.length) return;

    const interval = setInterval(() => {
      setCurrentIndex((p) => (p + 1) % slides.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [slides.length]);

  if (!slides.length) return null;

  return (
    <section
      ref={sectionRef}
      className="w-full overflow-hidden bg-[#efeee8] py-8 md:py-10"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <div className="mx-auto grid max-w-[1000px] grid-cols-1 items-center gap-6 px-5 sm:px-6 md:px-8 lg:grid-cols-2 lg:gap-10">
        {/* TEXT */}
        <div
          className={`flex flex-col items-center text-center transition-all duration-700 ${
            show ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
          }`}
        >
          {currentSlide?.title && (
            <p className="text-[13px] font-medium text-[#a17d5a] md:text-[14px]">
              {currentSlide.title}
            </p>
          )}

          {currentSlide?.subtitle && (
            <h2 className="mt-2 text-[18px] font-light leading-[1.2] text-[#1f3d3f] md:text-[20px] lg:text-[24px]">
              {currentSlide.subtitle}
            </h2>
          )}

          {currentSlide?.description && (
            <p className="mt-3 max-w-[420px] text-[12px] leading-[1.5] text-[#2d3b3c] md:text-[14px]">
              {currentSlide.description}
            </p>
          )}
        </div>

        {/* IMAGE */}
        <div
          className={`flex justify-center transition-all duration-700 ${
            show ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
          }`}
        >
          <div className="relative h-[200px] w-full max-w-[400px] overflow-hidden rounded-lg shadow-md sm:h-[240px] md:h-[280px] lg:h-[320px]">
            {slides.map((slide, index) => (
              <img
                key={slide.id || `${slide.image}-${index}`}
                src={slide.image}
                alt={slide.alt || slide.title || "Gym training"}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
                  index === currentIndex ? "opacity-100" : "opacity-0"
                }`}
                onError={(e) => {
                  e.currentTarget.src = gymOne;
                }}
              />
            ))}

            <div className="absolute inset-0 bg-black/30" />
          </div>
        </div>
      </div>
    </section>
  );
}
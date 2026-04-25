import React, { useEffect, useMemo, useRef, useState } from "react";

import hometwo from "../../assets/homepage/hometwo.jpg";
import homethree from "../../assets/homepage/hometen.png";
import homefour from "../../assets/homepage/homefour.jpg";
import welcomeWedding from "../../assets/homepage/welcomeToWedding.jpeg";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

const API_ROOT_URL = API_BASE_URL.replace(/\/api\/?$/, "");

const fallbackSlides = [
  {
    image: welcomeWedding,
    title: "Unforgettable",
    subtitle: "Charm & Adventure",
  },
  {
    image: hometwo,
    title: "Luxury Escape",
    subtitle: "Peace, Beauty & Comfort",
  },
  {
    image: homethree,
    title: "Elegant Stays",
    subtitle: "Timeless Hospitality",
  },
  {
    image: homefour,
    title: "Memorable Moments",
    subtitle: "Where Dreams Feel Real",
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

export default function Wellcom() {
  const [apiSlides, setApiSlides] = useState([]);
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);

  const slides = useMemo(() => {
    return apiSlides.length ? apiSlides : fallbackSlides;
  }, [apiSlides]);

  const stopAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startAutoPlay = () => {
    stopAutoPlay();

    intervalRef.current = setInterval(() => {
      setCurrent((p) => (p + 1) % slides.length);
    }, 2500);
  };

  useEffect(() => {
    const fetchWelcomeSlides = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/welcome-slides`, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.message || "Failed to load welcome slides.");
        }

        const formattedSlides = getItems(data)
          .filter((item) => toBoolean(item.is_active ?? true))
          .sort((a, b) => Number(a.sort_order ?? 0) - Number(b.sort_order ?? 0))
          .map((item) => {
            const imageValue =
              item.image_url || item.image || item.image_path || "";

            return {
              id: item.id,
              image: buildImageUrl(imageValue),
              title: item.title || "Welcome",
              subtitle: item.subtitle || "",
              description: item.description || "",
            };
          })
          .filter((item) => item.image);

        if (formattedSlides.length) {
          setApiSlides(formattedSlides);
          setCurrent(0);
        }
      } catch (error) {
        console.error("Welcome slides error:", error);
        setApiSlides([]);
      }
    };

    fetchWelcomeSlides();
  }, []);

  useEffect(() => {
    if (!slides.length) return;

    startAutoPlay();

    return () => stopAutoPlay();
  }, [slides.length]);

  const goPrev = () => {
    stopAutoPlay();
    setCurrent((p) => (p - 1 + slides.length) % slides.length);
    startAutoPlay();
  };

  const goNext = () => {
    stopAutoPlay();
    setCurrent((p) => (p + 1) % slides.length);
    startAutoPlay();
  };

  const goToSlide = (i) => {
    stopAutoPlay();
    setCurrent(i);
    startAutoPlay();
  };

  if (!slides.length) return null;

  return (
    <section className="relative h-[85vh] overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id || `${slide.image}-${index}`}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ))}
      </div>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/30" />

      {/* CONTENT */}
      <div className="relative z-10 flex h-full items-center justify-center px-5 text-center">
        <div key={current} className="animate-[fadeUp_1s_ease]">
          <h1 className="text-[30px] font-light leading-[1.05] text-white sm:text-[40px] md:text-[50px]">
            {slides[current]?.title}
          </h1>

          {slides[current]?.subtitle && (
            <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-white/90 sm:text-[15px] md:text-[20px]">
              {slides[current].subtitle}
            </p>
          )}
        </div>
      </div>

      {/* ARROWS */}
      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={goPrev}
            className="absolute left-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white transition hover:bg-black/50"
            aria-label="Previous slide"
          >
            ‹
          </button>

          <button
            type="button"
            onClick={goNext}
            className="absolute right-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white transition hover:bg-black/50"
            aria-label="Next slide"
          >
            ›
          </button>
        </>
      )}

      {/* DOTS */}
      {slides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
          {slides.map((_, index) => (
            <button
              type="button"
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 w-2 rounded-full transition ${
                index === current ? "scale-110 bg-white" : "bg-white/40"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
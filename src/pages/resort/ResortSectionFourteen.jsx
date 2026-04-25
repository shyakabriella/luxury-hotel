import React, { useEffect, useMemo, useRef, useState } from "react";

import sauna1 from "../../assets/homepage/massage-sauna/massage-one.jpg";
import sauna2 from "../../assets/homepage/massage-sauna/massage-two.jpg";
import sauna3 from "../../assets/homepage/massage-sauna/massage-three.jpg";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

const API_ROOT_URL = API_BASE_URL.replace(/\/api\/?$/, "");

const fallbackSlides = [
  {
    image: sauna1,
    title: "Sauna & Massage Experience",
    subtitle: "Relax. Restore. Rebalance.",
    description:
      "Step into calm where warmth and silence reset your body and mind. Designed to reduce stress and restore balance.",
  },
  {
    image: sauna2,
    title: "Sauna & Massage Experience",
    subtitle: "Calm. Warmth. Wellness.",
    description:
      "Enjoy a peaceful wellness space made to refresh your body, clear your mind, and support total relaxation.",
  },
  {
    image: sauna3,
    title: "Sauna & Massage Experience",
    subtitle: "Rest. Renew. Recharge.",
    description:
      "A quiet escape for massage, sauna, and deep relaxation in a comfortable atmosphere.",
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

function renderHeading(text) {
  if (!text) return null;

  const parts = text
    .split(".")
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length <= 1) {
    return text;
  }

  return parts.map((part, index) => (
    <React.Fragment key={`${part}-${index}`}>
      {part}.
      {index < parts.length - 1 && <br />}
    </React.Fragment>
  ));
}

export default function ResortSectionFourteen() {
  const sectionRef = useRef(null);

  const [show, setShow] = useState(false);
  const [apiSlides, setApiSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = useMemo(() => {
    return apiSlides.length ? apiSlides : fallbackSlides;
  }, [apiSlides]);

  const currentSlide = slides[currentIndex] || slides[0];

  useEffect(() => {
    const fetchSectionTen = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/section10/sauna`, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.message || "Failed to load Section 10 Sauna.");
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
              alt: item.title || `Sauna image ${index + 1}`,
            };
          })
          .filter((item) => item.image);

        if (formattedSlides.length) {
          setApiSlides(formattedSlides);
          setCurrentIndex(0);
        }
      } catch (error) {
        console.error("Section 10 Sauna error:", error);
        setApiSlides([]);
      }
    };

    fetchSectionTen();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShow(true);
      },
      { threshold: 0.25 }
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
    }, 3000);

    return () => clearInterval(interval);
  }, [slides.length]);

  if (!slides.length) return null;

  return (
    <section
      ref={sectionRef}
      className="relative flex h-[50vh] w-full items-center overflow-hidden bg-black md:h-[60vh]"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      {/* Images */}
      {slides.map((slide, index) => (
        <img
          key={slide.id || `${slide.image}-${index}`}
          src={slide.image}
          alt={slide.alt || "Sauna experience"}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
          onError={(e) => {
            e.currentTarget.src = sauna1;
          }}
        />
      ))}

      {/* overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* content */}
      <div
        className={`relative z-10 max-w-[420px] px-4 transition-all duration-700 ${
          show ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        {currentSlide?.title && (
          <p className="text-[12px] font-medium text-[#d6b38a] md:text-[13px]">
            {currentSlide.title}
          </p>
        )}

        {currentSlide?.subtitle && (
          <h2 className="mt-2 text-[22px] font-light leading-[1.2] text-white md:text-[28px] lg:text-[32px]">
            {renderHeading(currentSlide.subtitle)}
          </h2>
        )}

        {currentSlide?.description && (
          <p className="mt-3 text-[12px] leading-[1.5] text-white/75 md:text-[14px]">
            {currentSlide.description}
          </p>
        )}

        {/* dots */}
        {slides.length > 1 && (
          <div className="mt-5 flex justify-center gap-2">
            {slides.map((_, index) => (
              <button
                type="button"
                key={index}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to sauna slide ${index + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "w-4 bg-white" : "w-2 bg-white/40"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
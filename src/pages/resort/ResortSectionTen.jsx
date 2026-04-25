import React, { useEffect, useMemo, useRef, useState } from "react";

import parkingImgOne from "../../assets/homepage/parking/parking-one.jpg";
import parkingImgTwo from "../../assets/homepage/parking/parking-two.png";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

const API_ROOT_URL = API_BASE_URL.replace(/\/api\/?$/, "");

const fallbackSlides = [
  {
    image: parkingImgOne,
    title: "Parking Facilities",
    subtitle: "Safe Space For Your Journey",
    description:
      "Secure, spacious parking designed for convenience and peace of mind with easy access and 24/7 safety monitoring.",
    badge: "Secure Parking",
  },
  {
    image: parkingImgTwo,
    title: "Parking Facilities",
    subtitle: "Easy Access Parking",
    description:
      "Enjoy safe and convenient parking close to the entrance, designed to make every visit smooth and comfortable.",
    badge: "Easy Access",
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

export default function ResortSectionTen() {
  const sectionRef = useRef(null);

  const [show, setShow] = useState(false);
  const [apiSlides, setApiSlides] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);

  const slides = useMemo(() => {
    return apiSlides.length ? apiSlides : fallbackSlides;
  }, [apiSlides]);

  const currentSlide = slides[currentImage] || slides[0];

  useEffect(() => {
    const fetchSectionEight = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/section8/parking`, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.message || "Failed to load Section 8 Parking.");
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
              badge: item.title || `Parking ${index + 1}`,
              alt: item.title || `Parking image ${index + 1}`,
            };
          })
          .filter((item) => item.image);

        if (formattedSlides.length) {
          setApiSlides(formattedSlides);
          setCurrentImage(0);
        }
      } catch (error) {
        console.error("Section 8 Parking error:", error);
        setApiSlides([]);
      }
    };

    fetchSectionEight();
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
      setCurrentImage((p) => (p + 1) % slides.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [slides.length]);

  if (!slides.length) return null;

  return (
    <section
      id="parking"
      ref={sectionRef}
      className="w-full overflow-hidden bg-[#efeee8] py-8 md:py-10"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <div className="mx-auto max-w-[950px] px-5 md:px-8 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
          {/* IMAGE */}
          <div
            className={`transition-all duration-700 ${
              show ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
            }`}
          >
            <div className="relative h-[200px] overflow-hidden rounded-xl shadow-md sm:h-[260px] md:h-[300px] lg:h-[340px]">
              {slides.map((slide, index) => (
                <img
                  key={slide.id || `${slide.image}-${index}`}
                  src={slide.image}
                  alt={slide.alt || "Parking area"}
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
                    index === currentImage ? "opacity-100" : "opacity-0"
                  }`}
                  onError={(e) => {
                    e.currentTarget.src = parkingImgOne;
                  }}
                />
              ))}

              <div className="absolute inset-0 bg-black/25" />

              {currentSlide?.badge && (
                <div className="absolute bottom-2 left-2 rounded-full bg-white/85 px-2 py-1 text-[11px] text-[#1f3d3f]">
                  {currentSlide.badge}
                </div>
              )}
            </div>
          </div>

          {/* TEXT */}
          <div
            className={`flex flex-col items-center text-center transition-all duration-700 ${
              show ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
            }`}
          >
            {currentSlide?.title && (
              <p className="text-[12px] font-medium text-[#b08a5a] md:text-[13px]">
                {currentSlide.title}
              </p>
            )}

            {currentSlide?.subtitle && (
              <h2 className="mt-2 text-[18px] font-light leading-[1.2] text-[#1f3d3f] md:text-[22px] lg:text-[26px]">
                {currentSlide.subtitle}
              </h2>
            )}

            {currentSlide?.description && (
              <p className="mt-3 max-w-[420px] text-[12px] leading-[1.5] text-[#2d3b3c] md:text-[14px]">
                {currentSlide.description}
              </p>
            )}

            {/* feature chips */}
            <div className="mt-5 grid max-w-[320px] grid-cols-2 gap-2 text-[11px] text-[#3b3b3b] md:text-[12px]">
              <div className="rounded-lg border border-[#e7dccb] bg-white/50 px-2 py-1.5">
                🔒 24/7 Security
              </div>
              <div className="rounded-lg border border-[#e7dccb] bg-white/50 px-2 py-1.5">
                🚗 Easy Access
              </div>
              <div className="rounded-lg border border-[#e7dccb] bg-white/50 px-2 py-1.5">
                💡 Well Lit
              </div>
              <div className="rounded-lg border border-[#e7dccb] bg-white/50 px-2 py-1.5">
                📍 Near Entrance
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
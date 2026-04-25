import React, { useEffect, useMemo, useState } from "react";

import fallbackOne from "../../assets/homepage/homeeight.jpg";
import fallbackTwo from "../../assets/homepage/homenine.png";
import fallbackThree from "../../assets/homepage/homeone.png";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

const API_ROOT_URL = API_BASE_URL.replace(/\/api\/?$/, "");

const testimonials = [
  {
    title: "Resident Stories",
    category: "LUXURY RESIDES",
    quote:
      "Living here has been a dream. The modern design, spacious rooms, and premium finishes make everyday feel special.",
    author: "-Sophia M, Resident",
  },
  {
    title: "Resident Stories",
    category: "CITY LIVING",
    quote:
      "The location is perfect—close to everything yet peaceful inside. Amenities like the gym and pool elevate the lifestyle.",
    author: "-Daniel K, Resident",
  },
  {
    title: "Resident Stories",
    category: "COMFORT & STYLE",
    quote:
      "From the concierge service to the rooftop lounge, every detail is thoughtfully designed for comfort and elegance.",
    author: "-Aisha R, Resident",
  },
];

const fallbackImages = [
  { image: fallbackOne, alt: "Gallery image one" },
  { image: fallbackTwo, alt: "Gallery image two" },
  { image: fallbackThree, alt: "Gallery image three" },
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

export default function ResortSectionSix() {
  const [current, setCurrent] = useState(0);
  const [apiImages, setApiImages] = useState([]);

  const images = useMemo(() => {
    return apiImages.length ? apiImages : fallbackImages;
  }, [apiImages]);

  const total = Math.max(testimonials.length, images.length);

  const currentTestimonial = testimonials[current % testimonials.length];
  const currentImage = images[current % images.length];

  useEffect(() => {
    const fetchSectionSixGallery = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/section6/gallery`, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.message || "Failed to load Section 6 Gallery.");
        }

        const formattedImages = getItems(data)
          .filter((item) => toBoolean(item.is_active ?? true))
          .sort(
            (a, b) =>
              Number(a.display_order ?? a.sort_order ?? 0) -
              Number(b.display_order ?? b.sort_order ?? 0)
          )
          .map((item, index) => {
            const imageValue =
              item.image_url || item.image || item.image_path || "";

            return {
              id: item.id,
              image: imageValue ? buildImageUrl(imageValue) : "",
              alt: item.alt || item.title || `Gallery image ${index + 1}`,
            };
          })
          .filter((item) => item.image);

        if (formattedImages.length) {
          setApiImages(formattedImages);
          setCurrent(0);
        }
      } catch (error) {
        console.error("Section 6 Gallery error:", error);
        setApiImages([]);
      }
    };

    fetchSectionSixGallery();
  }, []);

  useEffect(() => {
    if (!total) return;

    const timer = setInterval(() => {
      setCurrent((p) => (p + 1) % total);
    }, 3000);

    return () => clearInterval(timer);
  }, [total]);

  const goNext = () => {
    setCurrent((p) => (p + 1) % total);
  };

  const goPrev = () => {
    setCurrent((p) => (p - 1 + total) % total);
  };

  if (!total) return null;

  return (
    <section
      className="relative overflow-hidden bg-[#173236] py-8 md:py-10"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      {/* Section 6 gallery background */}
      <div className="absolute inset-0">
        {images.map((item, index) => (
          <img
            key={item.id || `${item.image}-${index}`}
            src={item.image}
            alt={item.alt}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
              index === current % images.length ? "opacity-30" : "opacity-0"
            }`}
            onError={(e) => {
              e.currentTarget.src = fallbackOne;
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-[#173236]/95 via-[#173236]/90 to-[#1b3a3e]/95" />

      <div className="relative mx-auto max-w-[900px] px-4 text-center">
        {/* Left arrow */}
        {total > 1 && (
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous testimonial"
            className="absolute left-2 top-1/2 h-7 w-7 -translate-y-1/2 rounded-full border border-[#b18d49] text-sm text-[#b18d49]"
          >
            ←
          </button>
        )}

        {/* Content */}
        <div key={current} className="transition-all duration-700">
          <h2 className="text-[16px] font-light text-[#b18d49] md:text-[22px]">
            {currentTestimonial.title}
          </h2>

          <p className="mt-2 text-[10px] uppercase tracking-wide text-white/70 md:text-[12px]">
            {currentTestimonial.category}
          </p>

          <p className="mx-auto mt-3 max-w-[680px] text-[12px] leading-[1.5] text-white/80 md:text-[14px]">
            “{currentTestimonial.quote}”
          </p>

          <p className="mt-4 text-[11px] text-white/60 md:text-[12px]">
            {currentTestimonial.author}
          </p>
        </div>

        {/* Right arrow */}
        {total > 1 && (
          <button
            type="button"
            onClick={goNext}
            aria-label="Next testimonial"
            className="absolute right-2 top-1/2 h-7 w-7 -translate-y-1/2 rounded-full border border-[#b18d49] text-sm text-[#b18d49]"
          >
            →
          </button>
        )}
      </div>
    </section>
  );
}
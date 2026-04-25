import React, { useEffect, useMemo, useState } from "react";

import homeseven from "../../assets/homepage/homeseven.jpg";
import homeeight from "../../assets/homepage/homeeight.jpg";
import homenine from "../../assets/homepage/welcomeToWedding.jpeg";
import hometen from "../../assets/homepage/hometen.png";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

const API_ROOT_URL = API_BASE_URL.replace(/\/api\/?$/, "");

const fallbackSlides = [
  {
    image: homeseven,
    eyebrow: "For Every Event",
    titleLine1: "Unforgettable",
    titleLine2: "Weddings",
    description:
      "Celebrate your special day in a beautiful setting designed for magical moments.",
  },
  {
    image: homeeight,
    eyebrow: "For Every Event",
    titleLine1: "Luxury",
    titleLine2: "Getaways",
    description:
      "Relax in scenic comfort with surroundings perfect for weekends and group escapes.",
  },
  {
    image: homenine,
    eyebrow: "For Every Event",
    titleLine1: "Outdoor",
    titleLine2: "Education",
    description:
      "Enjoy swimming, climbing, and kayaking in a natural learning environment.",
  },
  {
    image: hometen,
    eyebrow: "For Every Event",
    titleLine1: "Elegant",
    titleLine2: "Moments",
    description:
      "Create lasting memories in a calm atmosphere with thoughtful spaces.",
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

export default function ResortSectionFour() {
  const [apiSlides, setApiSlides] = useState([]);
  const [current, setCurrent] = useState(0);

  const slides = useMemo(() => {
    return apiSlides.length ? apiSlides : fallbackSlides;
  }, [apiSlides]);

  useEffect(() => {
    const fetchSectionThree = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/home-section-threes`, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.message || "Failed to load Home Section Three.");
        }

        const formattedSlides = getItems(data)
          .map((item) => {
            const imageValue =
              item.image_url || item.image || item.image_path || "";

            return {
              id: item.id,
              image: imageValue ? buildImageUrl(imageValue) : "",
              eyebrow: "For Every Event",
              titleLine1: item.title_one || "",
              titleLine2: item.title_two || "",
              description: item.description || "",
            };
          })
          .filter((item) => item.image);

        if (formattedSlides.length) {
          setApiSlides(formattedSlides);
          setCurrent(0);
        }
      } catch (error) {
        console.error("Home Section Three error:", error);
        setApiSlides([]);
      }
    };

    fetchSectionThree();
  }, []);

  useEffect(() => {
    if (!slides.length) return;

    const timer = setInterval(() => {
      setCurrent((p) => (p + 1) % slides.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const goNext = () => {
    setCurrent((p) => (p + 1) % slides.length);
  };

  const goPrev = () => {
    setCurrent((p) => (p - 1 + slides.length) % slides.length);
  };

  if (!slides.length) return null;

  return (
    <section
      className="relative mt-10 overflow-hidden bg-[#2c3119]"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <div className="mx-auto max-w-[1100px]">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
          {/* IMAGE */}
          <div className="relative min-h-[240px] pr-4 md:min-h-[320px] lg:min-h-[380px] lg:pr-6">
            {slides.map((slide, index) => (
              <div
                key={slide.id || `${slide.image}-${index}`}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  index === current ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.titleLine1 || "Resort event"}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = homeseven;
                  }}
                />
              </div>
            ))}

            <div className="absolute inset-0 bg-black/30" />
          </div>

          {/* CONTENT */}
          <div className="flex items-center bg-[#2c3119]/80 pl-4 lg:pl-6">
            <div className="px-6 py-8">
              {slides[current]?.eyebrow && (
                <p className="text-[13px] text-white/70">
                  {slides[current].eyebrow}
                </p>
              )}

              <h2 className="mt-2 text-[22px] font-light text-white md:text-[26px]">
                {slides[current]?.titleLine1} {slides[current]?.titleLine2}
              </h2>

              {slides[current]?.description && (
                <p className="mt-3 max-w-[360px] text-[14px] text-white/70 md:text-[15px]">
                  {slides[current].description}
                </p>
              )}

              {slides.length > 1 && (
                <div className="mt-5 flex items-center gap-3">
                  <div className="ml-auto flex gap-2">
                    <button
                      type="button"
                      onClick={goPrev}
                      className="h-8 w-8 rounded-full border border-[#8c7a45] text-[#b39a5a]"
                      aria-label="Previous slide"
                    >
                      ←
                    </button>

                    <button
                      type="button"
                      onClick={goNext}
                      className="h-8 w-8 rounded-full border border-[#8c7a45] text-[#b39a5a]"
                      aria-label="Next slide"
                    >
                      →
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
import React, { useEffect, useRef, useState } from "react";
import homefive from "../../assets/homepage/homefive.jpg";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

const API_ROOT_URL = API_BASE_URL.replace(/\/api\/?$/, "");

const fallbackSection = {
  title: "Escape The Ordinary",
  subtitle: "Luxury Apartments & Conference Center",
  description:
    "Modern luxury living with calm surroundings, thoughtful design, and everyday comfort in a prime location.",
  image: homefive,
  is_active: true,
};

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

function toBoolean(value) {
  return value === true || value === 1 || value === "1" || value === "true";
}

export default function ResortSectionTwo() {
  const sectionRef = useRef(null);

  const [show, setShow] = useState(false);
  const [sectionData, setSectionData] = useState(fallbackSection);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const fetchHomeSectionOne = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/home-section-one`, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.message || "Failed to load Home Section One.");
        }

        const item = data?.data;

        if (!item) return;

        const isActive = toBoolean(item.is_active ?? true);

        if (!isActive) {
          setHidden(true);
          return;
        }

        const imageValue = item.image_url || item.image || item.image_path || "";

        setSectionData({
          title: item.title || fallbackSection.title,
          subtitle: item.subtitle || fallbackSection.subtitle,
          description: item.description || fallbackSection.description,
          image: imageValue ? buildImageUrl(imageValue) : fallbackSection.image,
          is_active: isActive,
        });

        setHidden(false);
      } catch (error) {
        console.error("Home Section One error:", error);
        setSectionData(fallbackSection);
        setHidden(false);
      }
    };

    fetchHomeSectionOne();
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

  if (hidden) return null;

  return (
    <section
      ref={sectionRef}
      className="w-full overflow-hidden bg-[#efeee8] py-12 md:py-16 lg:py-18"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <div className="mx-auto max-w-[1100px] px-5 md:px-8">
        <div className="grid grid-cols-1 items-center gap-10 text-center lg:grid-cols-2">
          {/* IMAGE */}
          <div
            className={`flex justify-center transition-all duration-700 ${
              show ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
            }`}
          >
            <img
              src={sectionData.image}
              alt={sectionData.title || "Resort view"}
              className="h-[250px] w-full rounded-md object-cover shadow-md sm:h-[270px] md:h-[340px] lg:h-[390px]"
              onError={(e) => {
                e.currentTarget.src = homefive;
              }}
            />
          </div>

          {/* TEXT */}
          <div
            className={`flex flex-col items-center transition-all duration-700 ${
              show ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
            }`}
          >
            {sectionData.subtitle && (
              <p className="text-[13px] font-medium text-[#a17d5a] md:text-[15px]">
                {sectionData.subtitle}
              </p>
            )}

            {sectionData.title && (
              <h2 className="mt-3 text-[20px] font-light leading-[1.2] text-[#1f3d3f] md:text-[22px] lg:text-[27px]">
                {sectionData.title}
              </h2>
            )}

            {sectionData.description && (
              <p className="mt-4 max-w-[520px] text-[14px] leading-[1.6] text-[#2d3b3c] md:text-[16px]">
                {sectionData.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
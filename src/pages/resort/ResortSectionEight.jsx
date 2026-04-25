import React, { useEffect, useRef, useState } from "react";
import homeeight from "../../assets/homepage/homeseven.jpg";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

const API_ROOT_URL = API_BASE_URL.replace(/\/api\/?$/, "");

const fallbackSection = {
  eyebrow: "Luxury",
  title: "The Lay Of The Land",
  description:
    "Discover vibrant event spaces, outdoor stages, and elegant venues across a fully equipped luxury property designed for celebration, connection, and unforgettable experiences.",
  image: homeeight,
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

function getFirstItem(data) {
  if (Array.isArray(data?.data)) return data.data[0] || null;
  if (Array.isArray(data)) return data[0] || null;
  if (data?.data) return data.data;
  return data || null;
}

export default function ResortSectionSeven() {
  const sectionRef = useRef(null);

  const [show, setShow] = useState(false);
  const [sectionData, setSectionData] = useState(fallbackSection);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const fetchHomeSectionFive = async () => {
      try {
        let response = await fetch(`${API_BASE_URL}/home-section-fives/active`, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });

        let data = await response.json();

        // Fallback if /active endpoint is not available
        if (!response.ok) {
          response = await fetch(`${API_BASE_URL}/home-section-fives`, {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          });

          data = await response.json();

          if (!response.ok) {
            throw new Error(data?.message || "Failed to load Home Section Five.");
          }
        }

        const item = getFirstItem(data);

        if (!item) return;

        const isActive = toBoolean(item.is_active ?? true);

        if (!isActive) {
          setHidden(true);
          return;
        }

        const imageValue = item.image_url || item.image || item.image_path || "";

        setSectionData({
          eyebrow: item.eyebrow || fallbackSection.eyebrow,
          title: item.title || fallbackSection.title,
          description: item.description || fallbackSection.description,
          image: imageValue ? buildImageUrl(imageValue) : fallbackSection.image,
          is_active: isActive,
        });

        setHidden(false);
      } catch (error) {
        console.error("Home Section Five error:", error);
        setSectionData(fallbackSection);
        setHidden(false);
      }
    };

    fetchHomeSectionFive();
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

  if (hidden) return null;

  return (
    <section
      ref={sectionRef}
      className="w-full overflow-hidden bg-[#efeee8] py-10 md:py-14 lg:py-16"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6 md:px-8 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* IMAGE */}
          <div
            className={`relative transition-all duration-700 ${
              show ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
            }`}
          >
            <img
              src={sectionData.image}
              alt={sectionData.title || "Resort landscape"}
              className="h-[180px] w-full rounded-md object-cover sm:h-[240px] md:h-[300px] lg:h-[340px]"
              onError={(e) => {
                e.currentTarget.src = homeeight;
              }}
            />
          </div>

          {/* CONTENT */}
          <div
            className={`flex items-center justify-center transition-all duration-700 ${
              show ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
            }`}
          >
            <div className="max-w-[480px] text-center">
              {sectionData.eyebrow && (
                <p className="text-[13px] font-medium text-[#a17d5a] md:text-[15px]">
                  {sectionData.eyebrow}
                </p>
              )}

              {sectionData.title && (
                <h2 className="mt-3 text-[20px] font-light leading-[1.05] text-[#1e3b3d] md:text-[22px] lg:text-[27px]">
                  {sectionData.title}
                </h2>
              )}

              {sectionData.description && (
                <p className="mt-4 text-[14px] leading-[1.7] text-[#334243] md:text-[16px]">
                  {sectionData.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
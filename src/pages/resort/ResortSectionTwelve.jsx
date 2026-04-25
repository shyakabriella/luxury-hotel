import React, { useEffect, useRef, useState } from "react";

import poolOne from "../../assets/homepage/pool/pool-1.jpeg";
import poolTwo from "../../assets/homepage/pool/pool-2.jpeg";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

const API_ROOT_URL = API_BASE_URL.replace(/\/api\/?$/, "");

const fallbackSection = {
  title: "Infinity Pool Experience",
  subtitle: "Relax. Refresh. Repeat.",
  description:
    "Unwind in our swimming pool area where luxury meets calm. Take a swim, enjoy the sunset, or just chill by the water — pure resort energy.",
  image: poolOne,
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

function renderHeading(text) {
  if (!text) return null;

  const parts = text.split(".");

  if (parts.length < 3) {
    return text;
  }

  return (
    <>
      {parts[0]}.
      <span className="text-[#b08a5a]">{parts[1]}.</span>
      {parts.slice(2).join(".")}
    </>
  );
}

export default function ResortSectionEleven() {
  const sectionRef = useRef(null);

  const [show, setShow] = useState(false);
  const [sectionData, setSectionData] = useState(fallbackSection);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const fetchSectionEleven = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/section11/pool`, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.message || "Failed to load Section 11 Pool.");
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
          title: item.title || fallbackSection.title,
          subtitle: item.subtitle || fallbackSection.subtitle,
          description: item.description || fallbackSection.description,
          image: imageValue ? buildImageUrl(imageValue) : fallbackSection.image,
          is_active: isActive,
        });

        setHidden(false);
      } catch (error) {
        console.error("Section 11 Pool error:", error);
        setSectionData(fallbackSection);
        setHidden(false);
      }
    };

    fetchSectionEleven();
  }, []);

  useEffect(() => {
    const currentSection = sectionRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShow(true);
      },
      { threshold: 0.25 }
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
      className="w-full overflow-hidden bg-[#efeee8] py-8 md:py-10"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <div className="mx-auto max-w-[950px] px-4 md:px-8 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
          {/* Text */}
          <div
            className={`flex flex-col items-center text-center transition-all duration-700 ease-out ${
              show ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
            }`}
          >
            {sectionData.title && (
              <p className="text-[12px] font-medium text-[#b08a5a] md:text-[13px]">
                {sectionData.title}
              </p>
            )}

            {sectionData.subtitle && (
              <h2 className="mt-2 text-[20px] font-light leading-[1.2] text-[#1f3d3f] md:text-[24px] lg:text-[28px]">
                {renderHeading(sectionData.subtitle)}
              </h2>
            )}

            {sectionData.description && (
              <p className="mt-3 max-w-[420px] text-[12px] leading-[1.5] text-[#2d3b3c] md:text-[14px]">
                {sectionData.description}
              </p>
            )}
          </div>

          {/* Images */}
          <div
            className={`flex justify-center transition-all duration-700 ease-out ${
              show ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
            }`}
          >
            <div className="relative h-[220px] w-full max-w-[360px] sm:h-[260px] md:h-[300px] lg:h-[340px]">
              <div className="absolute left-4 top-4 z-0 h-full w-full rotate-[-3deg] overflow-hidden rounded-xl shadow-md">
                <img
                  src={poolTwo}
                  alt="Pool background view"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = poolTwo;
                  }}
                />
              </div>

              <div className="absolute left-0 top-0 z-10 h-full w-full overflow-hidden rounded-xl shadow-lg">
                <img
                  src={sectionData.image}
                  alt={sectionData.title || "Pool view"}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = poolOne;
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
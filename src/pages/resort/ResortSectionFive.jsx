import React, { useEffect, useRef, useState } from "react";
import homenine from "../../assets/homepage/room.jpg";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

const API_ROOT_URL = API_BASE_URL.replace(/\/api\/?$/, "");

const fallbackSection = {
  eyebrow: "Accommodations",
  titleLineOne: "Cozy",
  titleLineTwo: "Lodging",
  description:
    "From cottages to hotel rooms, enjoy a calm stay with modern essentials like Wi-Fi and in-room coffee service.",
  image: homenine,
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

export default function ResortSectionFive() {
  const sectionRef = useRef(null);

  const [show, setShow] = useState(false);
  const [sectionData, setSectionData] = useState(fallbackSection);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const fetchHomeSectionFour = async () => {
      try {
        let response = await fetch(`${API_BASE_URL}/home-section-fours/active`, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });

        let data = await response.json();

        // Fallback if active endpoint is not available
        if (!response.ok) {
          response = await fetch(`${API_BASE_URL}/home-section-fours`, {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          });

          data = await response.json();

          if (!response.ok) {
            throw new Error(data?.message || "Failed to load Home Section Four.");
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
          titleLineOne: item.title_line_one || fallbackSection.titleLineOne,
          titleLineTwo: item.title_line_two || fallbackSection.titleLineTwo,
          description: item.description || fallbackSection.description,
          image: imageValue ? buildImageUrl(imageValue) : fallbackSection.image,
          is_active: isActive,
        });

        setHidden(false);
      } catch (error) {
        console.error("Home Section Four error:", error);
        setSectionData(fallbackSection);
        setHidden(false);
      }
    };

    fetchHomeSectionFour();
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
      className="relative overflow-hidden bg-[#f4f2ed] py-10 md:py-14 lg:py-16"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-full overflow-hidden lg:w-[55%]">
        <img
          src="/home1.jpg"
          alt=""
          className="h-full w-full object-cover opacity-[0.1] grayscale"
        />
        <div className="absolute inset-0 bg-white/70" />
      </div>

      <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Text */}
          <div
            className={`transition-all duration-700 ease-out ${
              show ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
            }`}
          >
            <div className="mx-auto flex max-w-[480px] flex-col items-center text-center">
              {sectionData.eyebrow && (
                <p className="text-[14px] font-medium text-[#a07d59] md:text-[16px]">
                  {sectionData.eyebrow}
                </p>
              )}

              <h2 className="mt-3 text-[20px] font-light leading-[1.05] text-[#18393b] md:text-[22px] lg:text-[27px]">
                {sectionData.titleLineOne} {sectionData.titleLineTwo}
              </h2>

              {sectionData.description && (
                <p className="mt-4 text-[14px] leading-[1.7] text-[#354344] md:text-[16px]">
                  {sectionData.description}
                </p>
              )}

              <a
                href="https://direct-book.com/properties/luxurygardenpalace"
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center justify-center rounded-md bg-[#1f3435] px-6 py-3 text-[14px] text-white transition hover:opacity-90 md:text-[15px]"
              >
                View More
              </a>
            </div>
          </div>

          {/* Image */}
          <div
            className={`transition-all duration-700 ease-out ${
              show ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
            }`}
          >
            <div className="mx-auto w-full max-w-[600px] overflow-hidden shadow-md">
              <img
                src={sectionData.image}
                alt={`${sectionData.titleLineOne} ${sectionData.titleLineTwo}`}
                className="h-[180px] w-full rounded-md object-cover sm:h-[220px] md:h-[260px] lg:h-[300px]"
                onError={(e) => {
                  e.currentTarget.src = homenine;
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
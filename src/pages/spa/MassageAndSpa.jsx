import React, { useEffect, useMemo, useState } from "react";

// FALLBACK SPA ASSETS
import spaHeroImage from "../../assets/homepage/massage-sauna/massage-one.jpg";
import spaExperienceImage from "../../assets/homepage/massage-sauna/massage-two.jpg";
import spaServiceImageOne from "../../assets/homepage/massage-sauna/massage-four.jpg";
import spaServiceImageTwo from "../../assets/homepage/massage-sauna/massage-five.jpg";
import wellnessEnhancementImageOne from "../../assets/homepage/massage-sauna/massage-three.jpg";
import wellnessEnhancementImageTwo from "../../assets/homepage/massage-sauna/massage-six.jpg";
import wellnessEnhancementImageThree from "../../assets/homepage/massage-sauna/massage-seven.jpg";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

const API_ROOT_URL = API_BASE_URL.replace(/\/api\/?$/, "");

const fallbackPage = {
  hero_title: "Spa & Wellness",
  hero_subtitle: "Luxury Spa Experience in Kigali",
  hero_image: spaHeroImage,

  intro_eyebrow: "Luxury Spa Experience in Kigali, Rwanda",
  intro_title: "Relaxation & Rejuvenation",
  intro_description:
    "Step into a world of calm and comfort. Our spa experiences are designed to help you relax, recover, and restore your natural balance.",

  experience_title: "Complete Wellness Experience",
  experience_description:
    "Enjoy deeply relaxing treatments tailored to your needs, from soothing massages to full-body wellness therapies designed to refresh your mind and body.",
  experience_image: spaExperienceImage,

  is_active: true,
};

const fallbackSpaServices = [
  {
    id: "fallback-spa-1",
    title: "CUSTOM MASSAGE TREATMENTS",
    image: spaServiceImageOne,
    description:
      "Personalized massage therapies designed to relieve stress, improve circulation, and restore full body relaxation.",
    sort_order: 1,
    is_active: true,
  },
  {
    id: "fallback-spa-2",
    title: "RELAXATION SESSIONS",
    image: spaServiceImageTwo,
    description:
      "Calming spa experiences focused on reducing tension and helping you fully unwind in a peaceful environment.",
    sort_order: 2,
    is_active: true,
  },
];

const fallbackWellnessEnhancements = [
  {
    id: "fallback-wellness-1",
    title: "AROMATHERAPY",
    image: wellnessEnhancementImageOne,
    description:
      "Essential oil treatments that enhance relaxation, balance mood, and promote mental clarity.",
    sort_order: 1,
    is_active: true,
  },
  {
    id: "fallback-wellness-2",
    title: "STEAM & SAUNA",
    image: wellnessEnhancementImageTwo,
    description:
      "Detoxifying heat therapy sessions that help relax muscles and refresh your body.",
    sort_order: 2,
    is_active: true,
  },
  {
    id: "fallback-wellness-3",
    title: "COUPLES MASSAGE",
    image: wellnessEnhancementImageThree,
    description:
      "Shared relaxation experiences in a private setting designed for comfort and connection.",
    sort_order: 3,
    is_active: true,
  },
];

const fallbackBenefits = [
  "Professional Massage Therapists",
  "Private Treatment Rooms",
  "Aromatherapy Options",
  "Steam & Sauna Access",
  "Relaxation Lounge",
  "Couples Treatment Packages",
  "Premium Spa Products",
  "Calming Atmosphere",
  "Personalized Treatments",
  "Hygienic & Serene Environment",
  "Wellness Consultations",
  "Complimentary Refreshments",
];

function buildImageUrl(path) {
  if (!path) return "";

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  if (path.startsWith("blob:")) {
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

function normalizePage(page) {
  if (!page) return fallbackPage;

  return {
    hero_title: page.hero_title || fallbackPage.hero_title,
    hero_subtitle: page.hero_subtitle || fallbackPage.hero_subtitle,
    hero_image: page.hero_image
      ? buildImageUrl(page.hero_image)
      : fallbackPage.hero_image,

    intro_eyebrow: page.intro_eyebrow || fallbackPage.intro_eyebrow,
    intro_title: page.intro_title || fallbackPage.intro_title,
    intro_description:
      page.intro_description || fallbackPage.intro_description,

    experience_title:
      page.experience_title || fallbackPage.experience_title,
    experience_description:
      page.experience_description || fallbackPage.experience_description,
    experience_image: page.experience_image
      ? buildImageUrl(page.experience_image)
      : fallbackPage.experience_image,

    is_active: toBoolean(page.is_active ?? true),
  };
}

function normalizeItems(items = []) {
  return items
    .filter((item) => toBoolean(item.is_active ?? true))
    .sort((a, b) => Number(a.sort_order ?? 0) - Number(b.sort_order ?? 0))
    .map((item) => ({
      ...item,
      image: item.image ? buildImageUrl(item.image) : "",
      title: item.title || "",
      description: item.description || "",
      section: item.section || "spa_service",
      sort_order: Number(item.sort_order ?? 0),
      is_active: toBoolean(item.is_active ?? true),
    }));
}

function normalizeBenefits(benefits = []) {
  return benefits
    .filter((benefit) => toBoolean(benefit.is_active ?? true))
    .sort((a, b) => Number(a.sort_order ?? 0) - Number(b.sort_order ?? 0))
    .map((benefit) => benefit.title)
    .filter(Boolean);
}

export default function MassageAndSpa() {
  const [pageData, setPageData] = useState(fallbackPage);
  const [items, setItems] = useState([]);
  const [benefits, setBenefits] = useState([]);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const fetchMassageSpa = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/massage-spa`, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
          signal: controller.signal,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.message || "Failed to load Massage & Spa.");
        }

        const page = normalizePage(data?.data?.page || data?.page || null);
        const apiItems = normalizeItems(data?.data?.items || data?.items || []);
        const apiBenefits = normalizeBenefits(
          data?.data?.benefits || data?.benefits || []
        );

        if (!page.is_active) {
          setHidden(true);
          return;
        }

        setPageData(page);
        setItems(apiItems);
        setBenefits(apiBenefits);
        setHidden(false);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Massage & Spa public fetch error:", error);

          setPageData(fallbackPage);
          setItems([]);
          setBenefits([]);
          setHidden(false);
        }
      }
    };

    fetchMassageSpa();

    return () => controller.abort();
  }, []);

  const spaServicesData = useMemo(() => {
    const apiSpaServices = items.filter(
      (item) => item.section === "spa_service"
    );

    return apiSpaServices.length ? apiSpaServices : fallbackSpaServices;
  }, [items]);

  const wellnessEnhancementsData = useMemo(() => {
    const apiWellness = items.filter(
      (item) => item.section === "wellness_enhancement"
    );

    return apiWellness.length ? apiWellness : fallbackWellnessEnhancements;
  }, [items]);

  const spaBenefits = benefits.length ? benefits : fallbackBenefits;

  const imgWrapper = "overflow-hidden rounded-md";
  const imgClass =
    "h-[200px] w-full object-cover transition-transform duration-700 ease-out hover:scale-110 sm:h-[240px] md:h-[260px]";

  if (hidden) return null;

  return (
    <div
      className="w-full overflow-hidden bg-[#f3f2ed] text-[#1c1c1c]"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      {/* HERO */}
      <section className="relative h-[75vh] overflow-hidden sm:h-[80vh] md:h-screen">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${pageData.hero_image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="absolute inset-0 bg-black/30" />

        <div className="relative z-10 flex h-full items-center justify-center px-4 text-center">
          <div className="animate-[fadeUp_1s_ease]">
            <h1 className="text-[22px] font-light leading-[1.1] text-white sm:text-[30px] md:text-[40px]">
              {pageData.hero_title}
            </h1>

            <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-white/90 sm:text-[12px] md:text-[15px]">
              {pageData.hero_subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="px-4 py-10 text-center sm:px-6">
        <p className="text-[10px] uppercase tracking-[0.15em] text-[#a88f53]">
          {pageData.intro_eyebrow}
        </p>

        <h2
          className="mt-2 text-[18px] text-[#203549] md:text-[26px]"
          style={{ fontFamily: '"Cormorant Garamond", serif' }}
        >
          {pageData.intro_title}
        </h2>

        <p className="mx-auto mt-3 max-w-[650px] text-[13px] leading-[1.6] text-[#444]">
          {pageData.intro_description}
        </p>
      </section>

      {/* EXPERIENCE */}
      <section className="mx-auto grid max-w-[1000px] grid-cols-1 items-center gap-6 px-4 pb-12 sm:px-6 md:grid-cols-2">
        <div className={imgWrapper}>
          <img
            src={pageData.experience_image}
            alt={pageData.experience_title}
            className={imgClass}
            onError={(e) => {
              e.currentTarget.src = spaExperienceImage;
            }}
          />
        </div>

        <div>
          <h2
            className="text-[18px] text-[#203549] sm:text-[20px] md:text-[24px]"
            style={{ fontFamily: '"Cormorant Garamond", serif' }}
          >
            {pageData.experience_title}
          </h2>

          <p className="mt-3 text-[13px] leading-[1.6] text-[#333]">
            {pageData.experience_description}
          </p>
        </div>
      </section>

      {/* SPA SERVICES */}
      <section className="mx-auto max-w-[1100px] px-4 pb-16 sm:px-6">
        <h2
          className="text-center text-[18px] text-[#203549] sm:text-[22px] md:text-[28px]"
          style={{ fontFamily: '"Cormorant Garamond", serif' }}
        >
          Spa Services
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8">
          {spaServicesData.map((item) => (
            <div key={item.id || item.title}>
              <div className={imgWrapper}>
                <img
                  src={item.image || spaServiceImageOne}
                  className={imgClass}
                  alt={item.title}
                  onError={(e) => {
                    e.currentTarget.src = spaServiceImageOne;
                  }}
                />
              </div>

              <h3 className="mt-4 text-[15px] text-[#203549] md:text-[16px]">
                {item.title}
              </h3>

              <p className="mt-2 text-[13px] leading-[1.6] text-[#333]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* WELLNESS */}
      <section className="mx-auto max-w-[1100px] px-4 pb-16 sm:px-6">
        <h2
          className="text-center text-[18px] text-[#203549] sm:text-[22px] md:text-[28px]"
          style={{ fontFamily: '"Cormorant Garamond", serif' }}
        >
          Wellness Enhancements
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 xl:grid-cols-3">
          {wellnessEnhancementsData.map((item) => (
            <div key={item.id || item.title}>
              <div className={imgWrapper}>
                <img
                  src={item.image || wellnessEnhancementImageOne}
                  className={imgClass}
                  alt={item.title}
                  onError={(e) => {
                    e.currentTarget.src = wellnessEnhancementImageOne;
                  }}
                />
              </div>

              <h3 className="mt-4 text-[15px] text-[#203549] md:text-[16px]">
                {item.title}
              </h3>

              <p className="mt-2 text-[13px] leading-[1.6] text-[#333]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* BENEFITS */}
      <section className="bg-[#fbfbfb] py-8">
        <div className="mx-auto flex max-w-[1000px] flex-col items-center px-4 text-center sm:px-6">
          <h2
            className="text-[18px] text-[#203549] md:text-[24px]"
            style={{ fontFamily: '"Cormorant Garamond", serif' }}
          >
            Spa Benefits
          </h2>

          <div className="mt-6 grid w-full max-w-[800px] grid-cols-1 gap-6 text-left sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((col) => (
              <ul key={col} className="space-y-2">
                {spaBenefits.slice(col * 4, col * 4 + 4).map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-[12px] text-[#222]"
                  >
                    <span className="mt-[6px] h-[4px] w-[4px] rounded-full bg-[#8d6f53]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ))}
          </div>

          <div className="mt-8 w-full max-w-[500px] border-b border-[#b9a27e]" />
        </div>
      </section>
    </div>
  );
}
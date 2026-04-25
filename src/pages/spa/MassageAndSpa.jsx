import React, { useEffect, useMemo, useState } from "react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

const API_ROOT_URL = API_BASE_URL.replace(/\/api\/?$/, "");

function buildImageUrl(path) {
  if (!path || typeof path !== "string") return "";

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

function normalizePage(page) {
  if (!page) return null;

  return {
    hero_title: page.hero_title || "",
    hero_subtitle: page.hero_subtitle || "",
    hero_image: buildImageUrl(page.hero_image || ""),

    intro_eyebrow: page.intro_eyebrow || "",
    intro_title: page.intro_title || "",
    intro_description: page.intro_description || "",

    experience_title: page.experience_title || "",
    experience_description: page.experience_description || "",
    experience_image: buildImageUrl(page.experience_image || ""),

    is_active: toBoolean(page.is_active ?? true),
  };
}

function normalizeCards(cards = []) {
  if (!Array.isArray(cards)) return [];

  return cards
    .filter((item) => toBoolean(item.is_active ?? true))
    .sort((a, b) => Number(a.sort_order ?? 0) - Number(b.sort_order ?? 0))
    .map((item) => ({
      id: item.id,
      title: item.title || "",
      description: item.description || "",
      image: buildImageUrl(item.image || item.image_url || ""),
      sort_order: Number(item.sort_order ?? 0),
      is_active: toBoolean(item.is_active ?? true),
    }))
    .filter((item) => item.title || item.description || item.image);
}

function normalizeBenefits(benefits = []) {
  if (!Array.isArray(benefits)) return [];

  return benefits
    .filter((item) => toBoolean(item.is_active ?? true))
    .sort((a, b) => Number(a.sort_order ?? 0) - Number(b.sort_order ?? 0))
    .map((item) => ({
      id: item.id,
      title: item.title || "",
      sort_order: Number(item.sort_order ?? 0),
    }))
    .filter((item) => item.title);
}

export default function MassageAndSpa() {
  const [pageData, setPageData] = useState(null);
  const [spaServices, setSpaServices] = useState([]);
  const [wellnessEnhancements, setWellnessEnhancements] = useState([]);
  const [benefits, setBenefits] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const fetchMassageSpa = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_BASE_URL}/massage-spa`, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
          signal: controller.signal,
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result?.message || "Failed to load Massage & Spa.");
        }

        const payload = result?.data || {};

        const page = normalizePage(payload.page || null);

        const apiSpaServices = normalizeCards(
          payload.spa_services ||
            payload.spaServices ||
            payload.items?.filter((item) => item.section === "spa_service") ||
            []
        );

        const apiWellnessEnhancements = normalizeCards(
          payload.wellness_enhancements ||
            payload.wellnessEnhancements ||
            payload.items?.filter(
              (item) => item.section === "wellness_enhancement"
            ) ||
            []
        );

        const apiBenefits = normalizeBenefits(
          payload.spa_benefits || payload.spaBenefits || payload.benefits || []
        );

        setPageData(page);
        setSpaServices(apiSpaServices);
        setWellnessEnhancements(apiWellnessEnhancements);
        setBenefits(apiBenefits);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Massage & Spa public fetch error:", err);
          setError(err.message || "Unable to load Massage & Spa content.");
          setPageData(null);
          setSpaServices([]);
          setWellnessEnhancements([]);
          setBenefits([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMassageSpa();

    return () => controller.abort();
  }, []);

  const hasAnyContent = useMemo(() => {
    return (
      pageData ||
      spaServices.length > 0 ||
      wellnessEnhancements.length > 0 ||
      benefits.length > 0
    );
  }, [pageData, spaServices, wellnessEnhancements, benefits]);

  const hasHero =
    pageData?.hero_title || pageData?.hero_subtitle || pageData?.hero_image;

  const hasIntro =
    pageData?.intro_eyebrow ||
    pageData?.intro_title ||
    pageData?.intro_description;

  const hasExperience =
    pageData?.experience_title ||
    pageData?.experience_description ||
    pageData?.experience_image;

  if (loading) {
    return (
      <div
        className="flex min-h-screen items-center justify-center bg-[#f3f2ed] px-4 text-center"
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        <div className="rounded-2xl bg-white px-6 py-5 text-sm font-semibold text-[#203549] shadow-sm">
          Loading Massage & Spa content...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="flex min-h-screen items-center justify-center bg-[#f3f2ed] px-4 text-center"
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        <div className="max-w-[620px] rounded-2xl border border-red-200 bg-red-50 px-6 py-5 text-sm font-semibold text-red-700">
          {error}
        </div>
      </div>
    );
  }

  if (!hasAnyContent) {
    return (
      <div
        className="flex min-h-screen items-center justify-center bg-[#f3f2ed] px-4 text-center"
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        <div className="max-w-[620px] rounded-2xl border border-slate-200 bg-white px-6 py-5 text-sm font-semibold text-slate-600 shadow-sm">
          Massage & Spa content is not available yet. Please add content from
          dashboard.
        </div>
      </div>
    );
  }

  if (pageData && !pageData.is_active) {
    return (
      <div
        className="flex min-h-screen items-center justify-center bg-[#f3f2ed] px-4 text-center"
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        <div className="max-w-[620px] rounded-2xl border border-slate-200 bg-white px-6 py-5 text-sm font-semibold text-slate-600 shadow-sm">
          Massage & Spa page is currently inactive.
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full overflow-hidden bg-[#f3f2ed] text-[#1c1c1c]"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      {/* HERO / BIG BANNER */}
      {hasHero && (
        <section className="relative h-[78vh] min-h-[520px] overflow-hidden bg-[#152529] md:h-screen">
          {pageData.hero_image ? (
            <img
              src={pageData.hero_image}
              alt={pageData.hero_title || "Massage and Spa"}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#203549] via-[#243f43] to-[#111827]" />
          )}

          <div className="absolute inset-0 bg-black/45" />

          <div className="relative z-10 flex h-full items-center justify-center px-5 text-center">
            <div className="mx-auto max-w-[780px] animate-[fadeUp_1s_ease]">
              {pageData.hero_title && (
                <h1 className="text-[34px] font-light leading-[1.1] text-white sm:text-[46px] md:text-[62px]">
                  {pageData.hero_title}
                </h1>
              )}

              {pageData.hero_subtitle && (
                <p className="mx-auto mt-5 max-w-[720px] text-[11px] uppercase tracking-[0.28em] text-white/90 sm:text-[13px] md:text-[16px]">
                  {pageData.hero_subtitle}
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* INTRO */}
      {hasIntro && (
        <section className="bg-[#f3f2ed] px-5 py-14 text-center sm:px-6 md:py-16">
          <div className="mx-auto max-w-[850px]">
            {pageData.intro_eyebrow && (
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#a88f53]">
                {pageData.intro_eyebrow}
              </p>
            )}

            {pageData.intro_title && (
              <h2
                className="mt-4 text-[28px] font-light text-[#203549] md:text-[42px]"
                style={{ fontFamily: '"Cormorant Garamond", serif' }}
              >
                {pageData.intro_title}
              </h2>
            )}

            {pageData.intro_description && (
              <p className="mx-auto mt-5 max-w-[720px] text-[14px] leading-[1.8] text-[#444] md:text-[16px]">
                {pageData.intro_description}
              </p>
            )}
          </div>
        </section>
      )}

      {/* EXPERIENCE */}
      {hasExperience && (
        <section className="bg-white px-5 py-14 sm:px-6 md:py-16">
          <div
            className={`mx-auto grid max-w-[1100px] grid-cols-1 items-center gap-8 ${
              pageData.experience_image ? "md:grid-cols-2" : ""
            }`}
          >
            {pageData.experience_image && (
              <div className="overflow-hidden rounded-2xl bg-slate-100 shadow-sm">
                <img
                  src={pageData.experience_image}
                  alt={pageData.experience_title || "Spa experience"}
                  className="h-[280px] w-full object-cover transition duration-700 hover:scale-105 md:h-[420px]"
                />
              </div>
            )}

            <div className="text-center md:text-left">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#a88f53]">
                Wellness Experience
              </p>

              {pageData.experience_title && (
                <h2
                  className="mt-4 text-[28px] font-light text-[#203549] md:text-[40px]"
                  style={{ fontFamily: '"Cormorant Garamond", serif' }}
                >
                  {pageData.experience_title}
                </h2>
              )}

              {pageData.experience_description && (
                <p className="mt-5 text-[14px] leading-[1.8] text-[#444] md:text-[16px]">
                  {pageData.experience_description}
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* SPA SERVICES */}
      {spaServices.length > 0 && (
        <section className="bg-[#f3f2ed] px-5 py-14 sm:px-6 md:py-16">
          <div className="mx-auto max-w-[1150px]">
            <div className="text-center">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#a88f53]">
                From Dashboard
              </p>

              <h2
                className="mt-3 text-[28px] font-light text-[#203549] md:text-[42px]"
                style={{ fontFamily: '"Cormorant Garamond", serif' }}
              >
                Spa Services
              </h2>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-7 sm:grid-cols-2">
              {spaServices.map((item) => (
                <ContentCard key={item.id || item.title} item={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* WELLNESS ENHANCEMENTS */}
      {wellnessEnhancements.length > 0 && (
        <section className="bg-white px-5 py-14 sm:px-6 md:py-16">
          <div className="mx-auto max-w-[1150px]">
            <div className="text-center">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#a88f53]">
                Relax More
              </p>

              <h2
                className="mt-3 text-[28px] font-light text-[#203549] md:text-[42px]"
                style={{ fontFamily: '"Cormorant Garamond", serif' }}
              >
                Wellness Enhancements
              </h2>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {wellnessEnhancements.map((item) => (
                <ContentCard key={item.id || item.title} item={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* BENEFITS */}
      {benefits.length > 0 && (
        <section className="bg-[#fbfbfb] px-5 py-14 sm:px-6 md:py-16">
          <div className="mx-auto max-w-[1000px] text-center">
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#a88f53]">
              Why Choose Us
            </p>

            <h2
              className="mt-3 text-[28px] font-light text-[#203549] md:text-[42px]"
              style={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
              Spa Benefits
            </h2>

            <div className="mt-9 grid grid-cols-1 gap-4 text-left sm:grid-cols-2 lg:grid-cols-3">
              {benefits.map((benefit) => (
                <div
                  key={benefit.id || benefit.title}
                  className="rounded-2xl border border-[#e7dccb] bg-white px-5 py-4 shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-[7px] h-2 w-2 shrink-0 rounded-full bg-[#a88f53]" />

                    <p className="text-[13px] font-medium leading-6 text-[#333] md:text-[14px]">
                      {benefit.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mx-auto mt-10 w-full max-w-[500px] border-b border-[#b9a27e]" />
          </div>
        </section>
      )}
    </div>
  );
}

function ContentCard({ item }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-[#e9e1d4] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      {item.image && (
        <div className="h-[240px] overflow-hidden bg-slate-100 md:h-[300px]">
          <img
            src={item.image}
            alt={item.title || "Spa service"}
            className="h-full w-full object-cover transition duration-700 hover:scale-105"
          />
        </div>
      )}

      <div className="p-6">
        {item.title && (
          <h3 className="text-[16px] font-semibold uppercase tracking-[0.06em] text-[#203549]">
            {item.title}
          </h3>
        )}

        {item.description && (
          <p className="mt-3 text-[13px] leading-[1.8] text-[#555] md:text-[14px]">
            {item.description}
          </p>
        )}
      </div>
    </article>
  );
}
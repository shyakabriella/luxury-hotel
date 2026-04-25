import React, { useEffect, useMemo, useState } from "react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

const API_ROOT_URL = API_BASE_URL.replace(/\/api\/?$/, "");

function buildImageUrl(path) {
  if (!path) return "";

  if (typeof path !== "string") return "";

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

function getApiPayload(data) {
  return data?.data || data || {};
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

function normalizeItems(items = []) {
  if (!Array.isArray(items)) return [];

  return items
    .filter((item) => toBoolean(item.is_active ?? true))
    .sort((a, b) => {
      const sectionA = String(a.section || "");
      const sectionB = String(b.section || "");

      if (sectionA !== sectionB) {
        return sectionA.localeCompare(sectionB);
      }

      return Number(a.sort_order ?? 0) - Number(b.sort_order ?? 0);
    })
    .map((item) => ({
      id: item.id,
      section: item.section || "spa_service",
      title: item.title || "",
      description: item.description || "",
      image: buildImageUrl(item.image || item.image_url || ""),
      sort_order: Number(item.sort_order ?? 0),
      is_active: toBoolean(item.is_active ?? true),
    }));
}

function normalizeBenefits(benefits = []) {
  if (!Array.isArray(benefits)) return [];

  return benefits
    .filter((benefit) => toBoolean(benefit.is_active ?? true))
    .sort((a, b) => Number(a.sort_order ?? 0) - Number(b.sort_order ?? 0))
    .map((benefit) => ({
      id: benefit.id,
      title: benefit.title || "",
      sort_order: Number(benefit.sort_order ?? 0),
    }))
    .filter((benefit) => benefit.title);
}

export default function MassageAndSpa() {
  const [pageData, setPageData] = useState(null);
  const [items, setItems] = useState([]);
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

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.message || "Failed to load Massage & Spa.");
        }

        const payload = getApiPayload(data);

        const page = normalizePage(payload.page || null);
        const apiItems = normalizeItems(payload.items || []);
        const apiBenefits = normalizeBenefits(payload.benefits || []);

        setPageData(page);
        setItems(apiItems);
        setBenefits(apiBenefits);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Massage & Spa public fetch error:", err);
          setError(err.message || "Unable to load Massage & Spa content.");
          setPageData(null);
          setItems([]);
          setBenefits([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMassageSpa();

    return () => controller.abort();
  }, []);

  const spaServicesData = useMemo(() => {
    return items.filter((item) => item.section === "spa_service");
  }, [items]);

  const wellnessEnhancementsData = useMemo(() => {
    return items.filter((item) => item.section === "wellness_enhancement");
  }, [items]);

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

  const imgWrapper = "overflow-hidden rounded-md bg-slate-100";
  const imgClass =
    "h-[200px] w-full object-cover transition-transform duration-700 ease-out hover:scale-110 sm:h-[240px] md:h-[260px]";

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

  if (!pageData && items.length === 0 && benefits.length === 0) {
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
      {/* HERO */}
      {hasHero && (
        <section className="relative h-[75vh] overflow-hidden bg-slate-900 sm:h-[80vh] md:h-screen">
          {pageData.hero_image && (
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${pageData.hero_image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          )}

          <div className="absolute inset-0 bg-black/40" />

          <div className="relative z-10 flex h-full items-center justify-center px-4 text-center">
            <div className="animate-[fadeUp_1s_ease]">
              {pageData.hero_title && (
                <h1 className="text-[22px] font-light leading-[1.1] text-white sm:text-[30px] md:text-[40px]">
                  {pageData.hero_title}
                </h1>
              )}

              {pageData.hero_subtitle && (
                <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-white/90 sm:text-[12px] md:text-[15px]">
                  {pageData.hero_subtitle}
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* INTRO */}
      {hasIntro && (
        <section className="px-4 py-10 text-center sm:px-6">
          {pageData.intro_eyebrow && (
            <p className="text-[10px] uppercase tracking-[0.15em] text-[#a88f53]">
              {pageData.intro_eyebrow}
            </p>
          )}

          {pageData.intro_title && (
            <h2
              className="mt-2 text-[18px] text-[#203549] md:text-[26px]"
              style={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
              {pageData.intro_title}
            </h2>
          )}

          {pageData.intro_description && (
            <p className="mx-auto mt-3 max-w-[650px] text-[13px] leading-[1.6] text-[#444]">
              {pageData.intro_description}
            </p>
          )}
        </section>
      )}

      {/* EXPERIENCE */}
      {hasExperience && (
        <section
          className={`mx-auto grid max-w-[1000px] grid-cols-1 items-center gap-6 px-4 pb-12 sm:px-6 ${
            pageData.experience_image ? "md:grid-cols-2" : "md:grid-cols-1"
          }`}
        >
          {pageData.experience_image && (
            <div className={imgWrapper}>
              <img
                src={pageData.experience_image}
                alt={pageData.experience_title || "Spa experience"}
                className={imgClass}
              />
            </div>
          )}

          <div>
            {pageData.experience_title && (
              <h2
                className="text-[18px] text-[#203549] sm:text-[20px] md:text-[24px]"
                style={{ fontFamily: '"Cormorant Garamond", serif' }}
              >
                {pageData.experience_title}
              </h2>
            )}

            {pageData.experience_description && (
              <p className="mt-3 text-[13px] leading-[1.6] text-[#333]">
                {pageData.experience_description}
              </p>
            )}
          </div>
        </section>
      )}

      {/* SPA SERVICES */}
      {spaServicesData.length > 0 && (
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
                {item.image && (
                  <div className={imgWrapper}>
                    <img
                      src={item.image}
                      className={imgClass}
                      alt={item.title}
                    />
                  </div>
                )}

                {item.title && (
                  <h3 className="mt-4 text-[15px] text-[#203549] md:text-[16px]">
                    {item.title}
                  </h3>
                )}

                {item.description && (
                  <p className="mt-2 text-[13px] leading-[1.6] text-[#333]">
                    {item.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* WELLNESS ENHANCEMENTS */}
      {wellnessEnhancementsData.length > 0 && (
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
                {item.image && (
                  <div className={imgWrapper}>
                    <img
                      src={item.image}
                      className={imgClass}
                      alt={item.title}
                    />
                  </div>
                )}

                {item.title && (
                  <h3 className="mt-4 text-[15px] text-[#203549] md:text-[16px]">
                    {item.title}
                  </h3>
                )}

                {item.description && (
                  <p className="mt-2 text-[13px] leading-[1.6] text-[#333]">
                    {item.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* BENEFITS */}
      {benefits.length > 0 && (
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
                  {benefits.slice(col * 4, col * 4 + 4).map((benefit) => (
                    <li
                      key={benefit.id || benefit.title}
                      className="flex items-start gap-2 text-[12px] text-[#222]"
                    >
                      <span className="mt-[6px] h-[4px] w-[4px] rounded-full bg-[#8d6f53]" />
                      <span>{benefit.title}</span>
                    </li>
                  ))}
                </ul>
              ))}
            </div>

            <div className="mt-8 w-full max-w-[500px] border-b border-[#b9a27e]" />
          </div>
        </section>
      )}
    </div>
  );
}
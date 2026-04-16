import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Sitemap() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      title: "Main Pages",
      links: [
        { name: "Home", path: "/" },
        { name: "Spa & Wellness", path: "/spa" },
        { name: "Careers", path: "/careers" },

        // NEW PLACEHOLDERS (not active routes)
        { name: "Wedding", path: "#" },
        { name: "Restaurant", path: "#" },
        { name: "Meetings", path: "#" },
        { name: "Gym", path: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", path: "/privacy-policy" },
        { name: "Sitemap", path: "/sitemap" },
      ],
    },
  ];

  return (
    <div
      className="w-full overflow-hidden bg-[#f3f2ed] text-[#1c1c1c]"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      {/* HERO */}
      <section className="relative h-[55vh] md:h-[65vh] overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1524661135-423995f22d0b)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 flex h-full items-center justify-center text-center px-4">
          <div>
            <h1
              className="text-[26px] sm:text-[34px] md:text-[44px] font-light text-white"
              style={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
              Sitemap
            </h1>
            <p className="mt-3 text-[10px] sm:text-[12px] tracking-[0.2em] text-white/90 uppercase">
              Navigate Everything
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-[900px] mx-auto px-6 py-12">
        <p className="text-center text-[13px] text-[#444] leading-[1.7]">
          Find all important pages of our website in one place for easy navigation.
        </p>

        <div className="mt-10 space-y-10">
          {sections.map((section) => (
            <div key={section.title}>
              <h2
                className="text-[18px] text-[#203549] mb-4"
                style={{ fontFamily: '"Cormorant Garamond", serif' }}
              >
                {section.title}
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                {section.links.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`bg-white/60 border border-black/5 rounded-md p-4 text-[14px] text-[#203549] hover:shadow-sm transition flex justify-between items-center ${
                      link.path === "#" ? "opacity-60 pointer-events-none" : ""
                    }`}
                  >
                    <span>{link.name}</span>
                    <span className="text-[#a88f53]">→</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 border-b border-[#b9a27e]" />
      </section>
    </div>
  );
}
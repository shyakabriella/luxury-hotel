import { useState } from "react";
import { categories, images } from "../../data/galleryAssets";

export default function Gallery() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? images
      : images.filter((img) => img.category === active);

  return (
    <section className="py-24 bg-[#f8f6f2]">
      <div className="max-w-6xl mx-auto px-4">

        {/* 🏷️ TITLE */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-semibold text-[#1f3d3f] tracking-tight">
            Our Gallery
          </h2>
          <p className="mt-3 text-gray-600 text-sm md:text-base mx-auto">
            A glimpse into our spaces — weddings, comfort, relaxation, and unforgettable experiences.
          </p>
        </div>

        {/* 🔘 FILTER BUTTONS */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 text-sm rounded-full border transition-all duration-300
                ${
                  active === cat
                    ? "bg-[#1f3d3f] text-white shadow-md scale-105"
                    : "bg-white text-[#1f3d3f] hover:bg-[#1f3d3f] hover:text-white hover:scale-105"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 🖼️ GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((img, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl shadow-md group"
            >
              <img
                src={img.src}
                alt={img.category}
                className="w-full h-48 object-cover transition duration-500 group-hover:scale-110"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
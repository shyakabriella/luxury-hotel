import React, { useEffect } from "react";

// SPA ASSETS
import spaHeroImage from "../../assets/homepage/massage-sauna/massage-one.jpg";
import spaExperienceImage from "../../assets/homepage/massage-sauna/massage-two.jpg";
import spaServiceImageOne from "../../assets/homepage/massage-sauna/massage-four.jpg";
import spaServiceImageTwo from "../../assets/homepage/massage-sauna/massage-five.jpg";
import wellnessEnhancementImageOne from "../../assets/homepage/massage-sauna/massage-three.jpg";
import wellnessEnhancementImageTwo from "../../assets/homepage/massage-sauna/massage-six.jpg";
import wellnessEnhancementImageThree from "../../assets/homepage/massage-sauna/massage-seven.jpg";

const spaServicesData = [
  {
    title: "CUSTOM MASSAGE TREATMENTS",
    image: spaServiceImageOne,
    description:
      "Personalized massage therapies designed to relieve stress, improve circulation, and restore full body relaxation.",
  },
  {
    title: "RELAXATION SESSIONS",
    image: spaServiceImageTwo,
    description:
      "Calming spa experiences focused on reducing tension and helping you fully unwind in a peaceful environment.",
  },
];

const wellnessEnhancementsData = [
  {
    title: "AROMATHERAPY",
    image: wellnessEnhancementImageOne,
    description:
      "Essential oil treatments that enhance relaxation, balance mood, and promote mental clarity.",
  },
  {
    title: "STEAM & SAUNA",
    image: wellnessEnhancementImageTwo,
    description:
      "Detoxifying heat therapy sessions that help relax muscles and refresh your body.",
  },
  {
    title: "COUPLES MASSAGE",
    image: wellnessEnhancementImageThree,
    description:
      "Shared relaxation experiences in a private setting designed for comfort and connection.",
  },
];

const spaBenefits = [
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

export default function MassageAndSpa() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const imgWrapper = "overflow-hidden rounded-md";
  const imgClass =
    "w-full h-[200px] sm:h-[240px] md:h-[260px] object-cover transition-transform duration-700 ease-out hover:scale-110";

  return (
    <div
      className="w-full overflow-hidden bg-[#f3f2ed] text-[#1c1c1c]"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      {/* HERO */}
      <section className="relative h-[75vh] sm:h-[80vh] md:h-screen overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${spaHeroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-black/30" />

        <div className="relative z-10 flex h-full items-center justify-center px-4 text-center">
          <div className="animate-[fadeUp_1s_ease]">
            <h1 className="text-[22px] sm:text-[30px] md:text-[40px] font-light text-white leading-[1.1]">
              Spa & Wellness
            </h1>

            <p className="mt-3 text-[10px] sm:text-[12px] md:text-[15px] tracking-[0.2em] text-white/90 uppercase">
              Luxury Spa Experience in Kigali
            </p>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="text-center py-10 px-4 sm:px-6">
        <p className="text-[#a88f53] uppercase tracking-[0.15em] text-[10px]">
          Luxury Spa Experience in Kigali, Rwanda
        </p>

        <h2
          className="mt-2 text-[18px] md:text-[26px] text-[#203549]"
          style={{ fontFamily: '"Cormorant Garamond", serif' }}
        >
          Relaxation & Rejuvenation
        </h2>

        <p className="mt-3 max-w-[650px] mx-auto text-[13px] leading-[1.6] text-[#444]">
          Step into a world of calm and comfort. Our spa experiences are designed
          to help you relax, recover, and restore your natural balance.
        </p>
      </section>

      {/* EXPERIENCE */}
      <section className="max-w-[1000px] mx-auto px-4 sm:px-6 pb-12 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className={imgWrapper}>
          <img
            src={spaExperienceImage}
            alt="Spa experience"
            className={imgClass}
          />
        </div>

        <div>
          <h2
            className="text-[18px] sm:text-[20px] md:text-[24px] text-[#203549]"
            style={{ fontFamily: '"Cormorant Garamond", serif' }}
          >
            Complete Wellness Experience
          </h2>

          <p className="mt-3 text-[13px] leading-[1.6] text-[#333]">
            Enjoy deeply relaxing treatments tailored to your needs, from soothing
            massages to full-body wellness therapies designed to refresh your mind
            and body.
          </p>
        </div>
      </section>

      {/* SPA SERVICES */}
      <section className="max-w-[1100px] mx-auto px-4 sm:px-6 pb-16">
        <h2
          className="text-center text-[18px] sm:text-[22px] md:text-[28px] text-[#203549]"
          style={{ fontFamily: '"Cormorant Garamond", serif' }}
        >
          Spa Services
        </h2>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          {spaServicesData.map((item) => (
            <div key={item.title}>
              <div className={imgWrapper}>
                <img src={item.image} className={imgClass} alt={item.title} />
              </div>

              <h3 className="mt-4 text-[15px] md:text-[16px] text-[#203549]">
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
      <section className="max-w-[1100px] mx-auto px-4 sm:px-6 pb-16">
        <h2
          className="text-center text-[18px] sm:text-[22px] md:text-[28px] text-[#203549]"
          style={{ fontFamily: '"Cormorant Garamond", serif' }}
        >
          Wellness Enhancements
        </h2>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          {wellnessEnhancementsData.map((item) => (
            <div key={item.title}>
              <div className={imgWrapper}>
                <img src={item.image} className={imgClass} alt={item.title} />
              </div>

              <h3 className="mt-4 text-[15px] md:text-[16px] text-[#203549]">
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
        <div className="mx-auto max-w-[1000px] px-4 sm:px-6 text-center flex flex-col items-center">

          <h2
            className="text-[18px] md:text-[24px] text-[#203549]"
            style={{ fontFamily: '"Cormorant Garamond", serif' }}
          >
            Spa Benefits
          </h2>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left w-full max-w-[800px]">
            {[0, 1, 2].map((col) => (
              <ul key={col} className="space-y-2">
                {spaBenefits.slice(col * 4, col * 4 + 4).map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-[12px] text-[#222]"
                  >
                    <span className="h-[4px] w-[4px] mt-[6px] rounded-full bg-[#8d6f53]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ))}
          </div>

          <div className="mt-8 border-b border-[#b9a27e] w-full max-w-[500px]" />
        </div>
      </section>
    </div>
  );
}
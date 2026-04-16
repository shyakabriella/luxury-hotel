import React, { useEffect } from "react";

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="w-full overflow-hidden bg-[#f3f2ed] -mt-25 text-[#1c1c1c]"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      {/* HERO */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1450101499163-c8848c66ca85)",
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
              Privacy Policy
            </h1>
            <p className="mt-3 text-[10px] sm:text-[12px] tracking-[0.2em] text-white/90 uppercase">
              Your Information Matters
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-[900px] mx-auto px-6 py-12">
        <p className="text-[13px] text-[#444] leading-[1.7]">
          We respect your privacy and are committed to protecting any personal
          information you share with us when using our website or services.
        </p>

        <div className="mt-8 space-y-8 text-[13px] text-[#333] leading-[1.7]">
          <div>
            <h2 className="text-[16px] text-[#203549] mb-2">
              1. Information We Collect
            </h2>
            <p>
              We may collect personal details such as your name, email address,
              phone number, and booking information when you interact with our
              services.
            </p>
          </div>

          <div>
            <h2 className="text-[16px] text-[#203549] mb-2">
              2. How We Use Your Information
            </h2>
            <p>
              Your information is used to process bookings, improve services,
              communicate updates, and enhance your overall experience.
            </p>
          </div>

          <div>
            <h2 className="text-[16px] text-[#203549] mb-2">
              3. Data Protection
            </h2>
            <p>
              We implement security measures to protect your data from
              unauthorized access, alteration, or disclosure.
            </p>
          </div>

          <div>
            <h2 className="text-[16px] text-[#203549] mb-2">
              4. Third-Party Services
            </h2>
            <p>
              We may use trusted third-party services for bookings, analytics,
              and payments. These providers have their own privacy policies.
            </p>
          </div>

          <div>
            <h2 className="text-[16px] text-[#203549] mb-2">
              5. Cookies
            </h2>
            <p>
              Our website may use cookies to improve user experience and track
              usage patterns for optimization.
            </p>
          </div>

          <div>
            <h2 className="text-[16px] text-[#203549] mb-2">
              6. Your Rights
            </h2>
            <p>
              You have the right to request access, updates, or deletion of your
              personal data at any time.
            </p>
          </div>

          <div>
            <h2 className="text-[16px] text-[#203549] mb-2">
              7. Contact Us
            </h2>
            <p>
              If you have any questions regarding this Privacy Policy, you may
              contact us via email or through our website contact form.
            </p>
          </div>
        </div>

        <div className="mt-10 border-b border-[#b9a27e]" />
      </section>
    </div>
  );
}
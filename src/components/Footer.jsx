import React from "react";

function FacebookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M13.5 21v-7h2.3l.3-2.7h-2.6V9.6c0-.8.2-1.3 1.3-1.3H16V5.9c-.2 0-.9-.1-1.8-.1-1.8 0-3.1 1.1-3.1 3.2v2.2H9v2.7h2.3v7h2.2Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M7.5 3h9A4.5 4.5 0 0 1 21 7.5v9a4.5 4.5 0 0 1-4.5 4.5h-9A4.5 4.5 0 0 1 3 16.5v-9A4.5 4.5 0 0 1 7.5 3Zm0 1.8A2.7 2.7 0 0 0 4.8 7.5v9a2.7 2.7 0 0 0 2.7 2.7h9a2.7 2.7 0 0 0 2.7-2.7v-9a2.7 2.7 0 0 0-2.7-2.7h-9Zm9.5 1.3a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 8.2A3.8 3.8 0 1 1 8.2 12 3.8 3.8 0 0 1 12 8.2Zm0 1.8A2 2 0 1 0 14 12a2 2 0 0 0-2-2Z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M14.8 3c.2 1.7 1.2 3 2.8 3.9.8.4 1.6.7 2.4.8v2.7c-1.5-.1-2.9-.6-4.1-1.4v6.2c0 3-2.1 5.4-5.2 5.8-3.5.4-6.5-2.2-6.7-5.7-.2-3.3 2.3-6 5.5-6.2.4 0 .7 0 1.1.1v2.8a3 3 0 0 0-1-.1 3.2 3.2 0 0 0-2.8 4.6c.5 1 1.6 1.7 2.8 1.7 1.8 0 3.2-1.4 3.2-3.2V3h2Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer
      className="bg-[#183236] text-white"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      {/* top newsletter area */}
      <div className="border-b border-[#9b8754]">
        <div className="mx-auto max-w-[1200px] px-5 py-12 sm:px-6 md:px-8 lg:px-10">
          <div className="mx-auto max-w-[980px]">
            <h2 className="text-center text-[40px] font-light leading-none tracking-[-0.03em] text-white sm:text-[54px] md:text-[64px]">
              Journey With Us
            </h2>

            <form className="mt-10">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_1fr_1fr_auto]">
                <input
                  type="text"
                  placeholder="First Name"
                  className="h-[52px] border border-[#9b8754] bg-transparent px-4 text-[16px] text-white outline-none placeholder:text-white/85"
                />

                <input
                  type="text"
                  placeholder="Last Name"
                  className="h-[52px] border border-[#9b8754] bg-transparent px-4 text-[16px] text-white outline-none placeholder:text-white/85"
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  className="h-[52px] border border-[#9b8754] bg-transparent px-4 text-[16px] text-white outline-none placeholder:text-white/85"
                />

                <button
                  type="submit"
                  className="h-[52px] min-w-[140px] bg-[#b39a60] px-6 text-[18px] font-normal text-white transition hover:opacity-90"
                >
                  Sign Up
                </button>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                <label className="flex items-start gap-3 text-[13px] text-white/95">
                  <input
                    type="checkbox"
                    className="mt-1 h-3.5 w-3.5 appearance-none border border-[#9b8754] bg-transparent checked:bg-[#b39a60]"
                  />
                  <span>I have read and agree to the Privacy Policy.</span>
                </label>

                <label className="flex items-start gap-3 text-[13px] text-white/95">
                  <input
                    type="checkbox"
                    className="mt-1 h-3.5 w-3.5 appearance-none border border-[#9b8754] bg-transparent checked:bg-[#b39a60]"
                  />
                  <span>
                    Yes, I would like to receive emails with exclusive specials
                    and offers.
                  </span>
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* middle footer content */}
      <div className="border-b border-[#9b8754]">
        <div className="mx-auto max-w-[1200px] px-5 py-14 sm:px-6 md:px-8 lg:px-10">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
            {/* left block */}
            <div className="text-center md:text-left">
              <div className="inline-flex flex-col items-center md:items-start">
                <div className="text-[18px] font-semibold uppercase tracking-wide text-white sm:text-[22px]">
                  Luxury Garden Palace
                </div>
                <div className="mt-1 h-[2px] w-[190px] bg-white/90" />
              </div>

              <div className="mt-10 space-y-1 text-[15px] leading-[1.65] text-white/95">
                <p>Luxury Garden Palace Karama</p>
                <p>Luxury Garden Palace Karama, KN 443 ST</p>
                <p>+250 780 443 787</p>
              </div>
            </div>

            {/* center block logo */}
            <div className="flex items-center justify-center">
              <a
                href="/"
                className="flex items-center justify-center rounded-2xl border border-white/15 bg-black/10 px-6 py-5 shadow-[0_10px_30px_rgba(0,0,0,0.22)] backdrop-blur-sm transition hover:scale-[1.02]"
              >
                <img
                  src="/losgo.png"
                  alt="Wonder Valley Logo"
                  className="h-[90px] w-auto max-w-[220px] object-contain drop-shadow-[0_6px_20px_rgba(0,0,0,0.55)] sm:h-[105px] md:h-[115px] lg:h-[125px]"
                />
              </a>
            </div>

            {/* right block */}
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
              <div className="space-y-3 text-center sm:text-left">
                <a
                  href="#"
                  className="block text-[16px] text-[#b39a60] underline underline-offset-4"
                >
                  Contact Us
                </a>
                <a
                  href="#"
                  className="block text-[16px] text-[#b39a60] underline underline-offset-4"
                >
                  Careers
                </a>
                <a
                  href="#"
                  className="block text-[16px] text-[#b39a60] underline underline-offset-4"
                >
                  Summer Camp
                </a>
              </div>

              <div className="space-y-3 text-center sm:text-left">
                <a
                  href="#"
                  className="block text-[16px] text-white underline underline-offset-4"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="block text-[16px] text-white underline underline-offset-4"
                >
                  Accessibility
                </a>
                <a
                  href="#"
                  className="block text-[16px] text-white underline underline-offset-4"
                >
                  Sitemap
                </a>
                <a
                  href="#"
                  className="block text-[16px] text-white underline underline-offset-4"
                >
                  Consent Preferences
                </a>

                <div className="flex items-center justify-center gap-6 pt-8 sm:justify-start">
                  <a
                    href="#"
                    aria-label="Facebook"
                    className="text-white transition hover:text-[#b39a60]"
                  >
                    <FacebookIcon />
                  </a>
                  <a
                    href="#"
                    aria-label="Instagram"
                    className="text-white transition hover:text-[#b39a60]"
                  >
                    <InstagramIcon />
                  </a>
                  <a
                    href="#"
                    aria-label="TikTok"
                    className="text-white transition hover:text-[#b39a60]"
                  >
                    <TikTokIcon />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* bottom footer bar */}
      <div>
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4 px-5 py-6 text-center text-[13px] text-white/90 sm:px-6 md:flex-row md:px-8 lg:px-10">
          <p>Luxury Garden Palace. 2026. All Rights Reserved.</p>
          <p>In partnership with African Safari & Hotel Booking Hub</p>
        </div>
      </div>
    </footer>
  );
}
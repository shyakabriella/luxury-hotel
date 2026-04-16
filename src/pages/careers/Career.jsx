import React, { useEffect } from "react";

export default function Career() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div
            className="w-full overflow-hidden -mt-25 bg-[#f3f2ed] text-[#1c1c1c]"
            style={{ fontFamily: "Montserrat, sans-serif" }}
        >
            {/* HERO */}
            <section className="relative h-screen overflow-hidden">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage:
                            "url(https://images.pexels.com/photos/9301297/pexels-photo-9301297.jpeg)", // direct image file
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
                <div className="absolute inset-0 bg-black/40" />

                {/* Hero content */}
                <div className="relative z-10 flex h-full items-center justify-center text-center px-4">
                    <div className="animate-[fadeUp_1s_ease]">
                        <h1
                            className="text-[26px] sm:text-[34px] md:text-[44px] font-light text-white"
                            style={{ fontFamily: '"Cormorant Garamond", serif' }}
                        >
                            Careers
                        </h1>
                        <p className="mt-3 text-[10px] sm:text-[12px] md:text-[14px] tracking-[0.2em] text-white/90 uppercase">
                            Join Our Hospitality Family
                        </p>
                    </div>
                </div>
            </section>

            {/* INTRO */}
            <section className="text-center py-10 px-6">
                <p className="text-[#a88f53] uppercase tracking-[0.15em] text-[10px]">
                    Work With Us
                </p>
                <h2
                    className="mt-2 text-[18px] md:text-[26px] text-[#203549]"
                    style={{ fontFamily: '"Cormorant Garamond", serif' }}
                >
                    Build Your Future in Luxury Hospitality
                </h2>
                <p className="mt-3 max-w-[650px] mx-auto text-[13px] leading-[1.6] text-[#444]">
                    We believe great hospitality starts with great people. Join a team
                    dedicated to excellence, elegance, and unforgettable guest experiences.
                </p>
            </section>

            {/* WHY WORK WITH US */}
            <section className="max-w-[1100px] mx-auto px-6 pb-16">
                <h2
                    className="text-center text-[20px] md:text-[28px] text-[#203549]"
                    style={{ fontFamily: '"Cormorant Garamond", serif' }}
                >
                    Why Work With Us
                </h2>
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
                    {[
                        { title: "Luxury Environment", desc: "Work in a premium hospitality space designed for excellence." },
                        { title: "Career Growth", desc: "We invest in training, skills development, and promotions." },
                        { title: "Team Culture", desc: "A supportive and respectful environment that values people." },
                        { title: "Guest Excellence", desc: "Be part of delivering unforgettable guest experiences." },
                        { title: "Modern Facilities", desc: "Work with well-maintained, high-quality hotel systems." },
                        { title: "Fair Opportunities", desc: "Equal growth opportunities for all motivated individuals." },
                    ].map((item) => (
                        <div
                            key={item.title}
                            className="bg-white/60 backdrop-blur-sm rounded-md p-6 border border-black/5 hover:shadow-md transition"
                        >
                            <h3
                                className="text-[16px] text-[#203549]"
                                style={{ fontFamily: '"Cormorant Garamond", serif' }}
                            >
                                {item.title}
                            </h3>
                            <p className="mt-2 text-[13px] text-[#444] leading-[1.6]">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* OPEN POSITIONS */}
            <section className="bg-[#fbfbfb] py-10">
                <div className="mx-auto max-w-[1000px] px-6">
                    <h2
                        className="text-center text-[20px] md:text-[28px] text-[#203549]"
                        style={{ fontFamily: '"Cormorant Garamond", serif' }}
                    >
                        Open Positions
                    </h2>
                    <div className="mt-8 space-y-4">
                        {[
                            "Front Desk Receptionist",
                            "Housekeeping Attendant",
                            "Spa Therapist",
                            "Restaurant Waiter/Waitress",
                            "Hotel Supervisor",
                        ].map((job) => (
                            <div
                                key={job}
                                className="flex flex-col md:flex-row md:items-center md:justify-between bg-white p-5 rounded-md border border-black/5 hover:shadow-sm transition"
                            >
                                <span className="text-[14px] text-[#203549]">{job}</span>
                                <a target="_blank" href="" className="mt-3 md:mt-0 text-[12px] uppercase tracking-[0.15em] text-white bg-[#203549] px-5 py-2 rounded-md hover:opacity-90 transition">
                                    Apply
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

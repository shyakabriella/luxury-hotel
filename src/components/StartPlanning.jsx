import React from "react";
import { useNavigate } from "react-router-dom";

const fieldClass =
  "h-[46px] w-full border border-[#4f5b61] bg-transparent px-4 text-[15px] text-[#243540] outline-none placeholder:text-[#243540] md:h-[56px] md:text-[16px]";

const selectClass =
  "h-[46px] w-full border border-[#4f5b61] bg-transparent px-4 text-[15px] text-[#243540] outline-none md:h-[56px] md:text-[16px]";

const textareaClass =
  "min-h-[180px] w-full border border-[#4f5b61] bg-transparent px-4 py-3 text-[15px] text-[#243540] outline-none placeholder:text-[#243540] md:min-h-[315px] md:text-[16px]";

export default function StartPlanning() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#f3f2ef]">
      <div
        className="absolute inset-0 md:hidden"
        style={{
          backgroundImage: "url('/home2.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] md:hidden" />

      <div className="relative mx-auto max-w-[1240px] px-4 py-8 md:px-8 md:py-10 lg:px-10">
        <div className="mx-auto max-w-[1180px]">
          <div className="mb-5 md:hidden">
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex min-h-[42px] items-center justify-center border border-[#4f5b61] bg-white/80 px-4 text-[13px] font-medium uppercase tracking-[0.12em] text-[#243540] backdrop-blur-sm transition hover:bg-white"
            >
              ← Back
            </button>
          </div>

          <h1 className="text-center text-[44px] font-light leading-none tracking-[-0.03em] text-[#243540] sm:text-[54px] md:text-[72px]">
            Start Planning
          </h1>

          <div className="mx-auto mt-8 max-w-[560px] bg-white/78 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.10)] backdrop-blur-[4px] md:mt-10 md:max-w-none md:bg-transparent md:p-0 md:shadow-none md:backdrop-blur-0">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1fr_380px] lg:gap-6">
                <div className="space-y-5">
                  <input type="text" placeholder="First Name *" className={fieldClass} />
                  <input type="text" placeholder="Last Name *" className={fieldClass} />
                  <input type="email" placeholder="Email *" className={fieldClass} />
                  <input type="text" placeholder="Phone Number *" className={fieldClass} />
                  <input type="text" placeholder="Company *" className={fieldClass} />
                  <input type="text" placeholder="Guest Rooms *" className={fieldClass} />
                </div>

                <div className="space-y-5">
                  <input type="date" className={`${fieldClass} [color-scheme:light]`} />
                  <input type="date" className={`${fieldClass} [color-scheme:light]`} />

                  <div className="border border-transparent px-1 py-1 md:px-2 md:py-2">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                      <span className="text-[15px] text-[#243540] md:text-[16px]">
                        Are Your Dates Flexible?
                      </span>

                      <div className="flex items-center gap-5 text-[15px] text-[#243540] md:text-[16px]">
                        <label className="flex items-center gap-2">
                          <input type="radio" name="flexibleDates" className="h-4 w-4" />
                          <span>Yes</span>
                        </label>

                        <label className="flex items-center gap-2">
                          <input type="radio" name="flexibleDates" className="h-4 w-4" />
                          <span>No</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <input
                    type="number"
                    placeholder="Number of Attendees *"
                    className={fieldClass}
                  />

                  <select defaultValue="" className={selectClass}>
                    <option value="" disabled>
                      Planner Type *
                    </option>
                    <option>Corporate Planner</option>
                    <option>Wedding Planner</option>
                    <option>Private Host</option>
                    <option>Association Planner</option>
                    <option>Other</option>
                  </select>

                  <select defaultValue="" className={selectClass}>
                    <option value="" disabled>
                      Budget Range *
                    </option>
                    <option>Under $5,000</option>
                    <option>$5,000 - $10,000</option>
                    <option>$10,000 - $25,000</option>
                    <option>$25,000+</option>
                  </select>
                </div>

                <div className="space-y-5">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center">
                    <label
                      htmlFor="planning-file"
                      className="inline-flex h-[46px] cursor-pointer items-center justify-center bg-[#a99258] px-6 text-[14px] font-medium uppercase tracking-[0.14em] text-white transition hover:opacity-90 md:h-[56px]"
                    >
                      Upload File
                    </label>
                    <input id="planning-file" type="file" className="hidden" />
                    <span className="text-[15px] text-[#243540]">No file chosen</span>
                  </div>

                  <textarea placeholder="Comments" className={textareaClass} />
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <label className="flex items-start gap-3 text-[14px] leading-[1.5] text-[#243540] md:text-[15px]">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 shrink-0 appearance-none border border-[#4f5b61] bg-transparent checked:bg-[#a99258]"
                  />
                  <span>
                    I have read and agree to the{" "}
                    <span className="font-semibold">Privacy Policy.</span>
                  </span>
                </label>

                <label className="flex items-start gap-3 text-[14px] leading-[1.5] text-[#243540] md:text-[15px]">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 shrink-0 appearance-none border border-[#4f5b61] bg-transparent checked:bg-[#a99258]"
                  />
                  <span>
                    Absolutely, I&apos;d like to be contacted regarding my
                    request.
                  </span>
                </label>
              </div>

              <div className="mt-8 text-center">
                <button
                  type="submit"
                  className="min-w-[190px] bg-[#a99258] px-8 py-3 text-[15px] font-medium uppercase tracking-[0.14em] text-white transition hover:opacity-90 md:min-w-[202px] md:py-4"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
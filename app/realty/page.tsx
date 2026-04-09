"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Phone,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { GlassButton } from "@/components/GlassComponents"; // Removing dependency

// Lucide React removed brand icons, so we define standard SVGs here for seamless integration
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

const CAROUSEL_DATA = [
  {
    src: "/images/Home_Page/sendoor.png",
    subtitle: "SENDHUR VILLA",
    link: "/realty/sendoor",
  },
  {
    src: "/images/Home_Page/myraa4.jpg",
    subtitle: "MEIRA BLOOM",
    link: "/realty/myraa4",
  },
  {
    src: "/images/Home_Page/sendoor%202.jpg",
    subtitle: "SENDHUR VILLA",
    link: "/realty/sendoor",
  },
  {
    src: "/images/Home_Page/myraa2.jpg",
    subtitle: "MEIRA BLOOM",
    link: "/realty/myraa",
  },
  {
    src: "/images/Home_Page/sendoor3.jpg",
    subtitle: "SENDHUR VILLA",
    link: "/realty/sendoor",
  },
  {
    src: "/images/Home_Page/myraa%203.jpg",
    subtitle: "MEIRA BLOOM",
    link: "/realty/myraa",
  },
];

export default function RealtyPage() {
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  const nextImage = () => {
    setCurrentImageIdx((prev) => (prev + 1) % CAROUSEL_DATA.length);
  };

  const prevImage = () => {
    setCurrentImageIdx(
      (prev) => (prev - 1 + CAROUSEL_DATA.length) % CAROUSEL_DATA.length,
    );
  };

  return (
    <main className="min-h-screen w-full bg-[#0a0a0a] text-white flex flex-col font-sans overflow-x-hidden">
      {/* SVG Configuration for Refraction (Bending) Effect */}
      <svg
        style={{
          position: "absolute",
          width: 0,
          height: 0,
          pointerEvents: "none",
        }}
        aria-hidden="true"
      >
        <filter
          id="glass-refraction-realty"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
        >
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
          <feOffset in="blur" dx="20" dy="20" result="offset" />
          <feComponentTransfer in="offset" result="refracted">
            <feFuncR type="linear" slope="0.8" />
            <feFuncG type="linear" slope="0.8" />
            <feFuncB type="linear" slope="0.8" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode in="refracted" />
          </feMerge>
        </filter>
      </svg>

      {/* Top Section - Hero Carousel */}
      <section className="relative w-full h-screen min-h-[600px] flex flex-col justify-between">
        {/* Background Image Carousel */}
        {CAROUSEL_DATA.map((item, idx) => (
          <div
            key={item.src}
            className={`absolute inset-0 transition-opacity duration-1000 z-0 ${idx === currentImageIdx ? "opacity-100" : "opacity-0"}`}
          >
            <Image
              src={item.src}
              alt={`Property Banner ${idx}`}
              fill
              className="object-cover"
              priority={idx === 0}
            />
          </div>
        ))}

        {/* Overlay Dark Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-10 pointer-events-none"></div>

        {/* Header / Logo */}
        <div className="relative z-20 flex pt-8 px-6 md:px-12 w-full justify-between items-start">
          <Link href="/">
            <Image
              src="/images/Home_Page/vs%20logo%201.png"
              alt="VS Holdings Logo"
              width={160}
              height={80}
              className="w-24 md:w-32 lg:w-40 object-contain drop-shadow-md"
            />
          </Link>

          <div className="absolute left-1/2 top-10 -translate-x-1/2 text-center hidden sm:flex items-center gap-2 drop-shadow-lg">
            <h1 className="text-xl md:text-3xl font-light tracking-widest text-white/90">
              VS HOLDINGS <span className="text-white/40">/</span>
            </h1>
            <h2 className="text-xl md:text-4xl font-[family-name:var(--font-playfair)] italic text-white tracking-wide uppercase transition-all duration-300">
              {CAROUSEL_DATA[currentImageIdx].subtitle}
            </h2>
          </div>
        </div>

        {/* Carousel Controls */}
        <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-8 z-20">
          <button
            onClick={prevImage}
            className="text-white/70 hover:text-white transition-colors bg-black/20 hover:bg-black/40 p-2 rounded-full backdrop-blur-sm border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_0_20px_rgba(255,255,255,0.05),inset_0_2px_4px_rgba(255,255,255,0.1)]"
            style={{
              backdropFilter: "url(#glass-refraction-realty)",
              WebkitBackdropFilter: "url(#glass-refraction-realty)",
            }}
          >
            <ChevronLeft className="w-8 h-8 md:w-12 md:h-12" strokeWidth={1} />
          </button>
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 right-4 md:right-8 z-20">
          <button
            onClick={nextImage}
            className="text-white/70 hover:text-white transition-colors bg-black/20 hover:bg-black/40 p-2 rounded-full backdrop-blur-sm border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_0_20px_rgba(255,255,255,0.05),inset_0_2px_4px_rgba(255,255,255,0.1)]"
            style={{
              backdropFilter: "url(#glass-refraction-realty)",
              WebkitBackdropFilter: "url(#glass-refraction-realty)",
            }}
          >
            <ChevronRight className="w-8 h-8 md:w-12 md:h-12" strokeWidth={1} />
          </button>
        </div>

        {/* Bottom Button */}
        <div className="relative z-20 pb-16 flex justify-center w-full">
          <Link
            href={CAROUSEL_DATA[currentImageIdx].link}
            className="text-white text-xs md:text-sm tracking-[0.2em] py-4 px-8 md:px-12 rounded-[20px] uppercase bg-white/5 hover:bg-white/10 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_0_20px_rgba(255,255,255,0.05),inset_0_2px_4px_rgba(255,255,255,0.1)] transition-all duration-300"
            style={{
              backdropFilter: "url(#glass-refraction-realty)",
              WebkitBackdropFilter: "url(#glass-refraction-realty)",
            }}
          >
            Discover The Collection
          </Link>
        </div>
      </section>

      {/* Bottom Section - Express Interest Form */}
      <section className="relative w-full h-screen flex flex-col md:flex-row min-h-[600px]">
        {/* Left Column - Information */}
        <div className="w-full md:w-[45%] bg-[#0a0a0a] flex flex-col justify-center px-8 md:px-16 lg:px-24 py-16 md:py-0 relative z-10">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl lg:text-[56px] font-bold text-white tracking-tight leading-none mb-1">
              EXPRESS
            </h2>
            <h3 className="text-3xl md:text-4xl lg:text-[42px] font-medium text-[#b38b55] tracking-tight leading-none">
              YOUR INTEREST
            </h3>
          </div>

          <div className="flex gap-6 items-start relative before:content-[''] before:absolute before:left-0 before:top-2 before:bottom-2 before:w-[2px] before:bg-white/20 pl-6">
            <div className="flex flex-col gap-6">
              <h4 className="text-2xl md:text-3xl font-[family-name:var(--font-playfair)] italic text-white/90 leading-snug tracking-wide max-w-sm">
                CURATING EXCELLENCE IN MODERN REAL ESTATE
              </h4>
              <p className="text-sm md:text-base text-white/60 font-light leading-relaxed tracking-wide max-w-xs md:max-w-sm">
                VS Holdings is a premier global real estate group dedicated to
                redefining luxury and performance across the world's most iconic
                skylines.
              </p>
            </div>
          </div>

          <div className="absolute bottom-8 left-8 md:left-16 lg:left-24 flex gap-4">
            <a
              href="#"
              className="p-2 border border-white/20 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_0_20px_rgba(255,255,255,0.05),inset_0_2px_4px_rgba(255,255,255,0.1)]"
              style={{
                backdropFilter: "url(#glass-refraction-realty)",
                WebkitBackdropFilter: "url(#glass-refraction-realty)",
              }}
            >
              <InstagramIcon className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="p-2 border border-white/20 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_0_20px_rgba(255,255,255,0.05),inset_0_2px_4px_rgba(255,255,255,0.1)]"
              style={{
                backdropFilter: "url(#glass-refraction-realty)",
                WebkitBackdropFilter: "url(#glass-refraction-realty)",
              }}
            >
              <YoutubeIcon className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="w-full md:w-[55%] relative flex flex-col justify-center px-8 md:px-16 lg:px-24 py-16 md:py-0 min-h-[500px]">
          {/* Background Image for right side */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/Home_Page/FRONT ELEVATION - NIGHT VIEW.png"
              alt="Night View Building"
              fill
              className="object-cover opacity-70"
            />
            {/* Gradient to blend left edge with left column */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent"></div>
          </div>

          {/* Form Content */}
          <div className="relative z-10 w-full max-w-md mx-auto md:mx-0">
            <form className="flex flex-col gap-8">
              {/* Name Input */}
              <div className="flex flex-col border-b border-white/20 pb-2 focus-within:border-white/60 transition-colors">
                <label className="text-white font-semibold tracking-wider text-sm mb-2">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your Full Name"
                  className="w-full bg-transparent outline-none text-white/60 text-sm placeholder:text-white/30 font-light"
                />
              </div>

              {/* Country Code & Mobile Input */}
              <div className="flex gap-6">
                <div className="flex flex-col border-b border-white/20 pb-2 focus-within:border-white/60 transition-colors w-1/3">
                  <label className="text-white font-semibold tracking-wider text-sm mb-2">
                    Country Code
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      defaultValue="India (+91)"
                      readOnly
                      className="w-full bg-transparent outline-none text-white/60 text-sm font-light cursor-pointer pr-5"
                    />
                    <ChevronDown className="w-4 h-4 text-white/60 absolute right-0 pointer-events-none" />
                  </div>
                </div>

                <div className="flex flex-col border-b border-white/20 pb-2 focus-within:border-white/60 transition-colors w-2/3">
                  <label className="text-white font-semibold tracking-wider text-sm mb-2">
                    Mobile
                  </label>
                  <input
                    type="tel"
                    placeholder="9X XXXXXXXX"
                    className="w-full bg-transparent outline-none text-white/60 text-sm font-light placeholder:text-white/30"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="flex flex-col border-b border-white/20 pb-2 focus-within:border-white/60 transition-colors">
                <label className="text-white font-semibold tracking-wider text-sm mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="email@address.com"
                  className="w-full bg-transparent outline-none text-white/60 text-sm font-light placeholder:text-white/30"
                />
              </div>

              {/* Terms text */}
              <p className="text-[10px] text-white/40 tracking-wider">
                By submitting you agree to our{" "}
                <a href="#" className="underline hover:text-white/70">
                  terms & conditions
                </a>
              </p>

              {/* Submit Button */}
              <div className="mt-2 text-center md:text-left flex justify-center md:justify-start">
                <button
                  type="button"
                  className="w-[200px] py-4 rounded-[20px] text-white tracking-[0.2em] text-xs uppercase bg-white/5 hover:bg-white/10 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_0_20px_rgba(255,255,255,0.05),inset_0_2px_4px_rgba(255,255,255,0.1)] transition-all duration-300"
                  style={{
                    backdropFilter: "url(#glass-refraction-realty)",
                    WebkitBackdropFilter: "url(#glass-refraction-realty)",
                  }}
                >
                  Enquire Now
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 flex items-center justify-center bg-black relative z-20">
        <p className="text-[8px] md:text-[10px] text-white/40 tracking-widest uppercase">
          ©2025 VS HOLDING. All rights reserved
        </p>
      </footer>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 flex flex-col gap-4">
        <a
          href="tel:+1234567890"
          className="w-12 h-12 md:w-14 md:h-14 bg-black/40 hover:bg-black/60 backdrop-blur-md text-white rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center border border-white/20 hover:scale-110"
          style={{
            backdropFilter: "url(#glass-refraction-realty)",
            WebkitBackdropFilter: "url(#glass-refraction-realty)",
          }}
        >
          <Phone
            className="w-5 h-5 md:w-6 md:h-6"
            fill="currentColor"
            strokeWidth={0}
          />
        </a>
        <a
          href="https://wa.me/1234567890"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 md:w-14 md:h-14 bg-black/40 hover:bg-black/60 backdrop-blur-md text-white rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center border border-white/20 hover:scale-110"
          style={{
            backdropFilter: "url(#glass-refraction-realty)",
            WebkitBackdropFilter: "url(#glass-refraction-realty)",
          }}
        >
          <MessageCircle
            className="w-5 h-5 md:w-6 md:h-6"
            fill="currentColor"
            strokeWidth={0}
          />
        </a>
      </div>
    </main>
  );
}

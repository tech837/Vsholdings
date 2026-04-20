"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import {
  Phone,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { GlassButton } from "@/components/GlassComponents"; // Removing dependency
import InterestOverlay from "@/components/InterestOverlay";

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
    link: "/realty/sendhur",
  },
  {
    src: "/images/Home_Page/myraa4.jpg",
    subtitle: "MEIRA BLOOM",
    link: "/realty/meira",
  },
  {
    src: "/images/Home_Page/sendoor%202.jpg",
    subtitle: "SENDHUR VILLA",
    link: "/realty/sendhur",
  },
  {
    src: "/images/Home_Page/myraa2.jpg",
    subtitle: "MEIRA BLOOM",
    link: "/realty/meira",
  },
  {
    src: "/images/Home_Page/sendoor3.jpg",
    subtitle: "SENDHUR VILLA",
    link: "/realty/sendhur",
  },
  {
    src: "/images/Home_Page/myraa%203.jpg",
    subtitle: "MEIRA BLOOM",
    link: "/realty/meira",
  },
];

export default function RealtyPage() {
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const formSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (formSectionRef.current) {
      observer.observe(formSectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Initial load animations
  useEffect(() => {
    const timer1 = setTimeout(() => setIsLoaded(true), 50);
    const timer2 = setTimeout(() => setShowContent(true), 300);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // Autoscroll carousel
  useEffect(() => {
    const scrollTimer = setTimeout(() => {
      setCurrentImageIdx((prev) => (prev + 1) % CAROUSEL_DATA.length);
    }, 5000);
    return () => clearTimeout(scrollTimer);
  }, [currentImageIdx]);

  // Typewriter effect 
  useEffect(() => {
    const targetText = CAROUSEL_DATA[currentImageIdx].subtitle;
    setDisplayText("");
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      if (currentIndex <= targetText.length) {
        setDisplayText(targetText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 50);
    
    return () => clearInterval(interval);
  }, [currentImageIdx]);

  const nextImage = () => {
    setCurrentImageIdx((prev) => (prev + 1) % CAROUSEL_DATA.length);
  };

  const prevImage = () => {
    setCurrentImageIdx(
      (prev) => (prev - 1 + CAROUSEL_DATA.length) % CAROUSEL_DATA.length,
    );
  };

  return (
    <main className="min-h-screen w-full bg-[#0a0a0a] text-white flex flex-col overflow-x-hidden">
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
      <section className="relative w-full h-screen min-h-[600px] flex flex-col justify-between overflow-hidden">
        {/* Background Image Carousel Container with Zoom Animation */}
        <div className={`absolute inset-0 w-full h-full transition-transform duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${!isLoaded ? "scale-[1.05]" : "scale-100"}`}>
          {CAROUSEL_DATA.map((item, idx) => (
            <div
              key={item.src}
              className={`absolute inset-0 transition-opacity duration-700 z-0 ${idx === currentImageIdx ? "opacity-100" : "opacity-0"}`}
            >
              <Image
                src={item.src}
                alt={`Property Banner ${idx}`}
                fill
                className="object-cover"
                priority={idx === 0}
                sizes="100vw"
              />
            </div>
          ))}
        </div>

        {/* Overlay Dark Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60 z-10 pointer-events-none"></div>

        {/* Header / Logo */}
        <div className={`relative z-20 flex pt-8 px-6 md:px-12 w-full justify-between items-start transition-all ${showContent ? 'duration-700 opacity-100 translate-y-0' : 'duration-0 opacity-0 -translate-y-4'}`}>
          <Link href="/">
            <Image
              src="/images/Home_Page/vs%20logo%201.png"
              alt="VS Holdings Logo"
              width={100}
              height={50}
              className="w-16 md:w-20 lg:w-24 object-contain drop-shadow-md"
              priority
            />
          </Link>

          <div className="absolute left-1/2 top-8 md:top-10 -translate-x-1/2 text-center hidden sm:flex items-center gap-6 drop-shadow-lg whitespace-nowrap">
            <h1 className="text-[36px] font-light tracking-[0.2em] text-[#F8EEDB]">
              VS HOLDINGS <span className="text-[#F8EEDB]/40 ml-4">/</span>
            </h1>
            <h2 className="text-[56px] italic text-[#F8EEDB] tracking-widest uppercase transition-none ml-2 relative">
              {/* Invisible placeholder to maintain full width and prevent layout shift during typing */}
              <span className="opacity-0">{CAROUSEL_DATA[currentImageIdx].subtitle}</span>
              {/* Absolute positioned typing text */}
              <span className="absolute left-0 top-0 whitespace-nowrap">{displayText}</span>
            </h2>
          </div>
        </div>

        {/* Carousel Controls */}
        <div className={`absolute top-1/2 -translate-y-1/2 left-4 md:left-8 z-20 transition-all ${showContent ? 'duration-700 delay-150 opacity-100 translate-x-0' : 'duration-0 opacity-0 -translate-x-8'}`}>
          <button
            onClick={prevImage}
            className="text-white/70 hover:text-white transition-colors p-2"
          >
            <ChevronLeft className="transition-all" style={{ width: '40px', height: '80px' }} strokeWidth={1.5} />
          </button>
        </div>
        <div className={`absolute top-1/2 -translate-y-1/2 right-4 md:right-8 z-20 transition-all ${showContent ? 'duration-700 delay-150 opacity-100 translate-x-0' : 'duration-0 opacity-0 translate-x-8'}`}>
          <button
            onClick={nextImage}
            className="text-white/70 hover:text-white transition-colors p-2"
          >
            <ChevronRight className="transition-all" style={{ width: '40px', height: '80px' }} strokeWidth={1.5} />
          </button>
        </div>

        {/* Bottom Button */}
        <div className={`relative z-20 pb-16 flex justify-center w-full transition-all ${showContent ? 'duration-700 delay-300 opacity-100 translate-y-0' : 'duration-0 opacity-0 translate-y-8'}`}>
          <Link
            href={CAROUSEL_DATA[currentImageIdx].link}
            className="text-[#F8EEDB] text-[12px] md:text-[14px] w-[300px] md:w-[385px] h-[46px] flex items-center justify-center tracking-[0.2em] rounded-[16px] uppercase bg-black/20 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.25)] transition-all duration-300 hover:bg-white/10 hover:scale-[1.05]"
          >
            Discover The Collection
          </Link>
        </div>
      </section>

      {/* Bottom Section - Express Interest Form */}
      <section ref={formSectionRef} className="relative w-full h-screen flex flex-col md:flex-row min-h-[600px] overflow-hidden">
        {/* Left Column - Information */}
        <div className={`w-full md:w-[45%] bg-[#0a0a0a] flex flex-col justify-center px-8 md:px-16 lg:px-24 py-16 md:py-0 relative z-10 transition-all duration-[1500ms] ease-out ${isInView ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
          <div className="mb-12 font-body">
            <h2 className="text-[48px] font-bold text-[#F8EEDB] font-body tracking-tight leading-none mb-1">
              EXPRESS
            </h2>
            <h3 className="text-[48px] font-medium text-[#C6AE73] font-body tracking-tight leading-none">
              YOUR INTEREST
            </h3>
          </div>

          <div className="flex gap-6 items-start relative before:content-[''] before:absolute before:left-0 before:top-2 before:bottom-2 before:w-[2px] before:bg-white/20 pl-6">
            <div className="flex flex-col gap-6">
              <h4 className="text-[36px] italic text-[#F8EEDB] leading-snug tracking-wide max-w-xl">
                CURATING EXCELLENCE IN MODERN REAL ESTATE
              </h4>
              <p className="text-[15px] text-[#F8EEDB] font-light leading-relaxed tracking-wide max-w-xs md:max-w-sm">
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
              src="/images/Home_Page/footer.jpg"
              alt="Night View Building"
              fill
              className="object-cover opacity-70"
              sizes="(max-width: 768px) 100vw, 55vw"
            />
            {/* Gradient to blend left edge with left column */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent"></div>
          </div>

          {/* Form Content */}
          <div className="relative z-10 w-full max-w-md mx-auto md:mx-0">
            <form className="flex flex-col gap-8">
              {/* Name Input */}
              <div className="flex flex-col border-b border-white/20 pb-2 focus-within:border-white/60 transition-colors">
                <label className="text-[#F8EEDB] font-semibold tracking-wider text-[20px] mb-2">
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
                  <label className="text-[#F8EEDB] font-semibold tracking-wider text-[20px] mb-2">
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
                  <label className="text-[#F8EEDB] font-semibold tracking-wider text-[20px] mb-2">
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
                <label className="text-[#F8EEDB] font-semibold tracking-wider text-[20px] mb-2">
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
                <a href="#" className="underline text-[#C6AE73] hover:text-[#C6AE73]/80">
                  terms & conditions
                </a>
              </p>

              {/* Submit Button */}
              <div className="mt-2 text-center md:text-left flex justify-center md:justify-start">
                <button
                  type="button"
                  className="w-full md:w-[385px] h-[46px] rounded-[16px] text-[#F8EEDB] tracking-[0.2em] text-[12px] md:text-[14px] uppercase bg-black/20 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.25)] transition-all duration-300 hover:bg-white/10 hover:scale-[1.02]"
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
      {/* Individual Contact Side Pills (Figma Design) */}
      <div className="fixed right-0 bottom-12 z-50 flex flex-col items-end gap-3 pointer-events-none">
        <button
          onClick={() => setShowOverlay(true)}
          className="pointer-events-auto flex items-center justify-center bg-black/40 backdrop-blur-md border border-white/20 border-r-0 rounded-l-[30px] w-14 h-14 text-white/70 hover:text-white hover:w-20 transition-all duration-300 group shadow-2xl"
        >
          <Phone className="w-6 h-6 transform group-hover:scale-110 transition-transform" fill="currentColor" strokeWidth={0} />
        </button>
        <a
          href="https://wa.me/1234567890"
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto flex items-center justify-center bg-black/40 backdrop-blur-md border border-white/20 border-r-0 rounded-l-[30px] w-14 h-14 text-white hover:text-white hover:w-20 transition-all duration-300 group shadow-2xl"
        >
          <Image
            src="/whatsapp.svg"
            alt="WhatsApp"
            width={24}
            height={24}
            className="w-6 h-6 transform group-hover:scale-110 transition-transform brightness-0 invert"
          />
        </a>
      </div>

      {showOverlay && (
        <InterestOverlay
          backgroundImage={CAROUSEL_DATA[currentImageIdx].src}
          onComplete={() => setShowOverlay(false)}
        />
      )}
    </main>
  );
}

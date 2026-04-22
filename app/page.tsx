"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Phone } from "lucide-react";
import InterestOverlay from "@/components/InterestOverlay";

export default function Home() {
  const [showButtons, setShowButtons] = useState(false);
  const [isManualOpen, setIsManualOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButtons(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#111]">
      {isManualOpen && <InterestOverlay onComplete={() => setIsManualOpen(false)} backgroundImage="" showCloseButton={true} />}
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/images/Card_Page/BG%20VIDEO.mp4" type="video/mp4" />
      </video>

      {/* Subtle overlay to make content pop */}
      <div className="absolute inset-0 bg-black/10 z-0"></div>

      {/* VS Holdings Logo */}
      <div className="absolute top-8 left-6 md:left-12 z-20">
        <Image
          src="/images/Home_Page/vs%20logo%201.png"
          alt="VS Holdings Logo"
          width={100}
          height={50}
          className="w-16 md:w-20 lg:w-24 object-contain drop-shadow-md"
          priority
        />
      </div>



      {/* Buttons Overlay */}
      <div 
        className={`absolute inset-0 z-10 flex flex-col md:flex-row pointer-events-none transition-opacity duration-1000 ${
          showButtons ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Left Half */}
        <div className="flex-1 flex items-center justify-center pointer-events-auto">
          {/* Left Button - Government Projects */}
          <div className="group relative w-[360px] md:w-[380px] lg:w-[400px] max-w-[90vw] h-[100px] flex items-center justify-center transition-transform duration-500 hover:scale-[1.02] cursor-default">
            <div
              className="absolute inset-0 bg-transparent border border-transparent rounded-[16px] transition-all duration-300 group-hover:bg-black/20 group-hover:backdrop-blur-md group-hover:border-white/20 group-hover:shadow-[0_8px_32px_rgba(0,0,0,0.25)]"
            ></div>
            <div className="relative z-10 text-center">
              <h2 className="text-[20px] md:text-[24px] lg:text-[26px] text-[#C6AE73] tracking-[0.08em] mb-2 drop-shadow-md whitespace-nowrap">
                GOVERNMENT PROJECTS
              </h2>
              <p className="text-[10px] text-[#C6AE73]/70 tracking-[0.2em] uppercase drop-shadow-sm">
                (Coming Soon)
              </p>
            </div>
          </div>
        </div>

        {/* Right Half */}
        <div className="flex-1 flex items-center justify-center pointer-events-auto">
          {/* Right Button - Realty Projects */}
          <Link href="/realty" className="group relative w-[360px] md:w-[380px] lg:w-[400px] max-w-[90vw] h-[100px] flex items-center justify-center transition-transform duration-500 hover:scale-[1.02] cursor-pointer">
            <div
              className="absolute inset-0 bg-transparent border border-transparent rounded-[16px] transition-all duration-300 group-hover:bg-black/20 group-hover:backdrop-blur-md group-hover:border-white/20 group-hover:shadow-[0_8px_32px_rgba(0,0,0,0.25)]"
            ></div>
            <div className="relative z-10 text-center">
              <h2 className="text-[20px] md:text-[24px] lg:text-[26px] text-[#C6AE73] tracking-[0.08em] mb-2 drop-shadow-md whitespace-nowrap">
                REALTY PROJECTS
              </h2>
              <p className="flex items-center justify-center gap-2 text-[10px] text-[#C6AE73] group-hover:text-[#e8b577] tracking-[0.2em] uppercase transition-colors duration-300 drop-shadow-sm font-normal">
                ENTER SITE <span className="text-[12px] font-extralight leading-[0] pb-[2px] group-hover:translate-x-1.5 transition-transform duration-300">→</span>
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* Floating Contact Sidebar */}
      <div 
        className={`fixed right-0 bottom-12 z-50 flex flex-col items-end gap-3 pointer-events-none transition-opacity duration-1000 ${
          showButtons ? "opacity-100" : "opacity-0"
        }`}
      >
        <button
          onClick={() => setIsManualOpen(true)}
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
    </main>
  );
}

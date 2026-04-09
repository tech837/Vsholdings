import Image from "next/image";
import Link from "next/link";
import { Phone, MessageCircle } from "lucide-react";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden flex items-end justify-center bg-[#111] pb-6 sm:pb-10">
      
      {/* SVG Configuration for Refraction (Bending) Effect */}
      <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }} aria-hidden="true">
        <filter id="glass-refraction" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
          <feOffset in="blur" dx="20" dy="20" result="offset" />
          <feComponentTransfer in="offset" result="refracted">
             {/* Slightly darken the refracted image natively */}
             <feFuncR type="linear" slope="0.8" />
             <feFuncG type="linear" slope="0.8" />
             <feFuncB type="linear" slope="0.8" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode in="refracted" />
          </feMerge>
        </filter>
      </svg>

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

      {/* Top Left Logo */}
      <div className="absolute top-8 left-8 md:top-12 md:left-12 z-20">
        <Image
          src="/images/Card_Page/vs%20logo%201%20-%20Copy.png"
          alt="VS Holdings Logo"
          width={180}
          height={90}
          className="w-28 md:w-36 lg:w-44 object-contain brightness-0 invert drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
          style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.5))" }}
        />
      </div>

      {/* Bottom Glassmorphism Buttons Container */}
      <div className="relative z-10 flex flex-col md:flex-row gap-5 md:gap-8 lg:gap-12 items-center w-full max-w-6xl px-6 justify-center">
        
        {/* Left Button - Government Projects */}
        <div className="group relative block w-[260px] sm:w-[320px] lg:w-[380px] transition-transform duration-500 hover:scale-[1.02] cursor-default">
          <div 
            className="w-full h-full py-6 md:py-8 px-4 bg-white/5 hover:bg-white/10 border border-white/20 rounded-[20px] shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_0_20px_rgba(255,255,255,0.05),inset_0_2px_4px_rgba(255,255,255,0.1)] flex flex-col items-center justify-center text-center transition-all duration-300"
            style={{ backdropFilter: 'url(#glass-refraction)', WebkitBackdropFilter: 'url(#glass-refraction)' }}
          >
             <h2 className="text-[22px] sm:text-[26px] lg:text-[32px] font-[family-name:var(--font-playfair)] italic text-white tracking-wide mb-2 md:mb-3 drop-shadow-md whitespace-nowrap">
               Government Projects
             </h2>
             <p className="text-[9px] md:text-[11px] text-white font-sans tracking-[0.2em] uppercase drop-shadow-sm">
               (Coming Soon)
             </p>
          </div>
        </div>

        {/* Right Button - Realty Projects */}
        <Link href="/realty" className="group relative block w-[260px] sm:w-[320px] lg:w-[380px] transition-transform duration-500 hover:scale-[1.02] cursor-pointer">
          <div 
            className="w-full h-full py-6 md:py-8 px-4 bg-white/5 hover:bg-white/10 border border-white/20 rounded-[20px] shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_0_20px_rgba(255,255,255,0.05),inset_0_2px_4px_rgba(255,255,255,0.1)] flex flex-col items-center justify-center text-center transition-all duration-300"
            style={{ backdropFilter: 'url(#glass-refraction)', WebkitBackdropFilter: 'url(#glass-refraction)' }}
          >
             <h2 className="text-[22px] sm:text-[26px] lg:text-[32px] font-[family-name:var(--font-playfair)] italic text-white tracking-wide mb-2 md:mb-3 drop-shadow-md whitespace-nowrap">
               Realty Projects
             </h2>
             <p className="flex items-center justify-center gap-2 text-[9px] md:text-[11px] text-[#c69c6d] group-hover:text-[#e8b577] font-sans tracking-[0.2em] uppercase transition-colors duration-300 drop-shadow-sm font-medium">
               ENTER SITE <span className="text-[14px] md:text-[16px] font-light leading-[0] pb-[2px] group-hover:translate-x-1.5 transition-transform duration-300">→</span>
             </p>
          </div>
        </Link>


      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 flex flex-col gap-4">
        <a 
          href="tel:+1234567890" 
          className="w-14 h-14 bg-black/40 hover:bg-black/60 backdrop-blur-md text-white rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center border border-white/20 hover:scale-110"
        >
          <Phone className="w-6 h-6" fill="currentColor" strokeWidth={0} />
        </a>
        <a 
          href="https://wa.me/1234567890" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-14 h-14 bg-black/40 hover:bg-black/60 backdrop-blur-md text-white rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center border border-white/20 hover:scale-110"
        >
           <MessageCircle className="w-6 h-6" fill="currentColor" strokeWidth={0} />
        </a>
      </div>
    </main>
  );
}

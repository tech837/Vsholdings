import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden flex items-end justify-center bg-[#111] pb-6 sm:pb-10">



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
          width={140}
          height={70}
          className="w-20 md:w-28 lg:w-32 object-contain brightness-0 invert drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
          style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.5))" }}
          priority
        />
      </div>

      {/* Bottom Glassmorphism Buttons Container */}
      <div className="relative z-10 flex flex-col md:flex-row gap-5 md:gap-8 lg:gap-12 items-center w-full max-w-6xl px-6 justify-center">

        {/* Left Button - Government Projects */}
        <div className="group relative block w-[362px] h-[114px] transition-transform duration-500 hover:scale-[1.02] cursor-default">
          <div
            className="w-full h-full bg-black/30 backdrop-blur-[2px] border border-white/50 rounded-[20px] shadow-[0_8px_32px_rgba(0,0,0,0.25)] flex flex-col items-center justify-center text-center transition-all duration-300"
          >
            <h2 className="text-[28px] font-serif italic text-white tracking-wide mb-2 drop-shadow-md whitespace-nowrap">
              Government Projects
            </h2>
            <p className="text-[10px] text-white font-sans tracking-[0.2em] uppercase drop-shadow-sm">
              (Coming Soon)
            </p>
          </div>
        </div>

        {/* Right Button - Realty Projects */}
        <Link href="/realty" className="group relative block w-[362px] h-[114px] transition-transform duration-500 hover:scale-[1.02] cursor-pointer">
          <div
            className="w-full h-full bg-black/30 backdrop-blur-[2px] border border-white/50 rounded-[20px] shadow-[0_8px_32px_rgba(0,0,0,0.25)] flex flex-col items-center justify-center text-center transition-all duration-300"
          >
            <h2 className="text-[28px] font-serif italic text-white tracking-wide mb-2 drop-shadow-md whitespace-nowrap">
              Realty Projects
            </h2>
            <p className="flex items-center justify-center gap-2 text-[10px] text-[#c69c6d] group-hover:text-[#e8b577] font-sans tracking-[0.2em] uppercase transition-colors duration-300 drop-shadow-sm font-medium">
              ENTER SITE <span className="text-[14px] font-light leading-[0] pb-[2px] group-hover:translate-x-1.5 transition-transform duration-300">→</span>
            </p>
          </div>
        </Link>


      </div>


    </main>
  );
}

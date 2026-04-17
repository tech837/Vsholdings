"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, use } from "react";
import { notFound } from "next/navigation";
import InterestOverlay from "@/components/InterestOverlay";
import { Phone, MessageCircle, ChevronLeft, ChevronRight, ChevronDown, MapPin, Waves, Leaf, Layout, ArrowRight, ArrowUpRight } from "lucide-react";
import { projectsData } from "@/data/projects";

// Next.js 15+ dynamic route props
export default function PropertyPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const data = projectsData[slug];

    if (!data) {
        notFound();
    }

    const [activeTab, setActiveTab] = useState<'gallery' | 'floorplans' | 'location' | 'brochure' | 'availability'>('gallery');
    const [galleryIdx, setGalleryIdx] = useState(0);
    const [floorPlanIdx, setFloorPlanIdx] = useState(0);
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [showOverlay, setShowOverlay] = useState(true);
    const [isManualOpen, setIsManualOpen] = useState(false);
    const [isFloorPlanDropdownOpen, setIsFloorPlanDropdownOpen] = useState(false);

    const handleOverlayComplete = (setOverlayOpenState: (open: boolean) => void) => {
        setOverlayOpenState(false);
        setTimeout(() => {
            document.getElementById('dynamic-content')?.scrollIntoView({ behavior: 'smooth' });
        }, 300);
    };

    const nextGallery = () => {
        setGalleryIdx((prev) => (prev + 1) % data.gallery.length);
    };

    const prevGallery = () => {
        setGalleryIdx((prev) => (prev - 1 + data.gallery.length) % data.gallery.length);
    };

    return (
        <>
            {showOverlay && <InterestOverlay onComplete={() => handleOverlayComplete(setShowOverlay)} backgroundImage={data.overlayBgImage} showCloseButton={false} />}
            {isManualOpen && <InterestOverlay onComplete={() => handleOverlayComplete(setIsManualOpen)} backgroundImage={data.overlayBgImage} showCloseButton={true} />}
            <main className="min-h-screen w-full bg-[#0a0a0a] text-white flex flex-col relative overflow-x-hidden">
                {/* Hero Section */}
                <section className="h-screen w-full relative flex-shrink-0">
                    <div className="absolute inset-0 z-0 h-full w-full overflow-hidden">
                        <Image
                            src={data.heroImage}
                            alt={`${data.projectName} Hero`}
                            fill
                            className="object-cover"
                            priority
                            sizes="100vw"
                        />
                    </div>

                    <div className="absolute top-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-5 whitespace-nowrap drop-shadow-lg">
                        <h1 className={`text-2xl md:text-4xl font-light tracking-[0.2em] ${slug === 'meira' ? 'text-white' : 'text-[#2E311A]'}`}>
                            VS HOLDING <span className={`${slug === 'meira' ? 'text-white/40' : 'text-[#2E311A]/40'} ml-2 md:ml-4`}>/</span>
                        </h1>
                        <h2 className={`text-2xl md:text-5xl italic tracking-widest uppercase ${slug === 'meira' ? 'text-white' : 'text-[#2E311A]'}`}>
                            {data.projectName}
                        </h2>
                    </div>

                    <div className="absolute top-10 left-8 z-20">
                        <Link href="/realty" className="text-white/40 hover:text-white transition-colors">
                            <ChevronLeft className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1} />
                        </Link>
                    </div>

                    <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20">
                        <button
                            onClick={() => setShowOverlay(true)}
                            className="text-white text-[10px] md:text-sm tracking-[0.3em] w-[300px] md:w-[385px] h-[46px] uppercase bg-black/30 backdrop-blur-[2px] border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.25)] transition-all duration-300 hover:bg-white/10 hover:scale-[1.02] rounded-[8px]"
                        >
                            Register Your Interest
                        </button>
                    </div>

                    <div className="absolute bottom-10 left-0 w-full px-8 md:px-16 lg:px-24 z-20 flex flex-row items-center justify-between pointer-events-none text-white uppercase text-[10px] md:text-xs tracking-[0.3em] font-medium">
                        <div className="w-1/3 text-left">
                            {data.status}
                        </div>
                        <div className="w-1/3 text-center tracking-[0.4em] font-light">
                            {data.locationLine1}
                        </div>
                        <div className="w-1/3 text-right">
                            {data.configurations}
                        </div>
                    </div>
                </section>



                {/* Dynamic Content Section (Location / Gallery) */}
                <section id="dynamic-content" className="w-full bg-black py-8 md:py-12 px-6 md:px-12 lg:px-24 flex flex-col justify-between gap-6 relative h-[100svh] min-h-[750px]">
                    {activeTab === 'location' ? (
                        <div key="location" className="w-full animate-in fade-in slide-in-from-bottom-10 zoom-in-95 duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex-grow flex items-center justify-center">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-12 w-full">
                                {/* Map Side */}
                                <div className="w-full md:w-1/2 aspect-square max-w-[450px] relative rounded-sm overflow-hidden border border-white/10">
                                    <iframe
                                        src={data.mapIframeSrc}
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)" }}
                                        allowFullScreen={true}
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    ></iframe>
                                </div>

                                {/* Text Side */}
                                <div className="w-full md:w-1/2 flex flex-col gap-10">
                                    <h3 className="text-[56px] italic text-[#F8EEDB] tracking-widest uppercase flex items-baseline gap-4">
                                        <span className="text-[56px] normal-case tracking-widest font-light opacity-80">PRIME</span>
                                        LOCATION
                                    </h3>

                                    <div className="flex flex-col gap-6">
                                        <p className="text-[20px] text-[#F8EEDB] font-light leading-relaxed tracking-wide max-w-md">
                                            {data.locationDesc}
                                        </p>
                                        <div className="flex flex-col gap-1 border-l-2 border-[#C6AE73] pl-4">
                                            <span className="text-[#C6AE73] text-[10px] uppercase font-bold tracking-widest block">Full Address</span>
                                            <p className="text-[16px] text-white/80 font-light leading-relaxed tracking-wide max-w-sm">
                                                {data.address}
                                            </p>
                                        </div>
                                    </div>

                                    <a href={data.mapLink} target="_blank" rel="noopener noreferrer" className="w-[237px] h-[46px] flex items-center justify-center gap-2 text-[#F8EEDB] text-[12px] md:text-[14px] tracking-[0.1em] uppercase bg-[#D9D9D933] rounded-[16px] border border-white/10 hover:bg-[#D9D9D9]/20 hover:scale-[1.02] hover:border-white/30 transition-all duration-300 whitespace-nowrap">
                                        View Location <ArrowRight className="w-5 h-5 ml-1" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ) : activeTab === 'gallery' ? (
                        <div key="gallery" className="w-full animate-in fade-in slide-in-from-bottom-10 zoom-in-95 duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex-grow flex flex-col justify-center">
                            <div className="w-full flex flex-col items-center justify-center gap-6">
                                <div className="relative w-full h-[400px] md:h-[480px] flex items-center justify-center overflow-visible">
                                    <div className="relative w-full max-w-7xl h-full flex items-center justify-center">
                                        {data.gallery.map((img, i) => {
                                            let offset = i - galleryIdx;
                                            if (offset < -Math.floor(data.gallery.length / 2)) offset += data.gallery.length;
                                            if (offset > Math.floor(data.gallery.length / 2)) offset -= data.gallery.length;

                                            const isActive = offset === 0;
                                            const isVisible = Math.abs(offset) <= 1;

                                            return (
                                                <div
                                                    key={i}
                                                    className={`absolute transition-all duration-700 ease-in-out flex flex-col items-center
                                                    ${isActive ? "z-30 opacity-100 scale-100" : isVisible ? "z-10 opacity-40 scale-75" : "z-0 opacity-0 scale-50 pointer-events-none"}
                                                `}
                                                    style={{
                                                        transform: `translateX(${offset * 40}%) scale(${isActive ? 1 : 0.8})`,
                                                        filter: isActive ? 'none' : 'blur(2px)',
                                                    }}
                                                >
                                                    <div className="relative w-[320px] h-[190px] md:w-[500px] md:h-[300px] lg:w-[800px] lg:h-[420px] bg-[#F8EEDB] shadow-2xl overflow-hidden flex flex-col p-4">
                                                        <div className="relative flex-grow w-full overflow-hidden">
                                                            <Image
                                                                src={img.src}
                                                                alt={img.title}
                                                                fill
                                                                className="object-cover"
                                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 955px"
                                                            />
                                                        </div>
                                                        <div className={`pt-4 pb-0 flex items-center justify-center transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-0"}`}>
                                                            <p className="text-[#2E311A] italic text-[14px] md:text-[16px] lg:text-[20px] tracking-[0.4em] uppercase">
                                                                {img.title}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}

                                        {/* Gallery Arrows */}
                                        <button
                                            onClick={prevGallery}
                                            className="absolute left-0 md:left-4 z-40 text-white/30 hover:text-white transition-colors"
                                        >
                                            <ChevronLeft className="w-12 h-12 md:w-16 md:h-16" strokeWidth={1} />
                                        </button>
                                        <button
                                            onClick={nextGallery}
                                            className="absolute right-0 md:right-4 z-40 text-white/30 hover:text-white transition-colors"
                                        >
                                            <ChevronRight className="w-12 h-12 md:w-16 md:h-16" strokeWidth={1} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : activeTab === 'floorplans' ? (
                        <div key="floorplans" className="w-full animate-in fade-in slide-in-from-bottom-10 zoom-in-95 duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex-grow flex items-center justify-center">
                            <div className="w-full flex items-center justify-center py-2 px-4">
                                <div className="bg-[#d9d9d9] w-full max-w-[1400px] h-auto md:h-[480px] relative flex flex-col items-center justify-center rounded-sm overflow-hidden py-8 md:py-0">
                                    {/* Header Text - Aligned Left */}
                                    <p className="md:absolute md:top-8 md:left-10 text-[#1a1a1a]/70 text-[10px] md:text-sm tracking-[0.2em] text-left max-w-md font-light uppercase px-6 md:px-0 mb-4 md:mb-0" dangerouslySetInnerHTML={{ __html: data.floorPlansText }}>
                                    </p>

                                    <div className="relative w-full h-[300px] md:h-[360px] flex items-center justify-center overflow-visible md:mt-8">
                                        {data.floorPlans.map((plan, i) => {
                                            let offset = i - floorPlanIdx;
                                            if (offset < -Math.floor(data.floorPlans.length / 2)) offset += data.floorPlans.length;
                                            if (offset > Math.floor(data.floorPlans.length / 2)) offset -= data.floorPlans.length;

                                            const isActive = offset === 0;
                                            const isVisible = Math.abs(offset) <= 1;

                                            return (
                                                <div
                                                    key={i}
                                                    className={`absolute transition-all duration-700 ease-in-out
                                                    ${isActive ? "z-30 scale-115 opacity-100" : isVisible ? "z-10 scale-75 opacity-40" : "z-0 scale-50 opacity-0 pointer-events-none"}
                                                `}
                                                    style={{
                                                        transform: `translateX(${offset * 105}%)`,
                                                    }}
                                                >
                                                    <div className={`relative w-[300px] h-[200px] md:w-[420px] md:h-[280px] ${isActive ? "bg-[#d5c5a1] shadow-2xl" : "bg-[#2a3024]"} p-2 transition-all duration-700 flex items-center justify-center`}>
                                                        <div className="relative w-full h-full">
                                                            <Image
                                                                src={plan.src}
                                                                alt={plan.label}
                                                                fill
                                                                className="object-contain"
                                                                sizes="(max-width: 768px) 300px, 540px"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Centered Arrows Below Card */}
                                    <div className="absolute bottom-4 flex items-center gap-12 text-[#1a1a1a]/60 z-40">
                                        <button
                                            onClick={() => setFloorPlanIdx((prev) => (prev - 1 + data.floorPlans.length) % data.floorPlans.length)}
                                            className="hover:scale-110 transition-transform duration-300"
                                        >
                                            <ChevronLeft className="w-8 h-8" strokeWidth={1} />
                                        </button>
                                        <button
                                            onClick={() => setFloorPlanIdx((prev) => (prev + 1) % data.floorPlans.length)}
                                            className="hover:scale-110 transition-transform duration-300"
                                        >
                                            <ChevronRight className="w-8 h-8" strokeWidth={1} />
                                        </button>
                                    </div>

                                    {/* Dropdown Bottom Right with line */}
                                    <div className="absolute right-8 bottom-4 hidden md:flex flex-col items-end gap-2 text-right z-50">
                                        <div className="w-[120px] md:w-[180px] h-[1px] bg-[#1a1a1a]/30 mb-1"></div>
                                        <div className="relative">
                                            <button
                                                onClick={() => setIsFloorPlanDropdownOpen(!isFloorPlanDropdownOpen)}
                                                className="flex items-center gap-2 text-[#1a1a1a] text-lg md:text-xl font-bold tracking-[0.2em] uppercase hover:opacity-70 transition-opacity"
                                            >
                                                {data.floorPlans[floorPlanIdx].label}
                                                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isFloorPlanDropdownOpen ? 'rotate-180' : ''}`} />
                                            </button>

                                            <div
                                                className={`absolute bottom-full right-0 mb-4 w-[280px] bg-[#F8EEDB] shadow-2xl rounded-sm overflow-hidden transition-all duration-300 origin-bottom ${isFloorPlanDropdownOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}
                                            >
                                                {data.floorPlans.map((plan, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => {
                                                            setFloorPlanIdx(idx);
                                                            setIsFloorPlanDropdownOpen(false);
                                                        }}
                                                        className={`w-full text-right px-6 py-4 text-[10px] md:text-xs tracking-[0.2em] uppercase border-b border-[#2E311A]/10 last:border-none transition-colors hover:bg-[#C6AE73]/20 ${floorPlanIdx === idx ? 'bg-[#C6AE73]/30 text-[#1a1a1a] font-bold' : 'text-[#1a1a1a]/80 font-light'}`}
                                                    >
                                                        {plan.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : activeTab === 'brochure' ? (
                        <div key="brochure" className="w-full animate-in fade-in slide-in-from-bottom-10 zoom-in-95 duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex-grow flex items-center justify-center">
                            <div className="w-full flex items-center justify-center py-4 px-4 md:px-0">
                                <div className="relative w-full max-w-6xl aspect-[16/8] md:aspect-[21/9] rounded-sm overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                                    <Image
                                        src={data.brochureBg}
                                        alt="Brochure Background"
                                        fill
                                        className="object-cover"
                                        sizes="100vw"
                                    />
                                    <div className="absolute inset-0 bg-black/20"></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="bg-[#D9D9D91A] backdrop-blur-[4px] border border-white/10 rounded-lg flex flex-col items-center justify-center gap-6 text-center w-[90%] md:w-[863px] md:h-[339px] shadow-2xl p-6 md:p-12">
                                            <h3 className="italic text-2xl md:text-[32px] text-white tracking-[0.1em] uppercase leading-tight">
                                                Download The Brochure
                                            </h3>
                                            <p className="text-white/60 text-[10px] md:text-sm tracking-[0.3em] font-light uppercase max-w-lg">
                                                Explore detailed specifications, floor plans, and amenities.
                                            </p>
                                            <button className="mt-4 w-[280px] md:w-[358px] h-[46px] flex items-center justify-center bg-transparent border border-white/20 text-white text-[10px] tracking-[0.3em] uppercase hover:bg-white/5 hover:scale-[1.02] rounded-none transition-all duration-300">
                                                Download PDF
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : activeTab === 'availability' ? (
                        <div key="availability" className="w-full animate-in fade-in slide-in-from-bottom-10 zoom-in-95 duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex-grow flex flex-col items-center justify-center py-4 md:py-8">
                            <div className="relative w-full max-w-7xl h-[55vh] min-h-[450px] max-h-[650px] rounded-none overflow-hidden shadow-2xl my-auto">
                                {/* Background Image */}
                                <Image
                                    src={data.gallery.find(g => g.title.includes('BEDROOM'))?.src || data.gallery[0].src}
                                    alt="Unit Availability"
                                    fill
                                    className="object-cover brightness-[0.85]"
                                />

                                {/* Outline Border */}
                                <div className="absolute inset-4 md:inset-8 lg:inset-10 border-[5px] border-[#F8EEDB] rounded-[24px] md:rounded-[36px] pointer-events-none flex flex-col items-center justify-center z-10 box-border">

                                    {/* Center Glass Panels */}
                                    <div className="flex flex-col md:flex-row items-center justify-center gap-5 md:gap-8 pointer-events-auto w-full h-full pb-10">

                                        {/* Availability Panel*/}
                                        <div className="bg-[#D9D9D9]/40 backdrop-blur-[16px] rounded-[12px] md:rounded-[16px] w-[200px] md:w-[240px] py-5 md:py-6 flex flex-col items-center justify-center gap-1.5 md:gap-2 shadow-[0_8px_32px_rgba(0,0,0,0.15)] border border-white/30 transition-transform duration-300 hover:scale-[1.02]">
                                            <div className="w-12 h-12 md:w-[56px] md:h-[56px] rounded-full flex items-center justify-center mb-1 bg-[#E8E1D5]">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B39A70" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                                    <line x1="12" y1="16" x2="12" y2="19.5"></line>
                                                </svg>
                                            </div>
                                            <span className="text-[12px] md:text-[14px] text-white/95 font-light tracking-wide drop-shadow-md">Availability</span>
                                            <span className="text-[16px] md:text-[18px] font-bold text-white tracking-wide drop-shadow-md">
                                                {data.floorPlans[floorPlanIdx]?.availability || "12 Units Available"}
                                            </span>
                                        </div>

                                        {/* Built-up Area Panel */}
                                        <div className="bg-[#D9D9D9]/40 backdrop-blur-[16px] rounded-[12px] md:rounded-[16px] w-[200px] md:w-[240px] py-5 md:py-6 flex flex-col items-center justify-center gap-1.5 md:gap-2 shadow-[0_8px_32px_rgba(0,0,0,0.15)] border border-white/30 transition-transform duration-300 hover:scale-[1.02]">
                                            <div className="w-12 h-12 md:w-[56px] md:h-[56px] rounded-full flex items-center justify-center mb-1 bg-[#E8E1D5]">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B39A70" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <rect x="15.5" y="6" width="4.5" height="12" rx="1.5"></rect>
                                                    <rect x="9.75" y="2" width="4.5" height="16" rx="1.5"></rect>
                                                    <rect x="4" y="10" width="4.5" height="8" rx="1.5"></rect>
                                                </svg>
                                            </div>
                                            <span className="text-[12px] md:text-[14px] text-white/95 font-light tracking-wide drop-shadow-md">Built-up Area</span>
                                            <span className="text-[16px] md:text-[18px] font-bold text-white tracking-wide drop-shadow-md">
                                                {data.floorPlans[floorPlanIdx]?.buildArea || "1100 sq.ft"}
                                            </span>
                                        </div>

                                    </div>

                                    {/* Action Buttons row embedded near the bottom */}
                                    <div className="absolute bottom-5 md:bottom-7 left-1/2 -translate-x-1/2 w-max max-w-[95%] flex flex-wrap justify-center gap-3 md:gap-4 pointer-events-auto z-30">
                                        {data.floorPlans.map((plan, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setFloorPlanIdx(idx)}
                                                className={`px-5 py-2.5 md:px-7 md:py-3.5 rounded-[8px] md:rounded-[10px] text-[12px] md:text-[16px] tracking-wide font-normal transition-all duration-300 backdrop-blur-md whitespace-nowrap shadow-lg border border-white/20 ${floorPlanIdx === idx
                                                    ? "bg-[#EAEAEA] text-[#1a1a1a] shadow-[0_10px_30px_rgba(255,255,255,0.4)] scale-[1.02] border-transparent"
                                                    : "bg-[#D9D9D9]/40 text-black md:text-white/90 hover:bg-[#D9D9D9]/60 hover:text-white"
                                                    }`}
                                            >
                                                {plan.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full flex items-center justify-center h-[500px] animate-in fade-in duration-700">
                            <p className="text-white/40 tracking-widest uppercase italic">Section coming soon</p>
                        </div>
                    )}

                    {/* Bottom Tab Navigation */}
                    <div className="w-full flex flex-wrap justify-center gap-8 md:gap-16 lg:gap-24 border-t border-white/10 pt-16 mt-auto">
                        <div
                            onClick={() => setActiveTab('gallery')}
                            className={`flex flex-col items-center gap-4 group cursor-pointer transition-all duration-300 ${activeTab === 'gallery' ? 'opacity-100' : 'opacity-40 hover:opacity-100'}`}
                        >
                            <span className={`text-xs md:text-sm tracking-[0.4em] uppercase ${activeTab === 'gallery' ? 'text-[#b3a17e]' : 'text-white'}`}>Gallery</span>
                            <div className={`h-[1px] transition-all duration-300 ${activeTab === 'gallery' ? 'w-full bg-[#b3a17e]' : 'w-0 bg-white group-hover:w-full'}`}></div>
                        </div>
                        <div
                            onClick={() => setActiveTab('floorplans')}
                            className={`flex flex-col items-center gap-4 group cursor-pointer transition-all duration-300 ${activeTab === 'floorplans' ? 'opacity-100' : 'opacity-40 hover:opacity-100'}`}
                        >
                            <span className={`text-xs md:text-sm tracking-[0.4em] uppercase ${activeTab === 'floorplans' ? 'text-[#b3a17e]' : 'text-white'}`}>Floor Plans</span>
                            <div className={`h-[1px] transition-all duration-300 ${activeTab === 'floorplans' ? 'w-full bg-[#b3a17e]' : 'w-0 bg-white group-hover:w-full'}`}></div>
                        </div>
                        <div
                            onClick={() => setActiveTab('location')}
                            className={`flex flex-col items-center gap-4 group cursor-pointer transition-all duration-300 ${activeTab === 'location' ? 'opacity-100' : 'opacity-40 hover:opacity-100'}`}
                        >
                            <span className={`text-xs md:text-sm tracking-[0.4em] uppercase ${activeTab === 'location' ? 'text-[#b3a17e]' : 'text-white'}`}>Location</span>
                            <div className={`h-[1px] transition-all duration-300 ${activeTab === 'location' ? 'w-full bg-[#b3a17e]' : 'w-0 bg-white group-hover:w-full'}`}></div>
                        </div>
                        <div
                            onClick={() => setActiveTab('brochure')}
                            className={`flex flex-col items-center gap-4 group cursor-pointer transition-all duration-300 ${activeTab === 'brochure' ? 'opacity-100' : 'opacity-40 hover:opacity-100'}`}
                        >
                            <span className={`text-xs md:text-sm tracking-[0.4em] uppercase ${activeTab === 'brochure' ? 'text-[#b3a17e]' : 'text-white'}`}>Brochure</span>
                            <div className={`h-[1px] transition-all duration-300 ${activeTab === 'brochure' ? 'w-full bg-[#b3a17e]' : 'w-0 bg-white group-hover:w-full'}`}></div>
                        </div>
                        <div
                            onClick={() => setActiveTab('availability')}
                            className={`flex flex-col items-center gap-4 group cursor-pointer transition-all duration-300 ${activeTab === 'availability' ? 'opacity-100' : 'opacity-40 hover:opacity-100'}`}
                        >
                            <span className={`text-xs md:text-sm tracking-[0.4em] uppercase whitespace-nowrap ${activeTab === 'availability' ? 'text-[#b3a17e]' : 'text-white'}`}>Unit Availability</span>
                            <div className={`h-[1px] transition-all duration-300 ${activeTab === 'availability' ? 'w-full bg-[#b3a17e]' : 'w-0 bg-white group-hover:w-full'}`}></div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="w-full bg-[#F8EEDB] py-24 px-6 md:px-12 lg:px-24 flex flex-col items-center gap-16">
                    <h2 className="text-[56px] italic text-[#2E311A] tracking-tight text-center">
                        Frequently Asked questions
                    </h2>

                    <div className="w-full max-w-5xl flex flex-col gap-4">
                        {data.faq.map((faq, index) => {
                            const isOpen = openFaq === index;
                            return (
                                <div
                                    key={index}
                                    className={`w-full rounded-[20px] bg-[#C6AE73] transition-all duration-500 overflow-hidden`}
                                >
                                    <button
                                        onClick={() => setOpenFaq(isOpen ? null : index)}
                                        className="w-full px-8 py-6 flex items-center justify-between text-left group"
                                    >
                                        <span className={`text-[20px] font-medium font-body tracking-wide text-[#F8EEDB]`}>
                                            {faq.question}
                                        </span>
                                        <ArrowUpRight
                                            className={`w-[33px] h-[33px] transition-transform duration-500 text-black ${isOpen ? 'rotate-45' : ''}`}
                                            strokeWidth={1.5}
                                        />
                                    </button>

                                    <div className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-40 opacity-100 pb-8 px-8' : 'max-h-0 opacity-0'}`}>
                                        <p className="text-white/90 text-[16px] md:text-[20px] font-light leading-relaxed max-w-4xl">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Footer */}
                <footer className="w-full py-6 flex items-center justify-center bg-[#F8EEDB] relative z-20 border-t border-black/5">
                    <p className="text-[8px] md:text-[10px] text-[#2E311A]/60 tracking-widest uppercase font-medium">
                        ©2025 VS HOLDING. All rights reserved
                    </p>
                </footer>

                {/* Floating Contact Sidebar (Figma Sync) */}
                <div className="fixed right-0 bottom-12 z-50 flex flex-col items-end gap-3 pointer-events-none">
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
        </>
    );
}

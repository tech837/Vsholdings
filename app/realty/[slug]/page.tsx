"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, use } from "react";
import { notFound } from "next/navigation";
import InterestOverlay from "@/components/InterestOverlay";
import { Phone, MessageCircle, ChevronLeft, ChevronRight, MapPin, Waves, Leaf, Layout, ArrowRight, ArrowUpRight } from "lucide-react";
import { projectsData } from "@/data/projects";

// Next.js 15+ dynamic route props
export default function PropertyPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const data = projectsData[slug];

    if (!data) {
        notFound();
    }

    const [currentIdx, setCurrentIdx] = useState(0);
    const [activeTab, setActiveTab] = useState<'location' | 'gallery' | 'floorplans' | 'brochure'>('location');
    const [galleryIdx, setGalleryIdx] = useState(0);
    const [floorPlanIdx, setFloorPlanIdx] = useState(0);
    const [openFaq, setOpenFaq] = useState<number | null>(0);
    const [showOverlay, setShowOverlay] = useState(true);
    const [isManualOpen, setIsManualOpen] = useState(false);

    const nextSlide = () => {
        setCurrentIdx((prev) => (prev + 1) % data.carouselImages.length);
    };

    const prevSlide = () => {
        setCurrentIdx((prev) => (prev - 1 + data.carouselImages.length) % data.carouselImages.length);
    };

    const nextGallery = () => {
        setGalleryIdx((prev) => (prev + 1) % data.gallery.length);
    };

    const prevGallery = () => {
        setGalleryIdx((prev) => (prev - 1 + data.gallery.length) % data.gallery.length);
    };

    const getIconComponent = (iconName: string, className: string) => {
        switch (iconName) {
            case 'MapPin': return <MapPin className={className} strokeWidth={1.5} />;
            case 'Waves': return <Waves className={className} strokeWidth={1.5} />;
            case 'Leaf': return <Leaf className={className} strokeWidth={1.5} />;
            case 'Layout': return <Layout className={className} strokeWidth={1.5} />;
            default: return <MapPin className={className} strokeWidth={1.5} />;
        }
    };

    return (
        <>
            {showOverlay && <InterestOverlay onComplete={() => setShowOverlay(false)} backgroundImage={data.overlayBgImage} showCloseButton={false} />}
            {isManualOpen && <InterestOverlay onComplete={() => setIsManualOpen(false)} backgroundImage={data.overlayBgImage} showCloseButton={true} />}
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

                {/* Why Project Section */}
                <section className="w-full bg-[#fdfaf1] pt-24 pb-4 md:pb-6 px-6 md:px-12 lg:px-16 flex flex-col items-start gap-12">
                    <div className="max-w-4xl">
                        <h2 className="text-3xl md:text-5xl text-[#1a1a1a] font-light tracking-tight leading-tight">
                            Why {data.projectName} is the <br />
                            <span className="italic text-4xl md:text-6xl mt-1 block">right choice</span>
                        </h2>
                    </div>

                    <div className="w-full max-w-[1600px] mx-auto bg-[#2a3024] rounded-[2px] flex flex-col lg:flex-row overflow-hidden shadow-2xl min-h-[600px]">
                        <div className="w-full lg:w-1/2 min-h-[400px] relative">
                            <Image
                                src={data.section2Image}
                                alt={`${data.projectName} Property`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>

                        <div className="w-full lg:w-1/2 p-8 md:p-16 flex flex-col justify-center gap-12">
                            <div>
                                <h3 className="text-2xl md:text-3xl text-white/90 font-light tracking-wide mb-2">
                                    Beyond a residence —
                                </h3>
                                <p className="italic text-3xl md:text-4xl text-[#b3a17e] tracking-wide">
                                    your lifestyle upgrade
                                </p>
                            </div>

                            <div className="flex flex-col gap-6 lg:gap-8">
                                {data.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-start gap-6 group cursor-pointer transition-all duration-300">
                                        <div className="mt-1 text-[#b3a17e]/80 group-hover:text-[#b3a17e] transition-colors duration-300">
                                            {getIconComponent(feature.icon, "w-6 h-6")}
                                        </div>
                                        <div className="flex flex-col">
                                            <h4 className="text-lg font-light group-hover:font-medium text-white/90 group-hover:text-white tracking-widest group-hover:tracking-wide uppercase text-sm transition-all duration-300">
                                                {feature.title}
                                            </h4>
                                            <div className="max-h-0 opacity-0 overflow-hidden group-hover:max-h-32 group-hover:opacity-100 transition-all duration-500 ease-in-out">
                                                <p className="text-white/60 text-sm font-light leading-relaxed max-w-sm pt-2">
                                                    {feature.desc}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Elevated Living Section */}
                <section className="w-full h-screen relative flex items-center overflow-hidden">
                    <div className="absolute inset-0 z-0 h-full w-full">
                        <Image
                            src={data.elevatedBgImage || data.section2Image}
                            alt="Elevated Living Background"
                            fill
                            className="object-cover"
                            sizes="100vw"
                        />
                        <div className="absolute inset-0 bg-black/60 z-10"></div>
                    </div>

                    <div className="relative z-20 w-full px-6 md:px-12 lg:px-24 flex flex-col md:flex-row items-center gap-12 md:justify-between">
                        <div className="w-full md:w-[45%] flex flex-col gap-3">
                            <h4 className="italic text-base md:text-xl text-white/80 tracking-widest uppercase">
                                {data.projectName}
                            </h4>
                            <h3 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-[0.2em] text-white leading-none whitespace-nowrap mb-1 uppercase">
                                ELEVATED LIVING
                            </h3>
                            <p className="text-[9px] md:text-[10px] tracking-[0.4em] uppercase text-white/50 mb-6">
                                {data.locationLine2}
                            </p>
                            <button
                                onClick={() => {
                                    setActiveTab('gallery');
                                    document.getElementById('dynamic-content')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="w-[300px] md:w-[358px] h-[46px] flex items-center justify-center text-white text-[10px] md:text-xs tracking-[0.3em] uppercase bg-black/30 backdrop-blur-[2px] border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.25)] transition-all duration-300 hover:bg-white/10 hover:scale-[1.02] rounded-none"
                            >
                                EXPLORE THE COLLECTION
                            </button>
                        </div>

                        <div className="w-full md:w-[57%] lg:w-[855px] aspect-[16/10] relative md:-ml-12 lg:-ml-24 group">
                            <div className="w-full h-full overflow-hidden shadow-2xl rounded-sm relative">
                                {data.carouselImages.map((img, idx) => (
                                    <div
                                        key={idx}
                                        className={`absolute inset-0 transition-opacity duration-700 ${idx === currentIdx ? "opacity-100" : "opacity-0"}`}
                                    >
                                        <Image
                                            src={img}
                                            alt={`Gallery ${idx}`}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 60vw"
                                        />
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={prevSlide}
                                className="absolute -left-16 md:-left-20 top-1/2 -translate-y-1/2 z-30 p-2 text-white/30 hover:text-white transition-colors"
                            >
                                <ChevronLeft className="w-10 h-10 md:w-20 md:h-20" strokeWidth={1} />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="absolute -right-16 md:-right-20 top-1/2 -translate-y-1/2 z-30 p-2 text-white/30 hover:text-white transition-colors"
                            >
                                <ChevronRight className="w-10 h-10 md:w-20 md:h-20" strokeWidth={1} />
                            </button>
                        </div>
                    </div>
                </section>

                {/* Dynamic Content Section (Location / Gallery) */}
                <section id="dynamic-content" className="w-full bg-black py-12 md:py-20 px-6 md:px-12 lg:px-24 flex flex-col gap-12 relative min-h-[800px]">
                    {activeTab === 'location' ? (
                        <div key="location" className="w-full animate-in fade-in slide-in-from-bottom-10 zoom-in-95 duration-1000 ease-out">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-16">
                                {/* Map Side */}
                                <div className="w-full md:w-1/2 aspect-square max-w-[600px] relative rounded-sm overflow-hidden border border-white/10">
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
                                    <h3 className="text-3xl md:text-5xl italic text-white tracking-widest uppercase flex items-baseline gap-4">
                                        <span className="text-3xl md:text-5xl normal-case tracking-widest font-light opacity-80">PRIME</span>
                                        LOCATION
                                    </h3>

                                    <p className="text-[18px] md:text-[20px] text-[#F8EEDB] font-light leading-relaxed tracking-wide max-w-md">
                                        {data.locationDesc}
                                    </p>

                                    <button className="w-fit flex items-center gap-4 text-[#F8EEDB] text-[10px] md:text-xs tracking-[0.3em] py-4 px-10 rounded-full uppercase border border-white/10 bg-white/10 hover:bg-white/20 transition-all duration-300">
                                        View Location <ArrowRight className="w-4 h-4 ml-2" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : activeTab === 'gallery' ? (
                        <div key="gallery" className="w-full animate-in fade-in slide-in-from-bottom-10 zoom-in-95 duration-1000 ease-out">
                            <div className="w-full flex flex-col items-center justify-center gap-12">
                                <div className="relative w-full h-[650px] flex items-center justify-center overflow-visible">
                                    <div className="relative w-full max-w-7xl h-full flex items-center justify-center">
                                        {data.gallery.map((img, i) => {
                                            let offset = i - galleryIdx;
                                            if (offset < -Math.floor(data.gallery.length / 2)) offset += data.gallery.length;
                                            if (offset > Math.floor(data.gallery.length / 2)) offset -= data.gallery.length;

                                            const isActive = offset === 0;

                                            return (
                                                <div
                                                    key={i}
                                                    className={`absolute transition-all duration-700 ease-in-out flex flex-col items-center
                                                    ${isActive ? "z-30 opacity-100 scale-100" : "z-10 opacity-40 scale-75"}
                                                `}
                                                    style={{
                                                        transform: `translateX(${offset * 40}%) scale(${isActive ? 1 : 0.8})`,
                                                        filter: isActive ? 'none' : 'blur(2px)',
                                                    }}
                                                >
                                                    <div className="relative w-[320px] h-[190px] md:w-[600px] md:h-[360px] lg:w-[955px] lg:h-[580px] bg-white border-[8px] md:border-[12px] lg:border-[20px] border-white shadow-2xl overflow-hidden flex flex-col">
                                                        <div className="relative flex-grow w-full">
                                                            <Image
                                                                src={img.src}
                                                                alt={img.title}
                                                                fill
                                                                className="object-cover"
                                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 800px"
                                                            />
                                                        </div>
                                                        <div className={`h-8 md:h-12 lg:h-20 flex items-center justify-center transition-opacity duration-1000 ${isActive ? "opacity-100" : "opacity-0"}`}>
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
                        <div key="floorplans" className="w-full animate-in fade-in slide-in-from-bottom-10 zoom-in-95 duration-1000 ease-out">
                            <div className="w-full flex items-center justify-center py-6 md:py-10 px-4">
                                <div className="bg-[#d9d9d9] w-full max-w-[1400px] h-auto md:h-[650px] relative flex flex-col items-center justify-center rounded-sm overflow-hidden py-12 md:py-0">
                                    {/* Header Text - Aligned Left */}
                                    <p className="md:absolute md:top-14 md:left-14 text-[#1a1a1a]/70 text-[10px] md:text-sm tracking-[0.2em] text-left max-w-md font-light uppercase px-6 md:px-0 mb-8 md:mb-0" dangerouslySetInnerHTML={{ __html: data.floorPlansText }}>
                                    </p>

                                    <div className="relative w-full h-[500px] flex items-center justify-center overflow-visible mt-16 md:mt-20">
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
                                                    ${isActive ? "z-30 scale-115 opacity-100" : "z-10 scale-75 opacity-40"}
                                                    ${!isVisible ? "opacity-0 pointer-events-none" : ""}
                                                `}
                                                    style={{
                                                        transform: `translateX(${offset * 105}%)`,
                                                    }}
                                                >
                                                    <div className={`relative w-[300px] h-[200px] md:w-[540px] md:h-[360px] ${isActive ? "bg-[#d5c5a1] shadow-2xl" : "bg-[#2a3024]"} p-2 transition-all duration-700 flex items-center justify-center`}>
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

                                    {/* Label Bottom Right with line */}
                                    <div className="absolute right-10 bottom-10 hidden md:flex flex-col items-end gap-1 text-right">
                                        <div className="w-[120px] md:w-[180px] h-[1px] bg-[#1a1a1a]/30"></div>
                                        <span className="text-[#1a1a1a] text-lg md:text-xl font-bold tracking-[0.2em] uppercase">
                                            {data.floorPlans[floorPlanIdx].label}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : activeTab === 'brochure' ? (
                        <div key="brochure" className="w-full animate-in fade-in slide-in-from-bottom-10 zoom-in-95 duration-1000 ease-out">
                            <div className="w-full flex items-center justify-center min-h-[600px] px-4 md:px-0">
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
                    ) : (
                        <div className="w-full flex items-center justify-center h-[500px] animate-in fade-in duration-700">
                            <p className="text-white/40 tracking-widest uppercase italic">Section coming soon</p>
                        </div>
                    )}

                    {/* Bottom Tab Navigation */}
                    <div className="w-full flex flex-wrap justify-center gap-8 md:gap-16 lg:gap-24 border-t border-white/10 pt-16 mt-auto">
                        <div
                            onClick={() => setActiveTab('location')}
                            className={`flex flex-col items-center gap-4 group cursor-pointer transition-all duration-300 ${activeTab === 'location' ? 'opacity-100' : 'opacity-40 hover:opacity-100'}`}
                        >
                            <span className={`text-xs md:text-sm tracking-[0.4em] uppercase ${activeTab === 'location' ? 'text-[#b3a17e]' : 'text-white'}`}>Location</span>
                            <div className={`h-[1px] transition-all duration-300 ${activeTab === 'location' ? 'w-full bg-[#b3a17e]' : 'w-0 bg-white group-hover:w-full'}`}></div>
                        </div>
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
                            onClick={() => setActiveTab('brochure')}
                            className={`flex flex-col items-center gap-4 group cursor-pointer transition-all duration-300 ${activeTab === 'brochure' ? 'opacity-100' : 'opacity-40 hover:opacity-100'}`}
                        >
                            <span className={`text-xs md:text-sm tracking-[0.4em] uppercase ${activeTab === 'brochure' ? 'text-[#b3a17e]' : 'text-white'}`}>Brochure</span>
                            <div className={`h-[1px] transition-all duration-300 ${activeTab === 'brochure' ? 'w-full bg-[#b3a17e]' : 'w-0 bg-white group-hover:w-full'}`}></div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="w-full bg-[#fdfaf1] py-24 px-6 md:px-12 lg:px-24 flex flex-col items-center gap-16">
                    <h2 className="text-[36px] md:text-[56px] italic text-[#1a1a1a] tracking-tight text-center">
                        Frequently Asked questions
                    </h2>

                    <div className="w-full max-w-5xl flex flex-col gap-4">
                        {data.faq.map((faq, index) => {
                            const isOpen = openFaq === index;
                            return (
                                <div
                                    key={index}
                                    className={`w-full rounded-[20px] transition-all duration-500 overflow-hidden ${isOpen ? 'bg-[#C6AE73]' : 'bg-[#C6AE73]/40'}`}
                                >
                                    <button
                                        onClick={() => setOpenFaq(isOpen ? null : index)}
                                        className="w-full px-8 py-6 flex items-center justify-between text-left group"
                                    >
                                        <span className={`text-[18px] md:text-[20px] font-light tracking-wide text-[#2E311A]`}>
                                            {faq.question}
                                        </span>
                                        <ArrowUpRight
                                            className={`w-8 h-8 transition-transform duration-500 ${isOpen ? 'text-white rotate-45' : 'text-[#1a1a1a]/60 group-hover:text-[#1a1a1a]'}`}
                                            strokeWidth={1}
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
                <footer className="w-full py-6 flex items-center justify-center bg-black relative z-20">
                    <p className="text-[8px] md:text-[10px] text-white/40 tracking-widest uppercase">
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

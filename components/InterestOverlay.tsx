"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Phone, MessageCircle, ArrowRight, MapPin, X } from "lucide-react";

interface InterestOverlayProps {
    onComplete: () => void;
    backgroundImage: string;
    showCloseButton?: boolean;
}

export default function InterestOverlay({ onComplete, backgroundImage, showCloseButton = true }: InterestOverlayProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
            document.body.style.overflow = 'hidden';
        }, 50); // Minimal delay to trigger CSS transition immediately
        return () => {
            document.body.style.overflow = 'auto';
            clearTimeout(timer);
        };
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
        setTimeout(() => {
            handleExit();
        }, 2000);
    };

    const handleExit = () => {
        setIsExiting(true);
        setTimeout(() => {
            document.body.style.overflow = 'auto';
            onComplete();
        }, 2000); // Updated to match 2s duration
    };

    return (
        <div className={`fixed inset-0 z-[100] transition-opacity duration-[2000ms] ease-in-out ${(isVisible && !isExiting) ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            {/* Reduced background dimming slightly and applied a lighter blur so the underlying page is visible */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

            <div
                className={`absolute inset-0 transition-transform duration-[2000ms] ease-in-out
                    ${(isVisible && !isExiting) ? 'translate-x-[0%]' : 'translate-x-[110%]'}
                `}
            >
                {/* Form Panel (Right Side) with Glassmorphism */}
                <div className="absolute right-0 top-0 bottom-0 w-full md:w-[50%] lg:w-[45%] h-full bg-[#2E311A]/60 backdrop-blur-2xl md:rounded-tl-[120px] shadow-[-30px_0_80px_rgba(0,0,0,0.4)] p-8 md:p-16 lg:p-24 flex flex-col justify-center text-white z-10 border-l border-white/10">
                    {/* Close Button */}
                    {showCloseButton && (
                        <button
                            onClick={handleExit}
                            className="absolute top-8 right-8 md:top-12 md:right-12 text-white/40 hover:text-white transition-colors group p-2"
                            aria-label="Close overlay"
                        >
                            <X className="w-6 h-6 md:w-8 md:h-8" strokeWidth={1.5} />
                        </button>
                    )}

                    {isSubmitted ? (
                        <div className="flex flex-col items-center justify-center text-center gap-6 animate-in fade-in zoom-in duration-500">
                            <h2 className="text-4xl md:text-6xl font-serif italic tracking-widest uppercase text-[#c5c5a1]">Thank You</h2>
                            <p className="text-white/60 tracking-[0.3em] uppercase max-w-sm text-sm">
                                Your interest has been registered. Our representative will contact you shortly.
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-10 max-w-xl w-full mx-auto relative z-10">
                            <div className="flex flex-col gap-8">
                                <div className="space-y-4">
                                    <label className="text-white font-semibold tracking-wider text-[10px] md:text-sm uppercase block">Name</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Your Full Name"
                                        className="w-full bg-transparent border-b border-white/20 pb-2 text-white/60 text-sm font-light placeholder:text-white/30 focus:outline-none focus:border-white/60 transition-colors"
                                    />
                                </div>

                                <div className="flex flex-col md:flex-row gap-8">
                                    <div className="w-full md:w-1/2 space-y-4">
                                        <label className="text-white font-semibold tracking-wider text-[10px] md:text-sm uppercase block">Country Code</label>
                                        <div className="relative">
                                            <select className="w-full bg-transparent border-b border-white/20 pb-2 text-white/60 text-sm font-light focus:outline-none focus:border-white/60 transition-colors appearance-none cursor-pointer">
                                                <option className="bg-[#2E311A]">India (+91)</option>
                                                <option className="bg-[#2E311A]">UAE (+971)</option>
                                                <option className="bg-[#2E311A]">UK (+44)</option>
                                            </select>
                                            <div className="absolute right-0 bottom-6 pointer-events-none opacity-40">
                                                <ArrowRight className="w-4 h-4 rotate-90" strokeWidth={1} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full md:w-1/2 space-y-4">
                                        <label className="text-white font-semibold tracking-wider text-[10px] md:text-sm uppercase block">Mobile</label>
                                        <input
                                            type="tel"
                                            required
                                            placeholder="5X XXXXXXX"
                                            className="w-full bg-transparent border-b border-white/20 pb-2 text-white/60 text-sm font-light placeholder:text-white/30 focus:outline-none focus:border-white/60 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-white font-semibold tracking-wider text-[10px] md:text-sm uppercase block">Email</label>
                                    <input
                                        type="email"
                                        required
                                        placeholder="email@address.com"
                                        className="w-full bg-transparent border-b border-white/20 pb-2 text-white/60 text-sm font-light placeholder:text-white/30 focus:outline-none focus:border-white/60 transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-12 mt-6">
                                <button
                                    type="submit"
                                    className="w-full md:w-[385px] h-[46px] bg-white/5 hover:bg-white text-white hover:text-[#2E311A] text-xs tracking-[0.2em] uppercase transition-all duration-500 rounded-none border border-white/20 shadow-xl"
                                >
                                    Confirm Now
                                </button>

                                <div className="flex flex-col gap-5 text-white/50 text-[10px] md:text-xs tracking-[0.3em] uppercase font-light leading-relaxed">
                                    <div className="flex items-center gap-4">
                                        <Phone className="w-4 h-4 text-[#c5c5a1]/60" strokeWidth={1.5} />
                                        <span>800 5 228 37</span>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <MapPin className="w-4 h-4 mt-0.5 text-[#c5c5a1]/60" strokeWidth={1.5} />
                                        <span>SHEIKH ZAYED ROAD, DUBAI, UAE 341186</span>
                                    </div>
                                </div>
                            </div>
                        </form>
                    )}


                </div>
            </div>
        </div>
    );
}

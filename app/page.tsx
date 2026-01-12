"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { LamboScrollCanvas } from "@/components/LamboScrollCanvas";
import { LamboExperience } from "@/components/LamboExperience";

export default function Home() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    return (
        <main className="bg-lambo-black min-h-screen">
            <Navbar />

            {/* SCROLL SEQUENCE (Locked for 600vh) */}
            <section ref={containerRef} className="h-[600vh] relative">
                <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
                    <LamboScrollCanvas scrollYProgress={scrollYProgress} totalFrames={240} />
                    <LamboExperience scrollYProgress={scrollYProgress} />
                </div>
            </section>

            {/* REST OF SITE (Scrolls naturally after sequence) */}
            <div className="relative z-20 bg-lambo-black border-t border-lambo-gold/20">
                <SpecsGrid />
                <Features />
                <Footer />
            </div>
        </main>
    );
}

function SpecsGrid() {
    const specs = [
        { label: "Displacement", value: "6,498 cm³" },
        { label: "Max Power", value: "770 CV" },
        { label: "Top Speed", value: "350 km/h+" },
        { label: "0-100 km/h", value: "2.8s" },
        { label: "Braking Distance", value: "30m" },
        { label: "Weight", value: "1,525 kg" },
    ];

    return (
        <section className="py-12 md:py-24 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
            <h2 className="font-orbitron text-xl md:text-2xl lg:text-3xl mb-8 md:mb-12 flex items-center gap-3 md:gap-4">
                <span className="w-8 md:w-12 h-[1px] bg-lambo-gold" />
                <span className="text-sm md:text-base lg:text-xl">TECHNICAL SPECIFICATIONS</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
                {specs.map((spec, i) => (
                    <div key={i} className="bg-lambo-black p-6 md:p-10 group hover:bg-carbon-gray transition-colors">
                        <p className="text-lambo-gold text-[10px] md:text-xs tracking-widest uppercase mb-3 md:mb-4 opacity-60 group-hover:opacity-100 transition-opacity">
                            {spec.label}
                        </p>
                        <p className="font-orbitron text-xl md:text-2xl text-white">
                            {spec.value}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}

function Features() {
    return (
        <section className="py-12 md:py-24 px-4 md:px-8 lg:px-16 bg-carbon-gray/30">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
                <div>
                    <h2 className="font-orbitron text-2xl md:text-3xl lg:text-4xl mb-4 md:mb-6">AERODINAMICA LAMBORGHINI ATTIVA</h2>
                    <p className="font-rajdhani text-sm md:text-base lg:text-lg text-white/60 mb-6 md:mb-8 leading-relaxed">
                        ALA 2.0 is the evolution of the system designed for the Huracán Performante.
                        The system has been recalibrated for the Aventador SVJ, taking into account the
                        car's enhanced lateral acceleration and providing even more downforce.
                    </p>
                    <button className="px-6 md:px-8 py-2 md:py-3 bg-transparent border border-white/20 hover:border-lambo-gold hover:text-lambo-gold transition-all duration-300 font-orbitron text-[10px] md:text-xs tracking-widest uppercase">
                        Learn more about ALA
                    </button>
                </div>
                <div className="aspect-video bg-black/50 border border-lambo-gold/10 flex items-center justify-center relative group overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-lambo-gold/5 to-transparent group-hover:opacity-0 transition-opacity" />
                    <span className="font-orbitron text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.4em] text-white/20 uppercase">Internal Systems View</span>
                </div>
            </div>
        </section>
    );
}

function Footer() {
    return (
        <footer className="py-20 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-8 md:px-16 flex flex-col items-center">
                <span className="font-orbitron text-3xl font-bold tracking-tighter text-white/20 mb-12">
                    LAMBORGHINI
                </span>
                <div className="flex gap-12 mb-16">
                    <FooterLink>Facebook</FooterLink>
                    <FooterLink>Instagram</FooterLink>
                    <FooterLink>X (Twitter)</FooterLink>
                    <FooterLink>YouTube</FooterLink>
                </div>
                <p className="text-white/20 text-[10px] tracking-[0.3em] font-rajdhani uppercase">
                    © 2024 AUTOMOBILI LAMBORGHINI S.P.A. | ALL RIGHTS RESERVED
                </p>
            </div>
        </footer>
    );
}

function FooterLink({ children }: { children: React.ReactNode }) {
    return (
        <a href="#" className="font-rajdhani text-xs tracking-widest text-white/40 hover:text-white transition-colors">
            {children}
        </a>
    );
}

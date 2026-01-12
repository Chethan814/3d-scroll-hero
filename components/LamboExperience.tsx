"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { carData } from "@/data/carData";

interface LamboExperienceProps {
    scrollYProgress: MotionValue<number>;
}

export function LamboExperience({ scrollYProgress }: LamboExperienceProps) {
    // Opacity transforms for each section
    const heroOpacity = useTransform(scrollYProgress, [0, 0.2, 0.33], [1, 1, 0]);
    const designOpacity = useTransform(scrollYProgress, [0.33, 0.45, 0.55, 0.66], [0, 1, 1, 0]);
    const engineOpacity = useTransform(scrollYProgress, [0.66, 0.8, 1], [0, 1, 1]);

    // Y-axis transforms for entrance/exit feel
    const heroY = useTransform(scrollYProgress, [0, 0.33], [0, -50]);
    const designY = useTransform(scrollYProgress, [0.33, 0.5, 0.66], [50, 0, -50]);
    const engineY = useTransform(scrollYProgress, [0.66, 1], [50, 0]);

    return (
        <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center overflow-hidden">
            {/* HUD Frame Decorations - Hidden on mobile */}
            <div className="hidden md:block absolute inset-10 border border-lambo-gold/10 pointer-events-none">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-lambo-gold" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-lambo-gold" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-lambo-gold" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-lambo-gold" />
            </div>

            {/* Hero Section */}
            <motion.div
                style={{ opacity: heroOpacity, y: heroY }}
                className="absolute left-4 md:left-16 lg:left-32 right-4 md:right-auto max-w-xl px-4 md:px-0"
            >
                <span className="font-orbitron text-lambo-gold tracking-[0.3em] md:tracking-[0.5em] text-[10px] md:text-sm mb-2 md:mb-4 block">
                    {carData.hero.subtitle}
                </span>
                <h1 className="font-orbitron text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black mb-4 md:mb-6 leading-tight">
                    AVENTADOR<br /><span className="text-lambo-gold">SVJ</span>
                </h1>
                <p className="font-rajdhani text-sm md:text-lg text-white/60 mb-6 md:mb-8 border-l-2 border-lambo-gold pl-4 md:pl-6 hidden sm:block">
                    {carData.hero.description}
                </p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
                    <div>
                        <p className="text-[9px] md:text-[10px] tracking-widest text-white/40 uppercase mb-1">Price Start</p>
                        <p className="font-orbitron text-xl md:text-2xl text-white">{carData.hero.price}</p>
                    </div>
                    <div className="hidden sm:block w-[1px] h-12 bg-white/10" />
                    <button className="pointer-events-auto px-6 md:px-8 py-2 md:py-3 bg-lambo-gold text-black font-orbitron text-[10px] md:text-xs tracking-[0.2em] font-bold hover:bg-bright-gold transition-colors">
                        CONFIGURATOR
                    </button>
                </div>
            </motion.div>

            {/* Design Section */}
            <motion.div
                style={{ opacity: designOpacity, y: designY }}
                className="absolute left-4 md:left-auto right-4 md:right-16 lg:right-32 text-left md:text-right max-w-md px-4 md:px-0"
            >
                <span className="font-orbitron text-lambo-gold tracking-[0.3em] md:tracking-[0.5em] text-[10px] md:text-sm mb-2 md:mb-4 block">
                    {carData.design.subtitle}
                </span>
                <h2 className="font-orbitron text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-black mb-6 md:mb-8">
                    LIGHTWEIGHT<br />ENGINEERING
                </h2>
                <div className="space-y-4 md:space-y-6">
                    {carData.design.specs.map((spec: { label: string; value: string }, i: number) => (
                        <div key={i} className="flex flex-col items-start md:items-end">
                            <span className="text-[9px] md:text-[10px] tracking-[0.3em] text-lambo-gold uppercase mb-1">{spec.label}</span>
                            <span className="font-orbitron text-lg md:text-xl">{spec.value}</span>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Engine Section */}
            <motion.div
                style={{ opacity: engineOpacity, y: engineY }}
                className="absolute bottom-12 md:bottom-24 left-4 md:left-16 lg:left-32 right-4 md:right-16 lg:right-32 flex flex-col md:flex-row items-start md:items-end justify-between gap-6 md:gap-0 px-4 md:px-0"
            >
                <div className="text-left">
                    <span className="font-orbitron text-lambo-gold tracking-[0.3em] md:tracking-[0.5em] text-[10px] md:text-sm mb-2 md:mb-4 block">
                        {carData.engine.subtitle}
                    </span>
                    <h2 className="font-orbitron text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-black">
                        HEART OF THE<br />BULL
                    </h2>
                </div>

                <div className="grid grid-cols-2 gap-x-6 md:gap-x-12 gap-y-4 md:gap-y-8 bg-black/60 md:bg-black/40 backdrop-blur-md p-4 md:p-8 border-t border-l border-lambo-gold/20 w-full md:w-auto">
                    {carData.engine.specs.map((spec: { label: string; value: string }, i: number) => (
                        <div key={i}>
                            <p className="text-[8px] md:text-[9px] tracking-widest text-lambo-gold uppercase mb-1 opacity-60">{spec.label}</p>
                            <p className="font-orbitron text-sm md:text-lg text-white">{spec.value}</p>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
            >
                <span className="font-rajdhani text-[9px] md:text-[10px] tracking-[0.4em] md:tracking-[0.5em] text-white/40 uppercase">Scroll to explore</span>
                <div className="w-[1px] h-8 md:h-12 bg-white/20 relative overflow-hidden">
                    <motion.div
                        className="absolute top-0 left-0 w-full h-3 md:h-4 bg-lambo-gold"
                        animate={{ y: [0, 32, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                </div>
            </motion.div>
        </div>
    );
}

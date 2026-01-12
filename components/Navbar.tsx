"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";

export function Navbar() {
    const { scrollY } = useScroll();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const backgroundColor = useTransform(
        scrollY,
        [0, 100],
        ["rgba(26, 26, 26, 0)", "rgba(26, 26, 26, 0.8)"]
    );
    const backdropBlur = useTransform(
        scrollY,
        [0, 100],
        ["blur(0px)", "blur(12px)"]
    );

    return (
        <motion.nav
            style={{ backgroundColor, backdropFilter: backdropBlur }}
            className="fixed top-0 left-0 right-0 z-50 h-16 md:h-20 flex items-center justify-between px-4 md:px-8 lg:px-16"
        >
            <div className="flex items-center gap-2">
                <span className="font-orbitron text-lg md:text-2xl font-bold tracking-tighter text-lambo-gold">
                    LAMBORGHINI
                </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6 lg:gap-10">
                <NavLink href="#">AVENTADOR</NavLink>
                <NavLink href="#">SPECIFICATIONS</NavLink>
                <NavLink href="#">HERITAGE</NavLink>
            </div>

            {/* Desktop Inquire Button */}
            <button className="hidden md:block px-4 lg:px-6 py-2 border border-lambo-gold text-lambo-gold font-orbitron text-xs tracking-widest hover:bg-lambo-gold hover:text-black transition-all duration-300">
                INQUIRE
            </button>

            {/* Mobile Menu Button */}
            <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden flex flex-col gap-1.5 w-6 h-6 justify-center items-center"
                aria-label="Toggle menu"
            >
                <motion.span
                    animate={mobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                    className="w-full h-0.5 bg-lambo-gold block"
                />
                <motion.span
                    animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                    className="w-full h-0.5 bg-lambo-gold block"
                />
                <motion.span
                    animate={mobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                    className="w-full h-0.5 bg-lambo-gold block"
                />
            </button>

            {/* Mobile Menu */}
            <motion.div
                initial={false}
                animate={mobileMenuOpen ? { x: 0 } : { x: "100%" }}
                transition={{ type: "tween", duration: 0.3 }}
                className="md:hidden fixed top-16 right-0 w-64 h-screen bg-lambo-black/95 backdrop-blur-xl border-l border-lambo-gold/20 flex flex-col p-8 gap-6"
            >
                <NavLink href="#" mobile onClick={() => setMobileMenuOpen(false)}>
                    AVENTADOR
                </NavLink>
                <NavLink href="#" mobile onClick={() => setMobileMenuOpen(false)}>
                    SPECIFICATIONS
                </NavLink>
                <NavLink href="#" mobile onClick={() => setMobileMenuOpen(false)}>
                    HERITAGE
                </NavLink>
                <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="mt-4 px-6 py-3 border border-lambo-gold text-lambo-gold font-orbitron text-xs tracking-widest hover:bg-lambo-gold hover:text-black transition-all duration-300"
                >
                    INQUIRE
                </button>
            </motion.div>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setMobileMenuOpen(false)}
                    className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-[-1]"
                />
            )}
        </motion.nav>
    );
}

function NavLink({
    href,
    children,
    mobile = false,
    onClick
}: {
    href: string;
    children: React.ReactNode;
    mobile?: boolean;
    onClick?: () => void;
}) {
    return (
        <a
            href={href}
            onClick={onClick}
            className={`font-rajdhani font-semibold tracking-widest text-white/70 hover:text-lambo-gold transition-colors duration-300 ${mobile ? "text-base py-2 border-b border-white/10" : "text-sm"
                }`}
        >
            {children}
        </a>
    );
}

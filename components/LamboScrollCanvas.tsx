"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { motion, MotionValue, useTransform } from "framer-motion";

interface LamboScrollCanvasProps {
    scrollYProgress: MotionValue<number>;
    totalFrames: number;
}

export function LamboScrollCanvas({ scrollYProgress, totalFrames }: LamboScrollCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Map scroll progress to frame index
    const frameIndex = useTransform(scrollYProgress, [0, 1], [1, totalFrames]);

    // Preload images
    useEffect(() => {
        const loadedImages: HTMLImageElement[] = [];
        let loadedCount = 0;

        for (let i = 1; i <= totalFrames; i++) {
            const img = new Image();
            const frameNumber = i.toString().padStart(3, "0");
            img.src = `/lamborghini-Frames/ezgif-frame-${frameNumber}.jpg`;
            img.onload = () => {
                loadedCount++;
                if (loadedCount === totalFrames) {
                    setIsLoaded(true);
                }
            };
            loadedImages[i] = img;
        }
        setImages(loadedImages);
    }, [totalFrames]);

    // Handle Canvas Drawing
    useEffect(() => {
        const draw = () => {
            const canvas = canvasRef.current;
            if (!canvas || !isLoaded) return;

            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            const currentFrame = Math.floor(frameIndex.get());
            const img = images[currentFrame];

            if (img) {
                // High-DPI Fix
                const dpr = window.devicePixelRatio || 1;
                canvas.width = window.innerWidth * dpr;
                canvas.height = window.innerHeight * dpr;
                canvas.style.width = `${window.innerWidth}px`;
                canvas.style.height = `${window.innerHeight}px`;
                ctx.scale(dpr, dpr);

                // Object-fit contain logic
                const canvasAspectRatio = window.innerWidth / window.innerHeight;
                const imgAspectRatio = img.width / img.height;

                let drawWidth, drawHeight, offsetX, offsetY;

                if (canvasAspectRatio > imgAspectRatio) {
                    drawHeight = window.innerHeight;
                    drawWidth = drawHeight * imgAspectRatio;
                    offsetX = (window.innerWidth - drawWidth) / 2;
                    offsetY = 0;
                } else {
                    drawWidth = window.innerWidth;
                    drawHeight = drawWidth / imgAspectRatio;
                    offsetX = 0;
                    offsetY = (window.innerHeight - drawHeight) / 2;
                }

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
            }
        };

        const unsubscribe = frameIndex.on("change", draw);
        window.addEventListener("resize", draw);
        draw(); // Initial draw

        return () => {
            unsubscribe();
            window.removeEventListener("resize", draw);
        };
    }, [isLoaded, images, frameIndex]);

    return (
        <div className="relative w-full h-full flex items-center justify-center">
            {!isLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20 space-y-4">
                    <div className="w-48 h-[2px] bg-carbon-gray relative overflow-hidden">
                        <motion.div
                            className="absolute inset-0 bg-lambo-gold origin-left"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                        />
                    </div>
                    <p className="font-orbitron text-xs tracking-[0.3em] text-lambo-gold animate-pulse">
                        INITIALIZING SYSTEMS...
                    </p>
                </div>
            )}
            <canvas
                ref={canvasRef}
                className="block w-full h-full"
            />
        </div>
    );
}

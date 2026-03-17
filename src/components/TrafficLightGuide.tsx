'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Info, X } from 'lucide-react';

const GUIDE_CONTENT = {
    GREEN: {
        title: "Green Light: GO",
        description: "Time to work! Keep a steady, firm rhythm. Show your dedication.",
        color: "text-green-500",
        bg: "bg-green-500/10",
        border: "border-green-500/20",
        glow: "shadow-[0_0_20px_rgba(34,197,94,0.3)]"
    },
    YELLOW: {
        title: "Yellow Light: CAUTION",
        description: "Slow down... You're getting close. Reduce speed, focus on the sensation, and maintain control.",
        color: "text-yellow-400",
        bg: "bg-yellow-400/10",
        border: "border-yellow-400/20",
        glow: "shadow-[0_0_20px_rgba(234,179,8,0.3)]"
    },
    RED: {
        title: "Red Light: STOP!",
        description: "Hands off! Don't touch a thing. Feel the heat and let the energy build. Control is everything.",
        color: "text-red-500",
        bg: "bg-red-500/10",
        border: "border-red-500/20",
        glow: "shadow-[0_0_20px_rgba(239,68,68,0.3)]"
    }
};

type ColorKey = keyof typeof GUIDE_CONTENT;

export function TrafficLightGuide() {
    const [activeColor, setActiveColor] = useState<ColorKey | null>(null);

    return (
        <div className="flex flex-col items-center gap-3 py-2 animate-in fade-in zoom-in duration-1000">
            <div className="flex flex-row md:flex-col gap-2 p-2.5 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md shadow-xl relative">
                {(Object.keys(GUIDE_CONTENT) as ColorKey[]).map((color) => (
                    <button
                        key={color}
                        onClick={() => setActiveColor(activeColor === color ? null : color)}
                        className={cn(
                            "w-8 h-8 md:w-10 md:h-10 rounded-full border transition-all duration-300 relative group",
                            color === 'GREEN' && (activeColor === 'GREEN' ? "bg-green-500 border-green-400 shadow-[0_0_20px_rgba(34,197,94,0.5)]" : "bg-green-950/40 border-green-900/50 hover:border-green-500/50"),
                            color === 'YELLOW' && (activeColor === 'YELLOW' ? "bg-yellow-500 border-yellow-400 shadow-[0_0_20px_rgba(234,179,8,0.5)]" : "bg-yellow-950/40 border-yellow-900/50 hover:border-yellow-500/50"),
                            color === 'RED' && (activeColor === 'RED' ? "bg-red-500 border-red-400 shadow-[0_0_20px_rgba(239,68,68,0.5)]" : "bg-red-950/40 border-red-900/50 hover:border-red-500/50")
                        )}
                    >
                        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-white/10" />
                        {activeColor === color && (
                            <motion.div
                                layoutId="active-glow"
                                className="absolute -inset-1.5 rounded-full border border-white/20 animate-pulse"
                            />
                        )}
                    </button>
                ))}

                {/* Pop-up for Mobile/Desktop */}
                <AnimatePresence>
                    {activeColor && (
                        <>
                            {/* Backdrop to close on click outside */}
                            <div 
                                className="fixed inset-0 z-40 bg-black/5" 
                                onClick={() => setActiveColor(null)}
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: activeColor === 'RED' ? -15 : activeColor === 'GREEN' ? 15 : 0 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: activeColor === 'RED' ? -10 : activeColor === 'GREEN' ? 10 : 0 }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                className={cn(
                                    "absolute z-50 p-4 rounded-xl border backdrop-blur-xl shadow-2xl transition-all",
                                    "left-1/2 -translate-x-1/2 bottom-full mb-6 w-[240px] md:left-full md:translate-x-0 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:ml-6 md:mb-0 md:w-[280px]",
                                    GUIDE_CONTENT[activeColor].bg,
                                    GUIDE_CONTENT[activeColor].border,
                                    GUIDE_CONTENT[activeColor].glow
                                )}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    onClick={() => setActiveColor(null)}
                                    className="absolute top-2 right-2 p-1 hover:bg-white/10 rounded-full transition-colors"
                                >
                                    <X className="w-3.5 h-3.5 text-muted-foreground" />
                                </button>
                                
                                <h4 className={cn("text-sm font-black uppercase tracking-tight mb-1", GUIDE_CONTENT[activeColor].color)}>
                                    {GUIDE_CONTENT[activeColor].title}
                                </h4>
                                <p className="text-xs text-white/80 leading-relaxed italic">
                                    {GUIDE_CONTENT[activeColor].description}
                                </p>

                                <div className={cn(
                                    "absolute w-3 h-3 border-l border-b rotate-45 md:rotate-[135deg]",
                                    "left-1/2 -translate-x-1/2 bottom-[-7px] md:left-[-7px] md:top-1/2 md:-translate-y-1/2 md:translate-x-0",
                                    GUIDE_CONTENT[activeColor].bg,
                                    GUIDE_CONTENT[activeColor].border
                                )} />
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Info, X } from 'lucide-react';

const GUIDE_CONTENT = {
    GREEN: {
        title: "Luz Verde: Siga",
        description: "Hora de trabalhar! Mantenha um ritmo constante e firme. O Coach quer ver sua dedicação.",
        color: "text-green-500",
        bg: "bg-green-500/10",
        border: "border-green-500/20",
        glow: "shadow-[0_0_20px_rgba(34,197,94,0.3)]"
    },
    YELLOW: {
        title: "Luz Amarela: Atenção",
        description: "Devagar... Você está chegando perto do limite. Reduza a velocidade, foque na sensação e mantenha o controle.",
        color: "text-yellow-400",
        bg: "bg-yellow-400/10",
        border: "border-yellow-400/20",
        glow: "shadow-[0_0_20px_rgba(234,179,8,0.3)]"
    },
    RED: {
        title: "Luz Vermelha: PARE!",
        description: "Mãos ao alto! Não toque em nada. Sinta a frustração e deixe a energia acumular. O controle é tudo.",
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
        <div className="flex flex-col items-center gap-6 py-8 animate-in fade-in zoom-in duration-1000 delay-300">
            <div className="flex items-center gap-2 mb-2">
                <Info className="w-4 h-4 text-primary" />
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Como Funciona</h3>
            </div>

            <div className="flex flex-row md:flex-col gap-4 p-4 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-md shadow-2xl relative">
                {(Object.keys(GUIDE_CONTENT) as ColorKey[]).map((color) => (
                    <button
                        key={color}
                        onClick={() => setActiveColor(activeColor === color ? null : color)}
                        className={cn(
                            "w-12 h-12 md:w-14 md:h-14 rounded-full border-2 transition-all duration-300 relative group",
                            color === 'GREEN' && (activeColor === 'GREEN' ? "bg-green-500 border-green-400 shadow-[0_0_30px_rgba(34,197,94,0.6)]" : "bg-green-950/40 border-green-900/50 hover:border-green-500/50"),
                            color === 'YELLOW' && (activeColor === 'YELLOW' ? "bg-yellow-500 border-yellow-400 shadow-[0_0_30px_rgba(234,179,8,0.6)]" : "bg-yellow-950/40 border-yellow-900/50 hover:border-yellow-500/50"),
                            color === 'RED' && (activeColor === 'RED' ? "bg-red-500 border-red-400 shadow-[0_0_30px_rgba(239,68,68,0.6)]" : "bg-red-950/40 border-red-900/50 hover:border-red-500/50")
                        )}
                    >
                        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-white/10" />
                        {activeColor === color && (
                            <motion.div
                                layoutId="active-glow"
                                className="absolute -inset-2 rounded-full border border-white/20 animate-pulse"
                            />
                        )}
                    </button>
                ))}

                {/* Pop-up for Mobile/Desktop */}
                <AnimatePresence>
                    {activeColor && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, x: 20 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.9, x: 20 }}
                            className={cn(
                                "absolute z-50 p-5 rounded-2xl border backdrop-blur-xl shadow-2xl transition-all",
                                "left-1/2 -translate-x-1/2 bottom-full mb-6 w-[280px] md:left-full md:translate-x-0 md:bottom-auto md:top-0 md:ml-6 md:mb-0 md:w-[320px]",
                                GUIDE_CONTENT[activeColor].bg,
                                GUIDE_CONTENT[activeColor].border,
                                GUIDE_CONTENT[activeColor].glow
                            )}
                        >
                            <button
                                onClick={() => setActiveColor(null)}
                                className="absolute top-3 right-3 p-1 hover:bg-white/10 rounded-full transition-colors"
                            >
                                <X className="w-4 h-4 text-muted-foreground" />
                            </button>
                            
                            <h4 className={cn("text-lg font-black uppercase tracking-tight mb-2", GUIDE_CONTENT[activeColor].color)}>
                                {GUIDE_CONTENT[activeColor].title}
                            </h4>
                            <p className="text-sm text-white/80 leading-relaxed italic">
                                {GUIDE_CONTENT[activeColor].description}
                            </p>

                            <div className={cn(
                                "absolute w-4 h-4 border-l border-b rotate-45 md:rotate-[135deg]",
                                "left-1/2 -translate-x-1/2 bottom-[-9px] md:left-[-9px] md:top-6 md:translate-x-0",
                                GUIDE_CONTENT[activeColor].bg,
                                GUIDE_CONTENT[activeColor].border
                            )} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            
            <p className="text-[9px] font-bold text-muted-foreground/40 uppercase tracking-[0.1em] text-center max-w-[200px]">
                Toque nas luzes para aprender as regras do Coach
            </p>
        </div>
    );
}

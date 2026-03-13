'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SessionCommand } from '@/lib/session-types';
import { cn } from '@/lib/utils';

interface SessionDisplayProps {
    command: SessionCommand;
    state: string;
    timeLeft: number;
    totalDuration: number;
}

export function SessionDisplay({ command, state, timeLeft, totalDuration }: SessionDisplayProps) {
    const isRed = command.type === 'red';
    const isGreen = command.type === 'green';
    const isYellow = command.type === 'yellow';
    const isClimax = command.type === 'climax';
    const isEmergency = command.type === 'emergency';

    const progress = totalDuration > 0 ? (timeLeft / totalDuration) * 100 : 0;

    return (
        <div className="relative flex flex-col items-center justify-center min-h-[400px] w-full max-w-2xl mx-auto">
            {/* Background Glows */}
            <div className={cn(
                "absolute inset-0 rounded-full blur-[120px] transition-all duration-1000 opacity-50",
                isGreen && "bg-green-500/20",
                isRed && "bg-red-500/40 animate-pulse",
                isYellow && "bg-yellow-500/20",
                isClimax && "bg-purple-500/60 animate-pulse-slow",
                isEmergency && "bg-red-600/60 animate-[pulse_2s_infinite]"
            )} />

            <AnimatePresence mode="wait">
                <motion.div
                    key={command.text}
                    initial={{ opacity: 0, scale: 0.8, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 1.2, y: -30 }}
                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    className="relative z-10 text-center"
                >
                    {/* Numeric Countdown Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center -z-10 pointer-events-none select-none">
                        <motion.span
                            key={Math.floor(timeLeft / 1000)}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 0.1, scale: 1.5 }}
                            exit={{ opacity: 0 }}
                            className="text-[15rem] font-black text-white tabular-nums"
                        >
                            {Math.max(0, Math.ceil(timeLeft / 1000))}
                        </motion.span>
                    </div>

                    <h1 className={cn(
                        "text-7xl md:text-9xl font-black uppercase tracking-tighter mb-6 transition-all duration-500",
                        isGreen && "text-green-500",
                        isRed && "text-red-500 animate-pulse",
                        isYellow && "text-yellow-400",
                        isClimax && "text-purple-500",
                        isEmergency && "text-red-600 font-extrabold",
                        !isGreen && !isRed && !isYellow && !isClimax && !isEmergency && "text-white"
                    )}>
                        {command.text}
                    </h1>

                    {command.subtext && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-xl md:text-2xl text-muted-foreground font-medium tracking-wide mb-8"
                        >
                            {command.subtext}
                        </motion.p>
                    )}

                    {/* Progress Bar */}
                    {totalDuration > 0 && (
                        <div className="w-64 h-1.5 bg-white/10 rounded-full overflow-hidden mx-auto">
                            <motion.div
                                className={cn(
                                    "h-full transition-colors duration-500",
                                    isGreen && "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]",
                                    isRed && "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]",
                                    isYellow && "bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]"
                                )}
                                initial={{ width: "100%" }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.1, ease: "linear" }}
                            />
                        </div>
                    )}

                    {/* Champ Tip */}
                    {command.tip && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-12 text-[10px] uppercase tracking-[0.2em] text-muted-foreground/50 font-bold max-w-sm mx-auto leading-loose"
                        >
                            Champ Tip: {command.tip}
                        </motion.p>
                    )}

                    {isEmergency && (
                        <div className="mt-8 px-6 py-2 bg-red-600 text-white font-black rounded-full animate-bounce shadow-[0_0_30px_rgba(220,38,38,0.5)]">
                            EMERGENCY COOLDOWN
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Visual Indicator of state */}
            <div className="absolute bottom-[-100px] flex gap-4">
                <div className={cn(
                    "w-3 h-3 rounded-full transition-all duration-500",
                    isGreen ? "bg-green-500 glow-green scale-150" : "bg-white/10"
                )} />
                <div className={cn(
                    "w-3 h-3 rounded-full transition-all duration-500",
                    isYellow ? "bg-yellow-500 scale-150" : "bg-white/10"
                )} />
                <div className={cn(
                    "w-3 h-3 rounded-full transition-all duration-500",
                    (isRed || isEmergency) ? "bg-red-500 glow-red scale-150" : "bg-white/10"
                )} />
            </div>
        </div>
    );
}

'use client';

import React from 'react';
import { useSessionManager } from '@/hooks/use-session-manager';
import { SessionDisplay } from '@/components/SessionDisplay';
import { Button } from '@/components/ui/Button';
import { Shield, Zap, Info, RotateCcw, AlertTriangle, X, Octagon } from 'lucide-react';
import { TrafficLightGuide } from '@/components/TrafficLightGuide';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function Home() {
  const { state, command, timeLeft, totalDuration, startSession, stopSession, triggerPeak, triggerEmergency } = useSessionManager();
  const [activeTooltip, setActiveTooltip] = React.useState<string | null>(null);

  const isIdle = state === 'IDLE';

  const toggleTooltip = (id: string) => {
    setActiveTooltip(activeTooltip === id ? null : id);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 md:p-24 overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 p-6 flex justify-between items-center z-50 glass">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Zap className="text-white w-5 h-5" fill="currentColor" />
          </div>
          <span className="font-black text-xl tracking-tighter uppercase italic">Stroke Coach</span>
        </div>

        {!isIdle && (
          <div className="flex items-center gap-3">
            <button
              onClick={triggerEmergency}
              disabled={state === 'EMERGENCY_RED'}
              className={cn(
                "flex items-center gap-2 px-4 py-2 bg-red-600/20 text-red-500 rounded-full font-bold text-sm hover:bg-red-600/30 transition-all border border-red-500/20 group relative",
                state === 'EMERGENCY_RED' && "opacity-50 cursor-not-allowed grayscale"
              )}
            >
              <div className="relative w-4 h-4 flex items-center justify-center">
                <Octagon className="w-4 h-4" />
                <Zap className="w-2 h-2 absolute mt-[-0.5px]" fill="currentColor" />
              </div>
              <span>EMERGENCY STOP</span>
            </button>

            <button
              onClick={stopSession}
              className="p-2 bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-white rounded-full transition-colors border border-white/10"
              title="End Session"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        {isIdle ? (
          <div className="text-center max-w-xl space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">
              Master Your <span className="text-primary italic">Stamina</span>
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
              Experience the ultimate gamified edging trainer. Let the AI coach guide your pace,
              control your peaks, and transform your endurance.
            </p>
            <div className="pt-4">
              <Button
                onClick={startSession}
                className="px-12 py-8 text-2xl font-black uppercase tracking-widest rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_-5px_hsl(var(--primary)/0.5)]"
              >
                Start Session
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-12 max-w-4xl">
              <div className="group relative glass p-4 rounded-2xl flex items-center justify-center hover:z-[60] focus-within:z-[60] transition-all">
                <TrafficLightGuide />
              </div>
              <div 
                className="group relative glass p-4 rounded-2xl space-y-2 cursor-help hover:z-[60] focus-within:z-[60] transition-all"
                onClick={() => toggleTooltip('privacy')}
              >
                <Shield className="w-5 h-5 text-primary mx-auto" />
                <p className="text-xs font-bold uppercase text-muted-foreground">Privacy First</p>

                {/* Privacy Tooltip Content */}
                <AnimatePresence>
                  {activeTooltip === 'privacy' && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 10 }}
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-64 p-4 bg-neutral-900/95 backdrop-blur-xl border border-white/10 rounded-xl z-50 shadow-2xl"
                    >
                      <button 
                        className="absolute top-2 right-2 p-1 hover:bg-white/10 rounded-full"
                        onClick={(e) => { e.stopPropagation(); setActiveTooltip(null); }}
                      >
                        <X className="w-3 h-3 text-muted-foreground" />
                      </button>
                      <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-neutral-900 border-r border-b border-white/10 rotate-45" />
                      <p className="text-[10px] font-black uppercase text-primary mb-2 tracking-widest text-center">Pro Privacy</p>
                      <p className="text-xs text-muted-foreground leading-relaxed italic text-center">
                        Your data stays local. We don't track your sessions, and our specialized internal engine ensures your practice remains entirely private and secure.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div 
                className="group relative glass p-4 rounded-2xl space-y-2 cursor-help hover:z-[60] focus-within:z-[60] transition-all"
                onClick={() => toggleTooltip('ai')}
              >
                <Zap className="w-5 h-5 text-primary mx-auto" />
                <p className="text-xs font-bold uppercase text-muted-foreground">AI Guided</p>

                {/* AI Guided Tooltip Content */}
                <AnimatePresence>
                  {activeTooltip === 'ai' && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 10 }}
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-64 p-4 bg-neutral-900/95 backdrop-blur-xl border border-white/10 rounded-xl z-50 shadow-2xl"
                    >
                      <button 
                        className="absolute top-2 right-2 p-1 hover:bg-white/10 rounded-full"
                        onClick={(e) => { e.stopPropagation(); setActiveTooltip(null); }}
                      >
                        <X className="w-3 h-3 text-muted-foreground" />
                      </button>
                      <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-neutral-900 border-r border-b border-white/10 rotate-45" />
                      <p className="text-[10px] font-black uppercase text-primary mb-2 tracking-widest text-center">Dynamic Coaching</p>
                      <p className="text-xs text-muted-foreground leading-relaxed italic text-center">
                        A personalized AI-driven experience that reacts to your pace, providing authoritative instructions and dirty talk to guide you to the edge.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Champ Tips with Popover */}
              <div 
                className="group relative glass p-4 rounded-2xl space-y-2 cursor-help hover:z-[60] focus-within:z-[60] transition-all"
                onClick={() => toggleTooltip('tips')}
              >
                <Info className="w-5 h-5 text-primary mx-auto" />
                <p className="text-xs font-bold uppercase text-muted-foreground">Champ Tips</p>

                {/* Tooltip Content */}
                <AnimatePresence>
                  {activeTooltip === 'tips' && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 10 }}
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-64 p-4 bg-neutral-900/95 backdrop-blur-xl border border-white/10 rounded-xl z-50 shadow-2xl"
                    >
                      <button 
                        className="absolute top-2 right-2 p-1 hover:bg-white/10 rounded-full"
                        onClick={(e) => { e.stopPropagation(); setActiveTooltip(null); }}
                      >
                        <X className="w-3 h-3 text-muted-foreground" />
                      </button>
                      <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-neutral-900 border-r border-b border-white/10 rotate-45" />
                      <p className="text-[10px] font-black uppercase text-primary mb-2 tracking-widest text-center">Mastery Guide</p>
                      <p className="text-xs text-muted-foreground leading-relaxed italic text-center">
                        Professional techniques and psychological tricks to master your stamina, control your breathing, and push your limits in every session.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Bottom Warning Icon */}
            <div className="pt-8 flex flex-col items-center gap-2 text-yellow-500/40 hover:text-yellow-500/60 transition-colors">
              <AlertTriangle className="w-5 h-5" />
              <p className="text-[9px] font-black uppercase tracking-[0.3em]">Site in development — Features may change</p>
            </div>
          </div>
        ) : (
          <SessionDisplay command={command} state={state} timeLeft={timeLeft} totalDuration={totalDuration} />
        )}
      </div>

      {/* Footer / Stats */}
      {!isIdle && (
        <footer className="fixed bottom-0 left-0 right-0 p-8 glass animate-in slide-in-from-bottom-10">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Current Level</p>
              <p className="text-xl font-bold uppercase">Stamina Novice</p>
            </div>

            <div className="flex gap-4">
              {(state === 'RED' || state === 'GREEN' || state === 'YELLOW') && (
                <Button
                  variant="outline"
                  onClick={triggerPeak}
                  className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
                >
                  I'm gonna cum!
                </Button>
              )}
              <button
                onClick={stopSession}
                className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
              >
                <RotateCcw className="w-6 h-6" />
              </button>
            </div>

            <div className="text-right space-y-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Focus Score</p>
              <p className="text-xl font-bold uppercase text-primary">85%</p>
            </div>
          </div>
        </footer>
      )}
    </main>
  );
}

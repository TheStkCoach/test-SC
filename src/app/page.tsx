'use client';

import React from 'react';
import { useSessionManager } from '@/hooks/use-session-manager';
import { SessionDisplay } from '@/components/SessionDisplay';
import { Button } from '@/components/ui/Button';
import { Shield, Zap, Info, RotateCcw, AlertTriangle } from 'lucide-react';
import { TrafficLightGuide } from '@/components/TrafficLightGuide';

export default function Home() {
  const { state, command, timeLeft, totalDuration, startSession, stopSession, triggerPeak } = useSessionManager();

  const isIdle = state === 'IDLE';

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 md:p-24 overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 p-6 flex justify-between items-center z-50 glass">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Zap className="text-white w-5 h-5" fill="currentColor" />
          </div>
          <span className="font-black text-xl tracking-tighter uppercase italic">Stro Coach</span>
        </div>

        {!isIdle && (
          <button
            onClick={stopSession}
            className="flex items-center gap-2 px-4 py-2 bg-red-600/20 text-red-500 rounded-full font-bold text-sm hover:bg-red-600/30 transition-colors border border-red-500/20"
          >
            <Shield className="w-4 h-4" />
            PANIC STOP
          </button>
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
              <div className="group relative glass p-4 rounded-2xl space-y-2 cursor-help">
                <Shield className="w-5 h-5 text-primary mx-auto" />
                <p className="text-xs font-bold uppercase text-muted-foreground">Privacy First</p>

                {/* Privacy Tooltip Content */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-64 p-4 bg-neutral-900/95 backdrop-blur-xl border border-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none scale-90 group-hover:scale-100 z-50 shadow-2xl">
                  <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-neutral-900 border-r border-b border-white/10 rotate-45" />
                  <p className="text-[10px] font-black uppercase text-primary mb-2 tracking-widest">Pro Privacy</p>
                  <p className="text-xs text-muted-foreground leading-relaxed italic text-center">
                    Your data stays local. We don't track your sessions, and our specialized internal engine ensures your practice remains entirely private and secure.
                  </p>
                </div>
              </div>
              <div className="group relative glass p-4 rounded-2xl space-y-2 cursor-help">
                <Zap className="w-5 h-5 text-primary mx-auto" />
                <p className="text-xs font-bold uppercase text-muted-foreground">AI Guided</p>

                {/* AI Guided Tooltip Content */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-64 p-4 bg-neutral-900/95 backdrop-blur-xl border border-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none scale-90 group-hover:scale-100 z-50 shadow-2xl">
                  <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-neutral-900 border-r border-b border-white/10 rotate-45" />
                  <p className="text-[10px] font-black uppercase text-primary mb-2 tracking-widest">Dynamic Coaching</p>
                  <p className="text-xs text-muted-foreground leading-relaxed italic text-center">
                    A personalized AI-driven experience that reacts to your pace, providing authoritative instructions and dirty talk to guide you to the edge.
                  </p>
                </div>
              </div>

              {/* Champ Tips with Popover */}
              <div className="group relative glass p-4 rounded-2xl space-y-2 cursor-help">
                <Info className="w-5 h-5 text-primary mx-auto" />
                <p className="text-xs font-bold uppercase text-muted-foreground">Champ Tips</p>

                {/* Tooltip Content */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-64 p-4 bg-neutral-900/95 backdrop-blur-xl border border-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none scale-90 group-hover:scale-100 z-50 shadow-2xl">
                  <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-neutral-900 border-r border-b border-white/10 rotate-45" />
                  <p className="text-[10px] font-black uppercase text-primary mb-2 tracking-widest">Mastery Guide</p>
                  <p className="text-xs text-muted-foreground leading-relaxed italic text-center">
                    Professional techniques and psychological tricks to master your stamina, control your breathing, and push your limits in every session.
                  </p>
                </div>
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

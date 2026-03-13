'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { SessionState, COMMANDS, SessionCommand, CHAMP_TIPS } from '@/lib/session-types';

export function useSessionManager() {
    const [state, setState] = useState<SessionState>('IDLE');
    const [command, setCommand] = useState<SessionCommand>(COMMANDS.IDLE[0]);
    const [timeLeft, setTimeLeft] = useState(0);
    const [totalDuration, setTotalDuration] = useState(0);

    const getRandomCommand = useCallback((s: SessionState) => {
        const sessionCommands = COMMANDS[s];
        const baseCommand = sessionCommands[Math.floor(Math.random() * sessionCommands.length)];

        // 30% chance to show a Champ Tip during active states
        const shouldShowTip = Math.random() > 0.7 && (s === 'GREEN' || s === 'RED' || s === 'YELLOW');
        if (shouldShowTip) {
            const randomTip = CHAMP_TIPS[Math.floor(Math.random() * CHAMP_TIPS.length)];
            return { ...baseCommand, tip: randomTip };
        }

        return baseCommand;
    }, []);

    const nextState = useCallback(() => {
        setState((current) => {
            switch (current) {
                case 'IDLE': return 'PREPARING';
                case 'PREPARING': return 'GREEN';
                case 'GREEN': return Math.random() > 0.7 ? 'YELLOW' : 'RED';
                case 'YELLOW': return 'RED';
                case 'RED': return 'GREEN';
                default: return 'IDLE';
            }
        });
    }, []);

    useEffect(() => {
        setCommand(getRandomCommand(state));

        if (state !== 'IDLE' && state !== 'FINISHED' && state !== 'PEAK') {
            const interval = state === 'GREEN' ? 15000 + Math.random() * 20000 : 5000 + Math.random() * 10000;
            setTotalDuration(interval);
            setTimeLeft(interval);

            const timer = setTimeout(nextState, interval);
            return () => clearTimeout(timer);
        }
    }, [state, getRandomCommand, nextState]);

    useEffect(() => {
        if (timeLeft > 0) {
            const tick = setInterval(() => {
                setTimeLeft((prev) => Math.max(0, prev - 100));
            }, 100);
            return () => clearInterval(tick);
        }
    }, [timeLeft]);

    const startSession = () => setState('PREPARING');
    const stopSession = () => setState('IDLE');
    const triggerPeak = () => setState('PEAK');

    return {
        state,
        command,
        timeLeft,
        totalDuration,
        startSession,
        stopSession,
        triggerPeak
    };
}

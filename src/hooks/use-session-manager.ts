'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { SessionState, COMMANDS, SessionCommand, CHAMP_TIPS, EndType } from '@/lib/session-types';

export function useSessionManager() {
    const [state, setState] = useState<SessionState>('IDLE');
    const [command, setCommand] = useState<SessionCommand>(COMMANDS.IDLE[0]);
    const [timeLeft, setTimeLeft] = useState(0);
    const [totalDuration, setTotalDuration] = useState(0);
    const [endType, setEndType] = useState<EndType>('full');

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
                case 'PEAK_FULL': return 'FINISHED_FULL';
                case 'PEAK_RUINED': return 'FINISHED_RUINED';
                case 'PEAK_DENIED': return 'FINISHED_DENIED';
                default: return 'IDLE';
            }
        });
    }, []);

    useEffect(() => {
        setCommand(getRandomCommand(state));

        if (state !== 'IDLE' && !state.startsWith('FINISHED') && !state.startsWith('PEAK')) {
            let interval = state === 'GREEN' ? 15000 + Math.random() * 20000 : 5000 + Math.random() * 10000;
            
            // Fixed long duration for emergency cooldown
            if (state === 'EMERGENCY_RED') {
                interval = 60000;
            }

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
    
    const triggerPeak = () => {
        if (endType === 'ruined') setState('PEAK_RUINED');
        else if (endType === 'denial') setState('PEAK_DENIED');
        else setState('PEAK_FULL');
    };
    
    const triggerEmergency = () => setState('EMERGENCY_RED');

    return {
        state,
        command,
        timeLeft,
        totalDuration,
        endType,
        setEndType,
        startSession,
        stopSession,
        triggerPeak,
        triggerEmergency
    };
}

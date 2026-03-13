
export type SessionState = 'IDLE' | 'PREPARING' | 'GREEN' | 'RED' | 'YELLOW' | 'PEAK' | 'FINISHED' | 'EMERGENCY_RED';

export type SessionCommand = {
    text: string;
    subtext?: string;
    type: 'green' | 'red' | 'yellow' | 'climax' | 'neutral' | 'emergency';
    tip?: string;
};

export const CHAMP_TIPS = [
    "Breathe deep through your nose to stay in control.",
    "Relax your pelvic floor during the Red Light.",
    "Focus on the sound of my commands, not just the feeling.",
    "Try the 'squeeze technique' if you're getting too close.",
    "Frustration is just energy—use it to last longer.",
    "Keep your jaw relaxed; tension there is tension down there.",
    "Visualize your energy flowing up your spine, away from the edge.",
    "The longer you wait, the better it will feel when I let you go."
];

export const COMMANDS: Record<SessionState, SessionCommand[]> = {
    IDLE: [
        { text: "Ready to be mine?", type: 'neutral' },
        { text: "Shall we start?", type: 'neutral' },
        { text: "Need a coach?", type: 'neutral' },
        { text: "I've been waiting for you", type: 'neutral' }
    ],
    PREPARING: [
        { text: "Get comfortable...", subtext: "You won't be for long", type: 'neutral' },
        { text: "Focus only on me...", subtext: "Forget everything else", type: 'neutral' },
        { text: "Take a deep breath...", subtext: "It might be your last one for a while", type: 'neutral' },
        { text: "Are you ready?", subtext: "I'm going to push you to your limit", type: 'neutral' },
        { text: "Strip for me", subtext: "I want you exposed and ready", type: 'neutral' }
    ],
    GREEN: [
        { text: "Keep stroking", subtext: "Show me how much you want it", type: 'green' },
        { text: "You're doing so good", subtext: "Just like a good boy", type: 'green' },
        { text: "Faster now", subtext: "I want to see you struggle", type: 'green' },
        { text: "Stroke that cock", subtext: "Harder. Faster.", type: 'green' },
        { text: "Don't stop", subtext: "You're mine until I say otherwise", type: 'green' },
        { text: "Don't you love this?", subtext: "Feeling yourself for me", type: 'green' },
        { text: "Keep that rhythm", subtext: "Don't you dare slow down", type: 'green' },
        { text: "Build it up", subtext: "I want you desperate", type: 'green' },
        { text: "Such a needy boy", subtext: "Keep working for it", type: 'green' },
        { text: "Harder.", subtext: "I want to see that resolve break", type: 'green' },
        { text: "Faster, you slut", subtext: "Keep those hands moving", type: 'green' },
        { text: "I want to see it leak", subtext: "Work that shaft for me", type: 'green' },
        { text: "You're so desperate", subtext: "Keep stroking. Don't you dare stop.", type: 'green' },
        { text: "Focus on that feeling", subtext: "I'm the one in control here", type: 'green' },
        { text: "Squeeze it tighter", subtext: "I want you to feel every inch", type: 'green' },
        { text: "Grip it like you mean it", subtext: "Firm and steady strokes", type: 'green' },
        { text: "Show me some power", subtext: "Strong, deep movements now", type: 'green' }
    ],
    YELLOW: [
        { text: "Slow down...", subtext: "Don't you dare cum yet", type: 'yellow' },
        { text: "Breathe for me", subtext: "I'm not done with you", type: 'yellow' },
        { text: "Enjoy the ache", subtext: "You're getting so close, aren't you?", type: 'yellow' },
        { text: "Easy now...", subtext: "Control that urge", type: 'yellow' },
        { text: "Teasing you is fun", subtext: "Stay right on the edge", type: 'yellow' },
        { text: "Not quite yet", subtext: "I want you to suffer a bit longer", type: 'yellow' },
        { text: "Shhh...", subtext: "Just feel the heat building", type: 'yellow' },
        { text: "Hold it together", subtext: "You're right on the brink, I can tell", type: 'yellow' },
        { text: "Don't cross that line", subtext: "Not until I give you permission", type: 'yellow' },
        { text: "Feel that hunger?", subtext: "It's exactly what you deserve", type: 'yellow' },
        { text: "Almost still...", subtext: "Barely move your hands", type: 'yellow' },
        { text: "Just a light touch", subtext: "Barely graze the surface", type: 'yellow' },
        { text: "Whisper your stroke", subtext: "Almost not touching... so soft", type: 'yellow' },
        { text: "Slower... Slower...", subtext: "Don't you move a fraction faster", type: 'yellow' }
    ],
    RED: [
        { text: "STOP!", subtext: "Hands off right now!", type: 'red' },
        { text: "FREEZE", subtext: "If you touch it, you're in trouble", type: 'red' },
        { text: "Let go!", subtext: "Look at what you've done to yourself", type: 'red' },
        { text: "Hold it...", subtext: "Feel that hunger. Don't touch.", type: 'red' },
        { text: "HANDS OFF", subtext: "I said STOP.", type: 'red' },
        { text: "Don't move a muscle", subtext: "You're at my mercy", type: 'red' },
        { text: "Stay perfectly still", subtext: "Let the frustration build", type: 'red' },
        { text: "Look but don't touch", subtext: "You haven't earned it yet", type: 'red' },
        { text: "Put your hands up", subtext: "I want to see you twitching", type: 'red' },
        { text: "Suffer for me", subtext: "Don't you dare move those hands", type: 'red' },
        { text: "No more touching", subtext: "Just be a good, frustrated boy", type: 'red' }
    ],
    EMERGENCY_RED: [
        { text: "EMERGENCY STOP!", subtext: "HANDS OFF! Recover your control.", type: 'emergency' },
        { text: "Breathe...", subtext: "You almost lost it. Calm down now.", type: 'emergency' },
        { text: "Wait for it...", subtext: "The coach says you're not ready to cum.", type: 'emergency' },
        { text: "Total Cooldown", subtext: "Let the energy settle. Don't move.", type: 'emergency' }
    ],
    PEAK: [
        { text: "RELEASE", subtext: "Give it all to me now!", type: 'climax' },
        { text: "CUM FOR ME!", subtext: "Finally... drain yourself", type: 'climax' },
        { text: "NOW!", subtext: "I want to see you break", type: 'climax' },
        { text: "PAINT THE ROOM", subtext: "GIVE IT ALL TO ME", type: 'climax' },
        { text: "EXPLODE", subtext: "I want every single drop", type: 'climax' }
    ],
    FINISHED: [
        { text: "Good job", subtext: "You're a mess. I love it.", type: 'neutral' },
        { text: "Did you enjoy that?", subtext: "You look exhausted", type: 'neutral' },
        { text: "Clean up now", subtext: "Until next time...", type: 'neutral' }
    ]
};

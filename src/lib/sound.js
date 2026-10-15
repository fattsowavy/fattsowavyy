import { getSetting } from './settings';

let ctx;

// Short square-wave "blip", generated with Web Audio (no audio files). Silent unless SOUND is ON.
export const blip = (freq = 660, duration = 0.06) => {
    if (getSetting('sound') !== 'on') return;
    try {
        ctx ??= new (window.AudioContext || window.webkitAudioContext)();
        const t = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.05, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);
        osc.connect(gain).connect(ctx.destination);
        osc.start(t);
        osc.stop(t + duration);
    } catch {
        // Web Audio unavailable: stay silent
    }
};

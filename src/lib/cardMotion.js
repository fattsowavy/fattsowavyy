// Card viewer motion, rebuilt without GSAP after the "Ghouls" trading card demo (ghoul.gg, CodePen, MIT).
// Every animation is a 20 fps flipbook: poses are sampled in JS (so back/sine easing still apply)
// and held frame by frame with steps(1), which gives the motion its retro, low-frame-rate feel.
import { prefersReducedMotion } from './motion';

const FPS = 20;
const S = 1.70158;

export const OPEN_MS = 1900;
export const SWAP_MS = 900;
export const CLOSE_MS = 450;
export const ENTER_MS = 1200;
export const FLIP_MS = 700;

const ease = {
    outQuad: (t) => 1 - (1 - t) * (1 - t),
    outBack: (t) => 1 + (S + 1) * (t - 1) ** 3 + S * (t - 1) ** 2,
    inBack: (t) => (S + 1) * t ** 3 - S * t ** 2,
    inOutSine: (t) => -(Math.cos(Math.PI * t) - 1) / 2,
};

// progress of a sub-phase that starts at `start` ms and lasts `duration` ms
const phase = (t, start, duration) => Math.min(1, Math.max(0, (t - start) / duration));

const toTransform = ({ x = 0, y = 0, rx = 0, ry = 0 } = {}) =>
    `translate3d(${x}px, ${y}px, 0) rotateX(${rx}deg) rotateY(${ry}deg)`;

export const setPose = (el, pose) => {
    if (el) el.style.transform = toTransform(pose);
};

// Plays pose(t) on `el` for `duration` ms; resolves once the final pose is committed to el.style.
export const flipbook = (el, duration, pose) => {
    if (!el) return Promise.resolve();
    const end = toTransform(pose(duration));
    if (prefersReducedMotion() || !el.animate) {
        el.style.transform = end;
        return Promise.resolve();
    }
    const count = Math.max(1, Math.round((duration / 1000) * FPS));
    const keyframes = Array.from({ length: count + 1 }, (_, i) => ({
        offset: i / count,
        transform: toTransform(pose((duration * i) / count)),
        easing: 'steps(1, end)',
    }));
    const anim = el.animate(keyframes, { duration, fill: 'forwards' });
    const commit = () => {
        el.style.transform = end;
        anim.cancel();
    };
    return anim.finished.then(commit, commit);
};

// Rises from below while tipping forward (back ease), shows its back, spins twice and settles face-up.
export const openPose = (fromY) => (t) => {
    const rise = ease.outBack(phase(t, 0, 900));
    const ry = t < 1500 ? 180 + 560 * ease.inOutSine(phase(t, 450, 1050)) : 20 - 20 * ease.inOutSine(phase(t, 1500, 400));
    return { y: fromY * (1 - rise), rx: -130 * (1 - rise), ry };
};

// dir 1 = next (current card spins out to the left), -1 = prev
export const outPose = (dir, offX) => (t) => {
    const k = ease.outQuad(phase(t, 0, SWAP_MS));
    return { x: -dir * offX * k, ry: dir * 360 * k };
};

export const inPose = (dir, offX) => (t) => {
    const k = ease.outQuad(phase(t, 0, SWAP_MS));
    return { x: dir * offX * (1 - k), ry: -dir * 360 * (1 - k) };
};

export const closePose = (toY) => (t) => ({ y: toY * ease.inBack(phase(t, 0, CLOSE_MS)) });

// Hero player card: swings in from its back side, dropping and tipping into place (back ease)
export const enterPose = () => (t) => {
    const k = ease.outBack(phase(t, 0, ENTER_MS));
    return { y: 40 * (1 - k), rx: 25 * (1 - k), ry: -180 * (1 - k) };
};

// Half turn between two rotateY angles
export const spinPose = (from, to) => (t) => ({ ry: from + (to - from) * ease.inOutSine(phase(t, 0, FLIP_MS)) });

// Backdrop fade in 4 steps
export const fade = (el, from, to, duration = 300) => {
    if (!el?.animate || prefersReducedMotion()) return Promise.resolve();
    const anim = el.animate([{ opacity: from }, { opacity: to }], { duration, easing: 'steps(4, end)', fill: 'forwards' });
    return anim.finished.catch(() => {});
};

import { useEffect, useRef } from 'react';
import { hasFinePointer, prefersReducedMotion } from '../lib/motion';
import { getSetting } from '../lib/settings';

// Tilts an element toward the mouse while the pointer is over `areaRef`: up to ±max degrees,
// eased and snapped to 2° steps. Off the area it eases back to flat and drops the transform,
// because a 3D-rotated photo is resampled and looks soft; flat is the sharpest state.
// `resolveTarget()` returns the element to tilt (it may change, e.g. the active card slot).
// Skipped on touch devices, with reduced motion, and when Screen FX is off.
export const useHoverTilt = (areaRef, resolveTarget, { max = 12, busyRef } = {}) => {
    const resolveRef = useRef(resolveTarget);

    useEffect(() => {
        resolveRef.current = resolveTarget;
    });

    useEffect(() => {
        if (!hasFinePointer() || prefersReducedMotion() || getSetting('fx') === 'off') return;
        const mouse = { x: -1, y: -1 };
        const angle = { rx: 0, ry: 0 };
        let frame = 0;
        let lastEl = null;
        let last = '';
        const onMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };
        const tick = () => {
            frame = requestAnimationFrame(tick);
            if (busyRef?.current) return;
            const r = areaRef.current?.getBoundingClientRect();
            const over = r && mouse.x >= r.left && mouse.x <= r.right && mouse.y >= r.top && mouse.y <= r.bottom;
            const target = over
                ? { ry: ((mouse.x - r.left) / r.width - 0.5) * 2 * max, rx: ((mouse.y - r.top) / r.height - 0.5) * -2 * max }
                : { rx: 0, ry: 0 };
            angle.rx += (target.rx - angle.rx) * 0.125;
            angle.ry += (target.ry - angle.ry) * 0.125;
            const rx = Math.round(angle.rx / 2) * 2;
            const ry = Math.round(angle.ry / 2) * 2;
            const transform = rx === 0 && ry === 0 ? '' : `rotateX(${rx}deg) rotateY(${ry}deg)`;
            const el = resolveRef.current?.();
            if (!el || (el === lastEl && transform === last)) return;
            lastEl = el;
            last = transform;
            el.style.transform = transform;
        };
        window.addEventListener('mousemove', onMove, { passive: true });
        frame = requestAnimationFrame(tick);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('mousemove', onMove);
        };
    }, [areaRef, busyRef, max]);
};

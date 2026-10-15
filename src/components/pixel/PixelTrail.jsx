// Pixel squares that trail the mouse, snapped to an 8px grid. Mouse only; off with FX or reduced motion.
// Original implementation inspired by Pixel Trail on 21st.dev (MIT).
import { useEffect, useRef } from 'react';
import { hasFinePointer, prefersReducedMotion } from '../../lib/motion';
import { useSetting } from '../../lib/settings';

const POOL = 12;
const GRID = 8;

const PixelTrail = () => {
    const fx = useSetting('fx');
    const containerRef = useRef(null);
    const enabled = fx !== 'off';

    useEffect(() => {
        if (!enabled || !hasFinePointer() || prefersReducedMotion()) return;
        const dots = [...containerRef.current.children];
        let next = 0;
        let last = '';
        let frame = 0;
        let pos = null;

        const paint = () => {
            frame = 0;
            const x = Math.floor(pos.x / GRID) * GRID;
            const y = Math.floor(pos.y / GRID) * GRID;
            const key = `${x},${y}`;
            if (key === last) return;
            last = key;
            const dot = dots[next];
            next = (next + 1) % POOL;
            dot.style.transform = `translate(${x}px, ${y}px)`;
            dot.animate([{ opacity: 0.9 }, { opacity: 0 }], { duration: 450, easing: 'steps(4)', fill: 'forwards' });
        };
        const onMove = (e) => {
            pos = { x: e.clientX, y: e.clientY };
            if (!frame) frame = requestAnimationFrame(paint);
        };

        window.addEventListener('mousemove', onMove, { passive: true });
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('mousemove', onMove);
        };
    }, [enabled]);

    if (!enabled) return null;
    return (
        <div ref={containerRef} className="pointer-events-none fixed left-0 top-0 z-[80]" aria-hidden="true">
            {Array.from({ length: POOL }, (_, i) => (
                <span key={i} className="absolute left-0 top-0 h-2 w-2 bg-px-yellow opacity-0" />
            ))}
        </div>
    );
};

export default PixelTrail;

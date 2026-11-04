import { useEffect, useState } from 'react';
import { prefersReducedMotion } from '../lib/motion';
import { blip } from '../lib/sound';
import PixelTrail from './pixel/PixelTrail';

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

// Page-wide extras: segmented "HP" scroll bar, CRT scanline overlay and mouse pixel trail (both hidden
// when FX is off), click sounds (only when SOUND is on), the Konami code rainbow easter egg, plus two
// performance helpers: the shared "breathe" clock and pausing animations in off-screen sections.
const RetroFX = () => {
    // scroll progress in 5% steps (0..20): re-renders only when the bar actually moves
    const [step, setStep] = useState(0);

    useEffect(() => {
        let frame = 0;
        const update = () => {
            frame = 0;
            const max = document.documentElement.scrollHeight - window.innerHeight;
            setStep(Math.round((max > 0 ? window.scrollY / max : 0) * 20));
        };
        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, []);

    // .px-breathe colour steps: <html data-breathe="0..7">, 8 steps per 2.4s cycle (see index.css)
    useEffect(() => {
        if (prefersReducedMotion()) return;
        const root = document.documentElement;
        let n = 0;
        const id = setInterval(() => {
            if (document.hidden) return;
            n = (n + 1) % 8;
            root.dataset.breathe = String(n);
        }, 300);
        return () => {
            clearInterval(id);
            delete root.dataset.breathe;
        };
    }, []);

    // pause the CSS animations of sections that are scrolled out of view ([data-offscreen])
    useEffect(() => {
        const sections = document.querySelectorAll('main > section');
        if (!sections.length || typeof IntersectionObserver === 'undefined') return;
        const observer = new IntersectionObserver(
            (entries) =>
                entries.forEach((entry) => {
                    if (entry.isIntersecting) delete entry.target.dataset.offscreen;
                    else entry.target.dataset.offscreen = '';
                }),
            { rootMargin: '200px 0px' }
        );
        sections.forEach((s) => observer.observe(s));
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const onClick = (e) => {
            const target = e.target.closest('a, button');
            if (target) blip(target.tagName === 'BUTTON' ? 880 : 660);
        };
        document.addEventListener('click', onClick);
        return () => document.removeEventListener('click', onClick);
    }, []);

    useEffect(() => {
        let pos = 0;
        let timer = 0;
        const onKey = (e) => {
            const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
            pos = key === KONAMI[pos] ? pos + 1 : key === KONAMI[0] ? 1 : 0;
            if (pos < KONAMI.length) return;
            pos = 0;
            const root = document.documentElement;
            root.classList.add('px-rainbow');
            [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => blip(f, 0.08), i * 90));
            clearTimeout(timer);
            timer = setTimeout(() => root.classList.remove('px-rainbow'), 3000);
        };
        document.addEventListener('keydown', onKey);
        return () => {
            clearTimeout(timer);
            document.removeEventListener('keydown', onKey);
        };
    }, []);

    return (
        <>
            <div className="fixed inset-x-0 top-0 z-[60] h-1.5 bg-px-bg" aria-hidden="true">
                {/* snapped to 5% steps so the bar moves in chunks */}
                <div className="px-segments h-full" style={{ width: `${step * 5}%` }} />
            </div>
            <div className="px-crt px-fx" aria-hidden="true" />
            <PixelTrail />
        </>
    );
};

export default RetroFX;

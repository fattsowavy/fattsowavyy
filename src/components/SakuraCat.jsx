import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../lib/motion';
import { useSetting } from '../lib/settings';
import PixelCat from './pixel/PixelCat';

const FIRST_MS = 5000;
const EVERY_MS = 25000;
const FLIGHT_MS = 6000;

// Sakura theme only: the mochi cat flies across the hero sky now and then (every ~25s), and
// a small cat button calls it on demand. Off with Screen FX off or reduced motion.
const SakuraCat = () => {
    const theme = useSetting('theme');
    const fx = useSetting('fx');
    const [flight, setFlight] = useState(null);
    const catRef = useRef(null);
    const enabled = theme === 'sakura' && fx !== 'off' && !prefersReducedMotion();

    const launch = useCallback(() => {
        // skip while one is already flying, the tab is hidden, or the gallery viewer is open
        if (document.hidden || document.documentElement.classList.contains('px-modal-open')) return;
        setFlight((f) => f ?? { id: Date.now(), top: 8 + Math.random() * 30 });
    }, []);

    useEffect(() => {
        if (!enabled) return;
        const first = setTimeout(launch, FIRST_MS);
        const every = setInterval(launch, EVERY_MS);
        return () => {
            clearTimeout(first);
            clearInterval(every);
        };
    }, [enabled, launch]);

    // fly from just off the left edge to just off the right edge, in 20 fps steps
    useLayoutEffect(() => {
        const el = catRef.current;
        if (!flight || !el) return;
        const from = -el.offsetWidth;
        const to = el.parentElement.offsetWidth;
        const anim = el.animate(
            [
                { transform: `translateX(${from}px)` },
                { transform: `translateX(${to}px)` },
            ],
            { duration: FLIGHT_MS, easing: `steps(${(FLIGHT_MS / 1000) * 20})`, fill: 'forwards' }
        );
        let cancelled = false;
        anim.finished.then(
            () => !cancelled && setFlight(null),
            () => {}
        );
        return () => {
            cancelled = true;
            anim.cancel();
        };
    }, [flight]);

    if (!enabled) return null;

    return (
        <>
            {flight && (
                <div className="pointer-events-none absolute inset-x-0 z-0" style={{ top: `${flight.top}%` }} aria-hidden="true">
                    <div ref={catRef} className="w-[220px] sm:w-[300px]" style={{ transform: 'translateX(-100%)' }}>
                        <PixelCat className="block h-auto w-full" />
                    </div>
                </div>
            )}
            <button
                type="button"
                onClick={launch}
                className="absolute right-4 top-[88px] z-10 flex h-11 w-11 items-center justify-center border-4 border-px-line bg-px-panel shadow-pixel hover:border-px-yellow sm:right-6 lg:right-8"
                aria-label="Call the sakura cat"
                title="Call the sakura cat"
            >
                <PixelCat trail={false} className="h-auto w-7" />
            </button>
        </>
    );
};

export default SakuraCat;

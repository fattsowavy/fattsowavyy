import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../lib/motion';
import { getSetting, onSettingChange, useSetting } from '../lib/settings';
import PixelCat from './pixel/PixelCat';
import PixelComet from './pixel/PixelComet';
import PixelUfo from './pixel/PixelUfo';

const FLIGHT_MS = 4000;
const GAP_MIN = 5000; // pause between flights, counted from the end of the previous one
const GAP_MAX = 6000;
const FIRST_MS = 1500; // first flight after page load (plus the LOADING screen if it is up)
const FPS = 20;

// Who flies in each theme. CRT alternates UFO and comet.
const CAST = { sakura: ['cat'], crt: ['ufo', 'comet'] };

const ACTORS = {
    cat: {
        size: 'w-[220px] sm:w-[300px]',
        band: [84, 124], // top of the flight path, px from the top of the hero (just under the navbar)
        render: () => <PixelCat className="block h-auto w-full" />,
        keyframes: (from, to) => [{ transform: `translate(${from}px, 0)` }, { transform: `translate(${to}px, 0)` }],
    },
    ufo: {
        size: 'w-[110px] sm:w-[140px]',
        band: [80, 112],
        render: () => <PixelUfo beam="flight" className="block h-auto w-full" />,
        // drifts in with a bob, hovers mid-screen while the beam is on (see .ufo-beam-flight), drifts out
        keyframes: (from, to) => {
            const mid = (from + to) / 2;
            return [
                { offset: 0, transform: `translate(${from}px, 0)` },
                { offset: 0.2, transform: `translate(${from + (mid - from) * 0.5}px, -10px)` },
                { offset: 0.38, transform: `translate(${mid}px, 0)` },
                { offset: 0.62, transform: `translate(${mid}px, 0)` },
                { offset: 0.8, transform: `translate(${mid + (to - mid) * 0.5}px, -10px)` },
                { offset: 1, transform: `translate(${to}px, 0)` },
            ];
        },
    },
    comet: {
        size: 'w-[160px] sm:w-[220px]',
        band: [74, 92],
        render: () => <PixelComet className="block h-auto w-full" />,
        // shallow dive; the sprite is tilted to match the actual path angle
        keyframes: (from, to) => {
            const drop = 140;
            const angle = (Math.atan2(drop, to - from) * 180) / Math.PI;
            return [
                { transform: `translate(${from}px, 0) rotate(${angle}deg)` },
                { transform: `translate(${to}px, ${drop}px) rotate(${angle}deg)` },
            ];
        },
    },
};

const SUMMON = {
    sakura: { label: 'Call the sakura cat', icon: <PixelCat trail={false} className="h-auto w-7" /> },
    crt: { label: 'Call the UFO', icon: <PixelUfo className="h-auto w-7" /> },
};

const randomBetween = (min, max) => min + Math.random() * (max - min);

// Something flies across the hero sky: the mochi cat in Sakura, a UFO or a comet in CRT.
// It flies right after switching theme, shortly after load, then every 5–6s while the hero is
// on screen. A small button calls it on demand. Off with Screen FX off or reduced motion.
const HeroFlyby = () => {
    const theme = useSetting('theme');
    const fx = useSetting('fx');
    const [flight, setFlight] = useState(null);
    const [heroVisible, setHeroVisible] = useState(true);
    const actorRef = useRef(null);
    const castIndex = useRef(0);
    const isFirst = useRef(true);
    const enabled = fx !== 'off' && !prefersReducedMotion();

    // force: replace a flight in progress (used when the theme changes).
    // The theme is read from the store, not from render: a theme-change notification arrives
    // before React re-renders, so the closure would still hold the old theme's cast.
    const launch = useCallback(
        (force = false) => {
            if (document.hidden || document.documentElement.classList.contains('px-modal-open')) return;
            const cast = CAST[getSetting('theme')] ?? CAST.crt;
            const kind = cast[castIndex.current % cast.length];
            castIndex.current += 1;
            const [lo, hi] = ACTORS[kind].band;
            setFlight((f) => (f && !force ? f : { id: Date.now(), kind, top: randomBetween(lo, hi) }));
        },
        []
    );

    // pause the cycle while the hero is scrolled out of view
    useEffect(() => {
        const hero = document.getElementById('home');
        if (!hero || typeof IntersectionObserver === 'undefined') return;
        const observer = new IntersectionObserver(([entry]) => setHeroVisible(entry.isIntersecting), { threshold: 0.2 });
        observer.observe(hero);
        return () => observer.disconnect();
    }, []);

    // switching theme sends the new theme's flyer right away
    useEffect(() => {
        if (!enabled) return;
        return onSettingChange('theme', () => {
            castIndex.current = 0;
            launch(true);
        });
    }, [enabled, launch]);

    // the next flight is scheduled whenever the sky is empty
    useEffect(() => {
        if (!enabled || !heroVisible || flight) return;
        let delay = randomBetween(GAP_MIN, GAP_MAX);
        if (isFirst.current) {
            isFirst.current = false;
            delay = FIRST_MS + (document.querySelector('[data-boot]') ? 800 : 0);
        }
        const id = setTimeout(() => launch(), delay);
        return () => clearTimeout(id);
    }, [enabled, heroVisible, flight, launch]);

    // fly from just off the left edge to just off the right edge, in 20 fps steps
    useLayoutEffect(() => {
        const el = actorRef.current;
        if (!flight || !el) return;
        const from = -el.offsetWidth;
        const to = el.parentElement.offsetWidth;
        const anim = el.animate(ACTORS[flight.kind].keyframes(from, to), {
            duration: FLIGHT_MS,
            easing: `steps(${(FLIGHT_MS / 1000) * FPS})`,
            fill: 'forwards',
        });
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
    const actor = flight && ACTORS[flight.kind];
    const summon = SUMMON[theme] ?? SUMMON.crt;

    return (
        <>
            {flight && (
                // in front of the content so it is actually seen; the band keeps it in the sky under the navbar
                <div className="pointer-events-none absolute inset-x-0 z-[5]" style={{ top: flight.top }} aria-hidden="true">
                    <div key={flight.id} ref={actorRef} className={actor.size} style={{ transform: 'translateX(-100%)' }}>
                        {actor.render()}
                    </div>
                </div>
            )}
            <button
                type="button"
                onClick={() => launch()}
                className="absolute right-4 top-[88px] z-10 flex h-11 w-11 items-center justify-center border-4 border-px-line bg-px-panel shadow-pixel hover:border-px-yellow sm:right-6 lg:right-8"
                aria-label={summon.label}
                title={summon.label}
            >
                {summon.icon}
            </button>
        </>
    );
};

export default HeroFlyby;

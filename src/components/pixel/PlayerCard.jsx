// 3D "player card" for the hero portrait: swings in once, tilts on hover with the photo raised on
// riser walls, and flips to a character-stats back on click / Enter / Space.
// Motion: src/lib/cardMotion.js (20 fps flipbook), tilt: useHoverTilt. Styles: .tc-* / .pc-* in index.css.
import { useLayoutEffect, useRef, useState } from 'react';
import { ENTER_MS, FLIP_MS, enterPose, flipbook, setPose, spinPose } from '../../lib/cardMotion';
import { prefersReducedMotion } from '../../lib/motion';
import { useHoverTilt } from '../../hooks/useHoverTilt';
import PixelImage from './PixelImage';

const PlayerCard = ({ src, alt, stats }) => {
    const [flipped, setFlipped] = useState(false);
    const busy = useRef(true);
    const stageRef = useRef(null);
    const motionRef = useRef(null);
    const tiltRef = useRef(null);

    useHoverTilt(stageRef, () => tiltRef.current, { max: 10, busyRef: busy });

    // entrance: park the card on its back before first paint, then swing it in
    // (later when the LOADING screen is up, so the swing isn't hidden behind it)
    useLayoutEffect(() => {
        const el = motionRef.current;
        const pose = enterPose();
        setPose(el, pose(0));
        const delay = prefersReducedMotion() ? 0 : document.querySelector('[data-boot]') ? 900 : 250;
        let cancelled = false;
        const id = setTimeout(() => {
            flipbook(el, ENTER_MS, pose).then(() => {
                if (!cancelled) busy.current = false;
            });
        }, delay);
        return () => {
            cancelled = true;
            clearTimeout(id);
        };
    }, []);

    const flip = () => {
        if (busy.current) return;
        busy.current = true;
        const toBack = !flipped;
        setFlipped(toBack);
        const el = motionRef.current;
        flipbook(el, FLIP_MS, toBack ? spinPose(0, 180) : spinPose(180, 360)).then(() => {
            setPose(el, { ry: toBack ? 180 : 0 });
            busy.current = false;
        });
    };

    return (
        <button
            ref={stageRef}
            type="button"
            onClick={flip}
            aria-pressed={flipped}
            className="block w-full text-left"
            style={{ perspective: '1000px' }}
        >
            {/* accessible name = photo alt + this; the pressed state says which side is showing */}
            <span className="sr-only">Flip card to see character stats</span>
            <div ref={motionRef} className="tc-3d relative will-change-transform">
                <div ref={tiltRef} className="tc-3d relative will-change-transform">
                    <div className="pc-front px-card edge-ink p-2">
                        <div className="tc-riser-box aspect-[4/5]">
                            <span className="tc-wall tc-wall-top" />
                            <span className="tc-wall tc-wall-bottom" />
                            <span className="tc-wall tc-wall-left" />
                            <span className="tc-wall tc-wall-right" />
                            <div className="tc-photo">
                                <PixelImage src={src} alt={alt} className="h-full w-full" />
                            </div>
                        </div>
                    </div>

                    <div className="pc-back px-card edge-yellow flex flex-col p-3 sm:p-4" aria-hidden="true">
                        <p className="font-pixel text-[10px] uppercase text-px-yellow">Character stats</p>
                        <dl className="mt-2 flex flex-1 flex-col justify-between gap-1 sm:mt-3 sm:gap-2">
                            {stats.map((s) => (
                                <div key={s.label}>
                                    <dt className="font-pixel text-[8px] uppercase text-px-cyan">{s.label}</dt>
                                    <dd className="text-[13px] leading-tight sm:text-sm">{s.value}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>
        </button>
    );
};

export default PlayerCard;

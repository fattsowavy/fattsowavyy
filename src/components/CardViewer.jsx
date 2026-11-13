import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { CLOSE_MS, OPEN_MS, SWAP_MS, closePose, fade, flipbook, inPose, openPose, outPose, setPose } from '../lib/cardMotion';
import { useHoverTilt } from '../hooks/useHoverTilt';
import { shotNo } from '../data/gallery';
import TradingCard from './pixel/TradingCard';

// Modal card viewer: the card flies in and spins, tilts toward the mouse, and Next/Prev swap between
// two card slots (one spins out while the other spins in). Input is locked while a card is moving.
const CardViewer = ({ items, startIndex, onClose }) => {
    const n = items.length;
    const [slots, setSlots] = useState([startIndex, startIndex]);
    const [active, setActive] = useState(0);
    const [swap, setSwap] = useState(null);
    const busy = useRef(true);
    const activeRef = useRef(0);
    const backdropRef = useRef(null);
    const closeRef = useRef(null);
    const stageRef = useRef(null);
    const fitRef = useRef(null);
    // per slot: outer element takes the fly/spin motion, inner element takes the mouse tilt
    const motionEls = useRef([]);
    const tiltEls = useRef([]);

    useEffect(() => {
        activeRef.current = active;
    }, [active]);

    // open: park the card below the screen before first paint, decode its photo, then fly it in.
    // Decoding first keeps the spin from stalling on a half-decoded image; the other photos are
    // decoded in the background so Next/Prev don't stall either.
    useLayoutEffect(() => {
        closeRef.current?.focus();
        const card = motionEls.current[0];
        const pose = openPose(window.innerHeight);
        setPose(card, pose(0));
        fade(backdropRef.current, 0, 1);

        items.forEach((item, i) => {
            if (i === startIndex) return;
            const img = new Image();
            img.src = item.src;
            img.decode().catch(() => {});
        });

        const photo = card?.querySelector('img');
        const decoded = photo?.decode ? photo.decode().catch(() => {}) : Promise.resolve();
        // don't hold the animation more than 400ms on a slow network
        const ready = Promise.race([decoded, new Promise((r) => setTimeout(r, 400))]);

        let cancelled = false;
        ready
            .then(() => !cancelled && flipbook(card, OPEN_MS, pose))
            .then(() => {
                if (!cancelled) busy.current = false;
            });
        return () => {
            cancelled = true;
        };
        // runs once on mount; items/startIndex are fixed for the viewer's lifetime
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // swap: runs before paint so the incoming card never flashes at its old position
    useLayoutEffect(() => {
        if (!swap) return;
        const from = motionEls.current[active];
        const to = motionEls.current[1 - active];
        tiltEls.current.forEach((el) => el && (el.style.transform = ''));
        const offX = window.innerWidth / 2 + (from?.offsetWidth ?? 0);
        let cancelled = false;
        Promise.all([flipbook(from, SWAP_MS, outPose(swap.dir, offX)), flipbook(to, SWAP_MS, inPose(swap.dir, offX))]).then(() => {
            if (cancelled) return;
            setActive((a) => 1 - a);
            setSwap(null);
            busy.current = false;
        });
        return () => {
            cancelled = true;
        };
    }, [swap, active]);

    // tilt the active card while the pointer is over it (flat otherwise, for a sharp photo)
    useHoverTilt(stageRef, () => tiltEls.current[activeRef.current], { max: 12, busyRef: busy });

    const go = useCallback(
        (dir) => {
            if (busy.current || n < 2) return;
            busy.current = true;
            setSlots((s) => {
                const next = [...s];
                next[1 - active] = (s[active] + dir + n) % n;
                return next;
            });
            setSwap({ dir });
        },
        [active, n]
    );

    const requestClose = useCallback(() => {
        const card = motionEls.current[active];
        // still flying in: skip the exit animation rather than making the user wait
        if (busy.current) {
            card?.getAnimations().forEach((a) => a.cancel());
            onClose();
            return;
        }
        busy.current = true;
        Promise.all([flipbook(card, CLOSE_MS, closePose(window.innerHeight)), fade(backdropRef.current, 1, 0, CLOSE_MS)]).then(onClose);
    }, [active, onClose]);

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape') requestClose();
            if (e.key === 'ArrowRight') go(1);
            if (e.key === 'ArrowLeft') go(-1);
        };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [requestClose, go]);

    // Every card is as tall as the tallest one (see the hidden sizers below), so the stage height never
    // changes and Prev/Next stay put. If that height doesn't fit the screen, shrink the whole stage
    // (scale + matching negative margin, so the controls move up with it) instead of scrolling.
    useLayoutEffect(() => {
        const wrap = fitRef.current;
        const stage = stageRef.current;
        if (!wrap || !stage) return;
        const RESERVED = 80 + 24 + 56 + 32; // top padding + gap + controls row + bottom padding
        const fit = () => {
            const h = stage.offsetHeight;
            const s = Math.min(1, (window.innerHeight - RESERVED) / h);
            wrap.style.transform = s < 1 ? `scale(${s})` : '';
            wrap.style.marginBottom = s < 1 ? `${-h * (1 - s)}px` : '';
        };
        fit();
        const observer = new ResizeObserver(fit); // e.g. when the pixel fonts finish loading
        observer.observe(stage);
        window.addEventListener('resize', fit);
        return () => {
            observer.disconnect();
            window.removeEventListener('resize', fit);
        };
    }, []);

    const current = slots[active];

    return (
        <div
            ref={backdropRef}
            className="fixed inset-0 z-[90] overflow-y-auto bg-black/85"
            role="dialog"
            aria-modal="true"
            aria-label="Photo card viewer"
            onClick={requestClose}
        >
            <button
                ref={closeRef}
                type="button"
                onClick={(e) => {
                    e.stopPropagation();
                    requestClose();
                }}
                className="px-btn px-btn-ghost fixed right-4 top-4 z-10 text-[10px]"
            >
                Close
            </button>

            {/* Card and controls stack in one column, so the card can never cover the controls.
                overflow-clip hides cards flying in from off-screen without growing a scroll area. */}
            <div className="flex min-h-full w-full flex-col items-center justify-center gap-6 overflow-clip px-4 pb-8 pt-20">

            <div ref={fitRef} className="origin-top">
            <div
                ref={stageRef}
                className="tc-stage relative"
                // every card (the two live slots + one hidden sizer per photo) shares one grid cell,
                // so the stage is as tall as the tallest card in the whole gallery
                // size: .tc-stage in index.css (portrait on phones, landscape from 900px)
                style={{ display: 'grid', perspective: '2000px' }}
                onClick={(e) => e.stopPropagation()}
            >
                {[0, 1].map((slot) => {
                    const isActive = slot === active;
                    return (
                        <div
                            key={slot}
                            ref={(el) => {
                                motionEls.current[slot] = el;
                            }}
                            className={`tc-3d pointer-events-none relative will-change-transform [grid-area:1/1] ${isActive || swap ? '' : 'invisible'}`}
                            aria-hidden={isActive ? undefined : true}
                            inert={!isActive}
                        >
                            <div
                                ref={(el) => {
                                    tiltEls.current[slot] = el;
                                }}
                                // wrappers ignore the pointer (see .tc-front in index.css)
                                className="tc-3d pointer-events-none relative h-full will-change-transform"
                            >
                                <TradingCard item={items[slots[slot]]} number={shotNo(slots[slot])} />
                            </div>
                        </div>
                    );
                })}

                {/* invisible sizers: one per photo, only there to make the grid cell as tall as the tallest card */}
                {items.map((item, i) => (
                    <div key={item.file} className="invisible pointer-events-none [grid-area:1/1]" aria-hidden="true" inert>
                        <TradingCard item={item} number={shotNo(i)} sizer />
                    </div>
                ))}
            </div>
            </div>

            <div className="z-10 flex items-center justify-center gap-4" onClick={(e) => e.stopPropagation()}>
                {n > 1 && (
                    <button type="button" onClick={() => go(-1)} className="px-btn px-btn-ghost text-[10px]" aria-label="Previous photo">
                        Prev
                    </button>
                )}
                <p className="font-pixel text-[10px] uppercase text-[#f4f4f4]" aria-live="polite">
                    {shotNo(current)} / {shotNo(n - 1)}
                </p>
                {n > 1 && (
                    <button type="button" onClick={() => go(1)} className="px-btn px-btn-primary text-[10px]" aria-label="Next photo">
                        Next
                    </button>
                )}
            </div>
            </div>
        </div>
    );
};

export default CardViewer;

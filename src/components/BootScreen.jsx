import { useEffect, useState } from 'react';
import { prefersReducedMotion } from '../lib/motion';

const KEY = 'px-booted';

const alreadyBooted = () => {
    try {
        return sessionStorage.getItem(KEY) === '1';
    } catch {
        return true;
    }
};

// "LOADING..." splash, once per browser session, gone after 800ms. It never blocks input
// (pointer-events-none) and the page renders underneath the whole time.
const BootScreen = () => {
    const [show, setShow] = useState(() => !alreadyBooted() && !prefersReducedMotion());

    useEffect(() => {
        if (!show) return;
        try {
            sessionStorage.setItem(KEY, '1');
        } catch {
            // ignore
        }
        const id = setTimeout(() => setShow(false), 800);
        return () => clearTimeout(id);
    }, [show]);

    if (!show) return null;
    return (
        <div data-boot className="pointer-events-none fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-px-bg" aria-hidden="true">
            <p className="font-pixel text-sm uppercase text-px-yellow">Loading...</p>
            <div className="h-4 w-48 border-4 border-px-ink p-0.5">
                <div className="px-segments h-full animate-px-load" />
            </div>
        </div>
    );
};

export default BootScreen;

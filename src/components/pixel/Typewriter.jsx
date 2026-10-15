// Typewriter text in fixed steps. The full string is laid out up front (untyped part is `invisible`),
// so nothing shifts while typing, and screen readers get the whole text at once via sr-only.
// Original implementation; behaviour modeled on 8bitcn's dialog text (MIT).
import { useEffect, useState } from 'react';
import { prefersReducedMotion } from '../../lib/motion';

const Typewriter = ({ text, start = true, speed = 35, step = 1, done = false, cursor = false, onDone, className = '' }) => {
    const [count, setCount] = useState(() => (prefersReducedMotion() ? text.length : 0));
    const shown = done ? text.length : count;
    const finished = shown >= text.length;

    useEffect(() => {
        if (!start || finished) return;
        const id = setTimeout(() => {
            const next = Math.min(text.length, count + step);
            setCount(next);
            if (next >= text.length) onDone?.();
        }, speed);
        return () => clearTimeout(id);
    }, [start, finished, count, step, speed, text.length, onDone]);

    return (
        <span className={className}>
            <span className="sr-only">{text}</span>
            <span aria-hidden="true">
                {text.slice(0, shown)}
                {cursor && (
                    <span className="relative inline-block w-0">
                        <span className="absolute -bottom-[0.1em] left-1 inline-block h-[1em] w-[0.5em] animate-px-blink bg-current" />
                    </span>
                )}
                <span className="invisible">{text.slice(shown)}</span>
            </span>
        </span>
    );
};

export default Typewriter;

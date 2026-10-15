import { useEffect, useRef, useState } from 'react';

// Returns [ref, inView]; inView flips to true once and stays true.
export const useInView = (threshold = 0.15) => {
    const ref = useRef(null);
    const [inView, setInView] = useState(() => typeof IntersectionObserver === 'undefined');

    useEffect(() => {
        const el = ref.current;
        if (!el || typeof IntersectionObserver === 'undefined') return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { threshold }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold]);

    return [ref, inView];
};

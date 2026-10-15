const matches = (query) => typeof window !== 'undefined' && window.matchMedia(query).matches;

export const prefersReducedMotion = () => matches('(prefers-reduced-motion: reduce)');

// Mouse-like pointer: used to skip hover-only effects on touch devices
export const hasFinePointer = () => matches('(hover: hover) and (pointer: fine)');

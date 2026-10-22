import { useSyncExternalStore } from 'react';

// User options persisted in localStorage as `px-<key>`. index.html applies theme/fx before first paint.
const DEFAULTS = { theme: 'crt', fx: 'on', sound: 'off' };
const THEME_COLOR = { crt: '#0f0f1b', sakura: '#F2E1E9' };

const read = (key) => {
    try {
        const value = localStorage.getItem(`px-${key}`) ?? DEFAULTS[key];
        // the old Gameboy theme was replaced by Sakura
        return key === 'theme' && value === 'gb' ? 'sakura' : value;
    } catch {
        return DEFAULTS[key];
    }
};

const cache = { theme: read('theme'), fx: read('fx'), sound: read('sound') };
const listeners = new Set();

const apply = () => {
    const root = document.documentElement;
    if (cache.theme === 'sakura') root.dataset.theme = 'sakura';
    else delete root.dataset.theme;
    if (cache.fx === 'off') root.dataset.fx = 'off';
    else delete root.dataset.fx;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[cache.theme]);
};

export const getSetting = (key) => cache[key];

export const setSetting = (key, value) => {
    cache[key] = value;
    try {
        localStorage.setItem(`px-${key}`, value);
    } catch {
        // storage unavailable (private mode): keep the in-memory value
    }
    apply();
    listeners.forEach((listener) => listener());
};

const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
};

export const useSetting = (key) => useSyncExternalStore(subscribe, () => cache[key]);

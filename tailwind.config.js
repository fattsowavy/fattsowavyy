/** @type {import('tailwindcss').Config} */

// Colors are CSS variables (RGB triplets) so the CRT / Gameboy themes can swap them; see src/index.css.
const v = (name) => `rgb(var(--px-${name}) / <alpha-value>)`;

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // 8-bit: no rounded corners anywhere
    borderRadius: {
      none: '0px',
    },
    extend: {
      colors: {
        px: {
          bg: v('bg'),
          panel: v('panel'),
          ink: v('ink'),
          muted: v('muted'),
          line: v('line'),
          shadow: v('shadow'),
          yellow: v('yellow'),
          red: v('red'),
          green: v('green'),
          cyan: v('cyan'),
          purple: v('purple'),
          orange: v('orange'),
          // text placed on a filled accent (yellow / green / cyan / orange)
          on: v('on-accent'),
        },
      },
      fontFamily: {
        sans: ['"Pixelify Sans"', 'ui-monospace', 'monospace'],
        pixel: ['"Press Start 2P"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        pixel: '4px 4px 0 0 rgb(var(--px-shadow))',
        'pixel-lg': '8px 8px 0 0 rgb(var(--px-shadow))',
      },
      keyframes: {
        'px-blink': { from: { opacity: '1' }, to: { opacity: '0' } },
        'px-float': { from: { transform: 'translateY(0)' }, to: { transform: 'translateY(-4px)' } },
        'px-twinkle': { from: { opacity: '1' }, to: { opacity: '0.25' } },
        'px-wipe': { from: { clipPath: 'inset(0 100% 0 0)' }, to: { clipPath: 'inset(0 0 0 0)' } },
        'px-drop': {
          from: { transform: 'translateY(-16px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        'px-rainbow': { from: { filter: 'hue-rotate(0deg)' }, to: { filter: 'hue-rotate(360deg)' } },
        'px-load': { from: { width: '0%' }, to: { width: '100%' } },
      },
      animation: {
        'px-blink': 'px-blink 1s steps(2, jump-none) infinite',
        'px-float': 'px-float 1s steps(2, jump-none) infinite',
        'px-twinkle': 'px-twinkle 2s steps(2, jump-none) infinite',
        'px-wipe': 'px-wipe 0.6s steps(12) both',
        'px-drop': 'px-drop 0.4s steps(4) both',
        'px-rainbow': 'px-rainbow 1s steps(8) infinite',
        'px-load': 'px-load 0.7s steps(6) both',
      },
    },
  },
  plugins: [],
}

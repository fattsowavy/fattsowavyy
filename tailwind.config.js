/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F6F2E9',
        ink: '#6E3511',
        sage: '#91AC67',
        // single accent; `dark` is for small text where the base value is just under AA on cream
        olive: {
          DEFAULT: '#597928',
          dark: '#4B6620',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Newsreader', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}

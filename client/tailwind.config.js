/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#1A4D2E',
          hover: '#2D7A4F',
          dark: '#123520',
          light: '#3B8B5B'
        },
        silver: {
          DEFAULT: '#E2E8F0',
          light: '#F1F5F9',
          border: '#CBD5E1'
        },
        bone: '#F9F9F7',
        sage: '#E6F0EB',
        gold: {
          DEFAULT: '#D4A373',
          dark: '#B88252',
          light: '#EAD3BA'
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Manrope"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        gold: '#B8943A',
        'gold-light': '#D4AA55',
        'gold-hover': '#9E7C2E',
        cream: '#F5EFE6',
        'dark-950': '#0a0a0a',
        'dark-900': '#111111',
        'dark-800': '#1a1a1a',
        'dark-700': '#222222',
        'dark-600': '#2a2a2a',
      },
      fontFamily: {
        bebas: ['"Bebas Neue"', 'cursive'],
        playfair: ['"Playfair Display"', 'serif'],
        roboto: ['Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

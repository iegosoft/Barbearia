/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        gold: '#C9A84C',
        'gold-light': '#E8C96A',
        'gold-hover': '#B8923E',
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

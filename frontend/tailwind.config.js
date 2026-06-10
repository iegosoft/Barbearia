/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        gold: '#FFD700',
        'gold-hover': '#e6c200',
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

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'blue-900': '#071422'
      },
      gridTemplateColumns: {
        'cols-4': 'repeat(auto-fit, minmax(10rem, 1fr))',
      }
    },
  },
  plugins: [],
}

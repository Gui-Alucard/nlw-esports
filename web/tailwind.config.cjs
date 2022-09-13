/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
    './index.html'
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif']
    },
    extend: {
      backgroundImage: {
        galaxy: "url('/background-galaxy.png')",
        'nlw-gradient': 'linear-gradient(90deg, #9572FC 0%, #43E7AD 50%, #E1D55D 100%)',
        'game-gradient': 'linear-gradient(180deg, #00000000 0%, #000000e6 67%)',
      }
    },
  },
  plugins: [],
}

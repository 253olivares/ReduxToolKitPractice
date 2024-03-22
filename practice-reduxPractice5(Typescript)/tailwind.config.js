/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    
    extend: {
      fontFamily: {
        Planquin: ['Planquin','sans-serif'],
        Montserrat: ['Montserrat','sans-serif']
      },
      colors: {
        "Dark Gray": "#333",
        "whiteCream": "#D2D2D2",
        'white-400': "rgba(255,255,255,0.80)",
        'skyBlue' : 'rgb(56, 134, 236)',
        'c-blue': '#1fb6ff',
        'c-pink': '#ff49db',
        'c-orange': '#ff7849',
        'c-green': '#13ce66',
        'c-gray-dark': '#273444',
        'c-gray': '#8492a6',
        'c-gray-light': '#d3dce6',
      },
      boxShadow: {
        "3xl": '0 10px 40px rgba(0,0,0,0.1)'
      },
    },
  },
  plugins: [],
}
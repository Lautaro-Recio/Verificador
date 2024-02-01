/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'productsPng': "url(./assets/imgs/fondo.png)",
      },
      fontFamily: {
        custom: ['Causten-BlackOblique', 'sans-serif'],
      },
      colors: {
        orangeMedit: '#e75113', // Reemplaza esto con el código de color que desees
        grayMedit: '#c8c8c880', // Reemplaza esto con el código de color que desees

      },
    }
  },
  plugins: [],
}
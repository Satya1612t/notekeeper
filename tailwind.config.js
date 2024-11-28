/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      lineHeight: {
        tight: '1', 
      },
      fontFamily: {
        gilroy: ['Gilroy-Light', 'sans-serif'],
        etruscoM: ['Etrusco-Medium', 'sans-serif'],
        etruscoL: ['Etrusco-Light', 'sans-serif'],
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')({nocampatible: true}),
  ],
}


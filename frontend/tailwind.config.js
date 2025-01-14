/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'chakra-petch': ['Chakra Petch', 'sans-serif'],
      },
      colors:{
        'heading-color':'#27283B',
        'child-bg-color':'#D5DCFF',
        'table-bg-color':'#ADBADA',
        'head-bg-color':'#EEE8F6',
        'data-bg-color':'#606FB1',
      },
      cursor:{
        'custom-pointer': 'url("../src/assets/images/coinsCursor.png"), auto',
      }
    },
  },
  plugins: [],
}

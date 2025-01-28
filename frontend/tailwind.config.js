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
      // spacing: '1.20rem',
      colors:{
        'heading-color':'#27283B',
        'child-bg-color':'#B3B3B3',
        'table-bg-color':'#B3B3B3',
        'head-bg-color':'#ffff',
        'data-bg-color':'#27283B',
        'primary-bg-color':'#B3B3B3',
      },
      cursor:{
        'custom-pointer': 'url("../src/assets/images/coinsCursor.png"), auto',
      },
      animation: {
        fadeInOut: "fadeInOut 5s ease-in-out",
        bounceSlow: "bounceSlow 3s infinite",
        blink: "blink 1.5s infinite",
      },
      keyframes: {
        fadeInOut: {
          "0%": { opacity: 0 },
          "10%, 90%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        bounceSlow: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        blink: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.5 },
        },
        animation: {
          fadeInOut: "fadeInOut 5s ease-in-out",
        },
        keyframes: {
          fadeInOut: {
            "0%, 100%": { opacity: 0, transform: "translateY(-10px)" },
            "50%": { opacity: 1, transform: "translateY(0)" },
          },
      },
    },
    },
  },
  
  plugins: [],
}

import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: '#5EB06C',
        secondary: '#9DD8A5',
        bgColor: '#F5F9F6',
        accentColor: '#72D580',
        txtColor: '#090C09'
      }
    },
  },
  plugins: [daisyui,],
}
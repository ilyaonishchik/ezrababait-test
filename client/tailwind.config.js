/** @type {import('tailwindcss').Config} */
import * as daisyui from 'daisyui'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '375px',
      'sm': '425px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1440px',
    },
    container: {
      center: true,
      padding: '1rem'
    },
    extend: {
    },
  },
  plugins: [daisyui],
}


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'josefino': ['Josefin Sans', 'sans-serif'],
        'noto' : ['Noto Sans Display', 'sans-serif'],
        'fira' : ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}


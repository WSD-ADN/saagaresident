/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{html,js}"],
  theme: {
    extend: {
      height:{
        '40vh' : '40vh',
      },
      width: {
        '40vw' : '40vw',
      },
    },
  },
  plugins: [],
}


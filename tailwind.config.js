/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,scss}"],
  theme: {
    extend: {
      colors: {
        "secondary-light": "#ff79b0",
        "secondary-dark": "#e73370",
      },
    },
  },
  plugins: [],
};

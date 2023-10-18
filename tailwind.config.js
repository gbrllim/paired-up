/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  daisyui: {
    themes: [{}],
  },
  theme: {
    extend: {
      colors: {
        background: "#f8f0e5",
        window: "#eadbc8",
        text: "#dac0a3",
        accent: "#0f2c59",
      },
    },
  },
  plugins: [require("daisyui")],
};

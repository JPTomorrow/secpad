/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "ghostwhite",
        black1: "#000",
        black2: "#161616",
        primary: "#000",
      },
      keyframes: {
        "open-page": {
          "0%": {
            transform: "scale(0)",
          },
          "100%": {
            transform: "scale(1)",
          },
        },
        "close-page": {
          "0%": {
            transform: "scale(1)",
          },
          "100%": {
            transform: "scale(0)",
          },
        },
        animation: {
          "open-page": "open-page 1s ease-in-out",
          "close-page": "close-page 1s ease-in-out",
        },
      },
    },
    plugins: [],
  },
};

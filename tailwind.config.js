/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "betlembosa-gradient":
          "linear-gradient(to right,#063970 0%,#1e81b0 50%,#154c79 100%)",
      },
      colors: {
        "betlembosa-theme-color": "#154C79",
        "betlembosa-light-black": "#222222",
        "betlembosa      `-light-gray": "#717171",
      },
      gridTemplateRows: {
        "new-listing": "10vh 80vh 10vh",
      },
    },
  },
  plugins: [],
  plugins: [daisyui],
  daisyui: {
    themes: [],
  },
};
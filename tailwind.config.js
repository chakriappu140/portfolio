/** @type {import('tailwindcss').Config} */
export default {
  // This enables dark mode based on the 'dark' class on the HTML element
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

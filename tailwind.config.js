/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,tsx,jsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "header" : "url('/bg.jpg')"
      }
    },
  },
  plugins: [],
}


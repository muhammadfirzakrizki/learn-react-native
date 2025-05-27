/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}", // Mencakup semua file di direktori 'app'
    "./components/**/*.{js,jsx,ts,tsx}" // Mencakup semua file di direktori 'components'
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",           // Root level files
    "./components/**/*.{js,ts,jsx,tsx}", // Components folder
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
}

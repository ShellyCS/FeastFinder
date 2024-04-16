/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      scale: {
        175: "1.75",
        110: "1.10",
        80: "1.0",
      },
    },
  },
  plugins: [],
};

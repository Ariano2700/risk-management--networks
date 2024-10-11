/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          5: "#E5D9F2",
          10: "#F5EFFF",
          15: "#CDC1FF",
          20: "#A594F9",
          25: "#8967B3",
          30: "#624E88",
          DEFAULT:"#efe9f5",
        },
      },
    },
  },
  plugins: [],
};

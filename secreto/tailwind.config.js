/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./shared/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#36A97E",
          dark: "#1A3D35",
        },
        primaryActive: {
          light: "#389170",
          dark: "#33A787",
        },
        secondary: {
          light: "#FFE768",
          dark: "#B38600",
        },
        error: {
          light: "#FF4500",
          dark: "#B22222",
        },
        success: {
          light: "#28A745",
          dark: "#1E5631",
        },
        warning: {
          light: "#FFA500",
          dark: "#CC8400",
        },
        info: {
          light: "#007BFF",
          dark: "0056A6",
        },
        white: {
          light: "F7F7F7",
          dark: "F5F5F5",
        },
        primary2: {
          light: "FFCBCB",
        },
        pureWhite: "#FFFFFF",
        black: "#0F0F0F",
      },
    },
    plugins: [],
  },
};

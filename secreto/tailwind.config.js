/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./app/**/*.{js,jsx,ts,tsx, html}",
    "./shared/**/*.{js,jsx,ts,tsx, html}",
    "./widgets/**/*.{js,jsx,ts,tsx, html}",
  ],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        primaryActive: "var(--primaryActive)",
        secondary: "var(--secondary)",
        error: "var(--error)",
        success: "var(--success)",
        warning: "var(--warning)",
        info: "var(--info)",
        white: "var(--white)",
        primary2: "var(--primary2)",
        grayLight: "var(--grayLight)",
        grayDark: "var(--grayDark)",
        pureWhite: "var(--pureWhite)",
        black: "var(--black)",

        /* 기본 배경, 텍스트 테마*/
        default: {
          background: "var(--defaultBackground)",
          color: "var(--defaultColor)",
        },

        /* 버튼 스타일 */
        active: {
          background: "var(--activeBackground)",
          color: "var(--activeColor)",
        },

        inactive: {
          background: "var(--inactiveBackground)",
          color: "var(--inactiveColor)",
        },

        reverse: {
          background: "var(--reverseBackground)",
          color: "var(--reverseColor)",
        },

        /* 기본 컴포넌트 테마 */
        base: {
          background: "var(--baseBackground)",
          color: "var(--baseColor)",
        },

        /* 라벨 테마 */
        selected: "var(--selected)",
        unselected: "var(--unselected)",
      },
    },
    plugins: [],
  },
};

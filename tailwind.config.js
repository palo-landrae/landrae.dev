const { fontFamily } = require("tailwindcss/defaultTheme");
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      width: {
        300: "300px",
      },
      height: {
        200: "200px",
      },
      maxWidth: {
        300: "300px",
      },
      fontFamily: {
        worksans: ["'Work Sans'", ...fontFamily.sans],
      },
      colors: {
        oneDark: "#282c34",
        darkSkyBlue: "#74B3CE",
        midnight: "#101110",
        dawn: "#f9fbfa",
      },
      typography: ({ theme }) => ({
        dark: {
          css: {
            "--tw-prose-body": theme("colors.stone[100]"),
            "--tw-prose-headings": theme("colors.stone[100]"),
            "--tw-prose-lead": theme("colors.stone[500]"),
            "--tw-prose-links": theme("colors.stone[500]"),
            "--tw-prose-bold": theme("colors.stone[300]"),
            "--tw-prose-counters": theme("colors.stone[600]"),
            "--tw-prose-bullets": theme("colors.stone[100]"),
            "--tw-prose-hr": theme("colors.stone[300]"),
            "--tw-prose-quotes": theme("colors.gray[300]"),
            "--tw-prose-quote-borders": theme("colors.stone[300]"),
            "--tw-prose-captions": theme("colors.stone[300]"),
            "--tw-prose-code": theme("colors.stone[200]"),
            "--tw-prose-pre-bg": theme("colors.oneDark"),
            "--tw-prose-th-borders": theme("colors.stone[100]"),
            "--tw-prose-td-borders": theme("colors.stone[300]"),
          },
        },
      }),
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/typography"),
  ],
};

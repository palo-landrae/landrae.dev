module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mplusrounded: ["'M Plus Rounded 1c'"],
        kodchasan: ["'Kodchasan'"],
      },
      colors: {
        oneDark: "#282c34",
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": theme("colors.stone[100]"),
            "--tw-prose-headings": theme("colors.stone[100]"),
            "--tw-prose-lead": theme("colors.stone[700]"),
            "--tw-prose-links": theme("colors.stone[900]"),
            "--tw-prose-bold": theme("colors.stone[900]"),
            "--tw-prose-counters": theme("colors.stone[600]"),
            "--tw-prose-bullets": theme("colors.stone[100]"),
            "--tw-prose-hr": theme("colors.stone[300]"),
            "--tw-prose-quotes": theme("colors.stone[300]"),
            "--tw-prose-quote-borders": theme("colors.stone[300]"),
            "--tw-prose-captions": theme("colors.stone[700]"),
            "--tw-prose-code": theme("colors.stone[200]"),
            "--tw-prose-pre-bg": theme("colors.oneDark"),
            "--tw-prose-th-borders": theme("colors.stone[100]"),
            "--tw-prose-td-borders": theme("colors.stone[300]"),
            pre: {
              padding: "0px",
            },
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

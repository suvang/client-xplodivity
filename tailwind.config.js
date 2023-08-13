/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        128: "32rem",
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": theme("colors.custom-text"),
            "--tw-prose-headings": theme("colors.custom-text"),
            "--tw-prose-code": theme("colors.pink[900]"),
            "--tw-prose-pre-code": theme("colors.pink[100]"),
            "--tw-prose-pre-bg": theme("colors.pink[900]"),
            "--tw-prose-invert-code": theme("colors.white"),
            "--tw-prose-invert-pre-code": theme("colors.pink[300]"),
            "--tw-prose-invert-pre-bg": "rgb(0 0 0 / 50%)",
          },
        },
      }),
      fontFamily: {
        // satoshi: ["Satoshi", "sans-serif"],
        // inter: ["Inter", "sans-serif"],
        // kalam: ["var(--font-kalam)"],
      },
      colors: {
        "custom-background": "#121521",
        "custom-text": "#FFF",
        "custom-button-bg": "#139dff",
        "custom-card-bg": "#1F2437",
      },
    },
    fontFamily: {
      // satoshi: ["Satoshi", "sans-serif"],
      // inter: ["Inter", "sans-serif"],
      // sans: ["var(--font-inter)"],
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],

  daisyui: {
    base: false,
  },
};

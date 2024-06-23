/** @type {import('tailwindcss').Config} */
import { nextui } from "@nextui-org/theme";
import { color } from "framer-motion";
import css from "styled-jsx/css";

export const content = [
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",

  // Or if using `src` directory:
  "./src/**/*.{js,ts,jsx,tsx,mdx}",
  "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
];
export const theme = {
  extend: {
    spacing: {
      128: "32rem",
    },
    typography: ({ theme }) => ({
      DEFAULT: {
        css: {
          color: theme("colors.white"),
          "--tw-prose-body": theme("colors.gray.800"),
          "--tw-prose-headings": theme("colors.custom-text"),
          "--tw-prose-links": theme("colors.custom-text"),
          "--tw-prose-code": theme("colors.pink[900]"),
          "--tw-prose-pre-code": theme("colors.pink[100]"),
          "--tw-prose-pre-bg": theme("colors.pink[900]"),
          "--tw-prose-invert-code": theme("colors.white"),
          "--tw-prose-invert-pre-code": theme("colors.pink[300]"),
          "--tw-prose-invert-pre-bg": "rgb(0 0 0 / 50%)",
        },
      },
    }),
    fontFamily: {},
    colors: {
      "custom-background": "#121521",
      "custom-text": "#FFF",
      "custom-button-bg": "#139dff",
      "custom-button-bg-hover": "#33a7fa",
      "custom-card-bg": "#1F2437",
    },
  },
  fontFamily: {},
};
export const plugins = [
  require("@tailwindcss/typography"),
  require("daisyui"),
  nextui(),
];
export const daisyui = {
  base: false,
};

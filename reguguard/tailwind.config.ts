import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        popover: "var(--popover)",
        "popover-foreground": "var(--popover-foreground)",
        primary: "#0F6E56",
        accent: "#1D9E75",
        warning: "#BA7517",
        danger: "#A32D2D",
        bgMain: "#F8FAF9",
        textMuted: "#5F5E5A",
        borderColor: "#E2E8E5",
      },
    },
  },
  plugins: [],
};
export default config;

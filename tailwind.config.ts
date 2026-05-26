import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: "#0F1417", 2: "#1B2125" },
        bone: { DEFAULT: "#EFEAE0", 2: "#F5F1E8" },
        paper: "#FBF8F1",
        oxblood: { DEFAULT: "#6F1F1F", 2: "#8A2A24", tint: "#C68A78" },
        graphite: "#4A5258",
        pewter: "#8C9197",
        silver: "#C7C5BE",
        verdant: "#2E5D4A",
        amber: "#8A6A1F",
        garnet: "#8A2A24",
        "slate-blue": "#2A4A6F",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Times New Roman", "Times", "serif"],
        sans: ["var(--font-sans)", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      spacing: {
        s1: "4px",
        s2: "8px",
        s3: "12px",
        s4: "16px",
        s5: "24px",
        s6: "32px",
        s7: "48px",
        s8: "64px",
        s9: "96px",
        s10: "128px",
      },
      letterSpacing: {
        display: "-0.025em",
        heading: "-0.02em",
        kicker: "0.06em",
        "mono-up": "0.18em",
      },
      maxWidth: {
        content: "1440px",
      },
    },
  },
  plugins: [],
};

export default config;

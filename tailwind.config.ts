import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0058be",
          container: "#2170e4",
          fixed: "#d8e2ff",
          "fixed-dim": "#adc6ff",
        },
        secondary: {
          DEFAULT: "#515f74",
          container: "#d5e3fd",
          "fixed-dim": "#b9c7e0",
        },
        tertiary: { DEFAULT: "#825100", container: "#a36700" },
        success: "#10B981",
        "error-red": "#EF4444",
        error: { DEFAULT: "#ba1a1a", container: "#ffdad6" },
        background: "#f7f9fb",
        surface: {
          DEFAULT: "#f7f9fb",
          bright: "#f7f9fb",
          dim: "#d8dadc",
          container: {
            lowest: "#ffffff",
            low: "#f2f4f6",
            DEFAULT: "#eceef0",
            high: "#e6e8ea",
            highest: "#e0e3e5",
          },
        },
        outline: { DEFAULT: "#727785", variant: "#c2c6d6" },
        "on-surface": { DEFAULT: "#191c1e", variant: "#424754" },
        "on-background": "#191c1e",
        "inverse-surface": "#2d3133",
        "inverse-on-surface": "#eff1f3",
      },
      borderRadius: { DEFAULT: "0.25rem", lg: "0.5rem", xl: "0.75rem", full: "9999px" },
      spacing: {
        "margin-desktop": "32px",
        "margin-mobile": "16px",
        md: "24px",
        gutter: "16px",
        lg: "40px",
        sm: "16px",
        xs: "8px",
        base: "4px",
        xl: "64px",
      },
      fontFamily: { sans: ["var(--font-inter)", "system-ui", "sans-serif"] },
      fontSize: {
        "display-lg": ["48px", { lineHeight: "56px", letterSpacing: "-0.02em", fontWeight: "700" }],
        "headline-lg": ["32px", { lineHeight: "40px", letterSpacing: "-0.01em", fontWeight: "600" }],
        "headline-lg-mobile": ["24px", { lineHeight: "32px", fontWeight: "600" }],
        "title-md": ["20px", { lineHeight: "28px", fontWeight: "600" }],
        "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }],
        "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "body-sm": ["14px", { lineHeight: "20px", fontWeight: "400" }],
        "label-md": ["14px", { lineHeight: "20px", letterSpacing: "0.01em", fontWeight: "500" }],
        "label-sm": ["12px", { lineHeight: "16px", fontWeight: "600" }],
      },
      maxWidth: { page: "1440px" },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: { "fade-up": "fade-up 0.5s ease-out both" },
    },
  },
  plugins: [],
};

export default config;

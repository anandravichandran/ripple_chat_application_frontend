import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", lg: "2rem" },
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        bg: { DEFAULT: "#0A0A0A", elevated: "#111111", primary: "#0A0A0A" },
        card: "rgba(255,255,255,0.05)",
        border: { DEFAULT: "rgba(255,255,255,0.08)", hover: "rgba(255,255,255,0.12)" },
        accent: { DEFAULT: "#D9FF66", soft: "#C5F56A", cyan: "#A8F5FF", primary: "#D9FF66", secondary: "#A8F5FF" },
        fg: { DEFAULT: "#FFFFFF", muted: "#B4B4B4" },
        text: { primary: "#FFFFFF", secondary: "rgba(255,255,255,0.65)", muted: "rgba(255,255,255,0.4)" },
        "glass-border": "rgba(255,255,255,0.08)",
        "glass-hover": "rgba(255,255,255,0.07)",
        state: { danger: "#EF4444", success: "#22C55E", warn: "#F59E0B" },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
        display: ["var(--font-jakarta)", "var(--font-inter)", "system-ui"],
      },
      fontSize: {
        hero: ["clamp(2.5rem, 6vw, 4rem)", { lineHeight: "1.05", letterSpacing: "-0.03em", fontWeight: "700" }],
        section: ["clamp(1.75rem, 3.5vw, 2.625rem)", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "600" }],
        subtitle: ["1.125rem", { lineHeight: "1.6" }],
      },
      borderRadius: { xl: "1rem", "2xl": "1.25rem", "3xl": "1.5rem" },
      backdropBlur: { glass: "20px" },
      boxShadow: {
        glass: "0 1px 0 rgba(255,255,255,0.06) inset, 0 20px 60px -20px rgba(0,0,0,0.6)",
        glow: "0 0 60px -10px rgba(217,255,102,0.35)",
        soft: "0 10px 40px -20px rgba(0,0,0,0.8)",
        float: "0 8px 32px rgba(0,0,0,0.4)",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulseDot: {
          "0%,100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.6", transform: "scale(0.85)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 6s linear infinite",
        pulseDot: "pulseDot 1.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}
export default config

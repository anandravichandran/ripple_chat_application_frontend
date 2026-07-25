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
        bg: {
          DEFAULT: "var(--color-bg)",
          elevated: "var(--color-bg-elevated)",
          primary: "var(--color-bg)",
        },
        card: "var(--color-card)",
        border: {
          DEFAULT: "var(--color-glass-border)",
          hover: "var(--color-glass-border-strong)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          soft: "var(--color-accent-soft)",
          cyan: "var(--color-accent-cyan)",
          primary: "var(--color-accent-primary)",
          secondary: "var(--color-accent-secondary)",
        },
        fg: {
          DEFAULT: "var(--color-text-primary)",
          muted: "var(--color-text-secondary)",
        },
        text: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          muted: "var(--color-text-muted)",
        },
        "glass-border": "var(--color-glass-border)",
        "glass-hover": "var(--color-glass-hover)",
        state: { danger: "var(--color-state-danger)", success: "var(--color-state-success)", warn: "var(--color-state-warn)" },
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
        glass: "var(--shadow-glass)",
        glow: "0 0 60px -10px rgba(217,255,102,0.35)",
        soft: "0 10px 40px -20px rgba(0,0,0,0.8)",
        float: "var(--shadow-float)",
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

import type { Config } from "tailwindcss"

const config: Config = {
	darkMode: ["class"],
	content: [
		"./app/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./lib/**/*.{ts,tsx}",
	],
	theme: {
		container: {
			center: true,
			padding: "1.5rem",
			screens: { "2xl": "1280px" },
		},
		extend: {
			colors: {
				bg: {
					primary: "#0A0A0A",
					secondary: "#111111",
				},
				accent: {
					primary: "#D9FF66",
					secondary: "#A8F5FF",
					hover: "#C5F56A",
				},
				text: {
					primary: "#FFFFFF",
					secondary: "#B4B4B4",
					muted: "#7A7A7A",
				},
				state: {
					success: "#22C55E",
					danger: "#EF4444",
					warn: "#F59E0B",
					info: "#38BDF8",
				},
				glass: {
					DEFAULT: "rgba(255,255,255,0.05)",
					hover: "rgba(255,255,255,0.08)",
					strong: "rgba(255,255,255,0.12)",
					border: "rgba(255,255,255,0.08)",
					borderStrong: "rgba(255,255,255,0.14)",
				},
			},
			fontFamily: {
				sans: [
					"var(--font-inter)",
					"Inter",
					"ui-sans-serif",
					"system-ui",
				],
			},
			fontSize: {
				hero: [
					"64px",
					{ lineHeight: "1.05", letterSpacing: "-0.03em", fontWeight: "600" },
				],
				section: [
					"42px",
					{ lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "600" },
				],
				subtitle: [
					"18px",
					{ lineHeight: "1.55", letterSpacing: "-0.005em" },
				],
				body: ["16px", { lineHeight: "1.6" }],
				btn: ["15px", { lineHeight: "1", fontWeight: "500" }],
			},
			borderRadius: {
				xl2: "24px",
				xl3: "32px",
			},
			boxShadow: {
				glow: "0 0 40px 0 rgba(217,255,102,0.25)",
				glass:
					"0 4px 30px rgba(0,0,0,0.35), inset 0 1px 0 0 rgba(255,255,255,0.05)",
				soft: "0 10px 40px -12px rgba(0,0,0,0.6)",
				float: "0 24px 60px -20px rgba(0,0,0,0.7)",
			},
			backdropBlur: {
				xs: "2px",
			},
			keyframes: {
				float: {
					"0%,100%": { transform: "translateY(0)" },
					"50%": { transform: "translateY(-8px)" },
				},
				shimmer: {
					"0%": { backgroundPosition: "-1000px 0" },
					"100%": { backgroundPosition: "1000px 0" },
				},
				pulseDot: {
					"0%,100%": { opacity: "1" },
					"50%": { opacity: "0.35" },
				},
			},
			animation: {
				float: "float 6s ease-in-out infinite",
				shimmer: "shimmer 2s linear infinite",
				pulseDot: "pulseDot 1.4s ease-in-out infinite",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
}

export default config

import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    extend: {
      backgroundImage: {
        'movie-image': 'var(--bg-image-url)',
      },
      colors: {
        amber: {
          700: "#ff4f00"
        },
        slate: {
          100: "#ebe9df"
        }
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
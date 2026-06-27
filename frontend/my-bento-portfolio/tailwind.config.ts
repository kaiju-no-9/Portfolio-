import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // vercel-style pure neutrals
        primary: '#ededed',
        secondary: '#a1a1a1',
        accent: '#ededed',
        purple: '#888888',
        success: '#a1a1a1',
        warning: '#888888',
        // warm cream palette variables
        canvas: "var(--color-canvas)",
        "surface-soft": "var(--color-surface-soft)",
        "surface-card": "var(--color-surface-card)",
        "surface-cream-strong": "var(--color-surface-cream-strong)",
        "surface-dark": "var(--color-surface-dark)",
        "surface-dark-elevated": "var(--color-surface-dark-elevated)",
        "surface-dark-soft": "var(--color-surface-dark-soft)",
        hairline: "var(--color-hairline)",
        "hairline-soft": "var(--color-hairline-soft)",
        // pure gray scale — no blue tint
        gh: {
          black: 'var(--black)',
          950: 'var(--gray-950)',
          900: 'var(--gray-900)',
          800: 'var(--gray-800)',
          700: 'var(--gray-700)',
          600: 'var(--gray-600)',
          500: 'var(--gray-500)',
          400: 'var(--gray-400)',
          300: 'var(--gray-300)',
          200: 'var(--gray-200)',
          100: 'var(--gray-100)',
        },
      },
      keyframes: {
        "slide-in-from-bottom-full": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "slide-out-to-bottom": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
      animation: {
        "slide-in-from-bottom-full":
          "slide-in-from-bottom-full 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "slide-out-to-bottom":
          "slide-out-to-bottom 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};
export default config;

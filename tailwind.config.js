/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "var(--color-dark)",
        "mid-hover": "var(--color-mid-hover)",
        "mid-ambient": "var(--color-mid-ambient)",
        base: "var(--color-base)",
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'awwwards': '0 20px 50px rgba(134, 112, 112, 0.15)',
        '3d': '0 30px 60px -12px rgba(134, 112, 112, 0.25)',
      }
    },
  },
  plugins: [],
}

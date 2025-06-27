// tailwind.config.mjs (CORREGIDO para v3)

import typography from '@tailwindcss/typography'; // Usamos import en lugar de require

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#60A5FA',
        'brand-primary-dark': '#3B82F6',
        'brand-secondary': '#334155',
        'brand-light': '#F8FAFC',
        'brand-text': '#1E293B',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Lora', 'serif'],
      },
    },
  },
  plugins: [
    typography, // Usamos la variable importada
  ],
};

export default config;
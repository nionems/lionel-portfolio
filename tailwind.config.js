/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        purple: {
          100: '#f3e8ff',
          600: '#9333ea',
          700: '#7c3aed',
          800: '#6b21a8',
        },
        blue: {
          50: '#eff6ff',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
        },
        pink: {
          100: '#fce7f3',
          500: '#ec4899',
          800: '#9d174d',
        },
        red: {
          500: '#ef4444',
        },
        cyan: {
          500: '#06b6d4',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
      },
    },
  },
  plugins: [],
} 
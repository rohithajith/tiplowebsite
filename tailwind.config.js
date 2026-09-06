/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef8ff',
          100: '#d9f0ff',
          200: '#bce4ff',
          300: '#8ed2ff',
          400: '#58b7ff',
          500: '#2b98ff',
          600: '#157cfa',
          700: '#0c62e5',
          800: '#114eb9',
          900: '#144491',
        },
        navy: {
          800: '#0c1322',
          850: '#080e1a',
          900: '#040812',
          950: '#02040a',
        },
        accent: {
          purple: '#8b5cf6',
          violet: '#6366f1',
          cyan: '#06b6d4',
          blue: '#3b82f6',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { opacity: '0.4', filter: 'drop-shadow(0 0 15px rgba(59, 130, 246, 0.3))' },
          '100%': { opacity: '0.8', filter: 'drop-shadow(0 0 30px rgba(139, 92, 246, 0.6))' },
        }
      }
    },
  },
  plugins: [],
}

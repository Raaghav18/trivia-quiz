/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5',
        secondary: '#10B981',
        danger: '#EF4444',
        warning: '#F59E0B',
      },
      animation: {
        'timer-bar': 'timer-bar linear forwards',
        'blob': 'blob 7s infinite',
        'pulse': 'pulse 15s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'timer-bar': {
          '0%': { width: '100%' },
          '100%': { width: '0%' },
        },
        'blob': {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
        },
        'pulse': {
          '0%, 100%': {
            opacity: 1,
          },
          '50%': {
            opacity: .5,
          },
        },
      },
      backdropBlur: {
        'xl': '24px',
      },
    },
  },
  plugins: [],
} 
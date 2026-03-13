/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ios-blue': '#0A84FF',
        'ios-green': '#30D158',
        'ios-red': '#FF453A',
        'ios-orange': '#FF9F0A',
        'ios-purple': '#BF5AF2',
        'ios-bg': '#000000',
        'ios-secondary-bg': '#1C1C1E',
        'ios-tertiary-bg': '#2C2C2E',
        'ios-card': '#1C1C1E',
        'ios-text-primary': '#FFFFFF',
        'ios-text-secondary': '#EBEBF5',
        'ios-text-tertiary': '#8E8E93',
        'ios-separator': '#38383A',
        'ios-separator-light': '#2C2C2E',
        'ios-fill': '#3A3A3C',
        'ios-fill-secondary': '#48484A',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      borderRadius: {
        'ios-sm': '12px',
        'ios-md': '16px',
        'ios-lg': '20px',
        'ios-xl': '24px',
        'ios-full': '100px',
      },
      boxShadow: {
        'ios-sm': '0 1px 3px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)',
        'ios-md': '0 4px 14px rgba(0, 0, 0, 0.3)',
        'ios-lg': '0 10px 40px rgba(0, 0, 0, 0.4)',
        'ios-xl': '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255,255,255,0.05)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out',
        'scale-in': 'scale-in 0.25s ease-out',
      },
    },
  },
  plugins: [],
}
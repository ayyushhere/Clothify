/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // iOS System Colors
        'ios-blue': '#007AFF',
        'ios-blue-dark': '#0A84FF',
        'ios-green': '#34C759',
        'ios-red': '#FF3B30',
        'ios-orange': '#FF9500',
        'ios-yellow': '#FFCC00',
        'ios-purple': '#AF52DE',
        'ios-pink': '#FF2D55',
        'ios-teal': '#5AC8FA',
        // iOS Backgrounds
        'ios-bg': '#F2F2F7',
        'ios-bg-secondary': '#FFFFFF',
        'ios-card': '#FFFFFF',
        // iOS Text
        'ios-text-primary': '#000000',
        'ios-text-secondary': '#3C3C43',
        'ios-text-tertiary': '#8E8E93',
        // iOS Borders/Separators
        'ios-separator': '#C6C6C8',
        'ios-separator-light': '#E5E5EA',
        // iOS Fills
        'ios-fill': '#E5E5EA',
        'ios-fill-secondary': '#D1D1D6',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'San Francisco', 'Segoe UI', 'sans-serif'],
      },
      borderRadius: {
        'ios-sm': '12px',
        'ios-md': '16px',
        'ios-lg': '20px',
        'ios-xl': '24px',
        'ios-full': '100px',
      },
      boxShadow: {
        'ios-sm': '0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)',
        'ios-md': '0 4px 14px rgba(0, 0, 0, 0.08)',
        'ios-lg': '0 10px 40px rgba(0, 0, 0, 0.1)',
        'ios-xl': '0 20px 60px rgba(0, 0, 0, 0.12)',
      },
      spacing: {
        'ios-xs': '4px',
        'ios-sm': '8px',
        'ios-md': '16px',
        'ios-lg': '24px',
        'ios-xl': '32px',
        'ios-2xl': '48px',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-down': {
          '0%': { opacity: '0', transform: 'translateY(-12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'slide-out-right': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
        'slide-down': 'slide-down 0.3s ease-out',
        'scale-in': 'scale-in 0.25s ease-out',
        'slide-in-right': 'slide-in-right 0.35s cubic-bezier(0.32, 0.72, 0, 1)',
        'slide-out-right': 'slide-out-right 0.3s cubic-bezier(0.32, 0.72, 0, 1)',
      },
      transitionTimingFunction: {
        'ios': 'cubic-bezier(0.32, 0.72, 0, 1)',
      },
    },
  },
  plugins: [],
}
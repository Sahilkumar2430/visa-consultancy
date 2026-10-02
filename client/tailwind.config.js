/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f4fa', 100: '#dbe5f1', 200: '#bccde4', 300: '#8faad0',
          400: '#5b80b6', 500: '#3a619c', 600: '#2c4c82', 700: '#253e6a',
          800: '#1e3154', 900: '#0f1e38', 950: '#081225',
        },
        royal: {
          50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd',
          400: '#60a5fa', 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8',
          800: '#1e40af', 900: '#1e3a8a', 950: '#172554',
        },
        teal: {
          50: '#f0fdfa', 100: '#ccfbf1', 200: '#99f6e4', 300: '#5eead4',
          400: '#2dd4bf', 500: '#14b8a6', 600: '#0d9488', 700: '#0f766e',
          800: '#115e59', 900: '#134e4a',
        },
        cream: {
          50: '#fdfcfb', 100: '#faf8f5', 200: '#f5f1ea',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 2px 15px -3px rgba(15, 30, 56, 0.07), 0 10px 20px -2px rgba(15, 30, 56, 0.04)',
        card: '0 4px 24px -4px rgba(15, 30, 56, 0.08), 0 2px 8px -2px rgba(15, 30, 56, 0.04)',
        'card-hover': '0 12px 40px -8px rgba(15, 30, 56, 0.15), 0 4px 12px -2px rgba(15, 30, 56, 0.08)',
        glow: '0 0 40px -10px rgba(59, 130, 246, 0.35)',
      },
      borderRadius: {
        '2xl': '1rem', '3xl': '1.5rem', '4xl': '2rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.5s ease-out forwards',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        fadeUp: { '0%': { opacity: '0', transform: 'translateY(24px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        slideInRight: { '0%': { opacity: '0', transform: 'translateX(24px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
        float: { '0%, 100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-12px)' } },
        shimmer: { '0%': { backgroundPosition: '-1000px 0' }, '100%': { backgroundPosition: '1000px 0' } },
      },
    },
  },
  plugins: [],
};
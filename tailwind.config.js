/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        noir: {
          900: '#08080f',
          800: '#0d0d18',
          700: '#12121f',
          600: '#1a1a2e',
          500: '#242438',
        },
        gold: {
          100: '#fef9e7',
          200: '#fdeebf',
          300: '#f9d77e',
          400: '#f4c040',
          500: '#e8a900',
          600: '#c98a00',
        },
        parchment: {
          100: '#f7f2e8',
          200: '#ede5d0',
          300: '#d9cdb5',
          400: '#bfb09a',
        },
        crimson: {
          400: '#e05c5c',
          500: '#c84040',
        }
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        body: ['var(--font-source)', 'Georgia', 'serif'],
        mono: ['var(--font-jetbrains)', 'Courier New', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.8s ease forwards',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glow: {
          from: { boxShadow: '0 0 5px #e8a900, 0 0 10px #e8a900' },
          to: { boxShadow: '0 0 15px #e8a900, 0 0 30px #e8a900, 0 0 45px #e8a900' },
        },
        slideUp: {
          from: { opacity: 0, transform: 'translateY(30px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(rgba(232,169,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(232,169,0,0.05) 1px, transparent 1px)",
        'radial-gold': 'radial-gradient(ellipse at center, rgba(232,169,0,0.15) 0%, transparent 70%)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

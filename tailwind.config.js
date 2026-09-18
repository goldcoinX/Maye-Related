/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slideRight: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(25%)' },
        },
        slideLeft: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(-25%)' },
        },
      },
      animation: {
        'slide-right': 'slideRight 1.5s ease-in-out infinite',
        'slide-left': 'slideLeft 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

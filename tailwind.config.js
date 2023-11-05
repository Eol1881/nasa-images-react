/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        pixelify: ['Pixelify', 'sans'],
      },
      transitionDuration: {
        2000: '2000ms',
      },
      transitionTimingFunction: {
        cool: 'cubic-bezier(.33, -3.81, .4, 2.92)',
      },
      screens: {
        'no-hover': { raw: '(hover: none)' },
      },
    },
  },
  plugins: [],
};

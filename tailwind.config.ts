import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      transitionDuration: {
        2000: '2000ms',
      },
      transitionTimingFunction: {
        cool: 'cubic-bezier(.33, -3.81, .4, 2.92)',
        chill: 'cubic-bezier(.59,.07,.55,1.28)',
        chilly: 'cubic-bezier(.59,.07,.53,.95)',
      },
      screens: {
        'no-hover': { raw: '(hover: none)' },
      },
    },
  },
  plugins: [],
};
export default config;

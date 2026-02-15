import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        respengr: '#FF00FF',
        prappt: '#00FFFF',
        aiboumos: '#8040C0',
      },
    },
  },
  plugins: [],
};

export default config;

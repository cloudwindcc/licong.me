/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Microsoft YaHei"', '"微软雅黑"', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
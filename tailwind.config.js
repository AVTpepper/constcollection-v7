/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './templates/**/*.html',
    './static/js/**/*.js',
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
      },
      colors: {
        'brand-indigo': {
          DEFAULT: '#3730A3',
          dark: '#312E81',
          light: '#4F46E5',
        },
        'accent-coral': {
          DEFAULT: '#FF6B6B',
          dark: '#EE5A52',
          light: '#FF8787',
        },
      },
      fontFamily: {
        'playfair': ['"Playfair Display"', 'serif'],
        'inter': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

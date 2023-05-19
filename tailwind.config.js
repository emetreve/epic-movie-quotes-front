/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        'helvetica-medium-en': ['helvetica-medium-en'],
        montserrat: ['Montserrat'],
      },
      colors: {
        cream: '#DDCCAA',
        red: '#E31221',
        'partly-transparent-dark': 'rgba(0, 0, 0, 0.54)',
        'input-gray': '#CED4DA',
        'txt-black': '#212529',
      },
    },
  },
  plugins: [],
};

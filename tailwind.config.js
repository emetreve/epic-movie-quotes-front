/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // backgroundImage: {
      //   'gradient-violet':
      //     'linear-gradient(187.16deg, #181623 0.07%, #191725 51.65%, #0D0B14 98.75%)',
      // },
      backgroundImage: {
        background: 'linear-gradient(180deg, #11101A 0%, #08080D 100%)',
      },

      fontFamily: {
        'helvetica-medium-en': ['helvetica-medium-en'],
        montserrat: ['Montserrat'],
      },
      colors: {
        cream: '#DDCCAA',
        red: '#E31221',
        'partly-transparent-dark': 'rgba(0, 0, 0, 0.54)',
        violet: '#222030',
        'input-gray': '#CED4DA',
        'txt-black': '#212529',
      },
    },
  },
  plugins: [],
};

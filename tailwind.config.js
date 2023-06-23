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
        'gradient-violet':
          'linear-gradient(187.16deg, #181623 0.07%, #191725 51.65%, #0D0B14 98.75%)',
        'gradient-plain-violet': 'linear-gradient(to right, #222030, #222030)',
        background: 'linear-gradient(180deg, #11101A 0%, #08080D 100%)',
        'gradient-gray':
          'linear-gradient(-67.06deg, rgba(239, 239, 239, 0.1) -1.81%, rgba(239, 239, 239, 0.00514528) 102.5%, rgba(1, 1, 1, 0.00260417) 102.51%, rgba(239, 239, 239, 0.03) 102.52%)',
      },

      fontFamily: {
        'helvetica-medium-en': ['helvetica-medium-en'],
        'helvetica-medium-ka': ['helvetica-medium-ka'],
        'helvetica-caps-ka': ['helvetica-caps-ka'],
        montserrat: ['Montserrat'],
      },
      colors: {
        cream: '#DDCCAA',
        red: '#E31221',
        'red-hover': '#CC0E10',
        green: '#198754',
        'partly-transparent-dark': 'rgba(0, 0, 0, 0.54)',
        violet: '#222030',
        'input-gray': '#CED4DA',
        'txt-black': '#212529',
        'news-bg': '#000000',
        'comment-input-bg': 'rgba(36, 34, 47, 0.6)',
        'profile-dark-blue': '#11101A',
        'success-green': '#0F5132',
        'success-bg': '#D1E7DD',
        'password-box-border': 'rgba(206, 212, 218, 0.2)',
        'textarea-gray': '#6C757D',
        'upload-btn-violet': '#9747FF',
        'violet-quote-create-bg': '#181623',
        like: '#F3426C',
        'bell-counter-red': '#E33812',
        'violet-quote': '#24222F',
      },
    },
  },
  plugins: [],
};

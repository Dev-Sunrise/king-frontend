/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',

  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],

  theme: {
    extend: {
      colors: {
        'red-e6': '#e60023',

        'blue-06': '#06aaff',

        'black-14': '#141a1f',
        'black-10': '#101418b3',
        'black-cc': '#000000cc',

        'white-f0': '#f0f2f6',
        'white-33': '#ffffff33',

        'gray-33': '#333333',
        'gray-ac': '#acacac',
        'gray-76': '#767676'
      }
    }
  },

  plugins: []
}

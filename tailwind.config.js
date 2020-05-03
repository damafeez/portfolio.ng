/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
  theme: {
    extend: {
      colors: {
        current: 'currentColor',
        white: 'var(--white)',
      },
      fontSize: {
        xl: '1.5rem',
        '2xl': '2.5rem',
        '3xl': '4rem',
        '4xl': '7rem',
        '5xl': '8rem',
        '6xl': '9rem',
      },
      boxShadow: {
        lg:
          '0 10px 25px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  variants: {},
  plugins: [],
}

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
        background: 'var(--background)',
        'on-background': 'var(--on-background)',
        primary: 'var(--primary)',
        'on-primary': 'var(--on-primary)',
        secondary: 'var(--secondary)',
        'on-secondary': 'var(--on-secondary)',
        'on-secondary-2': 'var(--on-secondary-2)',
        tertiary: 'var(--tertiary)',
        'on-tertiary': 'var(--on-tertiary)',
        'suplement-1': 'var(--suplement-1)',
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
        lg: '0 10px 25px -3px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  variants: {},
  plugins: [],

  purge: ['./**/*.vue', './schema/**/*.json'],
}

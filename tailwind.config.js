/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./{src,mdx}/**/*.{js,mjs,jsx,mdx}'],
  darkMode: 'class',
  theme: {
    fontSize: {
      '2xs': ['0.75rem', { lineHeight: '1.25rem' }],
      xs: ['0.8125rem', { lineHeight: '1.5rem' }],
      sm: ['0.875rem', { lineHeight: '1.5rem' }],
      base: ['1rem', { lineHeight: '1.75rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '1' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
      '7xl': ['4.5rem', { lineHeight: '1' }],
      '8xl': ['6rem', { lineHeight: '1' }],
      '9xl': ['8rem', { lineHeight: '1' }],
    },
    typography: require('./typography'),
    extend: {
      maxWidth: {
        lg: '33rem',
        '2xl': '40rem',
        '3xl': '50rem',
        '5xl': '66rem',
      },
      opacity: {
        1: '0.01',
        2.5: '0.025',
        7.5: '0.075',
        15: '0.15',
      },
      colors: {
        // rgba(255, 205, 25)
        yellow: ({ opacityValue }) => {
          return `rgba(255, 205, 25, ${opacityValue || 100})`
        },
        // rgba(19, 20, 26)
        dark: ({ opacityValue }) => {
          return `rgba(19, 20, 26, ${opacityValue || 100})`
        },
        // rgba(248, 248, 252)
        light: ({ opacityValue }) => {
          return `rgba(248, 248, 252, ${opacityValue || 100})`
        },
        // rgba(36, 150, 129)
        green: ({ opacityValue }) => {
          return `rgba(36, 150, 129, ${opacityValue || 100})`
        },
        // rgba(151, 152, 171)
        grey: ({ opacityValue }) => {
          return `rgba(151, 152, 171, ${opacityValue || 100})`
        },
        // rgba(245, 107, 88)
        red: ({ opacityValue }) => {
          return `rgba(245, 107, 88, ${opacityValue || 100})`
        },
        // rgba(80, 79, 84)
        darkGrey: ({ opacityValue }) => {
          return `rgba(80, 79, 84, ${opacityValue})`
        },
        // // rgba(234, 245, 243)
        // success: ({ opacityValue }) => {
        //   return `rgba(234, 245, 243, ${opacityValue})`
        // },
        // // rgba(236, 173, 169)
        // pink: ({ opacityValue }) => {
        //   return `rgba(236, 173, 169, ${opacityValue})`
        // },
        // // rgba(255, 250, 232)
        // warning: ({ opacityValue }) => {
        //   return `rgba(255, 250, 232, ${opacityValue})`
        // },
        // // rgba(245, 234, 234)
        // error: ({ opacityValue }) => {
        //   return `rgba(245, 234, 234, ${opacityValue})`
        // },
        // // rgba(252, 252, 252)
        // white: ({ opacityValue }) => {
        //   return `rgba(252, 252, 252, ${opacityValue})`
        // },
        // inherit: 'inherit',
        // initial: 'initial',
        // transparent: 'transparent',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

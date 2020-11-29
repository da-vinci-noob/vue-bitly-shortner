module.exports = {
  purge: {
    enabled: ((process.env.NODE_ENV === 'production') ? true : false),
    content: [
      './src/App.vue',
      './src/**/*.vue'
    ],
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      animation: ['hover']
    },
  },
  plugins: [],
}

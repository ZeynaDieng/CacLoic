
module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
  
    extend: {
      colors: {
        'primary':'#22B48C',
        'cac': {
          '50': '#f4fbf9', 
          '100': '#e9f8f4', 
          '200': '#c8ece2', 
          '300': '#a7e1d1', 
          '400': '#64cbaf', 
          '500': '#22B48C', 
          '600': '#1fa27e', 
          '700': '#1a8769', 
          '800': '#146c54', 
          '900': '#115845',
          'bg-gray': '#f9f9f9;'
}
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
      // ...
    require('@tailwindcss/forms'),
    ],
}

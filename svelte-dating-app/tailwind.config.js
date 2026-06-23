/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        pink: {
          500: '#E91E63',
          600: '#D81B60',
        }
      }
    },
  },
  plugins: [],
}

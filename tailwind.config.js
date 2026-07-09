/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './projects/*.html'],
  theme: {
    extend: {
      colors: {
        primary: '#003087',
        secondary: '#009cde',
        surface: '#ffffff',
        'on-surface': '#2c2e2f',
        'on-surface-variant': '#687173',
        'surface-variant': '#e6e8eb',
        'surface-container': '#eef0f3',
        'surface-container-low': '#ffffff',
        'outline-variant': '#d9dde0'
      },
      fontFamily: {
        syne: ['Plus Jakarta Sans', 'sans-serif'],
        code: ['JetBrains Mono', 'monospace'],
        body: ['Inter', 'sans-serif']
      },
      maxWidth: { container: '1200px' }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ]
}

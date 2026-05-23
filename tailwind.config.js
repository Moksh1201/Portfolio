/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: '#02030a',
        hull: '#07111f',
        cyan: '#45d9ff',
        plasma: '#a855f7',
        magenta: '#ff4fd8',
        ion: '#7dffce',
        amber: '#ffd166'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        glow: '0 0 42px rgba(69, 217, 255, 0.32)',
        magenta: '0 0 44px rgba(255, 79, 216, 0.24)'
      }
    }
  },
  plugins: []
};

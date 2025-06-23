/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'pacifico': ['Pacifico', 'cursive'],
        'quicksand': ['Quicksand', 'sans-serif'],
      },
      colors: {
        'blush': '#FFB6C1',
        'lavender': '#E6E6FA',
        'mint': '#98FB98',
        'baby-blue': '#87CEEB',
        'cream': '#FFF8DC',
        'peach': '#FFCCCB',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'sway': 'sway 4s ease-in-out infinite',
        'bloom': 'bloom 0.8s ease-out',
        'bounce-gentle': 'bounce-gentle 2s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
        'fall': 'fall 8s linear infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        bloom: {
          '0%': { transform: 'scale(0) rotate(180deg)', opacity: '0' },
          '50%': { transform: 'scale(1.2) rotate(90deg)', opacity: '0.8' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
        },
        'bounce-gentle': {
          '0%, 100%': { transform: 'translateY(0%)' },
          '50%': { transform: 'translateY(-10%)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.8' },
          '50%': { opacity: '1' },
        },
        fall: {
          '0%': { transform: 'translateY(-100vh) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(100vh) rotate(360deg)', opacity: '0' },
        },
      },
      cursor: {
        'flower': 'url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSIjRkY2OUI0IiBzdHJva2U9IiNGRjY5QjQiIHN0cm9rZS13aWR0aD0iMiIvPgo8L3N2Zz4K"), auto',
      },
    },
  },
  plugins: [],
}
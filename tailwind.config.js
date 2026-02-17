/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#2E7D32',
          'green-light': '#4CAF50',
          'green-dark': '#1B5E20',
          mint: '#F1F8E9',
          'mint-dark': '#DCEDC8',
        },
        neutral: {
          900: '#212121',
          700: '#616161',
          500: '#757575',
          300: '#E0E0E0',
          100: '#F5F5F5',
          50: '#FAFAFA',
        },
      },
      borderRadius: {
        'card': '14px',
        'card-lg': '16px',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.05)',
        'soft-lg': '0 4px 16px rgba(0, 0, 0, 0.08)',
        'soft-hover': '0 6px 20px rgba(0, 0, 0, 0.12)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
    },
  },
  plugins: [],
}

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
          purple: '#6E026F',
          cyan: '#ABDADC',
          cream: '#F1E6C9',
          orange: '#FA891A',
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
      backgroundImage: {
        'primary-gradient': 'linear-gradient(135deg, #6E026F, #ABDADC)',
        'accent-gradient': 'linear-gradient(135deg, #FA891A, #F1E6C9)',
        'hero-gradient': 'radial-gradient(circle at 30% 50%, #6E026F 0%, #ABDADC 50%, #6E026F 100%)',
        'premium-button': 'linear-gradient(135deg, #6E026F 0%, #ABDADC 50%, #FA891A 100%)',
        'glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
      },
      borderRadius: {
        'card': '14px',
        'card-lg': '16px',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.05)',
        'soft-lg': '0 4px 16px rgba(0, 0, 0, 0.08)',
        'soft-hover': '0 6px 20px rgba(0, 0, 0, 0.12)',
        'glow-orange': '0 8px 32px rgba(250, 137, 26, 0.3)',
        'glow-purple': '0 8px 32px rgba(110, 2, 111, 0.3)',
        'premium': '0 20px 60px rgba(110, 2, 111, 0.2)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      animation: {
        'gradient': 'gradient 8s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

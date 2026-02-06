/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core Brand Colors (from original prompt)
        'bg-primary': '#F4F8D3',
        'brand-purple': '#8E7DBE',
        'brand-mint': '#A6D6D6',
        'brand-pink': '#F7CFD8',
        
        // Logo Gradient Colors (for accents)
        'logo-mint': '#A8E6CF',
        'logo-lavender': '#C7CEEA',
        'logo-purple': '#B19CD9',
        'logo-peach': '#FFB6C1',
        'logo-teal': '#8DD3DD',
        
        // Background & Neutrals
        'bg-cream': '#FDFCF9',
        'text-primary': '#2E2E2E',
        'text-secondary': '#6B7280',
        'text-muted': '#9CA3AF',
        
        // Status Colors
        'status-success': '#A6D6D6',
        'status-warning': '#FCD34D',
        'status-error': '#F87171',
        'status-info': '#8E7DBE',
        
        // Extended Purple Shades
        purple: {
          50: '#F5F3F9',
          100: '#EBE7F3',
          200: '#8E7DBE',
          300: '#7C68B0',
          400: '#6A53A2',
          500: '#6D5C9E',
          600: '#584A7F',
          700: '#433860',
        },
        
        // Extended Mint Shades
        mint: {
          50: '#F0F9F9',
          100: '#E1F3F3',
          200: '#A6D6D6',
          300: '#8DCDCD',
          400: '#73C4C4',
          500: '#7CB5B5',
          600: '#5A9999',
        },
        
        // Extended Pink Shades
        pink: {
          50: '#FDF5F7',
          100: '#FCE8ED',
          200: '#F7CFD8',
          300: '#F2B6C3',
          400: '#ED9DAE',
          500: '#E5A8B8',
          600: '#D87A91',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Poppins', 'Inter', 'sans-serif'],
        rounded: ['Nunito', 'Quicksand', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(142, 125, 190, 0.08)',
        'soft-lg': '0 4px 16px rgba(142, 125, 190, 0.12)',
        'soft-xl': '0 8px 24px rgba(142, 125, 190, 0.15)',
        'glow': '0 0 20px rgba(142, 125, 190, 0.2)',
      },
      borderRadius: {
        'xl': '14px',
        '2xl': '16px',
        '3xl': '20px',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
    },
  },
  plugins: [],
}
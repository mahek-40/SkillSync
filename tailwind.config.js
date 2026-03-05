/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0B2B2B',      // Deep Forest
        brand: '#1A7A6E',        // Teal Jade
        secondary: '#A8C5BC',    // Sage Mist
        base: '#F0EDE5',         // Ivory Linen
        accent: '#B8935A',       // Warm Gold
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(135deg, #0B2B2B, #1A7A6E)',
        'accent-gradient': 'linear-gradient(135deg, #1A7A6E, #A8C5BC)',
      },
      borderRadius: {
        'card': '12px',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(11, 43, 43, 0.08)',
        'soft-lg': '0 4px 16px rgba(11, 43, 43, 0.12)',
        'soft-hover': '0 6px 20px rgba(11, 43, 43, 0.16)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}

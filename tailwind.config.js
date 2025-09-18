/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
        '9999': '9999',
        '99999': '99999',
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: '#2A5C85',
          50: '#F0F5FA',
          100: '#D6E4F0',
          200: '#B3CEE3',
          300: '#8DB6D4',
          400: '#5A92BD',
          500: '#3B73A1',
          600: '#2A5C85',
          700: '#1F466A',
          800: '#173550',
          900: '#0F2437',
          950: '#081220',
        },
        secondary: {
          DEFAULT: '#1D8A62',
          50: '#E8F7F2',
          100: '#C8ECDE',
          200: '#9EDCC3',
          300: '#6FC9A5',
          400: '#46B187',
          500: '#2A9D6F',
          600: '#1D8A62',
          700: '#157250',
          800: '#0F5A3F',
          900: '#0A422E',
          950: '#052B1E',
          foreground: '#FFFFFF',
        },
        gradient: {
          start: '#2A5C85',
          end: '#1D8A62',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(90deg, #2A5C85 0%, #1D8A62 100%)',
        'gradient-primary-reverse': 'linear-gradient(90deg, #1D8A62 0%, #2A5C85 100%)',
        'gradient-radial': 'radial-gradient(circle, #2A5C85 0%, #1D8A62 100%)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};

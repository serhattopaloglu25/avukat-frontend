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
          DEFAULT: '#1D4ED8',
          50: '#E3F2FD',
          100: '#BBDEFB',
          200: '#90CAF9',
          300: '#64B5F6',
          400: '#42A5F5',
          500: '#2196F3',
          600: '#1E88E5',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#0D47A1',
          950: '#01579B',
        },
        secondary: {
          DEFAULT: '#52B788',
          50: '#F0F9F4',
          100: '#D6F2E3',
          200: '#B7E4C7',
          300: '#95D5AA',
          400: '#74C69D',
          500: '#52B788',
          600: '#40916C',
          700: '#1D4ED8',
          800: '#1B5E3F',
          900: '#0F4A2D',
          950: '#08361F',
          foreground: '#FFFFFF',
        },
        accent: {
          DEFAULT: '#222222',
          light: '#555555',
          dark: '#000000',
        },
        gradient: {
          start: '#1D4ED8',
          end: '#52B788',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(90deg, #2D6A4F 0%, #52B788 100%)',
        'gradient-primary-reverse': 'linear-gradient(90deg, #52B788 0%, #2D6A4F 100%)',
        'gradient-radial': 'radial-gradient(circle, #2D6A4F 0%, #52B788 100%)',
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

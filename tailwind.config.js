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
          DEFAULT: '#2ECC71',
          50: '#E8F8F0',
          100: '#C8EDDB',
          200: '#A5E1C6',
          300: '#81D5B1',
          400: '#5DD99C',
          500: '#2ECC71',
          600: '#27AE60',
          700: '#1F8A4D',
          800: '#17673A',
          900: '#0F4427',
          950: '#0A2D1A',
        },
        secondary: {
          DEFAULT: '#2ECC71',
          50: '#E8F8F0',
          100: '#C8EDDB',
          200: '#A5E1C6',
          300: '#81D5B1',
          400: '#5DD99C',
          500: '#2ECC71',
          600: '#27AE60',
          700: '#1F8A4D',
          800: '#17673A',
          900: '#0F4427',
          950: '#0A2D1A',
          foreground: '#FFFFFF',
        },
        accent: {
          DEFAULT: '#222222',
          light: '#555555',
          dark: '#000000',
        },
        gradient: {
          start: '#2ECC71',
          end: '#27AE60',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(90deg, #2ECC71 0%, #27AE60 100%)',
        'gradient-primary-reverse': 'linear-gradient(90deg, #27AE60 0%, #2ECC71 100%)',
        'gradient-radial': 'radial-gradient(circle, #2ECC71 0%, #27AE60 100%)',
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

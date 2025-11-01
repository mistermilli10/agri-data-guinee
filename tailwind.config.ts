import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
    './styles/**/*.{ts,tsx,css}'
  ],
  theme: {
    extend: {
      colors: {
        green: {
          DEFAULT: '#15803D',
          600: '#16A34A',
          700: '#15803D'
        },
        yellow: '#F59E0B',
        red: '#EF4444',
        blue: '#2563EB',
        'gray-ui': '#F5F6F8',
        'gray-border': '#E5E7EB',
        'gray-text': '#1F2937'
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem'
      },
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans]
      },
      boxShadow: {
        soft: '0 10px 40px rgba(21, 128, 61, 0.1)'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
};

export default config;

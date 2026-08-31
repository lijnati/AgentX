import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#06080d',
        surface: {
          DEFAULT: '#0b0e17',
          subtle: '#0f1320',
          elevated: '#141a2a',
          border: '#1c2438',
        },
        bnb: {
          DEFAULT: '#F0B90B',
          light: '#F8D33A',
          dark: '#C99A08',
          dim: 'rgba(240, 185, 11, 0.1)',
        },
        category: {
          rebalance: '#6366F1',
          grid: '#F59E0B',
          yield: '#10B981',
          health: '#8B5CF6',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'sans-serif'],
        mono: ['var(--font-geist-sans)', 'sans-serif'],
      },
      animation: {
        shimmer: 'shimmer 2s infinite linear',
        'pulse-subtle': 'pulseSubtle 3s infinite ease-in-out',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.65' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;

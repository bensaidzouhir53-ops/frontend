import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        teal: { DEFAULT: '#0F766E', dark: '#0B4F4A' },
        sage: '#A7C4B5',
        gold: '#D7A85C',
        ivory: '#FAF7F0',
        mist: '#EEF7F4',
        charcoal: '#1F2933',
      },
      fontFamily: {
        arabic: ['var(--font-tajawal)', 'Tajawal', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-teal': 'linear-gradient(135deg, #0F766E 0%, #0B4F4A 100%)',
        'gradient-hero': 'linear-gradient(160deg, #EEF7F4 0%, #FAF7F0 60%, #A7C4B5 100%)',
      },
      animation: {
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'fade-in': 'fadeIn 0.2s ease-out',
        'countdown': 'countdown linear forwards',
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(100%)' }, // moves left in RTL
        },
      },
      boxShadow: {
        'card': '0 2px 16px rgba(15, 118, 110, 0.08)',
        'card-hover': '0 8px 32px rgba(15, 118, 110, 0.16)',
      },
    },
  },
  plugins: [],
}

export default config

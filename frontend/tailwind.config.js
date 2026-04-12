/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1B2A4A',
        secondary: '#D4A017',
        success: '#22C55E',
        error: '#EF4444',
        warning: '#F59E0B',
        'text-primary': '#1F2937',
        'text-secondary': '#6B7280',
        'bg-main': '#FEFEFE',
        'card-bg': '#FFFFFF',
        'card-border': '#E6E8EC',
      },
      fontSize: {
        'heading': ['36px', { lineHeight: '160%', letterSpacing: '0.05em' }],
        'section-title': ['28px', { lineHeight: '160%' }],
        'title': ['24px', { lineHeight: '160%' }],
        'secondary-title': ['20px', { lineHeight: '160%' }],
        'heading-subtitle': ['20px', { lineHeight: '160%', letterSpacing: '0.04em' }],
        'title-subtitle': ['16px', { lineHeight: '160%' }],
      },
    },
  },
  plugins: [],
}

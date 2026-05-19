/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif',
        ],
      },
      boxShadow: {
        glow: '0 24px 80px rgba(215, 139, 189, 0.22)',
        soft: '0 18px 50px rgba(99, 74, 116, 0.14)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        breathe: {
          '0%, 100%': { opacity: 0.68, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.04)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        rain: {
          '0%': { transform: 'translate3d(0, -20vh, 0) rotate(45deg)', opacity: 0 },
          '10%': { opacity: 1 },
          '100%': { transform: 'translate3d(var(--drift), 92vh, 0) rotate(45deg)', opacity: 0 },
        },
        pop: {
          '0%': { transform: 'translate(-50%, -50%) scale(0.2)', opacity: 0 },
          '22%': { opacity: 1 },
          '100%': { transform: 'translate(calc(-50% + var(--x)), calc(-50% + var(--y))) scale(1)', opacity: 0 },
        },
        drawLine: {
          '0%': { transform: 'scaleX(0)', opacity: 0 },
          '100%': { transform: 'scaleX(1)', opacity: 1 },
        },
      },
      animation: {
        float: 'float 4.8s ease-in-out infinite',
        breathe: 'breathe 4s ease-in-out infinite',
        shimmer: 'shimmer 9s ease infinite',
        rain: 'rain var(--duration) linear forwards',
        pop: 'pop 1.25s ease-out forwards',
        drawLine: 'drawLine 1.3s ease-out forwards',
      },
    },
  },
  plugins: [],
}

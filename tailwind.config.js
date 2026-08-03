/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        void: '#030712',
        'space-dark': '#090d16',
        'space-card': '#0b0f19',
        'accent-cyan': '#00f0ff',
        'accent-teal': '#06b6d4',
        'accent-violet': '#8b5cf6',
        'accent-purple': '#7c3aed',
        'border-glass': 'rgba(255, 255, 255, 0.1)',
        'border-cyan-glow': 'rgba(0, 240, 255, 0.4)',
        'border-violet-glow': 'rgba(139, 92, 246, 0.4)',
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(0, 240, 255, 0.35), 0 0 40px rgba(0, 240, 255, 0.15)',
        'glow-violet': '0 0 20px rgba(139, 92, 246, 0.35), 0 0 40px rgba(139, 92, 246, 0.15)',
        'glow-cosmic': '0 0 25px rgba(0, 240, 255, 0.25), 0 0 50px rgba(124, 58, 237, 0.25)',
      },
      container: {
        center: true,
        padding: '2rem',
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
};
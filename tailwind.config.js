/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
          DEFAULT: 'rgba(var(--primary))',
          foreground: 'rgba(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'rgba(var(--secondary))',
          foreground: 'rgba(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'rgba(var(--destructive))',
        },
        muted: {
          DEFAULT: 'rgba(var(--muted))',
          foreground: 'rgba(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'rgba(var(--accent))',
          foreground: 'rgba(var(--accent-foreground))',
        },
        card: {
          DEFAULT: 'rgba(var(--card))',
          foreground: 'rgba(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'rgba(var(--popover))',
          foreground: 'rgba(var(--popover-foreground))',
        },
        background: 'rgba(var(--background))',
        foreground: 'rgba(var(--foreground))',
        border: 'rgba(var(--border))',
        input: 'rgba(var(--input))',
        ring: 'rgba(var(--ring))',
        sidebar: {
          DEFAULT: 'rgba(var(--sidebar))',
          foreground: 'rgba(var(--sidebar-foreground))',
          primary: 'rgba(var(--sidebar-primary))',
          'primary-foreground': 'rgba(var(--sidebar-primary-foreground))',
          accent: 'rgba(var(--sidebar-accent))',
          'accent-foreground': 'rgba(var(--sidebar-accent-foreground))',
          border: 'rgba(var(--sidebar-border))',
          ring: 'rgba(var(--sidebar-ring))',
        },
        chart: {
          1: 'rgba(var(--chart-1))',
          2: 'rgba(var(--chart-2))',
          3: 'rgba(var(--chart-3))',
          4: 'rgba(var(--chart-4))',
          5: 'rgba(var(--chart-5))',
        },
      },
      spacing: {
        'sidebar': 'var(--sidebar-width)',
        'sidebar-collapsed': 'var(--sidebar-collapsed-width)',
        'timeline': 'var(--timeline-height)',
      },
      borderRadius: {
        'sm': 'calc(var(--radius) - 4px)',
        'md': 'calc(var(--radius) - 2px)',
        'lg': 'var(--radius)',
        'xl': 'calc(var(--radius) + 4px)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}

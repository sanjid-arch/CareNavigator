import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Canonical CareNavigator M3 Palette ("The Sanctuary of Clinical Clarity")
        primary: {
          DEFAULT: '#00646f',
          container: '#087f8c',
          fixed: '#9df0fb',
          'fixed-dim': '#80d4df',
        },
        'primary-container': '#087f8c',
        'on-primary': '#ffffff',
        'on-primary-container': '#f3feff',
        'primary-fixed': '#9df0fb',
        'primary-fixed-dim': '#80d4df',
        'on-primary-fixed': '#001f24',
        'on-primary-fixed-variant': '#004f57',

        // Secondary (Medical Trust Blue — normalized across all variants)
        secondary: {
          DEFAULT: '#2060a3',
          container: '#d4e3ff',
          fixed: '#d4e3ff',
          'fixed-dim': '#a4c9ff',
        },
        'secondary-container': '#d4e3ff',
        'on-secondary': '#ffffff',
        'on-secondary-container': '#001c3a',
        'secondary-fixed': '#d4e3ff',
        'secondary-fixed-dim': '#a4c9ff',
        'on-secondary-fixed': '#001c3a',
        'on-secondary-fixed-variant': '#004786',

        // Tertiary (Calm Cyan/Teal Accent)
        tertiary: {
          DEFAULT: '#006970',
          container: '#74f5ff',
          fixed: '#8cf2fa',
          'fixed-dim': '#6fd6de',
        },
        'tertiary-container': '#74f5ff',
        'on-tertiary': '#ffffff',
        'on-tertiary-container': '#002022',
        'tertiary-fixed': '#8cf2fa',
        'tertiary-fixed-dim': '#6fd6de',
        'on-tertiary-fixed': '#002022',
        'on-tertiary-fixed-variant': '#004f55',

        // Tonal Surfaces (No-Line Layering)
        background: '#f6f9ff',
        'on-background': '#091d2b',
        surface: {
          DEFAULT: '#f6f9ff',
          bright: '#f8f9ff',
          dim: '#cfdbf0',
          tint: '#006874',
          variant: '#d6e3ff',
        },
        'surface-bright': '#f8f9ff',
        'surface-dim': '#cfdbf0',
        'surface-tint': '#006874',
        'surface-variant': '#d6e3ff',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#ecf5ff',
        'surface-container': '#e5eeff',
        'surface-container-high': '#dde9ff',
        'surface-container-highest': '#d6e3ff',
        'inverse-surface': '#16324f',
        'inverse-on-surface': '#eef4ff',
        'inverse-primary': '#80d4df',

        // Typography & Outlines
        'on-surface': '#091d2b',
        'on-surface-variant': '#3f484a',
        outline: '#6f797b',
        'outline-variant': '#bec8ca',

        // Error & Emergency
        error: {
          DEFAULT: '#ba1a1a',
          container: '#ffdad6',
        },
        'error-container': '#ffdad6',
        'on-error': '#ffffff',
        'on-error-container': '#410002',

        // Semantic Clinical Acuity Tokens
        acuity: {
          selfcare: {
            DEFAULT: '#21865b',
            bg: '#dcfce7',
            text: '#14532d',
            border: '#86efac',
          },
          routine: {
            DEFAULT: '#2060a3',
            bg: '#dbeafe',
            text: '#1e3a8a',
            border: '#93c5fd',
          },
          urgent: {
            DEFAULT: '#b7791f',
            bg: '#fef3c7',
            text: '#78350f',
            border: '#fcd34d',
          },
          emergency: {
            DEFAULT: '#ba1a1a',
            bg: '#fee2e2',
            text: '#7f1d1d',
            border: '#fca5a5',
          },
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        headline: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        'headline-xl': ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        'headline-xl-mobile': ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        'headline-lg': ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        'headline-lg-mobile': ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        'headline-md': ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        'headline-sm': ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        'body-lg': ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        'body-md': ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        'body-sm': ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        label: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        'label-lg': ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        'label-md': ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        'label-sm': ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        display: ['2.25rem', { lineHeight: '1.2', fontWeight: '700', letterSpacing: '-0.02em' }],
        'headline-xl': ['2.25rem', { lineHeight: '1.2', fontWeight: '700', letterSpacing: '-0.02em' }],
        'headline-xl-mobile': ['1.75rem', { lineHeight: '1.25', fontWeight: '700', letterSpacing: '-0.015em' }],
        'headline-lg': ['1.75rem', { lineHeight: '1.25', fontWeight: '600', letterSpacing: '-0.015em' }],
        'headline-lg-mobile': ['1.375rem', { lineHeight: '1.3', fontWeight: '600', letterSpacing: '-0.01em' }],
        'headline-md': ['1.375rem', { lineHeight: '1.3', fontWeight: '600', letterSpacing: '-0.01em' }],
        'headline-sm': ['1.0rem', { lineHeight: '1.4', fontWeight: '600' }],
        'title-md': ['1.0rem', { lineHeight: '1.4', fontWeight: '600' }],
        'body-lg': ['1.0rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-md': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
        'body-sm': ['0.75rem', { lineHeight: '1.4', fontWeight: '500' }],
        'label-lg': ['0.875rem', { lineHeight: '1.25rem', fontWeight: '600', letterSpacing: '0.01em' }],
        'label-md': ['0.75rem', { lineHeight: '1rem', fontWeight: '600', letterSpacing: '0.02em' }],
        'label-sm': ['0.6875rem', { lineHeight: '0.875rem', fontWeight: '600', letterSpacing: '0.04em' }],
      },
      spacing: {
        'space-xs': '0.25rem',
        'space-sm': '0.5rem',
        'space-md': '1rem',
        'space-lg': '1.5rem',
        'space-xl': '2rem',
        gutter: '1.5rem',
        'gutter-sm': '1rem',
        'gutter-mobile': '1rem',
        margin: '2rem',
        'margin-mobile': '1rem',
      },
      boxShadow: {
        xs: '0 1px 2px 0 rgba(9, 29, 43, 0.04)',
        ambient: '0 10px 30px -5px rgba(9, 29, 43, 0.04), 0 4px 12px -2px rgba(0, 100, 111, 0.03)',
        'ambient-lg': '0 16px 40px -8px rgba(9, 29, 43, 0.08), 0 6px 16px -4px rgba(0, 100, 111, 0.05)',
        glass: '0 4px 20px -2px rgba(9, 29, 43, 0.05)',
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(135deg, #00646f 0%, #087f8c 100%)',
        'emergency-gradient': 'linear-gradient(135deg, #ba1a1a 0%, #991b1b 100%)',
      },
    },
  },
  plugins: [],
};

export default config;

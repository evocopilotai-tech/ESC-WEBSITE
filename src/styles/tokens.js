/**
 * EvoCopilot Student Chapter — Design Tokens
 * Editorial Technology Design System
 */

export const tokens = {
  colors: {
    // Canvas & Surfaces
    canvas: '#FCFBF8', // Warm white base background
    surface: '#F6F4EF', // Subtle card / panel warm fill
    surfaceElevated: '#FFFFFF', // Crisp elevated container
    surfaceMuted: '#EFECE5', // Inactive / pressed state

    // Inks & Typography
    inkPrimary: '#202020', // Near-black primary text
    inkSecondary: '#595650', // Medium contrast editorial subtext
    inkMuted: '#8E8A82', // Captions, labels, indices
    inkDisabled: '#BDB9B0', // Placeholder

    // Borders & Dividers
    borderEditorial: '#E9E5DF', // 1px subtle editorial hairline
    borderStrong: '#DCD7CE', // Focused / defined borders
    borderSubtle: '#F2EFEB', // Micro-separators

    // Brand Accents (Monochrome)
    accentPrimary: '#111111', // Monochrome primary accent
    accentAmber: '#333333', // Deep charcoal
    accentCrimson: '#000000', // Pure black
    accentMuted: 'rgba(0, 0, 0, 0.05)', // Tinted badge background
    accentBorder: 'rgba(0, 0, 0, 0.15)', // Subtle hairline
  },

  typography: {
    fonts: {
      sans: "'Space Grotesk', system-ui, -apple-system, sans-serif",
      serif: "'Instrument Serif', Georgia, serif",
      mono: "ui-monospace, 'SFMono-Regular', Menlo, Monaco, Consolas, monospace",
    },
    sizes: {
      xs: '0.75rem', // 12px
      sm: '0.875rem', // 14px
      base: '1rem', // 16px
      lg: '1.125rem', // 18px
      xl: '1.25rem', // 20px
      '2xl': '1.5rem', // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem', // 48px
      '6xl': '3.75rem', // 60px
      display: '4.5rem', // 72px
    },
    weights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeights: {
      tight: 1.1,
      snug: 1.25,
      normal: 1.5,
      relaxed: 1.7,
    },
    letterSpacings: {
      tighter: '-0.04em',
      tight: '-0.02em',
      normal: '0em',
      wide: '0.04em',
      wider: '0.08em',
      widest: '0.12em',
    },
  },

  layout: {
    maxWidth: '1280px',
    maxWidthNarrow: '960px',
    maxWidthWide: '1440px',
    gutter: {
      mobile: '1rem',
      tablet: '1.5rem',
      desktop: '2rem',
    },
    navHeight: '74px',
    mastheadHeight: '34px',
  },

  spacing: {
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    32: '8rem',
  },

  borders: {
    editorialHairline: '1px solid #E9E5DF',
    editorialStrong: '1px solid #DCD7CE',
    radius: {
      none: '0px',
      xs: '2px',
      sm: '4px',
      md: '8px',
      lg: '12px',
      pill: '9999px',
    },
  },

  animation: {
    timing: {
      fast: '150ms',
      normal: '250ms',
      editorial: '400ms',
      deliberate: '600ms',
    },
    easing: {
      editorial: 'cubic-bezier(0.16, 1, 0.3, 1)',
      smooth: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      anticipate: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    },
  },
};

export default tokens;

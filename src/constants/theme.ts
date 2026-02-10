export const colors = {
  background: '#0d0d0d',
  backgroundGradientStart: '#0d0d0d',
  backgroundGradientEnd: '#1a1a1a',
  surface: '#161616',
  surfaceLight: '#1f1f1f',
  surfaceHover: '#242424',
  accent: '#c9a86c',
  accentLight: '#d4b87a',
  accentDark: '#a88b52',
  text: '#ffffff',
  textSecondary: '#c5c5c5',
  textMuted: '#8a8a8a',
  border: '#2a2a2a',
  borderLight: '#333333',
  success: '#4caf50',
  error: '#f44336',
  overlay: 'rgba(0, 0, 0, 0.6)',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const typography = {
  title: {
    fontSize: 32,
    fontWeight: '700' as const,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600' as const,
    letterSpacing: 1,
  },
  heading: {
    fontSize: 18,
    fontWeight: '600' as const,
  },
  body: {
    fontSize: 14,
    fontWeight: '400' as const,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400' as const,
  },
  price: {
    fontSize: 16,
    fontWeight: '700' as const,
  },
};

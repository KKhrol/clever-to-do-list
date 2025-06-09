import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#FF5C35',
      light: '#FF8A65',
      dark: '#E64A19',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FFB800',
      light: '#FFD54F',
      dark: '#FFA000',
      contrastText: '#000000',
    },
    neutral: {
      main: '#64748B',
      light: '#F8FAFC',
      dark: '#1E293B',
    },
    text: {
      primary: '#2D3748',
      secondary: '#718096',
    },
    background: {
      default: '#F5F7FA',
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: "'Open Sans', sans-serif",
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontSize: '28px',
      fontWeight: 600,
    },
    h2: {
      fontSize: '24px',
      fontWeight: 600,
    },
    h3: {
      fontSize: '20px',
      fontWeight: 600,
    },
    h4: {
      fontSize: '18px',
      fontWeight: 600,
    },
    h5: {
      fontSize: '16px',
      fontWeight: 600,
    },
    h6: {
      fontSize: '14px',
      fontWeight: 600,
    },
    body1: {
      fontSize: '16px',
      fontWeight: 400,
    },
    body2: {
      fontSize: '14px',
      fontWeight: 400,
    },
    button: {
      fontSize: '14px',
      fontWeight: 600,
      textTransform: 'none' as const,
    },
    xl: {
      fontSize: '28px',
      fontWeight: 600,
    },
    lg: {
      fontSize: '24px',
      fontWeight: 600,
    },
    md: {
      fontSize: '16px',
      fontWeight: 400,
    },
    sm: {
      fontSize: '14px',
      fontWeight: 400,
    },
    xs: {
      fontSize: '12px',
      fontWeight: 400,
    },
  },
  spacing: (factor: number) => `${8 * factor}px`,
  shape: {
    borderRadius: 4,
  },
  zIndex: {
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(0,0,0,0.12)',
    '0px 2px 4px rgba(0,0,0,0.12)',
    '0px 2px 4px rgba(0,0,0,0.12)',
    '0px 2px 4px rgba(0,0,0,0.12)',
    '0px 2px 4px rgba(0,0,0,0.12)',
    '0px 2px 4px rgba(0,0,0,0.12)',
    '0px 2px 4px rgba(0,0,0,0.12)',
    '0px 2px 4px rgba(0,0,0,0.12)',
    '0px 2px 4px rgba(0,0,0,0.12)',
    '0px 2px 4px rgba(0,0,0,0.12)',
    '0px 2px 4px rgba(0,0,0,0.12)',
    '0px 2px 4px rgba(0,0,0,0.12)',
    '0px 2px 4px rgba(0,0,0,0.12)',
    '0px 2px 4px rgba(0,0,0,0.12)',
    '0px 2px 4px rgba(0,0,0,0.12)',
    '0px 2px 4px rgba(0,0,0,0.12)',
    '0px 2px 4px rgba(0,0,0,0.12)',
    '0px 2px 4px rgba(0,0,0,0.12)',
    '0px 2px 4px rgba(0,0,0,0.12)',
    '0px 2px 4px rgba(0,0,0,0.12)',
    '0px 2px 4px rgba(0,0,0,0.12)',
    '0px 2px 4px rgba(0,0,0,0.12)',
    '0px 2px 4px rgba(0,0,0,0.12)',
    '0px 2px 4px rgba(0,0,0,0.12)',
  ] as const,
});

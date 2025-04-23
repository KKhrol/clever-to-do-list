import type { PaletteMode } from '@mui/material';
import { type ThemeOptions, createTheme } from '@mui/material';

import { FontSizes } from './constants';

declare module '@mui/material/styles' {
  interface Palette {
    neutral: {
      main: string;
      light: string;
      dark: string;
    };
  }
  interface PaletteOptions {
    neutral: {
      main: string;
      light: string;
      dark: string;
    };
  }
  interface TypographyVariants {
    xl: React.CSSProperties;
    lg: React.CSSProperties;
    md: React.CSSProperties;
    sm: React.CSSProperties;
    xs: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    xl?: React.CSSProperties;
    lg?: React.CSSProperties;
    md?: React.CSSProperties;
    sm?: React.CSSProperties;
    xs?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    xl: true;
    lg: true;
    md: true;
    sm: true;
    xs: true;
  }
}

const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: {
            main: '#FF5C35',
            light: '#FF8A65',
            dark: '#E64A19',
          },
          secondary: {
            main: '#FFB800',
            light: '#FFD54F',
            dark: '#FFA000',
          },
          neutral: {
            main: '#64748B',
            light: '#F8FAFC',
            dark: '#1E293B',
          },
          background: {
            default: '#F5F7FA',
            paper: '#FFFFFF',
          },
          text: {
            primary: '#2D3748',
            secondary: '#718096',
          },
          success: {
            main: '#34D399',
            light: '#6EE7B7',
            dark: '#059669',
          },
        }
      : {
          primary: {
            main: '#FF5C35',
            light: '#FF8A65',
            dark: '#E64A19',
          },
          secondary: {
            main: '#FFB800',
            light: '#FFD54F',
            dark: '#FFA000',
          },
          neutral: {
            main: '#9BA3AF',
            light: '#1E293B',
            dark: '#F8FAFC',
          },
          background: {
            default: '#0A1929',
            paper: '#1E293B',
          },
          text: {
            primary: '#F8FAFC',
            secondary: '#9BA3AF',
          },
          success: {
            main: '#34D399',
            light: '#6EE7B7',
            dark: '#059669',
          },
        }),
  },
  typography: {
    fontFamily: "'Open Sans', sans-serif",
    xl: {
      fontSize: FontSizes.xl,
      fontWeight: 600,
    },
    lg: {
      fontSize: FontSizes.lg,
      fontWeight: 600,
    },
    md: {
      fontSize: FontSizes.md,
      fontWeight: 400,
    },
    sm: {
      fontSize: FontSizes.sm,
      fontWeight: 400,
    },
    xs: {
      fontSize: FontSizes.xs,
      fontWeight: 400,
    },
    h1: {
      fontSize: FontSizes.xl,
      fontWeight: 600,
    },
    h2: {
      fontSize: FontSizes.lg,
      fontWeight: 600,
    },
    button: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            '&:hover fieldset': {
              borderColor: '#00A0F3',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#00A0F3',
            },
          },
          '& .MuiInputLabel-root': {
            '&.Mui-focused': {
              color: '#00A0F3',
            },
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#00A0F3',
          textDecorationColor: '#00A0F3',
          '&:hover': {
            color: '#0081C2',
            textDecorationColor: '#0081C2',
          },
        },
      },
    },
  },
});

export const createAppTheme = (mode: PaletteMode) => {
  return createTheme(getDesignTokens(mode));
};

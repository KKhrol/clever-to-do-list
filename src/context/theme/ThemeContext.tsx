import type { PaletteMode } from '@mui/material';
import { ThemeProvider } from '@mui/material';
import { createAppTheme } from '@theme';
import { createContext, useContext, useMemo, useState } from 'react';
import { ThemeVariants } from 'src/theme/constants';

interface ThemeContextType {
  mode: PaletteMode;
  toggleColorMode: () => void;
}

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export const ThemeProviderWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [mode, setMode] = useState<PaletteMode>('light');

  const colorMode = useMemo(
    () => ({
      mode,
      toggleColorMode: () => {
        setMode(prevMode =>
          prevMode === ThemeVariants.LIGHT
            ? ThemeVariants.DARK
            : ThemeVariants.LIGHT,
        );
      },
    }),
    [mode],
  );

  const theme = useMemo(() => createAppTheme(mode), [mode]);

  return (
    <ThemeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

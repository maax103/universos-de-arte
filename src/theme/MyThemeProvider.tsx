import React, { FC, useEffect, useMemo, useState, createContext } from 'react';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { DarkTheme, LightTheme } from './MyTheme';

interface IMyThemeProvider {
  children: JSX.Element | JSX.Element[];
}

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const MyThemeProvider: FC<IMyThemeProvider> = ({ children }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          prevMode === 'light' ? localStorage.setItem('mode', 'dark') : localStorage.setItem('mode', 'light');
          return prevMode === 'light' ? 'dark' : 'light';
        });
      },
    }),
    [],
  );

  const lightTheme = useMemo(
    () =>
      createTheme(
        Object.assign(LightTheme, {
          palette: {
            ...LightTheme.palette,
            mode,
          },
        }),
      ),
    [mode],
  );

  const darkTheme = useMemo(
    () =>
      createTheme({
        ...DarkTheme,
        palette: {
          ...DarkTheme.palette,
          mode,
        },
      }),
    [mode],
  );

  useEffect(() => {
    const existingPreference = localStorage.getItem('mode');
    if (existingPreference) {
      existingPreference === 'light' ? setMode('light') : setMode('dark');
    } else {
      setMode('light');
      localStorage.setItem('mode', 'light');
    }
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={mode === 'light' ? lightTheme : darkTheme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export const useIsLightModeOn = () => {
  const lightModeOn = 'light' === useTheme().palette.mode;
  return lightModeOn;
};

// function Exemple of use() {
//     const theme = useTheme();
//     const colorMode = useContext(ColorModeContext);

//     <IconButton onClick={colorMode.toggleColorMode} color="inherit">
//         {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
//     </IconButton>
// }

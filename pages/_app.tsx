import '../styles/globals.css';
import type { AppContext, AppProps } from 'next/app';
import { CssBaseline, ThemeProvider, Theme } from '@mui/material';
import { darkTheme, lightTheme, customTheme } from '../themes';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

interface Props extends AppProps {
  theme: string;
}
function MyApp({ Component, pageProps, theme = 'dark' }: Props) {
  const [currentTheme, setCurrentTheme] = useState(lightTheme);

  useEffect(() => {
    const cookieTheme = Cookies.get('theme') || 'light';
    const selectedTheme: Theme =
      cookieTheme === 'light'
        ? lightTheme
        : cookieTheme === 'dark'
        ? darkTheme
        : customTheme;
    setCurrentTheme(selectedTheme);
  }, []);

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

// MyApp.getInitialProps = async (appContext: AppContext) => {
//   const { theme } = appContext.ctx.req
//     ? (appContext.ctx.req as any).cookies
//     : { theme: 'light' };

//   const validThemes = ['light', 'dark', 'custom'];
//   return {
//     theme: validThemes.includes(theme) ? theme : 'light',
//   };
// };
export default MyApp;

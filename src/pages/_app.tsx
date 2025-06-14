import '../styles/global.css';
import { ThemeProvider } from 'styled-components';
import Sidebar from '@/components/Sidebar';
import ChatAssistant from '@/components/ChatAssistant';

const theme = {};

import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Sidebar />
      
      <ChatAssistant />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;

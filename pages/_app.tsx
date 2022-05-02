import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AnimatePresence } from 'framer-motion';
import { SessionProvider } from '@/components/Session';
import { ThemeProvider } from 'next-themes';

declare const window: any;

function MyApp({ Component, pageProps, router }: AppProps) {
  const url = `https://landrae.dev${router.route}`;

  return (
    <SessionProvider>
      <AnimatePresence
        exitBeforeEnter
        initial={false}
        onExitComplete={() => window.scrollTo(0, 0)}
      >
        <ThemeProvider attribute="class">
          <Component {...pageProps} canonical={url} key={url} />
        </ThemeProvider>
      </AnimatePresence>
    </SessionProvider>
  );
}

export default MyApp;

import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider as Lyket } from "@lyket/react";
import { AnimatePresence } from "framer-motion";

declare const window: any;

function MyApp({ Component, pageProps, router }: AppProps) {
  const url = `https://landrae.dev${router.route}`;

  return (
    <Lyket apiKey="pt_092639025d902fdad5bc16fbd39d16">
      <AnimatePresence
        exitBeforeEnter
        initial={false}
        onExitComplete={() => window.scrollTo(0, 0)}
      >
        <Component {...pageProps} key={url} />
      </AnimatePresence>
    </Lyket>
  );
}

export default MyApp;

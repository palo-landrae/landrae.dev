import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider as Lyket } from "@lyket/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Lyket apiKey="pt_092639025d902fdad5bc16fbd39d16">
      <Component {...pageProps} />
    </Lyket>
  );
}

export default MyApp;

import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import Fonts from '@/components/Fonts';

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="preload"
            href="/fonts/work-sans-v16-latin-regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
        </Head>
        <Fonts />
        <body className="bg-dawn dark:bg-midnight text-midnight dark:text-dawn font-worksans scrollbar scrollbar-light dark:scrollbar-dark">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import Fonts from "@/components/fonts";

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Fonts />
        <Head />
        <body className="bg-dawn dark:bg-midnight text-midnight dark:text-dawn font-worksans scrollbar scrollbar-light dark:scrollbar-dark">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

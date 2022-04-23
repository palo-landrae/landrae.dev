import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import Fonts from "@/components/fonts";

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Fonts />
        <Head />
        <body className="dark:bg-zinc-900 dark:text-stone-100 font-mplusrounded scrollbar">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

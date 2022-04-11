import NextDocument, { Html, Head, Main, NextScript } from "next/document";

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body className="bg-zinc-900 text-stone-100">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

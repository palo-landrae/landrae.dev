import Head from "next/head";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { Spacer } from "./spacer";

export const Layout = ({ children, title }) => {
  const customTitle = `${title} - Palo Landrae`;
  return (
    <>
      <Head>
        <title>{customTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex flex-col">{children}</div>
        <Spacer />
        <Footer />
      </div>
    </>
  );
};

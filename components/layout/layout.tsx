import React from "react";
import Head from "next/head";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { Spacer } from "./spacer";

type LayoutProps = {
  children: React.ReactNode;
  title: string;
};

export const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  const customTitle = `${title} - Landrae`;
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Landrae's personal webpage" />
        <meta name="author" content="Loui Andrae Palo" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <title>{customTitle}</title>
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

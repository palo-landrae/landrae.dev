import React from "react";
import Head from "next/head";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { Spacer } from "./spacer";

type LayoutProps = {
  children: React.ReactNode;
  title: string;
  description: string;
};

export const Layout: React.FC<LayoutProps> = ({
  children,
  title,
  description,
}) => {
  const customTitle = `${title} - Landrae`;
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={description} />
        <meta name="author" content="Loui Andrae Palo" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <title>{customTitle}</title>
      </Head>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex flex-col max-w-3xl w-full mx-auto pt-8">
          {children}
        </div>
        <Spacer />
        <Footer />
      </div>
    </>
  );
};

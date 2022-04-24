import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { Spacer } from "./spacer";
import { motion } from "framer-motion";

type LayoutProps = {
  children: React.ReactNode;
  title: string;
  description: string;
};


const variants = {
  hidden: { opacity: 0, x: -20, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 20, y: 0 },
};

export const Layout: React.FC<LayoutProps> = ({
  children,
  title,
  description,
}) => {
  const customTitle = `${title} - Landrae`;

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true)
    };
  }, [])

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
        <main>
          <motion.main
            initial="hidden"
            animate="enter"
            exit="exit"
            variants={!isMobile && variants}
            transition={{ type: "linear" }}
            className="flex flex-col max-w-3xl w-full mx-auto pt-4"
          >
            {children}
          </motion.main>
        </main>
        <Spacer />
        <Footer />
      </div>
    </>
  );
};

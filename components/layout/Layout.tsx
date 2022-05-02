import React from 'react';
import Head from 'next/head';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Spacer } from './Spacer';
import { motion } from 'framer-motion';

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

  const attributes = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 30 },
    transition: { type: 'linear' },
  };

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
        <motion.main
          className="flex flex-col max-w-3xl w-full mx-auto pt-4"
          {...attributes}
        >
          {children}
        </motion.main>
        <Spacer />
        <Footer />
      </div>
    </>
  );
};

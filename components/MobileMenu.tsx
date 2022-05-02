import React, { useState, useEffect } from 'react';
import { HamburgerIcon, XMarkIcon } from '@/components/Icons';
import { motion } from 'framer-motion';

const MobileMenu: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      document.body.style.overflow = '';
    } else {
      setIsMenuOpen(true);
      document.body.style.overflow = 'hidden';
    }
  };

  const links = [
    { name: 'Home', href: '/', target: '_self' },
    { name: 'Projects', href: '/projects', target: '_self' },
    { name: 'Blog', href: '/blog', target: '_self' },
    {
      name: 'GitHub',
      href: 'https://github.com/palo-landrae',
      target: '_blank',
    },
    {
      name: 'Youtube',
      href: 'https://youtube.com/c/Landrae',
      target: '_blank',
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/landrae_dev',
      target: '_blank',
    },
  ];

  const menuVariants = {
    open: { opacity: 1, x: 0 },
    close: { opacity: 0, x: '-100%' },
  };

  useEffect(() => {
    return function cleanup() {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <>
      <button
        onClick={toggleMenu}
        className="z-50 w-10 h-10 relative md:hidden flex rounded-lg items-center justify-center  hover:ring-2 ring-gray-300  transition-all"
      >
        {!isMenuOpen ? <HamburgerIcon /> : <XMarkIcon />}
      </button>
      {isMenuOpen && (
        <motion.nav
          animate={isMenuOpen ? 'open' : 'closed'}
          variants={menuVariants}
          transition={{ duration: 0.5 }}
        >
          <motion.div className="flex flex-col bg-dawn dark:bg-midnight top-0 left-0 z-40 absolute h-screen w-80 px-12 py-16">
            {links.map(({ name, href, target }) => (
              <motion.a
                key={name}
                href={href}
                target={target}
                whileHover={{ scale: 1.1 }}
                className="p-2 border-b border-zinc-500"
              >
                <span className="text-md">{name}</span>
              </motion.a>
            ))}
          </motion.div>
          <motion.div className="absolute z-30 h-screen w-screen bg-midnight top-0 left-0 opacity-30"></motion.div>
        </motion.nav>
      )}
    </>
  );
};

export default MobileMenu;

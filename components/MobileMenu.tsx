import React, { useState, useEffect } from 'react';
import { HamburgerIcon, XMarkIcon } from '@/components/icons';
import { motion } from 'framer-motion';

const MobileMenu: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      document.body.style.overflow = "";
    } else {
      setIsMenuOpen(true);
      document.body.style.overflow = 'hidden';
    }
  }

  const links = [
    { name: "Home", to: "/", id: 1 },
    { name: "Projects", to: "/projects", id: 2 },
    { name: "Blog", to: "/blog", id: 3 },
  ];

  const navVariants = {
    open: { opacity: 1, x: 0 },
    close: { opacity: 0, x: "-100%" }
  }


  useEffect(() => {
    return function cleanup() {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <>
      <button onClick={toggleMenu} className="z-50 relative md:hidden inline-block">
        {!isMenuOpen ? <HamburgerIcon /> : <XMarkIcon />}
      </button>
      {isMenuOpen &&
        <motion.nav
          animate={isMenuOpen ? "open" : 'closed'}
          variants={navVariants}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="flex flex-col bg-dawn dark:bg-midnight top-0 left-0 z-40 absolute h-screen w-80 px-7 py-10"
          >
            {links.map(({ name, to, id }) => (
              <motion.a
                key={id}
                href={to}
                whileHover={{ scale: 1.1 }}
                className="mx-6 my-1 p-4"
              >
                {name}
              </motion.a>
            ))}
          </motion.div>
          <motion.div className="absolute z-30 h-screen w-screen bg-midnight top-0 left-0 opacity-30"></motion.div>
        </motion.nav>
      }
    </>
  );
}

export default MobileMenu;

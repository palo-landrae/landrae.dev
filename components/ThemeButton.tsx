import React from 'react';
import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from '@/components/Icons';
import { AnimatePresence, motion } from 'framer-motion';

const ThemeButton: React.FC = () => {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <button
      aria-label="Toggle Dark Mode"
      type="button"
      className="w-10 h-10 text-zinc-700 bg-gray-200 dark:bg-orange-200 rounded-lg flex items-center justify-center  hover:ring-2 ring-gray-300  transition-all"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      <AnimatePresence exitBeforeEnter initial={false}>
        <motion.div
          style={{ display: 'inline-block' }}
          key={resolvedTheme}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <SunIcon />
          <MoonIcon />
        </motion.div>
      </AnimatePresence>
    </button>
  );
};

export default ThemeButton;

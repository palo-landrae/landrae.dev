import React from 'react';
import NextLink from 'next/link';
import NowPlaying from '@/components/NowPlaying';

const ExternalLink = ({ href, children }) => (
  <a
    className="text-gray-500 hover:text-gray-600 transition"
    target="_blank"
    rel="noopener noreferrer"
    href={href}
  >
    {children}
  </a>
);

export const Footer: React.FC = () => {
  return (
    <footer className="flex flex-col w-full max-w-3xl justify-center mx-auto mt-6 p-6">
      <hr className="w-full border-1 border-zinc-200 dark:border-zinc-800 mb-8" />
      <NowPlaying />
      <div className="w-full max-w-3xl grid grid-cols-1 gap-4 pb-12 sm:grid-cols-3">
        <div className="flex flex-col space-y-4">
          <h4>Landrae.dev</h4>
          <NextLink href="/">
            <a className="text-zinc-500 hover:text-zinc-600 transition">Home</a>
          </NextLink>
          <NextLink href="/projects">
            <a className="text-zinc-500 hover:text-zinc-600 transition">
              Projects
            </a>
          </NextLink>
          <NextLink href="/blog">
            <a className="text-zinc-500 hover:text-zinc-600 transition">Blog</a>
          </NextLink>
        </div>
        <div className="flex flex-col space-y-4">
          <h4>Socials</h4>
          <ExternalLink href="https://github.com/palo-landrae/">
            Github
          </ExternalLink>
          <ExternalLink href="https://youtube.com/c/Landrae">
            Youtube
          </ExternalLink>
          <ExternalLink href="https://www.instagram.com/landrae_dev">
            Instagram
          </ExternalLink>
        </div>
      </div>
    </footer>
  );
};

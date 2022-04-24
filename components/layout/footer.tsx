import React from "react";
import { Socials } from "@/components/icons";
import NowPlaying from '@/components/NowPlaying'

export const Footer: React.FC = () => {
  return (
    <footer className="flex flex-col w-full max-w-3xl justify-center mx-auto mt-6 p-6">
      <hr className="w-full border-1 border-zinc-200 dark:border-zinc-800 mb-8" />
      <NowPlaying />
      <div className="flex flex-col-reverse md:flex-row py-4 align-center justify-center">
        <span className="mr-4">© 2022 palo-landrae. All rights reserved</span>
        <Socials />
      </div>
    </footer>
  );
};

import React from "react";
import {
  Github,
  IconButton,
  InstagramIcon,
  YoutubeIcon,
} from "@/components/icons";

export const Footer: React.FC = () => {
  return (
    <footer className="flex flex-col-reverse md:flex-row max-width-3xl mx-auto py-4 align-center justify-center">
      <span className="mx-4">© 2022 palo-landrae. All rights reserved</span>
      <div className="flex space-x-3 mx-auto">
        <IconButton href="https://github.com/palo-landrae">
          <Github />
        </IconButton>
        <IconButton href="https://www.youtube.com/c/Landrae">
          <YoutubeIcon />
        </IconButton>
        <IconButton href="https://www.instagram.com/landrae_dev/">
          <InstagramIcon />
        </IconButton>
      </div>
    </footer>
  );
};

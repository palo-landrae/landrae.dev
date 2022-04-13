import React from "react";
import { Socials } from "@/components/icons";

export const Footer: React.FC = () => {
  return (
    <footer className="flex flex-col-reverse md:flex-row max-width-3xl mx-auto py-4 align-center justify-center">
      <span className="mx-4">© 2022 palo-landrae. All rights reserved</span>
      <Socials />
    </footer>
  );
};

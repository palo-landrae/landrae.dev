import NextLink from "next/link";
import { useRouter } from "next/router";
import { isActiveLink } from "@/lib/utils";
import ThemeButton from "../theme-button";
import { Spacer } from "./spacer";

export const Navbar = (): JSX.Element => {
  const router = useRouter();
  const links = [
    {
      href: "/",
      name: "Home",
    },
    {
      href: "/projects",
      name: "Projects",
    },
    {
      href: "/blog",
      name: "Blog",
    },
  ];
  return (
    <nav>
      <div className="flex max-w-3xl mx-auto p-6 font-mplusrounded">
        <NextLink href="/">
          <a className="py-2 inline-block">Landrae</a>
        </NextLink>
        <Spacer />
        {links.map(({ name, href }) => (
          <NextLink key={href} href={href}>
            <a
              className={`${isActiveLink(href, router.pathname)
                  ? "font-semibold"
                  : "font-normal"
                } flex flex-col mr-1 md:mr-2 md:mx-3 inline-block p-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all`}
            >
              {name}
            </a>
          </NextLink>
        ))}
        <ThemeButton />
      </div>
    </nav>
  );
};

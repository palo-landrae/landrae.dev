import Link from "next/link";
import { Spacer } from "./spacer";
import { useRouter } from "next/router";
import { isActiveLink } from "@/lib/utils";

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
      <div className="flex max-w-3xl mx-auto py-4 px-6 font-mplusrounded font-normal">
        <Link href="/">
          <a className="text-lg">Landrae</a>
        </Link>
        <Spacer />
        {links.map(({ name, href }) => (
          <Link key={href} href={href}>
            <a
              className={`${isActiveLink(href, router.pathname) ? "border-b-2" : ""
                } flex flex-col mx-2 sm:mx-4 relative`}
            >
              {name}
            </a>
          </Link>
        ))}
      </div>
    </nav>
  );
};

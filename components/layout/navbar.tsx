import Link from "next/link";
import { Spacer } from "./spacer";
import { useRouter } from "next/router";

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
        <span className="text-lg">Landrae</span>
        <Spacer />
        {links.map(({ name, href }) => (
          <Link key={href} href={href}>
            <a
              className={`${router.pathname == href ? "border-b-2" : ""
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

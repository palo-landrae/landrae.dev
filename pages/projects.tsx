import type { GetStaticProps, NextPage } from "next";
import { Layout } from "@/components/layout";
import { IProject } from "@/interfaces/IProject";
import Image from "next/image";

const projects = [
  {
    title: "Cycle Path Finder",
    description: "First app",
    img_url: "/images/cycle-path-finder.png",
    demo: "https://",
    git: "https://github.com/palo-landrae/cycle-path-finder.git",
  },
];

interface IProps {
  projects: IProject[];
}

const Projects: NextPage<IProps> = ({ projects }) => {
  return (
    <Layout title="Projects" description="Landrae's Projects">
      {projects &&
        projects.map((project) => {
          return (
            <>
              <p>{project.title}</p>
              <div className="mx-auto w-full max-w-xl block">
                <Image
                  className="rounded-lg"
                  src={project.img_url}
                  layout="responsive"
                  width={300}
                  height={200}
                />
              </div>
            </>
          );
        })}
    </Layout>
  );
};

export default Projects;

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      projects: JSON.parse(JSON.stringify(projects)),
    },
  };
};

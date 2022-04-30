import type { GetStaticProps, NextPage } from 'next';
import { Layout } from '@/components/layout';
import { Project } from '@/lib/types';
import Image from 'next/image';

const projects = [
  {
    title: 'Cycle Path Finder',
    description: 'First app',
    img_url: '/images/cycle-path-finder.png',
    demo: 'https://',
    git: 'https://github.com/palo-landrae/cycle-path-finder.git',
  },
];

interface IProps {
  projects: Project[];
}

const Projects: NextPage<IProps> = ({ projects }) => {
  return (
    <Layout title="Projects" description="Landrae's Projects">
      <div className="p-6">
        <h1 className="text-4xl">Projects</h1>
        {projects &&
          projects.map((project) => {
            return (
              <div key={project.title}>
                <p>{project.title}</p>
                <div className="mx-auto w-full max-w-xl block">
                  <Image
                    alt={`${project.title} project image`}
                    className="rounded-lg"
                    src={project.img_url}
                    layout="responsive"
                    width={300}
                    height={200}
                  />
                </div>
              </div>
            );
          })}
      </div>
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

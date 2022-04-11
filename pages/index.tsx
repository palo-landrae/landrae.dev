import type { NextPage } from "next";
import { Layout } from "@/components/layout";
import { Github, InstagramIcon, YoutubeIcon } from "@/components/icons";

const Home: NextPage = () => {
  return (
    <Layout title="Home">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Github />
      <YoutubeIcon />
      <InstagramIcon />
    </Layout>
  );
};

export default Home;

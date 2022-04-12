import type { NextPage } from "next";
import { PostProps, Post } from "@/models/blog-post";
import { prisma } from "@/lib/prisma";
import { Layout } from "@/components/layout";
import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

interface IParams extends ParsedUrlQuery {
  slug: string;
}

interface BlogPostProps {
  post: Post;
}

const BlogPost: NextPage<BlogPostProps> = ({ post }) => {
  return (
    <Layout title="Blog">
      <div>
        {post && <p>{post.title}</p>}
        <p>ciao</p>
      </div>
    </Layout>
  );
};

export default BlogPost;

export const getStaticPaths: GetStaticPaths = async () => {
  const getAllPostSlugs = await prisma.blog.findMany({
    select: {
      slug: true,
    },
  });

  const paths = getAllPostSlugs.map(({ slug }) => ({
    params: {
      slug: slug,
    },
  }));
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as IParams;
  const post = await prisma.blog.findUnique({
    where: {
      slug: slug,
    },
    select: {
      id: true,
      title: true,
      description: true,
      img: true,
      date: true,
      content: true,
      slug: true,
    },
  });
  return {
    props: {
      post: JSON.parse(JSON.stringify(post)),
    },
    revalidate: 300,
  };
};

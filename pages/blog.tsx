import type { NextPage } from "next";
import Image from "next/image";
import { GetStaticProps } from "next";
import { prisma } from "@/lib/prisma";
import { Layout } from "@/components/layout";
import { PostProps, Post } from "@/models/blog-post";
import moment from "moment";
import Link from "next/link";

const Blog: NextPage = ({ posts }: PostProps) => {
  return (
    <Layout title="Blog">
      <div className="flex flex-col max-w-3xl w-full mx-auto">
        {posts &&
          posts.map((post) => {
            return (
              <div className="p-6 w-full" key={post.slug}>
                <div className="flex flex-col-reverse md:flex-row justify-items-center md:justify-around items-start mx-auto">
                  <div className="pr-3 w-full">
                    <p className="text-sm py-1">
                      Posted on {moment(post.date).format("LL")}
                    </p>
                    <h1 className="text-xl">{post.title}</h1>
                    <p className="mb-4 h-20 line-clamp-3">{post.description}</p>
                    <Link href={`/blog/${post.slug}`}>
                      <a className="underline underline-offset-4">Read More</a>
                    </Link>
                  </div>
                  <div className="w-full h-48 relative min-w-sm">
                    <Image
                      alt="Blog post image"
                      src={post.img}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </Layout>
  );
};

export default Blog;

export const getStaticProps: GetStaticProps = async (context) => {
  const posts: Post[] = await prisma.blog.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      img: true,
      date: true,
      slug: true,
    },
  });
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
    revalidate: 300,
  };
};

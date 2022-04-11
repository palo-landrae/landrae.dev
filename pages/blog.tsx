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
              <div className="p-6 w-full">
                <div
                  key={post.slug}
                  className="flex flex-col-reverse md:flex-row justify-items-center md:justify-around items-start mx-auto"
                >
                  <div className="pr-3 w-full">
                    <p className="text-sm py-1">
                      Posted on {moment(post.date).format("LL")}
                    </p>
                    <h1 className="text-xl">{post.title}</h1>
                    <p className="mb-4 line-clamp-3">
                      Here's a block of text from a blog post that isn't
                      conveniently three lines long like you designed for
                      originally. It's probably like 6 lines on mobile or even
                      on desktop depending on how you have things laid out.
                      Truly a big pain in the derriere, and not the sort of
                      thing you expected to be wasting your time trying to deal
                      with at 4:45pm on a Friday am I right? You've got tickets
                      to SmackDown and you heard there's gonna be a dark match
                      with that local guy from two towns over that your cousin
                      went to high school with before the show starts, and
                      you're gonna miss it if you're not there early.
                    </p>
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

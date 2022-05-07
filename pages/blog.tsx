import { useState } from 'react';
import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Post } from '@/lib/types';
import { Layout } from '@/components/layout';
import { LikeButton } from '@/components/LikeButton';
import { MagnifyingGlassIcon } from '@/components/Icons';
import moment from 'moment';
import prisma from '@/lib/prisma';

const urlBuilder = ({ id, width }) => {
  return `https://res.cloudinary.com/dispfvh1a/image/upload/w_${width},q_75,f_auto,c_scale/${id}`;
};

const urlBlurBluider = ({ id, width }) => {
  return `https://res.cloudinary.com/dispfvh1a/image/upload/w_${width},e_blur,q_1,f_auto,c_scale/${id}`;
};

const Blog: NextPage = ({ posts }: { posts: Post[] }) => {
  const [searchValue, setSearchValue] = useState('');
  const filteredBlogPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchValue.toLowerCase())
  );
  return (
    <Layout title="Blog" description="Landrae.dev Blog Page">
      <div className="flex flex-col max-w-3xl w-full mx-auto p-6">
        <h1 className="text-4xl">Blog</h1>
        <p className="py-2">
          I wrote this blog in order to share my passion with you. Feel free to
          explore my personal blog and don&#39;t forget to leave a like!
        </p>
        <div className="relative w-full mb-5">
          <input
            aria-label="Search articles"
            type="text"
            onChange={(e) => setSearchValue(e.target.value)}
            className="block w-full rounded-md dark:bg-zinc-800 border dark:border-0 dark:text-zinc-200 px-4 py-2"
            placeholder="Search articles"
          />
          <div className="absolute w-5 h-5 text-gray-400 right-3 top-3 dark:text-gray-300">
            <MagnifyingGlassIcon />
          </div>
        </div>
        <h1 className="text-3xl py-2">All Posts</h1>
        {!filteredBlogPosts.length && <p className="">No posts found.</p>}
        {filteredBlogPosts.map((post) => {
          return (
            <div className="w-full" key={post.slug}>
              <div className="flex flex-col-reverse md:flex-row justify-items-center md:justify-around items-start mx-auto">
                <div className="py-2 md:py-0 md:pr-3 w-full max-w-sm md:max-w-none mx-auto">
                  <span className="text-sm mr-4">
                    Posted on {moment(post.created_at).format('LL')}
                  </span>
                  <LikeButton slug={post.slug} text={true} />
                  <h1 className="text-xl">{post.title}</h1>
                  <p className="mb-4 line-clamp-3">{post.description}</p>
                  <Link href={`/blog/${post.slug}`}>
                    <a className="underline underline-offset-4">Read More</a>
                  </Link>
                </div>
                <div className="flex justify-center md:justify-end w-full">
                  <div className="mx-auto w-full max-w-sm md:max-w-300 block">
                    <Image
                      alt="Blog post image"
                      src={urlBuilder({
                        id: post.img_thumbnail_url,
                        width: 750,
                      })}
                      placeholder="blur"
                      blurDataURL={urlBlurBluider({
                        id: post.img_thumbnail_url,
                        width: 300,
                      })}
                      unoptimized={true}
                      layout="responsive"
                      width={300}
                      height={200}
                    />
                  </div>
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

export const getStaticProps: GetStaticProps = async () => {
  const posts: Post[] = await prisma.blog.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      img_thumbnail_url: true,
      created_at: true,
      slug: true,
    },
    orderBy: {
      created_at: 'desc',
    },
  });

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  };
};

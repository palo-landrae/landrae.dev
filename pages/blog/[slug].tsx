import type { NextPage } from 'next';
import Image from 'next/image';
import { Layout } from '@/components/layout';

import { GetStaticPaths, GetStaticProps } from 'next';
import prisma from '@/lib/prisma';
import { Post } from '@/lib/types';
import { ParsedUrlQuery } from 'querystring';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { default as oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism/one-dark';

import moment from 'moment';
import { LikeButton } from '@/components/LikeButton';

interface IParams extends ParsedUrlQuery {
  slug: string;
}

const urlBuilder = ({ id, width }) => {
  return `https://res.cloudinary.com/dispfvh1a/image/upload/w_${width},q_75,f_auto,c_scale/${id}`;
};

const urlBlurBluider = ({ id, width }) => {
  return `https://res.cloudinary.com/dispfvh1a/image/upload/w_${width},e_blur,q_1,f_auto,c_scale/${id}`;
};

const BlogPost: NextPage = ({ post }: { post: Post }) => {
  return (
    <Layout title={post?.title || 'Blog'} description={post?.description}>
      {post ? (
        <div key={post.slug} className="flex flex-col p-6">
          <div className="w-full relative min-w-sm">
            <Image
              alt="Blog post image"
              src={urlBuilder({ id: post.img_header_url, width: 720 })}
              width={720}
              height={192}
              placeholder="blur"
              blurDataURL={urlBlurBluider({
                id: post.img_header_url,
                width: 720,
              })}
              unoptimized={true}
            />
          </div>
          <span className="self-center text-sm py-1 text-gray-400">
            Photo by {post.img_author} on {post.img_provider}
          </span>
          <div className="inline-flex justify-between items-center py-3">
            <div className="inline-flex items-center space-x-2">
              <div className="w-12 h-12 relative">
                <Image
                  className="rounded-full"
                  alt="Blog post image"
                  src="/images/profile.jpg"
                  width={128}
                  height={128}
                />
              </div>
              <div className="flex flex-col">
                <strong className="text-lg">palo-landrae</strong>
                <span className="text-sm">
                  Posted on {moment(post.date).format('LL')}
                </span>
              </div>
            </div>
            <div className="inline-flex mx-2 items-center">
              <LikeButton slug={post.slug} text={false} />
            </div>
          </div>
          <div className="prose prose-zinc dark:prose-dark prose-pre:p-0 prose-pre:bg-oneDark max-w-3xl">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                code: CodeBlock,
                pre: PreBlock,
                a: MarkdownLink,
                table: Table,
                img: NextImage,
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </Layout>
  );
};

export default BlogPost;

const NextImage = ({ node, children, src, alt, ...props }) => {
  return (
    <div className="mx-auto w-full max-w-3xl block border rounded-lg">
      <Image
        className="rounded-lg"
        src={src}
        alt={alt}
        layout="responsive"
        width={640}
        height={420}
        unoptimized={true}
        {...props}
      />
    </div>
  );
};

const Table = ({ node, children, ...props }) => {
  return (
    <div className="flex overflow-auto">
      <table className="scrollbar" {...props}>
        {children}
      </table>
    </div>
  );
};

const MarkdownLink = ({ node, children, href, ...props }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="underline underline-offset-2 text-darkSkyBlue"
      {...props}
    >
      {children}
    </a>
  );
};

const PreBlock = ({ node, children, ...props }) => {
  return (
    <pre className="" {...props}>
      {children}
    </pre>
  );
};

const CodeBlock = ({ node, inline, className, children, ...props }) => {
  const match = /language-(\w+)/.exec(className || '');
  return !inline && match ? (
    <SyntaxHighlighter
      language={match[1]}
      style={oneDark}
      PreTag="div"
      className="padding-7 scrollbar"
      {...props}
    >
      {children}
    </SyntaxHighlighter>
  ) : (
    <code
      className="bg-zinc-300 dark:bg-oneDark px-2 py-1 rounded-md code-modified"
      {...props}
    >
      {children}
    </code>
  );
};

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

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params as IParams;
  const post: Post = await prisma.blog.findUnique({
    where: {
      slug: slug,
    },
    select: {
      id: true,
      title: true,
      description: true,
      img_provider: true,
      img_header_url: true,
      img_author: true,
      date: true,
      content: true,
      slug: true,
      likes: true,
    },
  });
  return {
    props: {
      post: JSON.parse(JSON.stringify(post)),
    },
    revalidate: 300,
  };
};

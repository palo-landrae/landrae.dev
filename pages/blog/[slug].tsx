import type { NextPage } from "next";
import { IPost } from "@/models/blog-post";
import { prisma } from "@/lib/prisma";
import { Layout } from "@/components/layout";
import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { default as oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism/one-dark";
import moment from "moment";
import Image from "next/image";
import { TwitterHeartIcon, TwitterHeartEmptyIcon } from "@/components/icons";
import { LikeButton } from "@lyket/react";

interface IParams extends ParsedUrlQuery {
  slug: string;
}

interface IProps {
  post: IPost;
}

const BlogPost: NextPage<IProps> = ({ post }) => {
  return (
    <Layout title={post?.title || "Blog"} description={post?.description}>
      {post && (
        <div key={post.slug} className="flex flex-col p-6">
          <div className="w-full h-48 relative min-w-sm">
            <Image
              alt="Blog post image"
              src={post.img}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="inline-flex justify-between items-center py-3">
            <div className="inline-flex items-center space-x-2">
              <div className="w-12 h-12 relative">
                <Image
                  className="rounded-full"
                  alt="Blog post image"
                  src="/images/profile.jpg"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="flex flex-col">
                <strong className="text-lg">palo-landrae</strong>
                <span className="text-sm">
                  Posted on {moment(post.date).format("LL")}
                </span>
              </div>
            </div>
            <div className="inline-flex mx-2 items-center">
              <LikeButton id={post.slug} namespace="blog">
                {({ handlePress, totalLikes, userLiked, isLoading }) => (
                  <button
                    onClick={handlePress}
                    disabled={isLoading}
                    className="inline-flex items-center space-x-2"
                  >
                    <div className="w-7 h-7 self-center">
                      {userLiked ? (
                        <TwitterHeartIcon />
                      ) : (
                        <TwitterHeartEmptyIcon />
                      )}
                    </div>
                    <span className="text-lg">{totalLikes}</span>
                  </button>
                )}
              </LikeButton>
            </div>
          </div>
          <div className="markdown">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{ code: CodeBlock, a: MarkdownLink, td: TableCell }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default BlogPost;

const TableCell = ({ node, children, ...props }) => {
  return (
    <td className="px-3" {...props}>
      {children}
    </td>
  );
};

const MarkdownLink = ({ node, children, href, ...props }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="underline underline-offset-2 text-sky-400"
      {...props}
    >
      {children}
    </a>
  );
};
const CodeBlock = ({ node, inline, className, children, ...props }) => {
  const match = /language-(\w+)/.exec(className || "");
  return !inline && match ? (
    <SyntaxHighlighter
      language={match[1]}
      style={oneDark}
      PreTag="div"
      className="scrollbar"
      {...props}
    >
      {children}
    </SyntaxHighlighter>
  ) : (
    <code {...props}>{children}</code>
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

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as IParams;
  const post: IPost = await prisma.blog.findUnique({
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

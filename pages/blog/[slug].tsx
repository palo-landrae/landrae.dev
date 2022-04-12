import type { NextPage } from "next";
import { IPost } from "@/models/blog-post";
import { prisma } from "@/lib/prisma";
import { Layout } from "@/components/layout";
import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import ReactMarkdown from "react-markdown";
import { default as oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism/one-dark";
import moment from "moment";
import Image from "next/image";

interface IParams extends ParsedUrlQuery {
  slug: string;
}

interface IProps {
  post: IPost;
}

const BlogPost: NextPage<IProps> = ({ post }) => {
  return (
    <Layout title={post?.title || "Blog"}>
      <div>
        {post && (
          <div key={post.slug} className="flex flex-col max-w-3xl mx-auto p-6">
            <div className="w-full h-48 relative min-w-sm">
              <Image
                alt="Blog post image"
                src={post.img}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="flex py-3 items-center space-x-2">
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
            <ReactMarkdown components={{ code: CodeBlock }}>
              {post.content}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BlogPost;

const CodeBlock = ({ node, inline, className, children, ...props }) => {
  const match = /language-(\w+)/.exec(className || "");
  return !inline && match ? (
    <SyntaxHighlighter
      language={match[1]}
      style={oneDark}
      PreTag="div"
      className="codeStyle"
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

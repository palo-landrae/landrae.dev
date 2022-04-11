export interface PostProps {
  posts: Post[];
}

export interface Post {
  id: string;
  title: string;
  description: string;
  img: string;
  date: Date;
  slug: string;
  content?: string;
}

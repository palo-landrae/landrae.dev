export type Post = {
  id: string;
  title: string;
  description: string;
  img_provider?: string;
  img_header_url?: string;
  img_thumbnail_url?: string;
  img_author?: string;
  date: Date;
  slug: string;
  content?: string;
  likes?: string[];
};

export type Like = {
  id?: string;
  slug: string;
  likes?: string[];
  text?: string;
};

export type Project = {
  title: string;
  description: string;
  img_url: string;
  demo?: string;
  git: string;
};

export type Post = {
  id: string;
  title: string;
  description: string;
  img_provider?: string;
  img_header_url?: string;
  img_thumbnail_url?: string;
  img_author?: string;
  date?: Date;
  slug: string;
  content?: string;
  created_at?: Date;
};

export type Like = {
  slug: string;
  text?: boolean;
  count?: number;
  liked?: boolean;
};

export type Project = {
  title: string;
  description: string;
  img_url: string;
  demo?: string;
  git: string;
};

export type NowPlayingSong = {
  album: string;
  albumImageUrl: string;
  artist: string;
  isPlaying: boolean;
  songUrl: string;
  title: string;
};

export type Subscribers = {
  count: number;
};

export type Views = {
  slug: string;
  count: number;
};

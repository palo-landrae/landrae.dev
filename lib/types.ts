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
  text?: boolean;
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

export interface IPost {
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
  likes: string[];
}

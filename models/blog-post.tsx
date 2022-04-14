export interface IPost {
  id: string;
  title: string;
  description: string;
  img_src?: string;
  img_url: string;
  img_author?: string;
  date: Date;
  slug: string;
  content?: string;
}

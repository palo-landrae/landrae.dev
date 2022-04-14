export interface IPost {
  id: string;
  title: string;
  description: string;
  img_provider?: string;
  img_url: string;
  img_author?: string;
  date: Date;
  slug: string;
  content?: string;
}

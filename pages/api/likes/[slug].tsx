import ILike from "@/interfaces/ILike";
import { prisma } from "@/lib/prisma";

export default async function handle(req, res) {
  const { slug } = req.query;
  if (req.method == "POST") {
    await prisma.blog.update({
      where: {
        slug: slug,
      },
      data: {
        likes: req.body.likes,
      },
    });
    res.status(200).json({ success: true });
  } else {
    const data: ILike = await prisma.blog.findUnique({
      where: {
        slug: slug,
      },
      select: {
        slug: true,
        likes: true,
      },
    });
    res.json(JSON.parse(JSON.stringify(data)));
  }
}

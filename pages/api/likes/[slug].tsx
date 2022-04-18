import { prisma } from "@/lib/prisma";

export default async function handle(req, res) {
  const { slug } = req.query;
  if (req.method == "POST") {
    const data = await prisma.likes.update({
      where: {
        slug: slug,
      },
      data: {
        likes: req.body.likes,
      },
    });
    res.json(data);
  } else {
    const data = await prisma.likes.findUnique({
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

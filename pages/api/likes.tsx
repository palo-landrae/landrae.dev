import { prisma } from "@/lib/prisma";

export default async function handle(req, res) {
  if (req.method == "POST") {
    const data = await prisma.likes.update({
      where: {
        slug: req.body.slug,
      },
      data: {
        likes: req.body.likes,
      },
    });
    res.json(data);
  } else {
    const data = await prisma.likes.findMany({
      select: {
        slug: true,
        likes: true,
      },
    });
    res.json(JSON.parse(JSON.stringify(data)));
  }
}

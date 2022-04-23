import type { NextApiRequest, NextApiResponse } from "next";
import { Like } from "@/lib/types";
import { prisma } from "@/lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const slug = req.query.slug.toString();

    if (req.method == "POST") {
      await prisma.blog.update({
        where: {
          slug: slug,
        },
        data: {
          likes: req.body.likes,
        },
      });

      return res.status(200).json({ success: true });
    }

    if (req.method == "GET") {
      const data: Like = await prisma.blog.findUnique({
        where: {
          slug: slug,
        },
        select: {
          slug: true,
          likes: true,
        },
      });

      return res.status(200).json(JSON.parse(JSON.stringify(data)));
    }
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}

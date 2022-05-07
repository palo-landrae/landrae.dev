import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import prisma from '@/lib/prisma';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const slug = req.query.params[0].toString();
    const sessionId = req.query.params[1].toString();

    const data = await prisma.likes.findFirst({
      where: {
        sessionID: sessionId,
        slug: slug,
      },
      select: {
        id: true,
        liked: true,
      },
    });

    const liked = data?.liked || false;
    const uid = data?.id || uuidv4();

    if (req.method == 'GET') {
      // query to count number of likes
      const count = await prisma.likes.count({ where: { liked: true } });
      return res.status(200).json({ count: count, liked: liked });
    }

    if (req.method == 'POST') {
      await prisma.likes.upsert({
        where: {
          id: uid,
        },
        create: {
          id: uid,
          sessionID: sessionId,
          slug: slug,
          liked: !liked,
        },
        update: {
          liked: !liked,
        },
      });
      return res.status(200).json({ success: true });
    }
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}

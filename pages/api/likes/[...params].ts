import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const slug = req.query.params[0].toString();
    const sessionId = req.query.params[1].toString();

    const session = await prisma.likes.upsert({
      where: {
        slug: slug,
      },
      create: {
        slug: slug,
        sessions: [],
        count: 0,
      },
      update: {},
    });

    const sessionExists = session.sessions.includes(sessionId);

    if (req.method == 'GET') {
      if (!session) return res.status(500).json({ message: 'Server error' });
      return res
        .status(200)
        .json({ count: session.count, liked: sessionExists });
    }

    if (req.method == 'POST') {
      const result = await prisma.likes.update({
        where: {
          slug: slug,
        },
        data: {
          sessions: {
            set: sessionExists
              ? session.sessions.filter((id) => id !== sessionId)
              : [...session.sessions, sessionId],
          },
          count: {
            set: sessionExists ? session.count - 1 : session.count + 1,
          },
        },
      });

      if (!result) return res.status(500).json({ message: 'Server error' });

      return res.status(200).json({ success: true });
    }
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}

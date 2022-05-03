import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const slug = req.query.slug.toString();

    if (req.method === 'POST') {
      const result = await prisma.views.upsert({
        where: { slug: slug },
        create: {
          slug: slug,
          count: 0,
        },
        update: {
          count: {
            increment: 1,
          },
        },
      });

      if (!result) return res.status(500).json({ message: 'Server error!' });

      return res.status(201).json({
        message: 'Document successfully updated!',
      });
    }

    if (req.method === 'GET') {
      const result = await prisma.views.findUnique({
        where: { slug: slug },
        select: { count: true },
      });

      if (!result) return res.status(500).json({ message: 'Server error!' });

      return res.status(200).json({
        total: result.count.toString(),
      });
    }
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}

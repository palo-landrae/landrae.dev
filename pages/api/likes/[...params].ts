import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/firebase';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const slug = req.query.params[0].toString();
    const sessionId = req.query.params[1].toString();

    const session = await db
      .collection(`likes/${slug}/likers`)
      .doc(sessionId)
      .get();

    if (req.method == 'GET') {
      const docs = await db.collection(`likes/${slug}/likers`).get();
      return res.status(200).json({ count: docs.size, liked: session.exists });
    }

    if (req.method == 'POST') {
      const docRef = db.collection(`likes/${slug}/likers`).doc(sessionId);
      const result = await (session.exists ? docRef.delete() : docRef.set({}));

      if (!result) {
        return res.status(500).json({ message: 'Server error' });
      }

      return res.status(200).json({ success: true });
    }
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}

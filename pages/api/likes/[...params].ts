import type { NextApiRequest, NextApiResponse } from 'next';
import supabase from '@/lib/supabase';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const slug = req.query.params[0].toString();
    const sessionId = req.query.params[1].toString();

    // query to get like value
    const { data } = await supabase
      .from('like')
      .select('uid, like')
      .match({ slug: slug, sessionID: sessionId });

    const liked = data[0]?.like || false;
    const uid = data[0]?.uid || null;

    if (req.method == 'GET') {
      // query to count number of likes
      const { count } = await supabase
        .from('like')
        .select('sessionID', { count: 'exact' })
        .is('like', true);
      return res.status(200).json({ count: count, liked: liked });
    }

    if (req.method == 'POST') {
      await supabase
        .from('like')
        .upsert(
          { uid: uid, slug: slug, sessionID: sessionId, like: !liked },
          { onConflict: 'uid' }
        );
      return res.status(200).json({ success: true });
    }
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}

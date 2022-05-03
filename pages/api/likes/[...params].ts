import type { NextApiRequest, NextApiResponse } from 'next';
import supabase from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const slug = req.query.params[0].toString();
    const sessionId = req.query.params[1].toString();

    // query to get like value
    const { data, error } = await supabase
      .from('likes')
      .select('uid, like')
      .match({ slug: slug, sessionID: sessionId });
    if (error) return res.status(500).send('Server Error');

    const liked = data[0]?.like || false;
    const uid = data[0]?.uid || uuidv4();

    if (req.method == 'GET') {
      // query to count number of likes
      const { count, error } = await supabase
        .from('likes')
        .select('sessionID', { count: 'exact' })
        .is('like', true);
      if (error) return res.status(500).json({ message: error });
      return res.status(200).json({ count: count, liked: liked });
    }

    if (req.method == 'POST') {
      const { error } = await supabase
        .from('likes')
        .upsert(
          { uid: uid, slug: slug, sessionID: sessionId, like: !liked },
          { onConflict: 'uid' }
        );
      if (error) return res.status(500).json({ message: error });
      return res.status(200).json({ success: true });
    }
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}

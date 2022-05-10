import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    // Regenerate our index route showing the images
    if (req.method == 'GET') {
      await res.unstable_revalidate(`${req.query.slug}`);
      return res.status(200).json({ revalidated: true });
    }
    return res.status(400).json({ error: 'Bad request' });
  } catch (e) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating');
  }
}

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result = await fetch('https://api.sendinblue.com/v3/contacts/lists/3', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'api-key': process.env.SENDINBLUE_API_KEY,
    },
  });

  const data = await result.json();

  if (!result.ok) {
    return res.status(500).json({ error: 'Error retrieving subscribers' });
  }

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=1200, stale-while-revalidate=600'
  );

  return res.status(200).json({ count: data.totalSubscribers });
}

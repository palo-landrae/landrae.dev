import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, captchaToken } = req.body;

  if (!email || !captchaToken) {
    return res.status(400).json({
      error: 'Please provide the required fields',
    });
  }

  try {
    const response = await fetch('https://hcaptcha.com/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      },
      body: `response=${captchaToken}&secret=${process.env.HCAPTCHA_SECRET_KEY}`,
    });

    const captchaValidation = await response.json();

    if (captchaValidation.success) {
      const result = await fetch('https://api.sendinblue.com/v3/contacts', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'api-key': process.env.SENDINBLUE_API_KEY,
        },
        body: JSON.stringify({
          email: email,
          listIds: [3],
        }),
      });

      const data = await result.json();

      if (!result.ok) {
        return res.status(500).json({ error: data.message });
      }

      return res.status(201).json({ error: '' });
    }

    return res.status(400).json({
      error: 'Unproccesable request, Invalid captcha code',
    });
  } catch (error) {
    return res.status(422).json({ error: 'Something went wrong' });
  }
}

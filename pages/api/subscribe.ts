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
      {
        /*
      const result = await fetch('https://www.getrevue.co/api/v2/subscribers', {
        method: 'POST',
        headers: {
          Authorization: `Token ${process.env.REVUE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await result.json();

      if (!result.ok) {
        return res.status(500).json({ error: data.error.email[0] });
      }

      return res.status(201).json({ error: '' });
        */
      }
      return res.status(200).send('OK');
    }
    return res.status(400).json({
      message: 'Unproccesable request, Invalid captcha code',
    });
  } catch (error) {
    console.log(error);
    return res.status(422).json({ message: 'Something went wrong' });
  }
}

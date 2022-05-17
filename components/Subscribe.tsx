import React, { useState, useRef, useEffect } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import useSWR from 'swr';
import { Subscribers } from '@/lib/types';
import fetcher from '@/lib/fetcher';
import { AlertMessage } from '@/components/Alert';

const Subscribe: React.FC = () => {
  const [email, setEmail] = useState('');
  const { data } = useSWR<Subscribers>('api/subscribers', fetcher);
  const subscriberCount = new Number(data?.count);

  const [token, setToken] = useState(null);
  const hcaptchaRef = useRef(null);

  const [show, setShow] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    hcaptchaRef.current.execute();
  };

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 5000);
    return () => clearTimeout(timer);
  }, [show]);

  useEffect(() => {
    if (!token) return;
    const onHCaptchaVerified = async () => {
      const res = await fetch(`/api/subscribe`, {
        body: JSON.stringify({
          email: email,
          captchaToken: token,
        }),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { error } = await res.json();
      if (error) {
        setIsError(true);
        setMessage(error);
        setShow(true);
        return;
      }
      setIsError(false);
      setShow(true);
      setEmail('');
    };
    onHCaptchaVerified();
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <form className="my-3" onSubmit={onSubmit}>
        <div className="flex flex-col max-w-3xl w-full mx-auto bg-sky-50 border border-blue-200 dark:bg-zinc-800 dark:border-0 py-4 px-6">
          <h3 className="font-semibold">Subscribe to the Newsletter</h3>
          <p className="text-neutral-700 dark:text-neutral-300 my-1">
            Get emails about my learnings and fresh updates from my blog.
          </p>
          <div className="flex flex-row w-full justify-items-stretch">
            <input
              type="email"
              placeholder="example@email.com"
              aria-placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-lg px-2 py-1 w-full mr-2 bg-neutral-100 text-midnight border border-neutral-400"
              required
            />
            <button
              type="submit"
              className="rounded-lg bg-blue-400 px-2 text-white"
            >
              Subscribe
            </button>
          </div>
          <HCaptcha
            size="invisible"
            sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY}
            onVerify={setToken}
            ref={hcaptchaRef}
          />
          <p className="mt-1 text-sm text-neutral-700 dark:text-neutral-300">
            {`${
              subscriberCount > 0 ? subscriberCount.toLocaleString() : '-'
            } subscribers`}
          </p>
        </div>
      </form>
      <AlertMessage show={show} error={isError} message={message} />
    </>
  );
};

export default Subscribe;

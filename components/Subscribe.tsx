import React, { useState, useRef, useEffect } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';

const Subscribe: React.FC = () => {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState(null);
  const hcaptchaRef = useRef(null);

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    hcaptchaRef.current.execute();
  };

  useEffect(() => {
    if (token) {
      const fetchData = async () => {
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
          alert(error);
          return;
        }
        setEmail('');
        alert(`Hooray! You're now on the list.`);
      };
      fetchData();
    }
  }, [token]);

  return (
    <form className="m-4" onSubmit={onSubmit}>
      <div className="flex flex-col max-w-lg w-full mx-auto bg-sky-50 border border-blue-200 dark:bg-zinc-800 dark:border-0 py-4 px-6 rounded-md">
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
            className="rounded-lg px-2 py-1 w-full mr-2 bg-neutral-100 dark:bg-neutral-300 text-midnight border border-neutral-400"
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
      </div>
    </form>
  );
};

export default Subscribe;

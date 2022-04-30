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
      var data = {
        email: email,
        captchaToken: token,
      };
      const fetchData = async () => {
        const response = await fetch(`/api/subscribe`, {
          body: JSON.stringify(data),
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          // If the response is ok than show the success alert
          alert('Email registered successfully');
        } else {
          // Else throw an error with the message returned
          // from the API
          const error = await response.json();
          throw new Error(error.message);
        }
      };
      fetchData();
    }
  }, [token, email]);

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

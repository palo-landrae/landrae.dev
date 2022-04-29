import React, { useState } from 'react';

const Subscribe: React.FC = () => {
  const [email, setEmail] = useState('');
  return (
    <div className="m-4">
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
            className="rounded-lg px-2 py-1 w-full mr-2 bg-neutral-100 border border-neutral-400"
          />
          <button className="rounded-lg bg-blue-400 px-2 text-white">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;

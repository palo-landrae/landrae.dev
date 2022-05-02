// Code by Lee Robinson on leerob.io
// https://github.com/leerob/leerob.io

import useSWR from 'swr';
import { useEffect } from 'react';
import { animate } from 'motion';

import fetcher from '@/lib/fetcher';
import { NowPlayingSong } from '@/lib/types';
import { SpotifyIcon } from '@/components/Icons';

function AnimatedBars() {
  useEffect(() => {
    animate(
      '#bar1',
      {
        transform: [
          'scaleY(1.0) translateY(0rem)',
          'scaleY(1.5) translateY(-0.082rem)',
          'scaleY(1.0) translateY(0rem)',
        ],
      },
      {
        duration: 1.0,
        repeat: Infinity,
        easing: ['ease-in-out'],
      }
    );
    animate(
      '#bar2',
      {
        transform: [
          'scaleY(1.0) translateY(0rem)',
          'scaleY(3) translateY(-0.083rem)',
          'scaleY(1.0) translateY(0rem)',
        ],
      },
      {
        delay: 0.2,
        duration: 1.5,
        repeat: Infinity,
        easing: ['ease-in-out'],
      }
    );
    animate(
      '#bar3',
      {
        transform: [
          'scaleY(1.0)  translateY(0rem)',
          'scaleY(0.5) translateY(0.37rem)',
          'scaleY(1.0)  translateY(0rem)',
        ],
      },
      {
        delay: 0.3,
        duration: 1.5,
        repeat: Infinity,
        easing: ['ease-in-out'],
      }
    );
  }, []);

  return (
    <div className="w-auto flex items-end overflow-hidden">
      <span
        id="bar1"
        className="w-1 mr-[3px] h-2 bg-zinc-600 dark:bg-zinc-400 opacity-75"
      />
      <span
        id="bar2"
        className="w-1 mr-[3px] h-1 bg-zinc-600 dark:bg-zinc-400"
      />
      <span
        id="bar3"
        className="w-1 h-3 bg-zinc-600 dark:bg-zinc-400 opacity-80"
      />
    </div>
  );
}
export default function NowPlaying() {
  const { data } = useSWR<NowPlayingSong>('/api/now-playing', fetcher);
  return (
    <div className="flex flex-row-reverse items-center mb-8 sm:flex-row space-x-0 sm:space-x-2 w-full">
      {data?.songUrl ? <AnimatedBars /> : <SpotifyIcon />}
      <div className="inline-flex flex-col sm:flex-row w-full max-w-full truncate text-base">
        {data?.songUrl ? (
          <a
            className="capsize text-zinc-800 dark:text-zinc-200 max-w-max truncate"
            href={data.songUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {data.title}
          </a>
        ) : (
          <p className="capsize text-zinc-800 dark:text-zinc-200">
            Not Playing
          </p>
        )}
        <span className="capsize mx-2 text-zinc-500 dark:text-zinc-300 hidden sm:block">
          {' – '}
        </span>
        <p className="capsize text-zinc-500 dark:text-zinc-300 max-w-max truncate">
          {data?.artist ?? 'Spotify'}
        </p>
      </div>
    </div>
  );
}

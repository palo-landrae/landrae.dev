import React, { useState, useEffect, useContext, useCallback } from 'react';
import { SessionContext } from '@/components/session';
import useSWR from 'swr';
import { Like } from '@/lib/types';
import fetcher from '@/lib/fetcher';
import { TwitterHeartIcon, TwitterHeartEmptyIcon } from '@/components/icons';
import { motion } from 'framer-motion';

export const LikeButton: React.FC<Like> = ({ slug, text }) => {
  const { likeSessionId } = useContext(SessionContext);

  const [userLiked, setUserLiked] = useState(false);
  const [totalLikes, setTotalLikes] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const { data } = useSWR<Like>(`/api/likes/${slug}/${likeSessionId}`, fetcher);

  const fetchLikes = useCallback(() => {
    setTotalLikes(data?.count);
    setUserLiked(data?.liked);
  }, [data]);

  useEffect(() => {
    fetchLikes();
  }, [fetchLikes]);

  const postData = (slug: string, likeSessionId: string) => {
    fetch(`/api/likes/${slug}/${likeSessionId}`, {
      method: 'POST',
    }).then((res) => {
      if (res.status == 200) setIsLoading(false);
    });
  };

  const handlePress = () => {
    setIsLoading(true);
    setTotalLikes((value) => (userLiked ? value - 1 : value + 1));
    setUserLiked(!userLiked);
    postData(slug, likeSessionId);
  };

  const heartVariants = {
    like: {
      scale: [0.25, 1.25, 1],
      transition: { duration: 0.5 },
    },
  };

  return (
    <>
      {text ? (
        <span className="text-base">
          {`${totalLikes ? totalLikes.toLocaleString() : '0'} likes`}
        </span>
      ) : (
        <button
          onClick={handlePress}
          className="inline-flex items-center space-x-2"
          disabled={isLoading}
        >
          <motion.div
            variants={heartVariants}
            animate={userLiked ? 'like' : ''}
            className="w-7 h-7 self-center"
          >
            {userLiked ? <TwitterHeartIcon /> : <TwitterHeartEmptyIcon />}
          </motion.div>
          <span className="text-lg">
            {totalLikes ? totalLikes.toLocaleString() : '0'}
          </span>
        </button>
      )}
    </>
  );
};

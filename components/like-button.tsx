import React, { useState, useEffect, useContext, useCallback } from "react";
import { SessionContext } from "@/components/session";
import useSWR from "swr";
import ILike from "@/interfaces/ILike";
import fetcher from "@/lib/fetcher";
import { TwitterHeartIcon, TwitterHeartEmptyIcon } from "@/components/icons";

export interface LikeButtonProps {
  slug: string;
  text?: boolean;
}

export const LikeButton: React.FC<LikeButtonProps> = ({ slug, text }) => {
  const { likeSessionId } = useContext(SessionContext);

  const [userLiked, setUserLiked] = useState(false);
  const [likes, setLikes] = useState([]);
  const [totalLikes, setTotalLikes] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const { data } = useSWR<ILike>(`/api/likes/${slug}`, fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 5000,
  });

  const fetchLikes = useCallback(() => {
    if (data) {
      setLikes(data.likes);
      setUserLiked(data.likes.includes(likeSessionId));
      setTotalLikes(data.likes.length);
    }
  }, [data, likeSessionId]);

  useEffect(() => {
    fetchLikes();
  }, [fetchLikes]);

  const postData = (slug: string, likes: string[]) => {
    setIsLoading(true);
    fetch(`/api/likes/${slug}`, {
      body: JSON.stringify({
        likes: likes,
      }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status == 200) setIsLoading(false);
    });
  };

  const handlePress = () => {
    let tempLikes = [];
    if (likes.includes(likeSessionId)) {
      tempLikes = likes.filter((item: string) => item !== likeSessionId);
    } else {
      tempLikes = likes;
      tempLikes.push(likeSessionId);
    }
    setLikes(tempLikes);
    setTotalLikes(tempLikes.length);
    setUserLiked(!userLiked);
    postData(slug, tempLikes);
  };

  return (
    <>
      {text ? (
        <span className="text-base">{totalLikes} likes</span>
      ) : (
        <button
          onClick={handlePress}
          className="inline-flex items-center space-x-2"
          disabled={isLoading}
        >
          <div className="w-7 h-7 self-center">
            {userLiked ? <TwitterHeartIcon /> : <TwitterHeartEmptyIcon />}
          </div>
          <span className="text-lg">{totalLikes}</span>
        </button>
      )}
    </>
  );
};

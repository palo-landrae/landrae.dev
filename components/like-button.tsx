import React, { useState, useEffect, useContext, useCallback } from "react";
import { SessionContext } from "@/components/session";
import useSWR from "swr";
import ILike from "@/interfaces/ILike";
import { TwitterHeartIcon, TwitterHeartEmptyIcon } from "@/components/icons";

export interface LikeButtonProps {
  slug: string;
  text?: boolean;
}

export const MyLikeButton: React.FC<LikeButtonProps> = ({ slug, text }) => {
  const { likeSessionId } = useContext(SessionContext);

  const [userLiked, setUserLiked] = useState(false);
  const [likes, setLikes] = useState([]);
  const [totalLikes, setTotalLikes] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetcher = async (url: string) =>
    await fetch(url).then((res) => res.json());

  const { data } = useSWR("/api/likes", fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 5000,
  });

  const fetchLikes = useCallback(() => {
    if (data) {
      const doc = data.find((doc: ILike) => {
        return doc.slug === slug;
      });
      setLikes(doc.likes);
      setUserLiked(doc.likes.includes(likeSessionId));
      setTotalLikes(doc.likes.length);
    }
  }, [data, slug, likeSessionId]);

  useEffect(() => {
    fetchLikes();
  }, [fetchLikes]);

  const postData = (slug: string, likes: string[]) => {
    setIsLoading(true);
    fetch("/api/likes", {
      body: JSON.stringify({
        slug: slug,
        likes: likes,
      }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      setIsLoading(false);
      res.json();
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

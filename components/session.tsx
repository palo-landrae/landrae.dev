import React, { useState, useEffect, createContext } from "react";
import useStorage from "@/hooks/useStorage";
import { generateRandomString } from "@/hooks/generate-random-string";

interface SessionContextProps {
  likeSessionId: string;
}

interface IProps {
  children: React.ReactNode;
}

export const SessionContext = createContext<SessionContextProps | null>(null);

const getSessionID = () => {
  const { getItem } = useStorage();
  const storedId = getItem("like-session-id", "local");
  if (!storedId) {
    const newSessionID = generateRandomString(21);
    return newSessionID;
  }
  return storedId;
};

export const SessionProvider: React.FC<IProps> = ({ children }) => {
  const { setItem } = useStorage();
  const [likeSessionId, setLikeSessionId] = useState(getSessionID());

  useEffect(() => {
    setItem("like-session-id", likeSessionId, "local");
  }, [likeSessionId]);

  return (
    <SessionContext.Provider value={{ likeSessionId }}>
      {children}
    </SessionContext.Provider>
  );
};

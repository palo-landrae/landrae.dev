import React, { useState, useEffect, createContext } from "react";
import UseStorage from "@/hooks/UseStorage";
import { generateRandomString } from "@/hooks/generate-random-string";

interface SessionContextProps {
  likeSessionId: string;
}

interface IProps {
  children: React.ReactNode;
}

export const SessionContext = createContext<SessionContextProps | null>(null);

export const SessionProvider: React.FC<IProps> = ({ children }) => {
  const { getItem } = UseStorage();

  const getSessionID = () => {
    const storedId = getItem("like-session-id", "local");
    if (!storedId) {
      const newSessionID = generateRandomString(21);
      return newSessionID;
    }
    return storedId;
  };

  const [likeSessionId, setLikeSessionId] = useState(getSessionID());

  useEffect(() => {
    const { setItem } = UseStorage();
    setItem("like-session-id", likeSessionId, "local");
  }, [likeSessionId]);

  return (
    <SessionContext.Provider value={{ likeSessionId }}>
      {children}
    </SessionContext.Provider>
  );
};

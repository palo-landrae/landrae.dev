import React, { useEffect, createContext } from 'react';
import { UseStorageHook } from '@/hooks/UseStorageHook';
import { v4 as uuidv4 } from 'uuid';

interface SessionContextProps {
  likeSessionId: string;
}

interface IProps {
  children: React.ReactNode;
}

export const SessionContext = createContext<SessionContextProps | null>(null);

export const SessionProvider: React.FC<IProps> = ({ children }) => {
  const { getItem } = UseStorageHook();

  const getSessionID = () => {
    const storedId = getItem('like-session-id', 'local');
    if (!storedId) {
      const newSessionID = uuidv4();
      return newSessionID;
    }
    return storedId;
  };

  const likeSessionId = getSessionID();

  useEffect(() => {
    const { setItem } = UseStorageHook();
    setItem('like-session-id', likeSessionId, 'local');
  }, [likeSessionId]);

  return (
    <SessionContext.Provider value={{ likeSessionId }}>
      {children}
    </SessionContext.Provider>
  );
};

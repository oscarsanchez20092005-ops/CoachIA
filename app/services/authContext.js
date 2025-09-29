import React, { createContext, useContext, useEffect, useState } from 'react';
import { ensureSignedIn, subscribeToAuthChanges } from './authService';

export const AuthContext = createContext({ userId: null });

export function AuthProvider({ children }) {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    let unsubscribe = null;
    (async () => {
      const uid = await ensureSignedIn();
      setUserId(uid);
      unsubscribe = subscribeToAuthChanges(user => {
        setUserId(user ? user.uid : null);
      });
    })();
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ userId }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthProvider;
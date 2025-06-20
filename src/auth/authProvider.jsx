import React, { createContext, useState, useMemo } from 'react';

export const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true); 

  const contextValue = useMemo(() => ({
    user,
    setUser,
    isAuthenticated: user !== null,
    isAuthLoading,
    setIsAuthLoading
  }), [user, isAuthLoading]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
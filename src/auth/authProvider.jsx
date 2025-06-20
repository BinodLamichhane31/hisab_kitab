// authProvider.jsx - AFTER (IMPROVED)

import React, { createContext, useState, useCallback, useMemo } from "react";

export const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: () => {},
  logout: () => {},
  setUser: () => {},
  setIsLoading: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [user, setUserState] = useState(null);
  const [isLoading, setIsLoadingState] = useState(true);

  const setUser = useCallback((userData) => {
    setUserState(userData);
  }, []); 

  const setIsLoading = useCallback((loadingState) => {
    setIsLoadingState(loadingState);
  }, []);
  
  const login = useCallback((userData) => {
    setUserState(userData);
  }, []);

  const logout = useCallback(() => {
    setUserState(null);
  }, []);
  
  const contextValue = useMemo(() => ({
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    setUser,
    setIsLoading,
  }), [user, isLoading]); 
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
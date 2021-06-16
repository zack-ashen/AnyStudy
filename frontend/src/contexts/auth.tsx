import React, { createContext, useEffect, useState } from 'react';

const AuthContext = createContext({});

const AuthProvider = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false)

  useEffect(() => {
    setLoggedIn(true);
  }, [])

  const authContextValue={}
  return <AuthContext.Provider value={authContextValue} />;
}

const useAuth = () => React.useContext(AuthContext)

export { AuthProvider, useAuth }
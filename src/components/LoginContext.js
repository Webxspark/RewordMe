import React, { createContext, useState } from "react";

export const LoginStatusContext = createContext();

export const LoginStatusProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <LoginStatusContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </LoginStatusContext.Provider>
  );
};

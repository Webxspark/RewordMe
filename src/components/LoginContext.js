import React, { createContext, useState } from "react";

export const LoginStatusContext = createContext();

export const LoginStatusProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [logoutSessionPrompt, setLogoutSessionPrompt] = useState(false);
  const [userCredits, setUserCredits] = useState(false);
  return (
    <LoginStatusContext.Provider value={{ isLoggedIn, setIsLoggedIn, logoutSessionPrompt, setLogoutSessionPrompt, userCredits, setUserCredits }}>
      {children}
    </LoginStatusContext.Provider>
  );
};

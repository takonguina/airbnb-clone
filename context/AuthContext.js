import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState("");
  const [userToken, setUserToken] = useState("");

  const handleLogin = (userId, userToken) => {
    if (userId && userToken) {
      setUserId(userId);
      setUserToken(userToken);
    }
  };

  const handleLogout = () => {
    setUserId("");
    setUserToken("");
  };

  return (
    <AuthContext.Provider value={{ userId, userToken, handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

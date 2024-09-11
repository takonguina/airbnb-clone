import { router } from "expo-router";
import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState("");
  const [userToken, setUserToken] = useState("");

  const handleLogin = (id, token) => {
    if (id && token) {
      setUserId(id);
      setUserToken(token);
    }
  };

  const handleLogout = () => {
    setUserId("");
    setUserToken("");
  };

  return (
    <AuthContext.Provider
      value={{ userId, userToken, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

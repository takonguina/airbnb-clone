import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState("");
  const [userToken, setUserToken] = useState("");

  const handleLogin = async (id, token) => {
    if (id && token) {
      setUserId(id);
      setUserToken(token);
      await AsyncStorage.setItem("userId", id);
      await AsyncStorage.setItem("userToken", token);
    }
  };

  const handleLogout = async () => {
    setUserId("");
    setUserToken("");
    await AsyncStorage.removeItem("userId");
    await AsyncStorage.removeItem("userToken");
  };

  useEffect(() => {
    const getStateStorage = async () => {
      const userIdStorage = await AsyncStorage.getItem("userId");
      const userTokenStorage = await AsyncStorage.getItem("userToken");
      if (userIdStorage && userTokenStorage) {
        setUserId(userIdStorage);
        setUserToken(userTokenStorage);
      }
    };

    getStateStorage();
  }, []);

  return (
    <AuthContext.Provider
      value={{ handleLogin, handleLogout, userId, userToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

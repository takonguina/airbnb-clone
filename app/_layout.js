import { router, Slot } from "expo-router";
import { useContext, useEffect } from "react";

import { AuthContext, AuthProvider } from "../context/AuthContext";

export default GlobalAppLayout = () => {
  return (
    <AuthProvider>
      <NavigationWrapper>
        <Slot />
      </NavigationWrapper>
    </AuthProvider>
  );
};

const NavigationWrapper = ({ children }) => {
  const { userId, userToken } = useContext(AuthContext);
  useEffect(() => {
    if (userId && userToken) {
      router.replace("/home");
    } else {
      router.replace("/");
    }
  }, [userId, userToken]);
  return children;
};

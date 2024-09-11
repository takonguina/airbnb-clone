import { Slot } from "expo-router";
import { AuthProvider } from "../context/AuthContext";

export const GlobalAppLayout = () => {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
};

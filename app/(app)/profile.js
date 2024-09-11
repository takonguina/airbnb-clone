import { useContext } from "react";
import { Button, SafeAreaView, Text } from "react-native";
import { AuthContext } from "../../context/AuthContext";

export default ProfileView = () => {
  const { handleLogout } = useContext(AuthContext);

  return (
    <SafeAreaView>
      <Text>Profile</Text>
      <Button title="Logout" onPress={handleLogout} />
    </SafeAreaView>
  );
};

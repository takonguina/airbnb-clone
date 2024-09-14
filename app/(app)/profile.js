import { useContext, useEffect, useState } from "react";
import {
  Button,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default ProfileView = () => {
  const { handleLogout, userId, userToken } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const handleUserInfos = async () => {
      try {
        console.log(userToken);
        const { data } = await axios.get(
          `${process.env.EXPO_PUBLIC_API_URL}/user/${userId}`,
          {
            headers: { Authorization: userToken },
          }
        );
        console.log(data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    handleUserInfos();
  }, [userId, userToken]);

  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        onPress={() => console.log("Update")}
        style={styles.connexionButton}
      >
        <Text style={[styles.greyText, { fontSize: 16, fontWeight: "bold" }]}>
          Update
        </Text>
      </Pressable>
      <Pressable onPress={handleLogout} style={styles.connexionButton}>
        <Text style={[styles.greyText, { fontSize: 16, fontWeight: "bold" }]}>
          Logout
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  //****************//
  //   CONTAINERS   //
  //****************//
  container: {
    flex: 1,
    alignItems: "center",
  },
  connexionButton: {
    alignItems: "center",
    borderColor: "#FF5A5E",
    borderRadius: 50,
    borderWidth: 3,
    marginBottom: 20,
    padding: 15,
    width: 200,
  },
  //****************//
  //      TEXTE     //
  //****************//
  greyText: {
    color: "#8F8F8F",
  },
});

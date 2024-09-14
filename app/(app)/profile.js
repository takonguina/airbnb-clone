import { useContext, useEffect, useState } from "react";
import {
  Alert,
  Button,
  Dimensions,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";
import TextInputStyled from "../../components/common/textInputStyled";
import axios from "axios";
import header from "../../components/header/header";
import { router } from "expo-router";

export default ProfileView = () => {
  const { handleLogout, userId, userToken } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleUpdate = async () => {
    try {
      if (email && name && description) {
        const { status } = await axios.put(
          `${process.env.EXPO_PUBLIC_API_URL}/user/update`,
          {
            email: email,
            description: description,
            username: name,
          },
          { headers: { Authorization: userToken } }
        );
        console.log(status);
        if (status === 200) {
          Alert.alert("Update ✅", "User successfully updated.");
          router.replace("/home");
        }
      } else {
        Alert.alert("Empty filed(s)", "Please fill in all fields.");
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const handleUserInfos = async () => {
      try {
        console.log(userToken);
        const {
          data: { description, email, username, photo },
        } = await axios.get(
          `${process.env.EXPO_PUBLIC_API_URL}/user/${userId}`,
          {
            headers: { Authorization: userToken },
          }
        );
        setEmail(email);
        setName(username);
        setDescription(description);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    handleUserInfos();
  }, [userId, userToken]);

  return (
    <SafeAreaView style={styles.container}>
      <TextInputStyled setState={setEmail} placeholder="Email" value={email} />
      <TextInputStyled setState={setName} placeholder="Name" value={name} />
      <TextInput
        value={description}
        autoCapitalize="none"
        multiline
        onChangeText={(text) => {
          setDescription(text);
        }}
        placeholder="Description"
        style={styles.inputDescription}
      />
      <View>
        <Pressable onPress={handleUpdate} style={styles.connexionButton}>
          <Text style={[styles.greyText, { fontSize: 16, fontWeight: "bold" }]}>
            Update
          </Text>
        </Pressable>
        <Pressable onPress={handleLogout} style={styles.connexionButton}>
          <Text style={[styles.greyText, { fontSize: 16, fontWeight: "bold" }]}>
            Logout
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};
const windowWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  //****************//
  //   CONTAINERS   //
  //****************//
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
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
  inputDescription: {
    borderColor: "#FFBAC0",
    borderWidth: 2,
    height: 100,
    padding: 5,
    width: windowWidth * 0.75,
  },
  //****************//
  //      TEXTE     //
  //****************//
  greyText: {
    color: "#8F8F8F",
  },
});

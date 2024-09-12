import Entypo from "@expo/vector-icons/Entypo";
import axios from "axios";
import Constants from "expo-constants";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import logo from "../../assets/airbnb-logo.png";

export default function App() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const handleSignin = async () => {
    const apiUrl = `${process.env.EXPO_PUBLIC_API_URL}/user/sign_up`;
    setError(null);

    if (!email) {
      setError("Email missing");
      return;
    }

    if (!password) {
      setError("Password missing");
      return;
    }
    if (!confirmPassword) {
      setError("Confirm password missing");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords are not the same");
      return;
    }
    setIsLoading(true);

    try {
      const response = await axios.post(apiUrl, {
        description: description,
        email: email,
        password: password,
        username: username,
      });
      setIsLoading(false);
      Alert.alert("Join !");
    } catch (error) {
      setError(error.response.data.error);
      setIsLoading(false);
      console.log(error.response.data.error);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <KeyboardAwareScrollView
        contentContainerStyle={[
          styles.container,
          {
            paddingTop:
              Platform.OS === "android" ? Constants.statusBarHeight : 0,
          },
        ]}
      >
        <StatusBar style="auto" />
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.connexionType}>Sign up</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            autoCapitalize="none"
            onChangeText={(text) => {
              setEmail(text);
            }}
            placeholder="Email"
            style={styles.input}
          />
          <TextInput
            autoCapitalize="none"
            onChangeText={(text) => {
              setUsername(text);
            }}
            placeholder="Username"
            style={styles.input}
          />
          <TextInput
            autoCapitalize="none"
            multiline
            onChangeText={(text) => {
              setDescription(text);
            }}
            placeholder="Description"
            style={styles.inputDescription}
          />
          <View>
            <TextInput
              autoCapitalize="none"
              onChangeText={(text) => {
                setPassword(text);
              }}
              placeholder="Password"
              secureTextEntry={!showPassword}
              style={styles.input}
            />
            {showPassword ? (
              <Entypo
                color="black"
                name="eye"
                onPress={() => {
                  setShowPassword(!showPassword);
                }}
                size={24}
                style={styles.eyeIcon}
              />
            ) : (
              <Entypo
                color="black"
                name="eye-with-line"
                onPress={() => {
                  setShowPassword(!showPassword);
                }}
                size={24}
                style={styles.eyeIcon}
              />
            )}
          </View>
          <View>
            <TextInput
              autoCapitalize="none"
              onChangeText={(text) => {
                setConfirmPassword(text);
              }}
              placeholder="Confirm password"
              secureTextEntry={!showPassword}
              style={styles.input}
            />
            {showPassword ? (
              <Entypo
                color="black"
                name="eye"
                onPress={() => {
                  setShowPassword(!showPassword);
                }}
                size={24}
                style={styles.eyeIcon}
              />
            ) : (
              <Entypo
                color="black"
                name="eye-with-line"
                onPress={() => {
                  setShowPassword(!showPassword);
                }}
                size={24}
                style={styles.eyeIcon}
              />
            )}
          </View>
          {error && (
            <Text style={{ color: "red", marginBottom: 20 }}>{error}</Text>
          )}
        </View>
        {isLoading ? (
          <ActivityIndicator style={styles.connexionFooter} />
        ) : (
          <View style={styles.connexionFooter}>
            <Pressable onPress={handleSignin} style={styles.connexionButton}>
              <Text
                style={[styles.greyText, { fontSize: 16, fontWeight: "bold" }]}
              >
                Sign up
              </Text>
            </Pressable>
            <Text
              onPress={() => {
                router.navigate("/");
              }}
              style={styles.greyText}
            >
              Already have an account? Sign in
            </Text>
          </View>
        )}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  //****************//
  //   CONTAINERS   //
  connexionButton: {
    alignItems: "center",
    borderColor: "#FF5A5E",
    borderRadius: 50,
    borderWidth: 3,
    marginBottom: 20,
    padding: 15,
    width: 200,
  },
  connexionFooter: {
    alignItems: "center",
    marginBottom: 50,
  },
  //****************//
  connexionType: {
    color: "#717171",
    fontSize: 22,
    fontWeight: "bold",
  },
  //****************//
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "space-between",
  },
  //****************//
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: Platform.OS === "ios" ? "auto" : 10,
  },
  //****************//
  //      TEXTE     //
  greyText: {
    color: "#8F8F8F",
  },
  //****************//
  input: {
    borderBottomColor: "#FFBAC0",
    borderBottomWidth: 2,
    paddingVertical: 7,
    width: windowWidth * 0.75,
  },
  //****************//
  //      INPUT     //
  inputContainer: {
    alignItems: "center",
    gap: 40,
  },
  inputDescription: {
    borderColor: "#FFBAC0",
    borderWidth: 2,
    height: 100,
    padding: 5,
    width: windowWidth * 0.75,
  },
  //****************//
  //      IMAGE     //
  //****************//
  logo: {
    height: 100,
    objectFit: "cover",
    width: 93,
  },
  //****************//
  //      ICONS     //
  logoContainer: {
    alignItems: "center",
    gap: 20,
    marginTop: 20,
  },
});

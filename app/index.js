import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Constants from "expo-constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Entypo from "@expo/vector-icons/Entypo";
import { useState } from "react";
import axios from "axios";
import { router } from "expo-router";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const handleSignin = async () => {
    const apiUrl = `${process.env.EXPO_PUBLIC_API_URL}/log_in`;
    setError(null);
    if (!email) {
      setError("Email missing");
      return;
    }

    if (!password) {
      setError("Password missing");
      return;
    }

    try {
      const response = await axios.post(apiUrl, {
        email: email,
        password: password,
      });
      Alert.alert("Connected");
    } catch (error) {
      setError(error.response.data.error);
      console.log(error.response.data.error);
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={[
        styles.container,
        {
          paddingTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
        },
      ]}
    >
      <StatusBar style="auto" />
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/airbnb-logo.png")}
          style={styles.logo}
        />
        <Text style={styles.connexionType}>Sign in</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          onChangeText={(text) => {
            setEmail(text);
          }}
          style={styles.input}
        />
        <View>
          <TextInput
            placeholder="Password"
            onChangeText={(text) => {
              setPassword(text);
            }}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            style={styles.input}
          />
          {showPassword ? (
            <Entypo
              name="eye"
              size={24}
              color="black"
              style={styles.eyeIcon}
              onPress={() => {
                setShowPassword(!showPassword);
              }}
            />
          ) : (
            <Entypo
              name="eye-with-line"
              size={24}
              color="black"
              style={styles.eyeIcon}
              onPress={() => {
                setShowPassword(!showPassword);
              }}
            />
          )}
        </View>
        {error && <Text style={{ color: "red" }}>{error}</Text>}
      </View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.connexionFooter}>
          <Pressable style={styles.connexionButton} onPress={handleSignin}>
            <Text
              style={[styles.greyText, { fontSize: 16, fontWeight: "bold" }]}
            >
              Sign in
            </Text>
          </Pressable>
          <Text
            onPress={() => {
              router.push("/signup");
            }}
            style={styles.greyText}
          >
            No account ? Register
          </Text>
        </View>
      )}
    </KeyboardAwareScrollView>
  );
}
const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  //****************//
  //   CONTAINERS   //
  //****************//
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
    gap: 20,
    marginTop: 70,
  },
  inputContainer: {
    gap: 40,
  },
  connexionFooter: {
    alignItems: "center",
    marginBottom: 50,
  },
  connexionButton: {
    width: 200,
    alignItems: "center",
    padding: 15,
    marginBottom: 20,
    borderColor: "#FF5A5E",
    borderWidth: 3,
    borderRadius: 50,
  },
  //****************//
  //      TEXTE     //
  //****************//
  connexionType: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#717171",
  },
  greyText: {
    color: "#8F8F8F",
  },
  //****************//
  //      INPUT     //
  //****************//
  input: {
    paddingVertical: 7,
    borderBottomColor: "#FFBAC0",
    borderBottomWidth: 2,
    width: windowWidth * 0.75,
  },
  //****************//
  //      IMAGE     //
  //****************//
  logo: {
    height: 100,
    width: 93,
    objectFit: "cover",
  },
  //****************//
  //      ICONS     //
  //****************//
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: Platform.OS === "ios" ? "auto" : 10,
  },
});

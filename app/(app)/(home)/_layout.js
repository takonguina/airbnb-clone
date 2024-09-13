import { Stack } from "expo-router";
import { View, Image, StyleSheet } from "react-native";
import logo from "../../../assets/airbnb-logo.png";

export default HomeLayout = () => {
  return (
    <Stack
      screenOptions={{
        header: () => (
          <View style={styles.logoContainer}>
            <Image source={logo} style={styles.logo} />
          </View>
        ),
      }}
    >
      <Stack.Screen name="home" />
      <Stack.Screen name="room" options={{ title: "Room" }} />
    </Stack>
  );
};

const styles = StyleSheet.create({
  //****************//
  //   CONTAINERS   //
  //****************//
  logoContainer: {
    alignItems: "center",
    paddingBottom: 10,
    borderBottomColor: "#d3d3d3",
    borderBottomWidth: 0.5,
    paddingTop: 50,
  },
  //****************//
  //      IMAGE     //
  //****************//
  logo: {
    height: 32.5,
    width: 30.5,
    objectFit: "cover",
  },
});

import { router, Stack } from "expo-router";
import { View, Image, StyleSheet } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Header from "../../../components/header/header";

export default HomeLayout = () => {
  return (
    <Stack
    // screenOptions={{
    //   header: () => <Header />,
    // }}
    >
      <Stack.Screen name="home" options={{ header: () => <Header /> }} />
      <Stack.Screen
        name="room"
        options={{
          header: () => <Header goBack />,
        }}
      />
    </Stack>
  );
};

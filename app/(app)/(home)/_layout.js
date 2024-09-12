import { Stack } from "expo-router";

export default HomeLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="home" options={{ headerShown: false }} />
      <Stack.Screen name="room" options={{ title: "Room" }} />
    </Stack>
  );
};

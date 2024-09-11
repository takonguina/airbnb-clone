import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import { Tabs } from "expo-router";

export default AppLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="(home)"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Entypo color={color} name="home" size={24} />
          ),
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo color={color} name="map" size={24} />
          ),
          title: "Map",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color }) => (
            <Feather color={color} name="user" size={20} />
          ),
          title: "Profile",
        }}
      />
    </Tabs>
  );
};

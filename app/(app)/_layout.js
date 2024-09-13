import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { Text } from "react-native";
import Header from "../../components/header/header";

export default AppLayout = () => {
  return (
    <Tabs
      screenOptions={{
        header: () => <Header />,
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <Entypo name="home" color={focused ? "#FF5A5E" : color} size={24} />
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color: focused ? "#FF5A5E" : color, fontSize: 12 }}>
              Home
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <FontAwesome
              name="map-marker"
              size={24}
              color={focused ? "#FF5A5E" : color}
            />
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color: focused ? "#FF5A5E" : color, fontSize: 12 }}>
              Around me
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Feather
              name="user"
              size={24}
              color={focused ? "#FF5A5E" : color}
            />
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color: focused ? "#FF5A5E" : color, fontSize: 12 }}>
              My profile
            </Text>
          ),
        }}
      />
    </Tabs>
  );
};

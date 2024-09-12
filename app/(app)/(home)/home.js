import axios from "axios";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import logo from "../../../assets/airbnb-logo.png";
import RoomPreview from "../../../components/home/roomPreview";
import Constants from "expo-constants";

const height = Dimensions.get("window").height;

export default Home = () => {
  const [rooms, setRooms] = useState([]);
  const handleRooms = async () => {
    try {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/rooms`
      );
      setRooms(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    handleRooms();
  }, []);

  return (
    <SafeAreaView
      style={{
        paddingTop:
          Platform.OS === "android" ? Constants.statusBarHeight * 2 : 0,
      }}
    >
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
      </View>
      <View>
        {rooms.length === 0 ? (
          <ActivityIndicator size={"large"} style={{ marginTop: 300 }} />
        ) : (
          <FlatList
            contentContainerStyle={{
              paddingTop: 10,
              paddingBottom: 100,
            }}
            data={rooms}
            keyExtractor={(item) => String(item._id)}
            renderItem={(item) => <RoomPreview room={item} />}
          />
        )}
      </View>
    </SafeAreaView>
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

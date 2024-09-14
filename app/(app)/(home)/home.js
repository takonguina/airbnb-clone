import axios from "axios";
import { useEffect, useRef, useState } from "react";
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
import RoomPreview from "../../../components/home/roomPreview";
import Constants from "expo-constants";
import LottieView from "lottie-react-native";

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
    <SafeAreaView>
      <View>
        {rooms.length === 0 ? (
          <LottieView
            source={require("../../../assets/homeLoading.json")}
            style={{ width: "100%", height: "100%" }}
            autoPlay
            loop
          />
        ) : (
          <FlatList
            contentContainerStyle={{
              paddingTop: 10,
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

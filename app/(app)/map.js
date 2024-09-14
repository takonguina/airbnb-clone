import { ActivityIndicator, SafeAreaView, StyleSheet } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { useEffect, useState } from "react";
import axios from "axios";

export default MapPage = () => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [coords, setCoords] = useState();
  const [roomsAroundMe, setRoomsAroundMe] = useState([]);

  useEffect(() => {
    const askPermission = async () => {
      setError();
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        let location = await Location.getCurrentPositionAsync();
        const obj = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        setCoords(obj);
        setIsLoading(false);
      } else {
        setError(true);
      }
    };
    const getAroundMe = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.EXPO_PUBLIC_API_URL}/rooms/around`,
          {
            params: { latitude: 48.866667, longitude: 2.333333 },
          }
        );
        setRoomsAroundMe(data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    askPermission();
    getAroundMe();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 48.866667,
            longitude: 2.333333,
            latitudeDelta: 0.2,
            longitudeDelta: 0.2,
          }}
          showsUserLocation={true}
        >
          {roomsAroundMe.map((marker) => {
            return (
              <Marker
                key={marker._id}
                coordinate={{
                  latitude: marker.location[1],
                  longitude: marker.location[0],
                }}
                title={marker.title}
                description={marker.description}
              />
            );
          })}
        </MapView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  map: { flex: 1, width: "100%", height: "100%" },
});

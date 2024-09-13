import { SafeAreaView, StyleSheet } from "react-native";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import { useState } from "react";

export default MapPage = () => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [coords, setCoords] = useState();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 48.856614,
          longitude: 2.3522219,
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  map: { flex: 1, width: "100%", height: "100%" },
});

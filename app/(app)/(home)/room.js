import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import {
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const width = Dimensions.get("window").width;

export default RoomView = () => {
  const { id } = useLocalSearchParams();
  const [room, setRoom] = useState(null);

  useEffect(() => {
    const handleRoom = async () => {
      try {
        const { data } = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/${id}`
        );
        setRoom(data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    handleRoom();
  }, [id]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {room && (
        <View style={{ alignItems: "center" }}>
          <ImageBackground
            source={{ uri: room.photos[1].url }}
            style={styles.img}
          >
            <View style={styles.priceView}>
              <Text style={styles.price}>{room.price} €</Text>
            </View>
          </ImageBackground>
          <View style={styles.previewDescription}>
            <View style={styles.detailsRoom}>
              <Text style={styles.title} ellipsizeMode="tail" numberOfLines={1}>
                {room.title}
              </Text>
              <View style={styles.notePreview}>
                <StarRating rating={room.ratingValue} />
                <Text style={styles.reviews}>{room.reviews} reviews</Text>
              </View>
            </View>
            <Image
              source={{ uri: room.user.account.photo.url }}
              style={styles.avatar}
            />
          </View>
          <View style={styles.overviewContainer}>
            <Text
              style={styles.overviewText}
              ellipsizeMode="tail"
              numberOfLines={3}
            >
              {room.description}
            </Text>
          </View>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: room.location[1],
              longitude: room.location[0],
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
          >
            <Marker
              key={id}
              coordinate={{
                latitude: room.location[1],
                longitude: room.location[0],
              }}
            />
          </MapView>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  //****************//
  //   CONTAINERS   //
  //****************//
  previewDescription: {
    marginVertical: 10,
    flexDirection: "row",
    maxWidth: width * 0.9,
  },
  previewContainer: {
    alignItems: "center",
  },
  priceView: {
    backgroundColor: "black",
    padding: 10,
    maxWidth: 80,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  detailsRoom: {
    justifyContent: "space-between",
    marginRight: 10,
    padding: 5,
  },
  notePreview: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  overviewContainer: {
    width: width * 0.9,
    marginBottom: 15,
  },
  //****************//
  //      IMG       //
  //****************//
  avatar: {
    height: 65,
    width: 65,
    borderRadius: 50,
  },
  img: {
    height: 250,
    width: "100%",
    justifyContent: "flex-end",
  },
  //****************//
  //      TEXT      //
  //****************//
  price: {
    fontSize: 20,
    color: "white",
  },
  title: {
    fontSize: 19,
    width: width * 0.9 - 75,
  },
  reviews: {
    color: "#BBBBBB",
  },
  overviewText: {
    fontSize: 16,
    textAlign: "justify",
  },
  map: {
    width: "100%",
    height: 260,
  },
});

import { router } from "expo-router";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import StarRating from "./starRating";
const width = Dimensions.get("window").width;

export default RoomPreview = ({ room }) => {
  const { _id, price, title, ratingValue, reviews } = room.item;
  const avatar = room.item.user.account.photo.url;
  const preview = room.item.photos[1].url;

  return (
    <Pressable
      style={styles.previewContainer}
      onPress={() => {
        router.push("/room");
      }}
    >
      <View>
        <Image source={{ uri: preview }} style={styles.imgPreview} />
        <View style={styles.priceView}>
          <Text style={styles.price}>{price} €</Text>
        </View>
        <View style={styles.previewDescription}>
          <View style={styles.detailsRoom}>
            <Text style={styles.title} ellipsizeMode="tail" numberOfLines={1}>
              {title}
            </Text>
            <View style={styles.notePreview}>
              <StarRating rating={ratingValue} />
              <Text style={styles.reviews}>{reviews} reviews</Text>
            </View>
          </View>
          <Image source={{ uri: avatar }} style={styles.avatar} />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  //****************//
  //   CONTAINERS   //
  //****************//
  previewContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  priceView: {
    position: "absolute",
    backgroundColor: "black",
    padding: 10,
    minWidth: 80,
    left: 0,
    top: 110,
    justifyContent: "center",
    alignItems: "center",
  },
  previewDescription: {
    marginVertical: 10,
    paddingBottom: 10,
    flexDirection: "row",
    maxWidth: width * 0.9,
    borderBottomColor: "#d3d3d3",
    borderBottomWidth: 1,
  },
  detailsRoom: {
    justifyContent: "space-between",
    paddingBottom: 5,
    marginRight: 10,
  },
  notePreview: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  //****************//
  //      IMG       //
  //****************//
  imgPreview: {
    height: 170,
    width: width * 0.9,
  },
  avatar: {
    height: 65,
    width: 65,
    borderRadius: 50,
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
});

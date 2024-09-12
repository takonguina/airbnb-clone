import { Text, StyleSheet, View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";

export default StarRating = ({ rating }) => {
  const totalStars = 5;
  return (
    <View style={{ flexDirection: "row" }}>
      {Array.from({ length: totalStars }, (_, index) => (
        <Entypo
          name="star"
          size={18}
          // Jaune pour les étoiles pleines, gris pour les étoiles vides
          color={index < rating ? "#FFB107" : "#BBBBBB"}
        />
      ))}
    </View>
  );
};
const styles = StyleSheet.create({});

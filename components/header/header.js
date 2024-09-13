import { Image, StyleSheet, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import logo from "../../assets/airbnb-logo.png";
import { router } from "expo-router";

export default Header = ({ goBack }) => {
  return (
    <View style={styles.logoContainer}>
      {goBack && (
        <AntDesign
          name="arrowleft"
          size={24}
          color="black"
          style={styles.goBackButton}
          onPress={() => {
            router.back();
          }}
        />
      )}
      <Image source={logo} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  //****************//
  //   CONTAINERS   //
  //****************//
  logoContainer: {
    alignItems: "center",
    paddingVertical: 10,
    borderBottomColor: "#d3d3d3",
    borderBottomWidth: 0.5,
    paddingTop: 60,
    backgroundColor: "white",
  },
  //****************//
  //      IMAGE     //
  //****************//
  logo: {
    height: 32.5,
    width: 30.5,
    objectFit: "cover",
  },
  //****************//
  //      IMAGE     //
  //****************//
  goBackButton: {
    position: "absolute",
    left: 10,
    bottom: 10,
  },
});

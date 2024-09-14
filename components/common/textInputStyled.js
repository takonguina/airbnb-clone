import { Dimensions, StyleSheet, TextInput } from "react-native";

export default TextInputStyled = ({ setState, placeholder }) => {
  return (
    <TextInput
      autoCapitalize="none"
      onChangeText={(text) => {
        setState(text);
      }}
      placeholder={placeholder}
      style={styles.input}
    />
  );
};

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  input: {
    borderBottomColor: "#FFBAC0",
    borderBottomWidth: 2,
    paddingVertical: 7,
    width: windowWidth * 0.75,
  },
});

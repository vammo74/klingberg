import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ScreenPicture = () => {
  return (
    <View style={styles.screenContainer}>
      <View style={styles.productScreen}>
        <Text style={styles.text}>Produkten</Text>
      </View>
      <View style={styles.productScreen}>
        <Text style={styles.text}>Svaret</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flexDirection: "row",
    padding: 5,
    backgroundColor: "#ccc",

    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "black",
    margin: "2%",
  },
  productScreen: {
    flex: 1,
    backgroundColor: "#ccd4cb",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "black",
    paddingTop: 3,
    paddingBottom: 3,
    margin: "2%",
  },
  text: {
    textAlign: "center",
    fontSize: 20,
  },
});

export default ScreenPicture;

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const InfoButton = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.button}
        onPress={props.onPress}
      >
        <Text style={styles.text}>{props.title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#00b3b3",
    
    justifyContent: "center",
    alignContent: "center",
    borderWidth: 3,
    borderRadius: 20,
    borderColor: "#fff",

    width: 30,
    height: 30,
    elevation: 5,
  },
  text: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    fontFamily: "serif",
    color: "#fff",
  },
});

export default InfoButton;

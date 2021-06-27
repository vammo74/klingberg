import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  ScrollView,
  Pressable,
  Modal,
  TouchableOpacity,
} from "react-native";

import ButtonPicture from "./ButtonPicture";
import TablePicture from "./TablePicture";
import ScreenPicture from "./ScreenPicture";

const PopUp = (props) => {
  return (
    //  <Modal animationType="none" transparent={true} visible={props.popupped}>
    <View style={styles.container}>
      <Pressable onPress={props.closePopup} style={styles.underlay} />
      <View style={styles.window}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.h1}>Multiplikation Övningar:</Text>
        </ScrollView>
        <Button onPress={props.closePopup} title="Close" />
      </View>
    </View>
    //  </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  window: {
    backgroundColor: "#fff",
    width: "85%",
    height: "85%",
    alignSelf: "center",
    borderColor: "#000",
    borderRadius: 5,
    borderStyle: "solid",
    borderWidth: 1,
    elevation: 5,
  },
  scrollView: {
    margin: "5%",
  },
  underlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    opacity: 0.5,
    backgroundColor: "#000",
  },
  h1: {
    color: "#19386b",
    fontSize: 25,
    marginBottom: 6,
    marginTop: 2,
    fontWeight: "bold",
    textAlign: "center",
  },
  h2: {
    color: "#19386b",
    fontSize: 20,
    marginBottom: 6,
    marginTop: 2,
    fontStyle: "italic",
    textAlign: "center",
  },
  h3: {
    color: "#19386b",
    fontSize: 20,
    marginBottom: 6,
    marginTop: 2,
    fontWeight: "bold",
  },
  p: {
    flexDirection: "row",
    color: "#224c91",
    fontSize: 15,
    marginBottom: 4,
    marginTop: 2,
  },
  bold: {
    fontWeight: "bold",
  },
});

export default PopUp;

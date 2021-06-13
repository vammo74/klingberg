import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  ScrollView,
  Pressable,
} from "react-native";

const generateTablePictures = (num) => {
  let data = [];
  let row = [];
  let val = 0;
  let color = "";
  for (let n = 4; n > 0; n--) {
    row = [];
    for (let m = 1; m < 5; m++) {
      val = n * m;
      if (n === 1 || m === 1) {
        color = "#9377a6";
        textColor = "black";
      } else {
        color = "#d7b7ed";
        textColor = "black";
      }
      if (num === 2) {
        if (n === 3) {
          color = "#7121a6";
          textColor = "white";
        }
      }
      if (num === 3) {
        if (n === 3 || m === 2) {
          color = "#7121a6";
          textColor = "white";
        }
        if (n === 3 && m === 2) {
          color = "#580c7a";
          textColor = "white";
        }
      }

      row.push({ val: val, color: color, textColor: textColor });
    }
    data.push(row);
  }
  return data;
};

const PopUp = (props) => {
  const pictureOne = useState(generateTablePictures(1));
  console.log(pictureOne);
  const pictureTwo = useState(generateTablePictures(2));
  const pictureThree = useState(generateTablePictures(3));
  const pressHandler = () => {
    console.log("pressed");
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.overlay} onPress={props.onClose} />
      <View style={styles.window}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.h1}>Multiplikation Övningar:</Text>
          <Text style={styles.h2}>
            Lär dig att kommer ihåg multiplikationstabelen.
          </Text>
          <Text style={styles.h3}>Premis</Text>
          <Text style={styles.p}>ToDo....</Text>
          <Text style={styles.h3}>Skärm</Text>
          <Text style={styles.p}>ToDo....</Text>
          <Text style={styles.h3}>Number Pad</Text>
          <Text style={styles.p}>ToDo....</Text>
          <Text style={styles.h3}>Interaktiva tabelen</Text>
          <View style={{ alignSelf: "center" }}>
            {pictureOne[0].map((row, i) => {
              return (
                <View
                  key={i + 1000}
                  style={{ flexDirection: "row", width: "50%" }}
                >
                  {row.map((cell, x) => {
                    return (
                      <View
                        key={x + 10000}
                        style={{
                          backgroundColor: cell.color,
                          flex: 1,
                          margin: "1%",
                          paddingTop: "2%",
                          paddingBottom: "2%",
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: cell.textColor,
                            textAlign: "center",
                          }}
                        >
                          {cell.val}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              );
            })}
          </View>
          <Text style={styles.p}>ToDo....</Text>
          <View style={{ alignSelf: "center" }}>
            {pictureTwo[0].map((row, i) => {
              return (
                <View
                  key={i + 1040}
                  style={{ flexDirection: "row", width: "50%" }}
                >
                  {row.map((cell, x) => {
                    return (
                      <View
                        key={x + 10040}
                        style={{
                          backgroundColor: cell.color,
                          flex: 1,
                          margin: "1%",
                          paddingTop: "2%",
                          paddingBottom: "2%",
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: cell.textColor,
                            textAlign: "center",
                          }}
                        >
                          {cell.val}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              );
            })}
          </View>
          <Text style={styles.p}>ToDo....</Text>
          <View style={{ alignSelf: "center" }}>
            {pictureThree[0].map((row, i) => {
              return (
                <View
                  key={i + 1080}
                  style={{ flexDirection: "row", width: "50%" }}
                >
                  {row.map((cell, x) => {
                    return (
                      <View
                        key={x + 10080}
                        style={{
                          backgroundColor: cell.color,
                          flex: 1,
                          margin: "1%",
                          paddingTop: "2%",
                          paddingBottom: "2%",
                          justifyContent: "center",
                        }}
                      >
                        <Text style={{ color: cell.textColor }}>
                          {cell.val}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              );
            })}
          </View>
          <Text style={styles.p}>ToDo....</Text>
          <Text style={styles.h3}>Nivå och Timer inställning</Text>
          <Text style={styles.p}>
            Med programmet stoppat kan man ändra nivån och timerhastighet.
          </Text>
          <Text style={styles.p}>
            <Text style={styles.bold}>Nivån</Text> ändras genom att skiva in 13
            och den önskade nivå (1 till 9). Till exempel, för att välja nivå 4,
            tryck:
          </Text>
          <Text style={styles.pc}>
            <View style={styles.redButton}>
              <Text style={styles.blackButtonText}> stop </Text>
            </View>{" "}
            <View style={styles.greenButton}>
              <Text style={styles.whiteButtonText}> enter </Text>
            </View>{" "}
            <View style={styles.pinkButton}>
              <Text style={styles.blackButtonText}> 1 </Text>
            </View>{" "}
            <View style={styles.pinkButton}>
              <Text style={styles.blackButtonText}> 3 </Text>
            </View>{" "}
            <View style={styles.pinkButton}>
              <Text style={styles.blackButtonText}> 4 </Text>
            </View>{" "}
            <View style={styles.greenButton}>
              <Text style={styles.whiteButtonText}> enter </Text>
            </View>{" "}
          </Text>
          <Text style={styles.p}>
            <Text style={styles.bold}>Timerhastighet</Text> ändras genom att
            skriva in 77 och önskade nivån (1 till 9), 1 är långsam och 9
            snabbt. Till exempel, för att välja nivå 4, tryck:
          </Text>
          <Text style={styles.pc}>
            <View style={styles.redButton}>
              <Text style={styles.blackButtonText}> stop </Text>
            </View>{" "}
            <View style={styles.greenButton}>
              <Text style={styles.whiteButtonText}> enter </Text>
            </View>{" "}
            <View style={styles.pinkButton}>
              <Text style={styles.blackButtonText}> 7 </Text>
            </View>{" "}
            <View style={styles.pinkButton}>
              <Text style={styles.blackButtonText}> 7 </Text>
            </View>{" "}
            <View style={styles.pinkButton}>
              <Text style={styles.blackButtonText}> 4 </Text>
            </View>{" "}
            <View style={styles.greenButton}>
              <Text style={styles.whiteButtonText}> enter </Text>
            </View>{" "}
          </Text>
        </ScrollView>
        <Button title="Close" onPress={props.onClose} />
      </View>
    </View>
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
  overlay: {
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
    marginBottom: 4,
    fontWeight: "bold",
    textAlign: "center",
  },
  h2: {
    color: "#19386b",
    fontSize: 20,
    marginBottom: 5,
    fontStyle: "italic",
    textAlign: "center",
  },
  h3: {
    color: "#19386b",
    fontSize: 20,
    marginBottom: 3,
    fontWeight: "bold",
  },
  p: {
    flexDirection: "row",
    color: "#224c91",
    fontSize: 15,
    marginBottom: 2,
  },
  pc: {
    flexDirection: "row",
    color: "#224c91",
    fontSize: 15,
    marginBottom: 2,
    marginLeft: 30,
  },
  bold: {
    fontWeight: "bold",
  },
  greenButton: {
    textAlign: "center",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "black",
    backgroundColor: "green",
  },
  redButton: {
    textAlign: "center",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "black",
    backgroundColor: "red",
  },
  pinkButton: {
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 3,
    borderColor: "black",
    backgroundColor: "pink",
  },
  blackButtonText: {
    color: "black",
    fontWeight: "bold",
  },
  whiteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default PopUp;

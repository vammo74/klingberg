import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, StatusBar } from 'react-native';
import Calculator from "./components/Calculator/Calculator";
import Table from "./components/Table/Table";
import InfoButton from "./components/UI/Buttons/InfoButton";
import PopUp from "./components/UI/PopUp/PopUp";


const App = () => {
  const [level, setLevel] = useState(3);
  const [popupped, setPopupped] = useState(true);

  const changeLevelHandler = (flag) => {
    if (flag === "up" && level <= 10) {
      setLevel((prevLevel) => prevLevel + 1);
    }
    if (flag === "down" && level > 0) {
      setLevel((prevLevel) => prevLevel - 1);
    }
  };
  const updateLevelHandler = (newLevel) => {
    setLevel(newLevel);
  };

  const popUpStyles = StyleSheet.create({
    popup: {
      flex: 1,
      position: "absolute",
      flexDirection: "column",
      justifyContent: "center",
      alignContent: "center",
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,

    },
    underlay: {
      flex: 1,
      position: "absolute",
      flexDirection: "column",
      justifyContent: "center",
      alignContent: "center",
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      opacity: 0.5,
      backgroundColor: "black",
    },
  });



  const popUpHandler = () => {
    console.log('pressed')
    console.log(popUpStyles.popup)
    setPopupped(true);
  };

  const popUpCancelerHandler = () => {
    console.log("pressed");
    console.log(popUpStyles);
    setPopupped(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <PopUp popupped={popupped} closePopup={popUpCancelerHandler} />
      <View style={styles.game}>
        <View style={{ flexDirection: "row", alignContent: "center" }}>
          <Text style={styles.text}>Multiplikation Övning</Text>
          <InfoButton title="i" onPress={popUpHandler} />
        </View>
        <Table level={level} />
        <Calculator
          level={level}
          onUpdateLevel={updateLevelHandler}
          onChangeLevel={(flag) => changeLevelHandler(flag)}
        />
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  game: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#8d8e96",

    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    margin: 0,
  },
  text: {
    color: "black",
    fontSize: 25,
    margin: "3%",
  },
});

export default App;

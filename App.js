import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, StatusBar, Modal } from 'react-native';
// import AsyncStorage from "@react-native-async-storage/async-storage";
import MMKVStorage from "react-native-mmkv-storage";
import Calculator from "./components/Calculator/Calculator";
import Table from "./components/Table/Table";
import InfoButton from "./components/UI/Buttons/InfoButton";
import PopUp from "./components/UI/PopUp/PopUp";

// const STORAGE_KEY = '@save_stats'

MMKV = new MMKVStorage.Loader().initialize();

const App = () => {
  console.log("App")
  const [level, setLevel] = useState(3);
  const [popupped, setPopupped] = useState(false);
  const [savedStats, setSavedStats] = useState(
    '{"level":4,"product":"","products":["5 × 9","5 × 8","4 × 7","2 × 2","2 × 3","2 × 4","2 × 5","2 × 6","2 × 7","2 × 8","2 × 9","2 × 10","3 × 3","3 × 4","3 × 5","3 × 6","3 × 7","3 × 8","3 × 9","4 × 4","4 × 5","4 × 6","4 × 8","4 × 9","4 × 10","5 × 5","5 × 6","5 × 7","5 × 10","6 × 6","6 × 7","6 × 8","6 × 9","6 × 10","7 × 7","7 × 8","7 × 9","7 × 10","8 × 8","8 × 9","8 × 10","9 × 9","9 × 10","10 × 10"],"levelAttempts":true}'
  );

  // const saveStats = async () => {
  //   try {
  //     await AsyncStorage.setItem(STORAGE_KEY, savedStats)
  //     alert("Data successfully saved: " + savedStats)
  //   } catch (e) {
  //     alert('Failed to save the data to the storage')
  //   }
  // }

  const saveStats = () => {
    console.log(savedStats)
    MMKV.setString("savedStats", savedStats);
  }
  
  // const readStats = async () => {
  //   try {
  //     const stats = await AsyncStorage.getItem(STORAGE_KEY)

  //     if (stats !== null) {
  //       setSavedStats(stats);
        
  //     }
  //   } catch (e) {
  //     alert('Failed to fetch the data from storage')
  //   }
  // }

  const readStats = () => {
    MMKV.getString("savedStats", (error, result) => {
      if (error) {
        console.log(error);
        return;
      }
    
      setSavedStats(result);
      console.log("result: " + result)
    });
  }

  // const clearStats = async () => {
  //   try {
  //     await AsyncStorage.clear()
  //     alert('Storage successfully cleared!')
  //   } catch (e) {
  //     alert('Failed to clear the async storage.')
  //   }
  // }

  const clearStats = () => {
    
  }

  // useEffect(() => {
  //   console.log("read");
  //   readStats();
    
  // }, [])

  const passStatsHandler = (passedStats) => {
    setSavedStats(passedStats);
    saveStats()
  }

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


  const popupOpenHandler = () => {
    setPopupped(true);
  };

  const popupCloseHandler = () => {
    console.log("pressed")
    setPopupped(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <PopUp popupped={popupped} closePopup={popupCloseHandler} />
      <Modal>
      <View style={styles.game}>
        <View style={styles.header}>
          <View style={styles.title}><Text style={styles.text}>Multiplikation Övning</Text></View>
          <InfoButton title="i" onPress={popupOpenHandler} />
        </View>
        <Table level={level} popupped={popupped}/>
        <Calculator
          level={level}
          onUpdateLevel={updateLevelHandler}
          onChangeLevel={(flag) => changeLevelHandler(flag)}
          onSaveStats={saveStats}
          onClearStats={clearStats}
          onPassStats={passStatsHandler}
          readStats={readStats}
          savedStats={savedStats}
        />
        </View>
      </Modal>
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
  header: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    alignSelf: "center"
  },
  title: {
    flex: 5,
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid",
    backgroundColor: "#ccc",
    margin: "2%",
    marginLeft: "6%",
    elevation: 5,
    

  },
  text: {
    textAlign: "center",
    color: "black",
    fontSize: 25,
    margin: "3%",
  },
});

export default App;

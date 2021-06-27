import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, SafeAreaView, StatusBar, Modal } from 'react-native';

import MMKVStorage from "react-native-mmkv-storage";
import Calculator from "./components/Calculator/Calculator";
import Table from "./components/Table/Table";
import InfoButton from "./components/UI/Buttons/InfoButton";
import PopUp from "./components/UI/PopUp/PopUp";



MMKV = new MMKVStorage.Loader().initialize();

class App extends Component {
  constructor() {
    super();
    this.state = {
      level: 3,
      popupped: false,
      savedStats: { level: 4, products: ["5 × 9", "5 × 8", "4 × 7", "2 × 2", "2 × 3", "2 × 4", "2 × 5", "2 × 6", "2 × 7", "2 × 8", "2 × 9", "2 × 10", "3 × 3", "3 × 4", "3 × 5", "3 × 6", "3 × 7", "3 × 8", "3 × 9", "4 × 4", "4 × 5", "4 × 6", "4 × 8", "4 × 9", "4 × 10", "5 × 5", "5 × 6", "5 × 7", "5 × 10", "6 × 6", "6 × 7", "6 × 8", "6 × 9", "6 × 10", "7 × 7", "7 × 8", "7 × 9", "7 × 10", "8 × 8", "8 × 9", "8 × 10", "9 × 9", "9 × 10", "10 × 10"], levelAttempts: true },
    }
    this.saveStats = () => {
      console.log(JSON.stringify(this.state.savedStats))
      MMKV.setMap("savedStats", this.state.savedStats);
    }

    this.readStats = () => {
      MMKV.getMap("savedStats", (error, result) => {
        if (error) {
          console.log("error: ", error);
          return savedStats;
        }

        this.setState({ savedStats: result });
        this.setState({ level: result.level })

        console.log("result")
      });
    }

    this.clearStats = () => {
      MMKV.clearStorage()

    }

  }

  componentDidMount() {
    //   this.readStats()
  }

  componentWillUnmount() {
    //   this.saveStats()
  }

  render() {


    const passStatsHandler = (passedStats) => {
      let stats = { level: this.state.level, ...passedStats }
      this.setState({ savedStats: stats });
      this.saveStats()
    }

    const changeLevelHandler = (flag) => {
      if (flag === "up" && this.state.level <= 10) {
        this.setState((state) => {
          return { level: state.level + 1 };
        })
      }
      if (flag === "down" && this.state.level > 0) {
        this.setState((state) => {
          return { level: state.level - 1 };
        })
      }
    };

    const updateLevelHandler = (newLevel) => {
      this.setState({ level: newLevel });
    };


    const popupOpenHandler = () => {
      console.log("popup")
      this.setState({ popupped: true });
    };

    const popupCloseHandler = () => {
      console.log("popup down")
      this.setState({ popupped: false });
    };

    return (
      <SafeAreaView style={styles.container}>
        <Modal animationType="none"
          transparent={true}
          visible={this.state.popupped}
          style={{ elevation: 10 }}>
          <PopUp closePopup={popupCloseHandler} />
        </Modal>
        <Modal visible={true}>
          <View style={styles.game}>
            <View style={styles.header}>

              <Button title="i"
                onPress={popupOpenHandler}
              />
            </View>
            <Table />
            <Calculator
              level={this.state.level}
              onUpdateLevel={updateLevelHandler}
              onChangeLevel={(flag) => changeLevelHandler(flag)}
              onSaveStats={() => { this.saveStats() }}
              onClearStats={() => { this.clearStats() }}
              onPassStats={passStatsHandler}
              readStats={() => { this.readStats() }}
              savedStats={this.state.savedStats}
            />
          </View>
        </Modal>
        <StatusBar style="auto" />
      </SafeAreaView>
    );
  };
}
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

import React, {Component, createRef} from 'react';
import {StyleSheet, View, Modal, SafeAreaView, StatusBar} from 'react-native';
import Calculator from './components/Calculator/Calculator';
import Table from './components/Table/Table';
import PopUp from "./components/UI/PopUp/PopUp";
import InfoButton from "./components/UI/Buttons/InfoButton";

class App extends Component {
  constructor() {
    super();
    this.state = {
      level: 4,
      popupped: false,
    };
    this.tableRef = createRef();
  }

  componentDidMount() {
    console.log("mount app");
  }

  componentWillUnmount() {
    console.log("unmount app");
  }

  render() {
    const popupOpenHandler = () => {
      console.log("popup on");
      this.setState({ popupped: true });
    };

    const popupCloseHandler = () => {
      console.log("popup off");
      this.setState({ popupped: false });
    };

    const updateLevelHandler = (newLevel) => {
      this.setState({ level: newLevel });
      this.tableRef.current.updateTableLevel(newLevel);
    };
    const incrementLevelHandler = () => {};

    return (
      <View style={styles.container}>
        <Modal
          animationType="none"
          transparent={true}
          visible={this.state.popupped}
          style={{ elevation: 10 }}
        >
          <PopUp closePopup={popupCloseHandler} />
        </Modal>
        <Modal>
          <View style={styles.game}>
            <Table level={this.state.level} ref={this.tableRef} />
            <Calculator
              onIncrementLevel={incrementLevelHandler}
              onUpdateLevel={updateLevelHandler}
              level={this.state.level}
              onGetInfo={popupOpenHandler}
            />
          </View>
          <StatusBar style="auto" />
        </Modal>
      </View>
    );
  }
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
    alignSelf: "center",
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

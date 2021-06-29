import React, {Component, createRef} from 'react';
import {
  StyleSheet,
  View,
  Modal,
  SafeAreaView,
  StatusBar,
  AppState,
} from 'react-native';

import MMKVStorage from 'react-native-mmkv-storage';

import Calculator from './components/Calculator/Calculator';
import Table from './components/Table/Table';
import PopUp from './components/UI/PopUp/PopUp';

const MMKV = new MMKVStorage.Loader().initialize(); // Returns an MMKV Instance

class App extends Component {
  constructor() {
    super();
    this.state = {
      level: 4,
      popupped: true,
      savedStats: {
        levelAttempts: true,
        products: [
          '2 × 2',
          '2 × 3',
          '2 × 4',
          '2 × 5',
          '2 × 6',
          '2 × 7',
          '2 × 8',
          '2 × 9',
          '2 × 10',
          '3 × 3',
          '3 × 4',
          '3 × 5',
          '3 × 6',
          '3 × 7',
          '3 × 8',
          '3 × 9',
          '4 × 4',
          '4 × 5',
          '4 × 6',
          '4 × 7',
          '4 × 8',
          '4 × 9',
          '4 × 10',
          '5 × 5',
          '5 × 6',
          '5 × 7',
          '5 × 9',
          '5 × 8',
          '5 × 10',
          '6 × 6',
          '6 × 7',
          '6 × 8',
          '6 × 9',
          '6 × 10',
          '7 × 7',
          '7 × 8',
          '7 × 9',
          '7 × 10',
          '8 × 8',
          '8 × 9',
          '8 × 10',
          '9 × 9',
          '9 × 10',
          '10 × 10',
        ],
      },
    };
    this.cleared = true;
    this.tableRef = createRef();
    this.calculatorRef = createRef();
    this.loadStats = this.loadStats.bind(this);
    this.saveStats = this.saveStats.bind(this);
    this.clearStats = this.clearStats.bind(this);
  }

  loadStats() {
    console.log('loading');
    MMKV.getMap('savedStats', (error, result) => {
      if (error) {
        console.log(error);
        this.cleared = false;

        return;
      }

      let object = result;
      if (object) {
        this.setState(object);
      }
      this.cleared = false;
      console.log('load', object); // logs object
    });
  }

  saveStats() {
    console.log(this.state);
    if (!this.cleared) {
      console.log('saving');
      MMKV.setMap('savedStats', this.state);
    }
  }

  clearStats() {
    this.cleared = true;
    MMKV.clearStore();
  }

  _handleAppStateChange = nextAppState => {
    if (nextAppState === 'background' || nextAppState === 'inactive') {
      this.calculatorRef.passStats();
      this.saveStats();
    }
  };

  componentDidMount() {
    this.cleared = false;
    AppState.addEventListener('change', this._handleAppStateChange);
    this.loadStats();
    setTimeout(() => {
      this.tableRef.current.updateTableLevel(this.state.level);
    }, 50);
    console.log('mount app');
  }

  componentWillUnmount() {
    if (!this.cleared) {
      AppState.removeEventListener('change', this._handleAppStateChange);
      console.log('unmount app');
    }
  }

  render() {
    const passStatsHandler = newStats => {
      this.setState(() => {
        return {savedStats: newStats};
      });
      this.saveStats();
    };

    const popupOpenHandler = () => {
      console.log('popup on');
      this.setState({popupped: true});
    };

    const popupCloseHandler = () => {
      console.log('popup off');
      this.setState({popupped: false});
    };

    const updateLevelHandler = newLevel => {
      this.setState({level: newLevel});
      this.tableRef.current.updateTableLevel(newLevel);
    };
    const incrementLevelHandler = () => {};

    return (
      <SafeAreaView style={styles.container}>
        <Modal visible={true}>
          <View style={styles.game}>
            <Table level={this.state.level} ref={this.tableRef} />
            <Calculator
              onIncrementLevel={incrementLevelHandler}
              onUpdateLevel={updateLevelHandler}
              level={this.state.level}
              savedStats={this.state.savedStats}
              onGetInfo={popupOpenHandler}
              onPassStats={passStatsHandler}
            />
          </View>
          <StatusBar style="auto" />
        </Modal>
        <Modal
          animationType="none"
          transparent={true}
          visible={this.state.popupped}
          style={styles.popupModal}>
          <PopUp
            closePopup={popupCloseHandler}
            onClear={this.clearStats}
            onSave={this.saveStats}
          />
        </Modal>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8d8e96',
  },
  popupModal: {
    elevation: 10,
  },
  game: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#8d8e96',

    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    margin: 0,
  },
  header: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  title: {
    flex: 5,
    borderColor: 'black',
    borderWidth: 1,
    borderStyle: 'solid',
    backgroundColor: '#ccc',
    margin: '2%',
    marginLeft: '6%',
    elevation: 5,
  },
  text: {
    textAlign: 'center',
    color: 'black',
    fontSize: 25,
    margin: '3%',
  },
});

export default App;

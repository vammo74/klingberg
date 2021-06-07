import React, {useState} from 'react';
import {StyleSheet, View, Text, SafeAreaView} from 'react-native';
import Calculator from './components/Calculator/Calculator';
import Table from './components/Table/Table';

const App = () => {
  const [level, setLevel] = useState(3);

  const changeLevelHandler = flag => {
    if (flag === 'up' && level <= 10) {
      setLevel(prevLevel => prevLevel + 1);
    }
    if (flag === 'down' && level > 0) {
      setLevel(prevLevel => prevLevel - 1);
    }
  };
  const updateLevelHandler = newLevel => {
    setLevel(newLevel);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.text}>Multiplikation Övning</Text>
      </View>
      <Table level={level} />
      <Calculator
        level={level}
        onUpdateLevel={updateLevelHandler}
        onChangeLevel={flag => changeLevelHandler(flag)}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    margin: '5%',
  },
  text: {
    color: 'black',
    fontSize: 25,
    margin: '3%',
  },
});

export default App;

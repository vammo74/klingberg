import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

class ScoreTracker extends Component {
  constructor(props) {
    super(props);
    this.state = { trackerHeight: "0%", color: "#4da6ff" };
    this.changeTrackerColor = (newColor) => {
      this.setState({ color: newColor });
    };
    this.changeHeight = (newHeight) => {
      this.setState({ trackerHeight: newHeight });
    };
  }
  render() {
    const barFillStyles = StyleSheet.create({
      empty: {},
      barFill: {
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "black",
        height: this.state.trackerHeight,
        width: "100%",
        backgroundColor: this.state.color,
      },
    });

    return (
      <View style={styles.scoreTracker}>
        <View style={barFillStyles.barFill}></View>

        <View
          style={{
            height: "15%",
            alignItems: "center",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Text>Level</Text>
          <Text>{this.props.level}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scoreTracker: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "black",
    justifyContent: "flex-end",
    flexDirection: "column",
    flex: 1,
  },
});

export default ScoreTracker;

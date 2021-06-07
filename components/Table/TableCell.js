import React, { Component } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

class TableCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonMarginRight: 0,
      buttonMarginTop: 0,
      buttonColor: "#d7b7ed",
      textColor: "#000000",
    };
    this.activateCell = () => {
      this.setState({
        buttonMarginRight: "4%",
        buttonMarginTop: "4%",
        buttonColor: "#7121a6",
        textColor: "#ffffff",
      });
    };
    this.activateCrossedCell = () => {
      this.setState({
        buttonMarginRight: "6%",
        buttonMarginTop: "6%",
        buttonColor: "#580c7a",
        textColor: "#ffffff",
      });
    };
    this.deactivateCell = () => {
      this.setState({
        buttonMarginRight: 0,
        buttonMarginTop: 0,
        buttonColor: "#d7b7ed",
        textColor: "#000000",
      });
    };
    this.excludeCell = () => {
      this.setState({
        buttonMarginRight: 0,
        buttonMarginTop: 0,
        buttonColor: "#4d0066",
        textColor: "transparent",
      });
    };
  }
  render() {
    const { title, id, buttonFunction } = this.props;
    const buttonStyles = StyleSheet.create({
      button: {
        backgroundColor: this.state.buttonColor,
        marginTop: this.state.buttonMarginTop,
        marginRight: this.state.buttonMarginRight,
        elevation: 4,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      },
    });
    const textStyles = StyleSheet.create({
      text: {
        color: this.state.textColor,
        textAlign: "center",
      },
    });

    return (
      <Pressable
        style={styles.container}
        buttonFunction={buttonFunction}
        id={id}
      >
        <View style={buttonStyles.button}>
          <Text style={textStyles.text}>{title}</Text>
        </View>
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "#5a235c",
    flex: 1,
    margin: "0.25%",
  },
});

export default TableCell;

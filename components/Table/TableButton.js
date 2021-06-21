import React, { Component } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

class TableButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonMarginRight: "7%",
      buttonMarginTop: "7%",
      buttonColor: "#9377a6",
      textColor: "#000000",
    };
    this.activateCell = () => {
      this.setState({
        buttonMarginRight: "7%",
        buttonMarginTop: "7%",
        buttonColor: "#7121a6",
        textColor: "#ffffff",
      });
    };
    this.deactivateCell = () => {
      this.setState({
        buttonMarginRight: "7%",
        buttonMarginTop: "7%",
        buttonColor: "#9377a6",
        textColor: "#000000",
      });
    };
  }
  componentDidMount() {
    console.log("mount table button")
  }

  componentWillUnmount() {
    console.log("unmount table button")
  }

  render() {
    const { title, id, buttonFunction, onPress, disabled } = this.props;
    const pressInHandler = () => {
      this.setState({
        buttonMarginRight: 0,
        buttonMarginTop: 0,
        buttonColor: "#9377a6",
        textColor: "#000000",
      });
    };
    const pressOutHandler = () => {
      this.setState({
        buttonMarginRight: "7%",
        buttonMarginTop: "7%",
        buttonColor: "#7121a6",
        textColor: "#ffffff",
      });
    };
    const buttonStyles = StyleSheet.create({
      button: {
        backgroundColor: this.state.buttonColor,
        marginTop: this.state.buttonMarginTop,
        marginRight: this.state.buttonMarginRight,
        elevation: 4,
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
        borderRadius: 3,
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
        onPress={onPress}
        onPressIn={!disabled && pressInHandler}
        onPressOut={!disabled && pressOutHandler}
        disabled={disabled}
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
    borderRadius: 3,
    borderTopLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
});

export default TableButton;

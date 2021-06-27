import React, { Component, createRef } from "react";
import { StyleSheet, View, Button, AppState } from "react-native";
import NumberPad from "./NumberPad";
import Screen from "./Screen";
import ScoreTracker from "./ScoreTracker";
import Timer from "./Timer";

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      levelAttempts: true,
      started: false,
      product: "",
      products: [
        "5 × 9",
        "5 × 8",
        "4 × 7",
        "2 × 2",
        "2 × 3",
        "2 × 4",
        "2 × 5",
        "2 × 6",
        "2 × 7",
        "2 × 8",
        "2 × 9",
        "2 × 10",
        "3 × 3",
        "3 × 4",
        "3 × 5",
        "3 × 6",
        "3 × 7",
        "3 × 8",
        "3 × 9",
        "4 × 4",
        "4 × 5",
        "4 × 6",
        "4 × 8",
        "4 × 9",
        "4 × 10",
        "5 × 5",
        "5 × 6",
        "5 × 7",
        "5 × 10",
        "6 × 6",
        "6 × 7",
        "6 × 8",
        "6 × 9",
        "6 × 10",
        "7 × 7",
        "7 × 8",
        "7 × 9",
        "7 × 10",
        "8 × 8",
        "8 × 9",
        "8 × 10",
        "9 × 9",
        "9 × 10",
        "10 × 10",
      ],
      digits: "",
      timerFlag: "stop",
      timerRate: 5,
    };

    this.scoreTrackerRef = createRef();
    this.screenRef = createRef();

    this.readStats = () => {
      this.props.readStats();
      setTimeout(() => {
        let statsJson = { ...props.savedStats };
        this.setState({ products: statsJson.products });
        this.setState({ levelAttempts: statsJson.levelAttempts });
      }, 250);
    };
  }
  componentDidMount() {
    console.log("mount Calculator");
  }

  componentWillUnmount() {
    console.log("unmount Calculator");
  }
  render() {
    /*
    const _handleAppStateChange = (nextAppState) => {
      if (nextAppState === "background" || nextAppState === "inactive") {
        saveStats(savedStats);
      }
    };
  
    useEffect(() => {
      AppState.addEventListener("change", _handleAppStateChange);
      loadStats();
      let statsJson = JSON.parse(savedStats);
      setProduct(statsJson.product);
      setProducts(statsJson.products);
      setLevelAttempts(statsJson.levelAttempts);
      props.onUpdateLevel(statsJson.level);
  
      return () => {
        AppState.removeEventListener("change", _handleAppStateChange);
      };
    }, []);
  
  */
    const passStatsHandler = () => {
      let statsJson = {
        products: this.state.products,
        levelAttempts: this.state.levelAttempts,
      };
      this.props.onPassStats(statsJson);
    };

    const _generateProducts = () => {
      const newProducts = [];
      for (let n = 2; n < 11; n++) {
        for (let m = 2; m < 11; m++) {
          if (
            !newProducts.includes(n + " × " + m) &&
            !newProducts.includes(m + " × " + n)
          ) {
            newProducts.push(n + " × " + m);
          }
        }
      }
      return newProducts;
    };

    const generateProduct = () => {
      let productsArray = [...this.state.products];
      if (productsArray.length < 1) {
        productsArray = _generateProducts();
        //    this.props.onChangeLevel("up");
      }
      if (productsArray.length >= 50) {
        productsArray = _generateProducts();

        //      this.props.onChangeLevel("down");
      }
      const randomIndex = Math.floor(Math.random() * productsArray.length);
      const newProduct = productsArray.splice(randomIndex, 1);
      this.setState({ product: newProduct[0], products: [...productsArray] });
    };

    const startHandler = () => {
      this.setState({
        digits: "",
        started: true,
        timerFlag: "start",
      });
      generateProduct();
      updateTracker();
      this.screenRef.current.changeTextColor(true);
    };

    const stopHandler = () => {
      this.setState({
        digits: "",
        started: false,
        timerFlag: "stop",
        products: [this.state.product, ...this.state.products],
      });
      this.screenRef.current.changeTextColor(false);
    };

    const checkProductHandler = (answer) => {
      const numbers = this.state.product.split(" × ");
      const result = parseInt(numbers[0]) * parseInt(numbers[1]);
      if (parseInt(answer) === result) {
        this.setState({ digits: "" });
        this.screenRef.current.changeInputColor("green");
        setTimeout(() => {
          this.screenRef.current.changeInputColor("normal");
        }, 250);
        generateProduct();
        updateTracker();
        if (this.state.timerFlag === "reset-on") {
          this.setState({ timerFlag: "reset-off" });
        } else {
          this.setState({ timerFlag: "reset-on" });
        }
      } else {
        this.screenRef.current.changeInputColor("red");
        this.setState({
          products: [this.state.product, ...this.state.products],
        });
        if (this.state.products.length >= 50) {
          generateProduct();
          updateTracker();
        }
        if (this.state.timerFlag === "reset-on") {
          this.setState({ timerFlag: "reset-off" });
        } else {
          this.setState({ timerFlag: "reset-on" });
        }
        setTimeout(() => {
          this.screenRef.current.changeInputColor("normal");
          this.setState({ digits: "" });
        }, 250);
      }
    };

    const deleteHandler = () => {
      if (this.state.digits.length > 0 && this.state.started) {
        this.setState((state) => {
          return { digits: state.digits.slice(0, -1) };
        });
      } else {
        this.setState({ digits: "" });
      }
    };

    const enterHandler = () => {
      if (this.state.digits.length > 0 && this.state.started) {
        checkProductHandler(this.state.digits);
        this.setState({ started: true });
      }
      if (
        this.state.digits.length === 3 &&
        !this.state.started &&
        this.state.digits.slice(0, 2) === "13" &&
        this.state.digits[2] !== "0"
      ) {
        this.props.onUpdateLevel(this.state.digits[2]);
        let products = _generateProducts();
        this.setState({
          digits: "",
          products: products,
        });
      }
      if (
        this.state.digits.length === 3 &&
        !this.state.started &&
        this.state.digits.slice(0, 2) === "77" &&
        this.state.digits[2] !== "0"
      ) {
        let products = _generateProducts();
        this.setState({
          digits: "",
          products: products,
          timerRate: this.state.digits[2],
        });
      }
      if (!this.state.started) {
        this.setState({ digits: "" });
      }
    };

    const enteredDigitsHandler = (newDigit) => {
      if (this.state.digits.length < 3) {
        this.setState((state) => {
          return { digits: state.digits + newDigit };
        });
      }
    };

    const updateTracker = () => {
      let barFillHeight =
        Math.round((this.state.products.length / 50) * 85) + "%";
      let warningLevel = this.state.products.length;
      if (warningLevel === 44) {
        this.scoreTrackerRef.current.changeTrackerColor("#4da6ff");
      }
      if (warningLevel === 47) {
        this.scoreTrackerRef.current.changeTrackerColor("#cc99ff");
      }
      if (warningLevel === 48) {
        this.scoreTrackerRef.current.changeTrackerColor("#ff9980");
      }
      if (warningLevel === 49) {
        this.scoreTrackerRef.current.changeTrackerColor("#ff3333");
      }

      this.scoreTrackerRef.current.changeHeight(barFillHeight.toString());
    };

    const outOfTimeHandler = () => {
      if (this.state.levelAttempts) {
        this.setState({ levelAttempts: false });
      } else {
        this.setState({ levelAttempts: true });
        this.props.onChangeLevel("down");
      }
    };

    return (
      <View className="calculator" style={styles.calculator}>
        <Screen
          ref={this.screenRef}
          product={this.state.product}
          digits={this.state.digits}
          key="screen"
        />
        <View style={styles.calculatorBody}>
          <View style={styles.information}>
            <View style={styles.trackers}>
              <ScoreTracker
                style={styles.scoreTracker}
                ref={this.scoreTrackerRef}
                level={this.props.level}
              />
              <Timer
                style={styles.timer}
                timerFlag={this.state.timerFlag}
                level={this.props.level}
                onOutOfTime={outOfTimeHandler}
                timerRate={this.state.timerRate}
              />
            </View>
            <View style={styles.infoButton}>
              <Button onPress={this.props.onGetInfo} title="info" />
            </View>
          </View>
          <NumberPad
            style={styles.numberPad}
            digits={this.state.digits}
            onEnteredDigit={enteredDigitsHandler}
            onDelete={deleteHandler}
            onEnter={enterHandler}
            onStart={!this.state.started ? startHandler : stopHandler}
            started={this.state.started}
            onOutOfTime={outOfTimeHandler}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <Button title="save" onPress={passStatsHandler} />
          <Button title="clear" onPress={this.props.onclearStats} />
          <Button title="read" onPress={this.readStats} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  calculator: {
    flex: 1.2,
    backgroundColor: "#8d8e96",
    alignItems: "center",
    justifyContent: "center",
    height: "47%",

    width: "90%",
    marginBottom: "3%",
  },
  information: {
    flex: 1,
    flexDirection: "column",
    marginLeft: 0,
    marginRight: "2%",
  },
  trackers: {
    flex: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    marginBottom: "10%",
  },
  infoButton: {
    flex: 1,
  },
  calculatorBody: {
    flex: 1,
    flexDirection: "row",
  },
});

export default Calculator;

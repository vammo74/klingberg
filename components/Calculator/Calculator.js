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
      products: ["5 × 9", "5 × 8", "4 × 7", "2 × 2", "2 × 3", "2 × 4", "2 × 5", "2 × 6", "2 × 7", "2 × 8", "2 × 9", "2 × 10", "3 × 3", "3 × 4", "3 × 5", "3 × 6", "3 × 7", "3 × 8", "3 × 9", "4 × 4", "4 × 5", "4 × 6", "4 × 8", "4 × 9", "4 × 10", "5 × 5", "5 × 6", "5 × 7", "5 × 10", "6 × 6", "6 × 7", "6 × 8", "6 × 9", "6 × 10", "7 × 7", "7 × 8", "7 × 9", "7 × 10", "8 × 8", "8 × 9", "8 × 10", "9 × 9", "9 × 10", "10 × 10"],
      digits: "",
      timerFlag: "stop",
      timerRate: 5,
    }

    this.scoreTrackerRef = createRef();
    this.screenRef = createRef();
    this.readStats = () => {
      props.readStats()
      setTimeout(() => {
        let statsJson = { ...props.savedStats };
        this.setState({ products: statsJson.products });
        this.setState({ levelAttempts: statsJson.levelAttempts });
      }, 250)
    }
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
      props.onPassStats(statsJson)
    }


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
        props.onChangeLevel("up");
      }
      if (productsArray.length >= 50) {
        productsArray = _generateProducts();

        props.onChangeLevel("down");
      }
      const randomIndex = Math.floor(Math.random() * productsArray.length);
      const newProduct = productsArray.splice(randomIndex, 1);
      this.setState({ product: newProduct[0], products: [...productsArray] });
    };

    const startHandler = () => {
      if (!this.state.started) {
        this.setState({
          digits: "",
          started: true,
          timerFlag: "start",
        })
        generateProduct();
        this.screenRef.current.changeTextColor("black");
      }
    };

    const stopHandler = () => {
      if (started) {
        setDigits("");
        setProducts([product, ...products]);
        this.screenRef.current.changeTextColor("transparent");
        setStarted(false);
        setTimerFlag("stop");
      }
    };

    const checkProductHandler = (answer) => {
      const numbers = product.split(" × ");
      const result = parseInt(numbers[0]) * parseInt(numbers[1]);
      if (parseInt(answer) === result) {
        setDigits("");
        this.screenRef.current.changeInputColor("#79e36d");
        setTimeout(() => {
          this.screenRef.current.changeInputColor("#ccd4cb");
        }, 250);
        generateProduct();
        if (timerFlag === "reset-on") {
          setTimerFlag("reset-off");
        } else {
          setTimerFlag("reset-on");
        }
      } else {
        this.screenRef.current.changeInputColor("#f75252");
        setProducts([product, ...products]);
        if (products.length >= 50) {
          generateProduct();
        }
        if (timerFlag === "reset-on") {
          setTimerFlag("reset-off");
        } else {
          setTimerFlag("reset-on");
        }
        setTimeout(() => {
          this.screenRef.current.changeInputColor("#ccd4cb");
          setDigits("");
        }, 250);
      }
    };

    const deleteHandler = () => {
      if (digits.length > 0 && started) {
        setDigits((prevDigits) => prevDigits.slice(0, -1));
      } else {
        setDigits("");
      }
    };

    const enterHandler = () => {
      if (digits.length > 0 && started) {
        checkProductHandler(digits);
        setStarted(true);
      }
      if (digits.length === 3 && !started && digits.slice(0, 2) === "13" && digits[2] !== "0") {
        props.onUpdateLevel(digits[2]);
        setProducts(generateProducts());
        setDigits("");
      }
      if (digits.length === 3 && !started && digits.slice(0, 2) === "77" && digits[2] !== "0") {
        setTimerRate(digits[2]);
        setDigits("");
      }
      if (!started) {
        setDigits("");
      }
    };

    const enteredDigitsHandler = (newDigit) => {
      if (digits.length < 3) {
        this.setState((state) => {
          return { digits: state.digits + newDigit }
        });
      }
    };

    const updateTracker = () => {
      let barFillHeight = Math.round((this.state.products.length / 50) * 85) + "%";
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
        props.onChangeLevel("down");
      }
    };

    return (
      <View className="calculator" style={styles.calculator}>
        <Screen ref={this.screenRef} product={this.product} digits={this.digits} key="screen" />
        <View style={styles.calculatorBody}>
          <ScoreTracker
            style={styles.scoreTracker}
            ref={this.scoreTrackerRef}
            level={props.level}
          />
          <Timer
            style={styles.timer}
            timerFlag={this.state.timerFlag}
            level={props.level}
            onOutOfTime={outOfTimeHandler}
            timerRate={this.state.timerRate}
          />
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
          <Button title="clear" onPress={props.onclearStats} />
          <Button title="read" onPress={this.readStats} />
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  calculator: {
    flex: 1,
    backgroundColor: "#8d8e96",
    alignItems: "center",
    justifyContent: "center",
    height: "47%",

    width: "90%",
    marginBottom: "3%",
  },
  calculatorBody: {
    flex: 1,
    flexDirection: "row",
  },
  start: {
    flex: 0.3,
    flexDirection: "column",
  },
});

export default Calculator;

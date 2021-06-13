import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, AppState } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NumberPad from "./NumberPad";
import Screen from "./Screen";
import ScoreTracker from "./ScoreTracker";
import Timer from "./Timer";

const Calculator = (props) => {
  const [savedStats, setSavedStats] = useState(
    '{"level":4,"product":"","products":["5 × 9","5 × 8","4 × 7","2 × 2","2 × 3","2 × 4","2 × 5","2 × 6","2 × 7","2 × 8","2 × 9","2 × 10","3 × 3","3 × 4","3 × 5","3 × 6","3 × 7","3 × 8","3 × 9","4 × 4","4 × 5","4 × 6","4 × 8","4 × 9","4 × 10","5 × 5","5 × 6","5 × 7","5 × 10","6 × 6","6 × 7","6 × 8","6 × 9","6 × 10","7 × 7","7 × 8","7 × 9","7 × 10","8 × 8","8 × 9","8 × 10","9 × 9","9 × 10","10 × 10"],"levelAttempts":true}'
  );
  const [levelAttempts, setLevelAttempts] = useState(true);
  const [started, setStarted] = useState(false);
  const [product, setProduct] = useState("");
  const [products, setProducts] = useState([]);
  const [digits, setDigits] = useState("");
  const [timerFlag, setTimerFlag] = useState("stop");
  const [timerRate, setTimerRate] = useState(5);

  const scoreTrackerRef = useRef();
  const screenRef = useRef();

  const saveStats = async (value) => {
    try {
      await AsyncStorage.setItem("@storage_Key", value);
    } catch (e) {
      // saving error
    }
  };

  const loadStats = async () => {
    try {
      const value = await AsyncStorage.getItem("@storage_Key");
      if (value !== null) {
        setSavedStats(value);
      }
    } catch (e) {
      // error reading value
    }
  };

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

  useEffect(() => {
    let statsJson = {
      level: props.level,
      product: product,
      products: products,
      levelAttempts: levelAttempts,
    };
    let stats = JSON.stringify(statsJson);
    setSavedStats(stats);
  }, [props.level, product, products]);

  const generateProducts = () => {
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
    let productsArray = [...products];
    if (productsArray.length < 1) {
      productsArray = generateProducts();
      props.onChangeLevel("up");
    }
    if (productsArray.length >= 50) {
      productsArray = generateProducts();

      props.onChangeLevel("down");
    }
    const randomIndex = Math.floor(Math.random() * productsArray.length);
    const newProduct = productsArray.splice(randomIndex, 1);
    setProduct(newProduct[0]);
    setProducts([...productsArray]);
  };

  const startHandler = () => {
    if (!started) {
      setStarted(true);
      setTimerFlag("start");
      generateProduct();
      screenRef.current.changeTextColor("black");
    }
  };

  const stopHandler = () => {
    if (started) {
      setDigits("");
      setProducts([product, ...products]);
      screenRef.current.changeTextColor("transparent");
      setStarted(false);
      setTimerFlag("stop");
    }
  };

  const checkProductHandler = (answer) => {
    const numbers = product.split(" × ");
    const result = parseInt(numbers[0]) * parseInt(numbers[1]);
    if (parseInt(answer) === result) {
      setDigits("");
      screenRef.current.changeInputColor("#79e36d");
      setTimeout(() => {
        screenRef.current.changeInputColor("#ccd4cb");
      }, 250);
      generateProduct();
      if (timerFlag === "reset-on") {
        setTimerFlag("reset-off");
      } else {
        setTimerFlag("reset-on");
      }
    } else {
      screenRef.current.changeInputColor("#f75252");
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
        screenRef.current.changeInputColor("#ccd4cb");
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
    if (digits.length === 3 && !started && digits.slice(0, 2) === "13") {
      props.onUpdateLevel(digits[2]);
      setProducts(generateProducts());
      setDigits("");
    }
    if (digits.length === 3 && !started && digits.slice(0, 2) === "77") {
      setTimerRate(digits[2]);
      setDigits("");
    }
    if (!started) {
      setDigits("");
    }
  };

  const enteredDigitsHandler = (newDigit) => {
    if (digits.length < 3) {
      setDigits((prevDigits) => prevDigits + newDigit);
    }
  };

  useEffect(() => {
    let barFillHeight = Math.round((products.length / 50) * 85) + "%";
    let warningLevel = products.length;
    if (warningLevel === 44) {
      scoreTrackerRef.current.changeTrackerColor("#4da6ff");
    }
    if (warningLevel === 47) {
      scoreTrackerRef.current.changeTrackerColor("#cc99ff");
    }
    if (warningLevel === 48) {
      scoreTrackerRef.current.changeTrackerColor("#ff9980");
    }
    if (warningLevel === 49) {
      scoreTrackerRef.current.changeTrackerColor("#ff3333");
    }

    scoreTrackerRef.current.changeHeight(barFillHeight.toString());
  }, [products, product]);

  const outOfTimeHandler = () => {
    if (levelAttempts) {
      setLevelAttempts(false);
    } else {
      setLevelAttempts(true);
      props.onChangeLevel("down");
    }
  };

  return (
    <View className="calculator" style={styles.calculator}>
      <Screen ref={screenRef} product={product} digits={digits} key="screen" />
      <View style={styles.calculatorBody}>
        <ScoreTracker
          style={styles.scoreTracker}
          ref={scoreTrackerRef}
          level={props.level}
        />
        <Timer
          style={styles.timer}
          timerFlag={timerFlag}
          level={props.level}
          onOutOfTime={outOfTimeHandler}
          timerRate={timerRate}
        />
        <NumberPad
          style={styles.numberPad}
          digits={digits}
          onEnteredDigit={enteredDigitsHandler}
          onDelete={deleteHandler}
          onEnter={enterHandler}
          onStart={!started ? startHandler : stopHandler}
          started={started}
          onOutOfTime={outOfTimeHandler}
        />
      </View>
    </View>
  );
};

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

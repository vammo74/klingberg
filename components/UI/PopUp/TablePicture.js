import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";

const TablePicture = (props) => {
  const [picture, _] = useState(generateTablePictures(props.num));

  return (
    <View style={{ alignSelf: "center", marginTop: 2, marginBottom: 2 }}>
      {picture.map((row, i) => {
        return (
          <View
            key={Math.random()}
            style={{ flexDirection: "row", width: "50%" }}
          >
            {row.map((cell, x) => {
              return (
                <View
                  key={Math.random()}
                  style={{
                    backgroundColor: cell.color,
                    flex: 1,
                    margin: "1%",
                    paddingTop: "2%",
                    paddingBottom: "2%",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: cell.textColor,
                      textAlign: "center",
                    }}
                  >
                    {cell.val}
                  </Text>
                </View>
              );
            })}
          </View>
        );
      })}
    </View>
  );
};

const generateTablePictures = (num) => {
  let data = [];
  let row = [];
  let val = 0;
  let color = "";
  for (let n = 4; n > 0; n--) {
    row = [];
    for (let m = 1; m < 5; m++) {
      val = n * m;
      if (n === 1 || m === 1) {
        color = "#9377a6";
        textColor = "black";
      } else {
        color = "#d7b7ed";
        textColor = "black";
      }
      if (num === 2) {
        if (n === 3) {
          color = "#7121a6";
          textColor = "white";
        }
      }
      if (num === 3) {
        if (n === 3 || m === 2) {
          color = "#7121a6";
          textColor = "white";
        }
        if (n === 3 && m === 2) {
          color = "#580c7a";
          textColor = "white";
        }
      }

      row.push({ val: val, color: color, textColor: textColor });
    }
    data.push(row);
  }
  return data;
};

export default TablePicture;

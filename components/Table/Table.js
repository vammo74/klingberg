import React, { useRef, useEffect } from "react";

import { StyleSheet, View } from "react-native";

import TableCell from "./TableCell";
import TableButton from "./TableButton";

let horizontalColorMemory = [];
let verticalColorMemory = [];
let excludedtest = [];
let excluded = [];
let crossover = 0;

const generateTableData = () => {
  let tableData = [];
  let rowData;
  let _key;
  let _value;
  let _type;
  let _function;
  let _id = 0;
  let Obj;

  for (let x = 9; x >= 0; x--) {
    rowData = [];
    for (let y = 0; y < 10; y++) {
      _key = x.toString() + y.toString();
      _value = (x + 1) * (y + 1);
      if (x === 0 && y !== 0) {
        _type = "toggle";
        _function = "vertical";
      } else if (y === 0 && x !== 0) {
        _type = "toggle";
        _function = "horizontal";
      } else if (x === 0 && y === 0) {
        _type = "toggle";
        _function = "dummy";
      } else {
        _type = "body";
        _function = "body";
      }
      Obj = {
        key: _key,
        value: _value,
        type: _type,
        function: _function,
        id: _id,
      };
      rowData.push(Obj);
      _id += 1;
    }
    tableData.push(rowData);
  }
  return tableData;
};

let tableData = generateTableData();

const Table = (props) => {
  const cellRefs = useRef([]);

  const horizontalColorHandler = (value) => {
    if (crossover) {
      if (!excluded.includes(cellRefs.current[crossover].props.id)) {
        cellRefs.current[crossover].activateCell();
      }
    }
    if (horizontalColorMemory[0] >= 0) {
      cellRefs.current[horizontalColorMemory[0]].deactivateCell();
    }
    for (let n of horizontalColorMemory.slice(1)) {
      if (!verticalColorMemory.includes(n)) {
        if (!excluded.includes(cellRefs.current[n].props.id)) {
          cellRefs.current[n].deactivateCell();
        }
      }
    }

    horizontalColorMemory = [];
    let index = (10 - parseInt(value)) * 10;
    horizontalColorMemory.push(index);
    for (let x = index + 1; x < index + 10; x++) {
      if (!excluded.includes(cellRefs.current[x].props.id)) {
        cellRefs.current[x].activateCell();
      }
      horizontalColorMemory.push(x);
      for (let n of horizontalColorMemory) {
        for (let x of verticalColorMemory) {
          if (x === n) {
            if (!excluded.includes(cellRefs.current[x].props.id)) {
              cellRefs.current[x].activateCrossedCell();
            }
            crossover = x;
          }
        }
      }
    }
  };

  const verticalColorHandler = (value) => {
    if (crossover) {
      if (!excluded.includes(cellRefs.current[crossover].props.id)) {
        cellRefs.current[crossover].activateCell();
      }
    }
    if (verticalColorMemory[0]) {
      cellRefs.current[verticalColorMemory[0]].deactivateCell();
    }
    for (let n of verticalColorMemory.slice(1)) {
      if (!horizontalColorMemory.includes(n)) {
        if (!excluded.includes(cellRefs.current[n].props.id)) {
          cellRefs.current[n].deactivateCell();
        }
      }
    }
    verticalColorMemory = [];
    let index = 89 + parseInt(value);
    verticalColorMemory.push(index);
    for (let x = index - 10; x > index - 100; x -= 10) {
      if (!excluded.includes(cellRefs.current[x].props.id)) {
        cellRefs.current[x].activateCell();
      }
      verticalColorMemory.push(x);
      for (let n of verticalColorMemory) {
        for (let x of horizontalColorMemory) {
          if (x === n) {
            if (!excluded.includes(cellRefs.current[x].props.id)) {
              cellRefs.current[x].activateCrossedCell();
            }
            crossover = x;
          }
        }
      }
    }
  };

  const tableLevel = (level) => {
    for (let cell of cellRefs.current) {
      if (excluded.includes(cell.props.id)) {
        cell.deactivateCell();
      }
    }

    let _id = 0;
    excluded = [];
    for (let x = 10 - props.level; x < 9; x++) {
      for (let y = 1; y < level; y += 1) {
        _id = x.toString() + y.toString();
        excluded.push(parseInt(_id));
      }
    }
    for (let cell of cellRefs.current) {
      if (excluded.includes(cell.props.id)) {
        cell.excludeCell();
      }
    }
  };

  useEffect(() => {
    tableLevel(props.level);
  }, [props.level, props.popupped]);

  return (
    <View className="tableBody" style={styles.tableBody}>
      {tableData.map((data) => {
        return (
          <View
            className="tableRow"
            style={styles.tableRow}
            key={Math.random()}
          >
            {data.map((obj) => {
              if (obj.function === "vertical") {
                return (
                  <TableButton
                    onPress={() => verticalColorHandler(obj.value)}
                    key={obj.key}
                    id={obj.id}
                    ref={(el) => (cellRefs.current[obj.id] = el)}
                    buttonFunction={obj.type}
                    title={obj.value.toString()}
                  />
                );
              } else if (obj.function === "horizontal") {
                return (
                  <TableButton
                    onPress={() => horizontalColorHandler(obj.value)}
                    key={obj.key}
                    id={obj.id}
                    ref={(el) => (cellRefs.current[obj.id] = el)}
                    buttonFunction={obj.type}
                    title={obj.value.toString()}
                  />
                );
              } else if (obj.function === "dummy") {
                return (
                  <TableButton
                    disabled={true}
                    key={obj.key}
                    id={obj.id}
                    ref={(el) => (cellRefs.current[obj.id] = el)}
                    buttonFunction={obj.type}
                    title={obj.value.toString()}
                  />
                );
              } else {
                return (
                  <TableCell
                    key={obj.key}
                    id={obj.id}
                    buttonFunction={obj.type}
                    ref={(el) => (cellRefs.current[obj.id] = el)}
                    title={obj.value.toString()}
                  />
                );
              }
            })}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tableBody: {
    flex: 1,
    flexDirection: "column",
    height: "50%",
    width: "90%",
    elevation: 5,
  },
  tableRow: {
    alignSelf: "flex-start",
    flex: 1,
    flexDirection: "row",
    width: "100%",
  },
  buttonBody: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
});

export default Table;

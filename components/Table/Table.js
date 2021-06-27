import React, { Component, createRef } from 'react';

import { StyleSheet, View, Button } from 'react-native';

import TableCell from './TableCell';
import TableButton from './TableButton';

class Table extends Component {
  constructor(props) {
    super(props);
    this.horizontalColorMemory = [];
    this.verticalColorMemory = [];
    this.excluded = [];
    this.crossover = 0;
    this.cellRefs = [];
    this.generateTable = () => {
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
          _key = x.toString() + y.toString() + (Math.random()*100).toString();
          _value = (x + 1) * (y + 1);
          if (x === 0 && y !== 0) {
            _type = 'toggle';
            _function = 'vertical';
          } else if (y === 0 && x !== 0) {
            _type = 'toggle';
            _function = 'horizontal';
          } else if (x === 0 && y === 0) {
            _type = 'toggle';
            _function = 'dummy';
          } else {
            _type = 'body';
            _function = 'body';
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
    this.tableData = this.generateTable()
  }

  componentDidMount() {
    console.log("mount table")
    
  }

  componentWillUnmount() {
    console.log("unmount table")
  }

  render() {
  

  

    const horizontalColorHandler = value => {
      if (this.crossover) {
        if (!this.excluded.includes(this.cellRefs[this.crossover].props.id)) {
          this.cellRefs[this.crossover].activateCell();
        }
      }
      if (this.horizontalColorMemory[0] >= 0) {
        this.cellRefs[this.horizontalColorMemory[0]].deactivateCell();
      }
      for (let n of this.horizontalColorMemory.slice(1)) {
        if (!this.verticalColorMemory.includes(n)) {
          if (!this.excluded.includes(this.cellRefs[n].props.id)) {
            this.cellRefs[n].deactivateCell();
          }
        }
      }


      let index = (10 - parseInt(value)) * 10;
      this.horizontalColorMemory = [index];
      for (let x = index + 1; x < index + 10; x++) {
        if (!this.excluded.includes(this.cellRefs[x].props.id)) {
          this.cellRefs[x].activateCell();
        }
        this.horizontalColorMemory.push(x);
        for (let n of this.horizontalColorMemory) {
          for (let x of this.verticalColorMemory) {
            if (x === n) {
              if (!this.excluded.includes(this.cellRefs[x].props.id)) {
                this.cellRefs[x].activateCrossedCell();
              }
              this.crossover = x;
            }
          }
        }
      }
    };

    const verticalColorHandler = value => {
      if (this.crossover) {
        if (!this.excluded.includes(this.cellRefs[this.crossover].props.id)) {
          this.cellRefs[this.crossover].activateCell();
        }
      }
      if (this.verticalColorMemory[0]) {
        this.cellRefs[this.verticalColorMemory[0]].deactivateCell();
      }
      for (let n of this.verticalColorMemory.slice(1)) {
        if (!this.horizontalColorMemory.includes(n)) {
          if (!this.excluded.includes(this.cellRefs[n].props.id)) {
            this.cellRefs[n].deactivateCell();
          }
        }
      }
      let index = 89 + parseInt(value);
      this.verticalColorMemory = [index];
      for (let x = index - 10; x > index - 100; x -= 10) {
        if (!this.excluded.includes(this.cellRefs[x].props.id)) {
          this.cellRefs[x].activateCell();
        }
        this.verticalColorMemory.push(x);
        for (let n of this.verticalColorMemory) {
          for (let x of this.horizontalColorMemory) {
            if (x === n) {
              if (!this.excluded.includes(this.cellRefs[x].props.id)) {
                this.cellRefs[x].activateCrossedCell();
              }
              this.crossover = x;
            }
          }
        }
      }
    };

    // const tableLevel = level => {
    //   for (let cell of cellRefs.current) {
    //     if (excluded.includes(cell.props.id)) {
    //       cell.deactivateCell();
    //     }
    //   }

    //   let _id = 0;
    //   let temp = [];
    //   for (let x = 10 - props.level; x < 9; x++) {
    //     for (let y = 1; y < level; y += 1) {
    //       _id = x.toString() + y.toString();
    //       temp.push(parseInt(_id));
    //     }
    //   }
    //   for (let cell of cellRefs.current) {
    //     if (temp.includes(cell.props.id)) {
    //       cell.excludeCell();
    //     }
    //   }
    //   setExcluded(temp);
    // };

    // useEffect(() => {
    //   tableLevel(props.level);
    // }, [props.level, props.popupped]);

    return (
      <View className="tableBody" style={styles.tableBody}>
        {
        this.tableData.map(data => {
          return (
            <View
              className="tableRow"
              style={styles.tableRow}
              key={Math.random()}>
              {data.map(obj => {
                if (obj.function === 'vertical') {
                  return (
                    <TableButton
                      onPress={() => verticalColorHandler(obj.value)}
                      key={obj.key}
                      id={obj.id}
                      ref={(el) => {this.cellRefs[obj.id] = el; return true}}
                      buttonFunction={obj.type}
                      title={obj.value.toString()}
                    />
                  );
                } else if (obj.function === 'horizontal') {
                  return (
                    <Button
                      onPress={() => horizontalColorHandler(obj.value)}
                      key={obj.key}
                      id={obj.id}
                      ref={(el) => {this.cellRefs[obj.id] = el; return true}}
                      //ref={el => (this.cellRefs.current[obj.id] = el)}
                      buttonFunction={obj.type}
                      title={obj.value.toString()}
                    />
                  );
                } else if (obj.function === 'dummy') {
                  return (
                    <Button
                      disabled={true}
                      key={obj.key}
                      id={obj.id}
                      ref={(el) => {this.cellRefs[obj.id] = el; return true}}
                      //ref={el => (this.cellRefs.current[obj.id] = el)}
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
                      ref={(el) => {this.cellRefs[obj.id] = el; return true}}
                      //ref={el => (this.cellRefs.current[obj.id] = el)}
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
}
const styles = StyleSheet.create({
  tableBody: {
    flex: 1,
    flexDirection: 'column',
    height: '50%',
    width: '90%',
    elevation: 5,
  },
  tableRow: {
    alignSelf: 'flex-start',
    flex: 1,
    flexDirection: 'row',
    width: '100%',
  },
  buttonBody: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
});

export default Table;

import React from "react";
import { View, Text, StyleSheet, TextInput, Picker } from "react-native";
import NavigationService from "../NavigationService";
var convert = require('convert-units');

export default class Measurements extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fromValue: 1,
      toValue: 2.54,
      fromUnit: "in",
      toUnit: "mm"
    };
  }
  render() {
    const unitList = {
      inch: "in",
      foot: "ft-us",
      yard: "yd",
      mile: "mi",
      millimeter: "mm",
      centimeter: "cm",
      meter: "m",
      kilometer: "km"
    };

    return (
      <View style={styles.mainView}>
        <View style={styles.fromToView}>
          <TextInput
            style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
            keyboardType="numeric"
            autoFocus={true}
            onChangeText={fromValue => {
              let convertedVal = convert(fromValue).from(this.state.fromUnit).to(this.state.toUnit);
              this.setState({ toValue: convertedVal, fromValue: fromValue });
            }}
            value={this.state.fromValue.toString()}
          />
          <Text>From</Text>

          <Picker
            mode="dropdown"
            selectedValue={this.state.fromUnit}
            onValueChange={(fromUnit, unit) => {
              this.setState({ fromUnit: fromUnit });
              let convertedVal = convert(this.state.fromValue).from(fromUnit).to(this.state.toUnit);
              this.setState({ toValue: convertedVal });
            }}
          >
            {Object.keys(unitList).map(key => {
              return (
                <Picker.Item label={key} value={unitList[key]} key={key} />
              );
            })}
          </Picker>
        </View>
        <View style={styles.fromToView}>
          <TextInput
            editable={false}
            style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
            value={this.state.toValue.toFixed(3)}
          />
          <Text>To</Text>
          <Picker
            mode="dropdown"
            selectedValue={this.state.toUnit}
            onValueChange={(toUnit, unit) => {
              this.setState({ toUnit: toUnit });
              let convertedVal = convert(this.state.fromValue).from(this.state.fromUnit).to(toUnit);
              this.setState({ toValue: convertedVal });
            }}
          >
            {Object.keys(unitList).map(key => {
              return (
                <Picker.Item label={key} value={unitList[key]} key={key} />
              );
            })}
          </Picker>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    flexDirection: "row"
  },
  fromToView: {
    minWidth: 200,
    padding: 20
  }
});

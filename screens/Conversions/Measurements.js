import React from "react";
import { View, Text, StyleSheet, TextInput, Picker } from "react-native";
import NavigationService from "../../NavigationService";
export default class Measurements extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fromValue: 1,
      toValue: 2.54,
      fromUnit: 25.4,
      toUnit: 10
    };
  }
  render() {
    const unitList = {
      inch: 25.4,
      foot: 304.8,
      yard: 914.4,
      mile: 1609000,
      millimeter: 1,
      centimeter: 10,
      meter: 1000,
      kilometer: 1000000
    };

    return (
      <View style={styles.mainView}>
        <View style={styles.fromToView}>
          <TextInput
            style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
            keyboardType="numeric"
            autoFocus="true"
            onChangeText={fromValue => {
              let convertedVal =
                (fromValue * this.state.fromUnit) / this.state.toUnit;
              this.setState({ toValue: convertedVal, fromValue: fromValue });
            }}
            value={this.state.fromValue.toString()}
          />
          <Text>From</Text>

          <Picker
            mode="dropdown"
            selectedValue={this.state.fromUnit}
            onValueChange={(value, unit) => {
              this.setState({ fromUnit: value });
              let convertedVal =
                (this.state.fromValue * this.state.fromUnit) /
                this.state.toUnit;
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
            onValueChange={(value, unit) => {
              this.setState({ toUnit: value });
              let convertedVal =
                (this.state.fromValue * this.state.fromUnit) /
                this.state.toUnit;
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

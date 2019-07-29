import React from "react";
import { View, Button, TextInput } from "react-native";
import NavigationService from "../../NavigationService";
export default class Measurements extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fromConversion: 0.0,
      toConversion: 0.0
    };
  }
  render() {
    return (
      <View>
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={text => this.setState({ fromConversion })}
          value={this.state.fromConversion.toString()}
        />
      </View>
    );
  }
}

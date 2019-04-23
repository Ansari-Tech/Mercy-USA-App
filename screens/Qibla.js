import React from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  AsyncStorage,
  TextInput
} from "react-native";
import NavigationService from "../NavigationService";
import { MKTextField } from "react-native-material-kit";
import { TextInputMask } from "react-native-masked-text";
const Dimensions = require("Dimensions");
const { width } = Dimensions.get("window");
const Textfield = MKTextField.textfield()
  .withPlaceholder("Text...")
  .build();
export default class Qibla extends React.Component {
  state = {
    name: "",
    money: "$0.00"
  };
  componentDidMount = () =>
    AsyncStorage.getItem("name").then(value => this.setState({ name: value }));
  setName = value => {
    AsyncStorage.setItem("name", value);
    this.setState({ name: value });
  };
  static navigationOptions = {
    title: "Coming soon!"
  };
  render() {
    return (
      <View>
        <Text>Money: Simple</Text>
        <TextInputMask
          customTextInput={Textfield}
          customTextInputProps={{
            style: { width: "80%" },
            placeholder: "Birthday"
          }}
          type={"money"}
          options={{
            precision: 2,
            separator: ".",
            delimiter: ",",
            unit: "$",
            suffixUnit: ""
          }}
          value={this.state.money}
          onChangeText={text => {
            this.setState({
              money: text
            });
          }}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 50
  },
  textInput: {
    margin: 5,
    height: 100,
    borderWidth: 1,
    backgroundColor: "#7685ed"
  }
});

import React from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  ScrollView,
  Alert
} from "react-native";
import NavigationService from "../NavigationService";
import { Input, Overlay } from "react-native-elements";
import { MKTextField } from "react-native-material-kit";
import { TextInputMask } from "react-native-masked-text";

const Dimensions = require("Dimensions");
const { width } = Dimensions.get("window");

const cashText = MKTextField.textfield()
  .withPlaceholder("Cash in hand")
  .build();

export default class Business extends React.Component {
  static navigationOptions = {
    title: "Business & Real Estate"
  };
  constructor(props) {
    super(props);
    this.state = { isVisible: true };
    this.params = this.props.navigation.state.params;
  }
  render() {
    return (
      <View style={styles.mainView}>
        <Overlay
          isVisible={this.state.isVisible}
          onBackdropPress={() => this.setState({ isVisible: false })}
        >
          <View>
            <Button
              title="Get Started"
              onPress={() => {
                this.setState({ isVisible: false });
              }}
            />
          </View>
        </Overlay>
        <Text style={styles.inputText}>
          Business Inventory (market value of inventory)
        </Text>
        <TextInputMask
          customTextInput={cashText}
          customTextInputProps={{
            style: { width: "80%" },
            placeholder: "$0.00        "
          }}
          type={"money"}
          options={{
            precision: 2,
            separator: ".",
            delimiter: ",",
            unit: "$",
            suffixUnit: ""
          }}
          value={this.state.inventory}
          onChangeText={money => {
            this.setState({
              inventory: money
            });
          }}
        />
        <Text style={styles.inputText}>
          Real Estate Value (Designed for sale)
        </Text>
        <TextInputMask
          customTextInput={cashText}
          customTextInputProps={{
            style: { width: "80%" },
            placeholder: "$0.00        "
          }}
          type={"money"}
          options={{
            precision: 2,
            separator: ".",
            delimiter: ",",
            unit: "$",
            suffixUnit: ""
          }}
          value={this.state.realEstate}
          onChangeText={money => {
            this.setState({
              realEstate: money
            });
          }}
        />
        <Text style={styles.inputText}>Net Profits from business</Text>
        <TextInputMask
          customTextInput={cashText}
          customTextInputProps={{
            style: { width: "80%" },
            placeholder: "$0.00        "
          }}
          type={"money"}
          options={{
            precision: 2,
            separator: ".",
            delimiter: ",",
            unit: "$",
            suffixUnit: ""
          }}
          value={this.state.profit}
          onChangeText={money => {
            this.setState({
              profit: money
            });
          }}
        />
        <View style={styles.btnView}>
          <Button
            style={styles.btn}
            title="View my Zakat"
            onPress={() => {
              let businessInput = {
                inventory: this.state.inventory,
                realEstate: this.state.realEstate,
                profit: this.state.profit
              };
              if (
                this.state.inventory == null ||
                this.state.realEstate == null ||
                this.state.profit == null
              ) {
                Alert.alert("Please fill out all fields.");
              } else {
                NavigationService.navigate("ZakatResults", {
                  asset: this.params.asset,
                  loan: this.params.loan,
                  business: businessInput
                });
              }
            }}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  mainView: {
    flex: 2,
    alignItems: "center",
    width: width
  },
  btnView: {
    alignSelf: "center"
  },
  btn: {
    alignSelf: "center",
    color: "#860101"
  },
  title: {
    alignItems: "center",
    fontSize: 25
  },
  header: {
    textAlign: "center"
  },
  input: {
    alignSelf: "flex-end"
  },
  inputText: {
    textAlign: "center",
    paddingTop: 20
  }
});

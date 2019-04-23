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
export default class Loans extends React.Component {
  static navigationOptions = {
    title: "Enter your Loans"
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
          Non-delinquent loans (money you loaned to otheres and expect to be
          repaid).
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
          value={this.state.ndLoans}
          onChangeText={money => {
            this.setState({
              ndLoans: money
            });
          }}
        />
        <Text style={styles.inputText}>Shares of Stock</Text>
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
          value={this.state.stock}
          onChangeText={money => {
            this.setState({
              stock: money
            });
          }}
        />
        <Text style={styles.inputText}>
          Money you borrowed for business purposes
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
          value={this.state.loans}
          onChangeText={money => {
            this.setState({
              loans: money
            });
          }}
        />
        <View style={styles.btnView}>
          <Button
            style={styles.btn}
            title="Business & Real Estate >>"
            onPress={() => {
              let loansInput = {
                ndLoans: this.state.ndLoans,
                stock: this.state.stock,
                loans: this.state.loans
              };
              if (
                this.state.ndLoans == null ||
                this.state.stock == null ||
                this.state.loans == null
              ) {
                Alert.alert("Please fill out all fields.");
              } else {
                NavigationService.navigate("Business", {
                  asset: this.params.asset,
                  loan: loansInput
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

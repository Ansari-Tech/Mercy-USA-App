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
import { Divider, Overlay } from "react-native-elements";
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
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Lending & Loans</Text>
            <Divider style={{ backgroundColor: "blue" }} />
            <ScrollView style={{ flex: 1, alignContent: "center" }}>
              <View style={styles.modalSection}>
                <Text style={styles.modalSubtitle}>
                  Money Loaned to Others.
                </Text>
                <Text style={styles.modalBody}>
                  Any money you have loaned to friends, family, or acquaintances
                  that you expect to be paid back in reasonable amount of time.
                  An example could be money lent to a family member to buy a
                  car, or money borrowed by a friend for bills.
                </Text>
              </View>
              <View style={styles.modalSection}>
                <Text style={styles.modalSubtitle}>Shares & Stocks</Text>
                <Text style={styles.modalBody}>
                  This could include investments in public businesses like Apple
                  or Google, stock owned in the company you work for, or shares
                  in any other business.
                </Text>
              </View>
              <View style={styles.modalSection}>
                <Text style={styles.modalSubtitle}>Borrowed Money</Text>
                <Text style={styles.modalBody}>
                  Any money that you have borrowed from family or friends should
                  be included under this category.
                </Text>
              </View>
            </ScrollView>
            <Divider style={{ backgroundColor: "blue" }} />
            <View>
              <Button
                style={styles.modalButton}
                title="Get Started"
                onPress={() => {
                  this.setState({ isVisible: false });
                }}
              />
            </View>
          </View>
        </Overlay>
        <Text style={styles.inputText}>
          Non-delinquent loans (money you loaned to others and expect to be
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
        <Text style={styles.inputText}>Shares & Stocks</Text>
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
  },
  modalView: {
    flex: 1
  },
  modalTitle: {
    fontSize: 25,
    color: "#045484",
    alignSelf: "center"
  },
  modalSection: {
    padding: 25
  },
  modalSubtitle: {
    fontSize: 25
  },
  modalBody: {},
  modalButton: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0
  }
});

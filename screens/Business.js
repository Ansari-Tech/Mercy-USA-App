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

const Dimensions = require('react-native').Dimensions;
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
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Lending & Loans</Text>
            <Divider style={{ backgroundColor: "blue" }} />
            <ScrollView style={{ flex: 1, alignContent: "center" }}>
              <View style={styles.modalSection}>
                <Text style={styles.modalSubtitle}>Business Inventory.</Text>
                <Text style={styles.modalBody}>
                  If you own a business, the value of any inventory you own for
                  the purpose of resale should be included in this number.
                </Text>
              </View>
              <View style={styles.modalSection}>
                <Text style={styles.modalSubtitle}>Real Estate.</Text>
                <Text style={styles.modalBody}>
                  If you own a house, land, or other real estate that you
                  purchased for the purpose of sale, the value of that real
                  estate should be included here.
                </Text>
              </View>
              <View style={styles.modalSection}>
                <Text style={styles.modalSubtitle}>Profits From Business.</Text>
                <Text style={styles.modalBody}>
                  Net profits earned in the last year should be added to this
                  total.
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

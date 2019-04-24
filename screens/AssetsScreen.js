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
const { width } = Dimensions.get("window").width;
const { height } = Dimensions.get("window").height;
const { modalHeight } = height - 50;

const cashText = MKTextField.textfield()
  .withPlaceholder("Cash in hand")
  .build();

export default class AssetsScreen extends React.Component {
  static navigationOptions = {
    title: "Enter your Assets"
  };
  constructor(props) {
    super(props);
    this.state = { isVisible: true };
  }
  render() {
    return (
      <View style={styles.mainView}>
        <Overlay
          isVisible={this.state.isVisible}
          onBackdropPress={() => this.setState({ isVisible: false })}
        >
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Evaluating Your Assets</Text>
            <Divider style={{ backgroundColor: "blue" }} />
            <ScrollView style={{ flex: 1, alignContent: "center" }}>
              <View style={styles.modalSection}>
                <Text style={styles.modalSubtitle}>
                  Cash in Hand & in Bank.
                </Text>
                <Text style={styles.modalBody}>
                  Money stored in your checking account or in cash, as well as
                  any savings readily available to you.
                </Text>
              </View>
              <View style={styles.modalSection}>
                <Text style={styles.modalSubtitle}>The Value of Gold.</Text>
                <Text style={styles.modalBody}>
                  This could include any gold you own that is not in the form of
                  jewlery, such as gold bars or coins.
                </Text>
              </View>
              <View style={styles.modalSection}>
                <Text style={styles.modalSubtitle}>
                  Large Amounts of Jewlery.
                </Text>
                <Text style={styles.modalBody}>
                  While jewlery doesn't count towards the amount of gold you
                  own, large collections of jewlery worth unusually high amounts
                  of money should be counted under this category.
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
          Enter the value of cash in your bank account(s) and in your
          posesssion.
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
          value={this.state.cash}
          onChangeText={money => {
            this.setState({
              cash: money
            });
          }}
        />
        <Text style={styles.inputText}>
          Enter the value of precious metals such as Gold, Silver, Platinum,
          etc.
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
          value={this.state.gold}
          onChangeText={money => {
            this.setState({
              gold: money
            });
          }}
        />
        <Text style={styles.inputText}>
          Enter the value of any jewlery exceeding 85 grams (3 ounces).
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
          value={this.state.jewlery}
          onChangeText={money => {
            this.setState({
              jewlery: money
            });
          }}
        />
        <View style={styles.btnView}>
          <Button
            style={styles.btn}
            title="Loans >>"
            onPress={() => {
              let assetsInput = {
                cash: this.state.cash,
                gold: this.state.gold,
                jewlery: this.state.jewlery
              };
              if (
                this.state.cash == null ||
                this.state.gold == null ||
                this.state.jewlery == null
              ) {
                Alert.alert("Please fill out all fields.");
              } else {
                NavigationService.navigate("Loans", {
                  asset: assetsInput
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

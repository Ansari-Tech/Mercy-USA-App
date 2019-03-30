import React from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  ScrollView,
  Alert
} from "react-native";
import NavigationService from "./NavigationService";
import { Input } from "react-native-elements";
const Dimensions = require("Dimensions");
const { width } = Dimensions.get("window");

export default class ZakatResults extends React.Component {
  static navigationOptions = {
    title: "Coming soon!"
  };
  constructor(props) {
    super(props);
    this.state = { isVisible: true };
    this.params = this.props.navigation.state.params;
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>Cash: {this.params.asset.cash}</Text>
        <Text>GOld: {this.params.asset.gold}</Text>
        <Text>Jewlery: {this.params.asset.jewlery}</Text>
        <Text>ndLoans: {this.params.loan.ndLoans}</Text>
        <Text>stocks: {this.params.loan.stock}</Text>
        <Text>loans: {this.params.loan.loans}</Text>
        <Text>Inventory: {this.params.business.inventory}</Text>
        <Text>Real Estate: {this.params.business.realEstate}</Text>
        <Text>Profit: {this.params.business.profit}</Text>
      </View>
    );
  }
}

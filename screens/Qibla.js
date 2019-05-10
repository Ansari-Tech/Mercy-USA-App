import React from "react";
import { View, Button } from "react-native";
import NavigationService from "../NavigationService";
export default class Qibla extends React.Component {
  render() {
    let assetsInput = {
      cash: "$15430.0",
      gold: "$7410.0",
      jewlery: "$0.0"
    };
    let businessInput = {
      inventory: "$12301.0",
      realEstate: "$45.0",
      profit: "$0.0"
    };

    let loansInput = {
      ndLoans: "$1000.00",
      stock: "$4320.0",
      loans: "$0.00"
    };
    return (
      <View>
        <Button
          title="Press"
          onPress={() => {
            NavigationService.navigate("ZakatResults", {
              asset: assetsInput,
              loan: loansInput,
              business: businessInput
            });
          }}
        />
      </View>
    );
  }
}

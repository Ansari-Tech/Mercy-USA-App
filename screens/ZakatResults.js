import React from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  Animated,
  ActivityIndicator
} from "react-native";
import NavigationService from "../NavigationService";
import { Input, Overlay } from "react-native-elements";
const Dimensions = require("Dimensions");
const { width } = Dimensions.get("window");

//api call: https://www.quandl.com/api/v3/datasets/WGC/GOLD_DAILY_USD.json?limit=1&api_key=gPxV2UWAz3weZ2UTAzUr
export default class ZakatResults extends React.Component {
  static navigationOptions = {
    title: "Your Zakat"
  };
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true,
      isLoading: true,
      isNoInternet: false,
      fadeAnim: new Animated.Value(0)
    };
    this.params = this.props.navigation.state.params;
  }

  componentDidMount() {
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 1000000
    }).start();
    const URL =
      "https://www.quandl.com/api/v3/datasets/WGC/GOLD_DAILY_USD.json?limit=1&api_key=gPxV2UWAz3weZ2UTAzUr";
    return fetch(URL)
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            goldValue: responseJson.dataset.data[0][1]
          },
          function() {}
        );
      })
      .catch(error => {
        this.state.isNoInternet = true;
      });
  }
  render() {
    let { fadeAnim } = this.state.fadeAnim;
    if (this.state.isLoading) {
      return (
        <View
          style={{
            flex: 1,
            padding: 20
          }}
        >
          <ActivityIndicator />
        </View>
      );
    }
    if (this.state.isNoInternet) {
      return (
        <View>
          <Overlay isVisible={this.state.isVisible} height="auto">
            <View>
              <Text>
                Unable to fetch the current price of gold. This might be because
                your internet is turned off or unavailable.
              </Text>
              <Input
                placeholder="Current Value of Gold in USD"
                keyboardType="numeric"
                leftIcon={{
                  type: "material-community",
                  name: "cash-multiple"
                }}
                onChangeText={goldValue =>
                  this.setState({
                    goldValue
                  })
                }
              />
              <Button
                title="Continue"
                onPress={() => {
                  this.setState({
                    isVisible: false,
                    isLoading: false,
                    isNoInternet: false
                  });
                }}
              />
            </View>
          </Overlay>
        </View>
      );
    }
    let nisab = this.state.goldValue * 3;
    let total =
      parseFloat(this.params.asset.cash.replace("$", "").replace(",", "")) +
      parseFloat(this.params.asset.gold.replace("$", "").replace(",", "")) +
      parseFloat(this.params.asset.jewlery.replace("$", "").replace(",", "")) +
      parseFloat(this.params.loan.ndLoans.replace("$", "").replace(",", "")) +
      parseFloat(this.params.loan.loans.replace("$", "").replace(",", "")) +
      parseFloat(this.params.loan.stock.replace("$", "").replace(",", "")) +
      parseFloat(
        this.params.business.inventory.replace("$", "").replace(",", "")
      ) +
      parseFloat(
        this.params.business.realEstate.replace("$", "").replace(",", "")
      ) +
      parseFloat(this.params.business.profit.replace("$", "").replace(",", ""));

    let owed = Math.ceil((total < nisab ? 0 : total * 0.025) * 100) / 100;

    if (owed > 0) {
      return (
        <View style={styles.mainResult}>
          <Text style={styles.subTitle}>Your calculated zakat is...</Text>
          <Animated.View
            style={{
              justifyContent: "center",
              alignItems: "center",
              opacity: fadeAnim
            }}
          />
          <Text style={styles.title}>${owed}!</Text>
          <Button
            title="Donate now"
            onPress={() => {
              NavigationService.navigate("Donate", {
                isVisible: true,
                amount: owed.toString()
              });
            }}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.mainResult}>
          <Text style={styles.subTitle}>Your calculated zakat is...</Text>
          <Animated.View
            style={{
              justifyContent: "center",
              alignItems: "center",
              opacity: fadeAnim
            }}
          />
          <Text style={styles.title}>${owed}!</Text>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  title: {
    fontSize: 35,
    color: "green"
  },
  subTitle: {
    fontSize: 20,
    paddingTop: 10
  },
  mainResult: {
    paddingTop: 15,
    justifyContent: "center",
    alignItems: "center"
  }
});

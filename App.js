import React from "react";
import { StatusBar } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from "./HomeScreen";
import NavigationService from "./NavigationService";
import AssetsScreen from "./AssetsScreen";
import Loans from "./Loans";
import Locations from "./Locations";
import Qibla from "./Qibla";
import Currency from "./Currency";
import Donate from "./Donate";

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Assets: AssetsScreen,
    Loans: Loans,
    Locations: Locations,
    Qibla: Qibla,
    Donate: Donate,
    Currency: Currency
  },
  {
    initialRouteName: "Home"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  componentDidMount() {
    StatusBar.setHidden(true);
  }
  render() {
    return (
      <AppContainer
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    );
  }
}

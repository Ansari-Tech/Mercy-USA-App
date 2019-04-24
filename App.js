import React from "react";
import { StatusBar, Image } from "react-native";
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator
} from "react-navigation";
import HomeScreen from "./screens/HomeScreen";
import NavigationService from "./NavigationService";
import AssetsScreen from "./screens/AssetsScreen";
import Loans from "./screens/Loans";
import Locations from "./screens/Locations";
import Qibla from "./screens/Qibla";
import Currency from "./screens/Currency";
import Donate from "./screens/Donate";
import Business from "./screens/Business";
import ZakatResults from "./screens/ZakatResults";
import Settings from "./screens/Settings";
import UserInfo from "./screens/UserInfo";
import Projects from "./screens/Projects";

const TabNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeScreen
  },
  Locations: Locations,
  Projects: Projects,
  Settings: Settings
});

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Assets: AssetsScreen,
    Loans: Loans,
    Locations: Locations,
    Qibla: Qibla,
    Donate: Donate,
    Currency: Currency,
    Business: Business,
    ZakatResults: ZakatResults,
    Settings: Settings,
    UserInfo,
    UserInfo,
    TabNavigator: {
      screen: TabNavigator,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: "TabNavigator"
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

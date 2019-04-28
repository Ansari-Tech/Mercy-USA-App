import React from "react";
import { StatusBar, Alert } from "react-native";
import { Asset, AppLoading } from "expo";
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
    UserInfo: UserInfo,
    Projects: Projects,
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
  constructor(props) {
    super(props);
    this.state = {
      isLoadingComplete: false
    };
  }
  componentDidMount() {
    StatusBar.setHidden(true);
  }
  render() {
    if (this.state.isLoadingComplete == false) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <AppContainer
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      );
    }
  }
  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require("./assets/syria.png"),
        require("./assets/lebanon.png"),
        require("./assets/kenya.png"),
        require("./assets/indonesia.png"),
        require("./assets/somalia.png"),
        require("./assets/india.png"),
        require("./assets/america.png"),
        require("./assets/albania.png"),
        require("./assets/bosnia.png"),
        require("./assets/logo.png")
      ])
    ]);
  };
  _handleLoadingError = error => {
    this.setState({ isLoadingComplete: true });
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

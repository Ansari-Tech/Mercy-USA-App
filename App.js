import React from "react";
import { StatusBar, Alert } from "react-native";
import { Asset, AppLoading } from "expo";
import Ionicons from "@expo/vector-icons/Ionicons";
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
import Privacy from "./screens/Privacy";
import contact from "./screens/contact";
const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Locations: Locations,
    // Locations: Locations,
    Settings: Settings
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === "Home") {
          iconName = `ios-information-circle${focused ? "" : "-outline"}`;
        } else if (routeName === "Settings") {
          iconName = `ios-options`;
        } else if (routeName == "Locations") {
          iconName = "ios-compass";
        } else if (routeName == "Locations") {
          iconName = "ios-flag";
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: "#045484",
      inactiveTintColor: "gray"
    }
  }
);

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
    Privacy: Privacy,
    contact: contact,
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
        require("./assets/yemen.png"),
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

import React from "react";
import { Button, View, Text } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from "./HomeScreen";
import NavigationService from "./NavigationService";
import AssetsScreen from "./AssetsScreen";
import Loans from "./Loans";
import Locations from "./Locations"
const AppNavigator = createStackNavigator(
	{
		Home: HomeScreen,
		Assets: AssetsScreen,
		Loans: Loans,
		Locations: Locations
	},
	{
		initialRouteName: "Home"
	}
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
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

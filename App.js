import React from "react";
import { Button, View, Text } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from "./HomeScreen";
import NavigationService from "./NavigationService";
import AssetsScreen from "./AssetsScreen";
import Loans from "./Loans";
const AppNavigator = createStackNavigator(
	{
		Home: HomeScreen,
		Assets: AssetsScreen,
		Loans: Loans
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

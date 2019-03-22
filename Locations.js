import React from "react";
import { View, Button, Text, StyleSheet, ScrollView } from "react-native";
import NavigationService from "./NavigationService";
export default class Locations extends React.Component {
	static navigationOptions = {
		header: null
	};
	render() {
		return (
			<View style={styles.centerButtonView}>
				<Button
					style={styles.title}
					title="Calculate my Zakat"
					onPress={() => NavigationService.navigate("Assets")}
				/>
				<Button
					style={styles.title}
					title="View our global locations"
					onPress={() => NavigationService.navigate("Locations")}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	centerButtonView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	title: {
		alignItems: "center",
		fontSize: 25
	}
});

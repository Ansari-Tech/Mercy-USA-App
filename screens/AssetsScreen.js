import React from "react";
import { View, Button, Text, StyleSheet, ScrollView } from "react-native";
import NavigationService from "../NavigationService";
import { Input, Overlay } from "react-native-elements";
const Dimensions = require("Dimensions");
const { width } = Dimensions.get("window");

export default class AssetsScreen extends React.Component {
	static navigationOptions = {
		title: "Enter your Assets"
	};
	constructor(props) {
		super(props);
		this.state = { isVisible: true };
	}
	render() {
		return (
			<View style={styles.mainView}>
				<Overlay
					isVisible={this.state.isVisible}
					onBackdropPress={() => this.setState({ isVisible: false })}>
					<View>
						<Text>Evaluate Your Assets.</Text>
						<Text>Assets text placeholder here</Text>
						<Button
							title="Get Started"
							onPress={() => {
								this.setState({ isVisible: false });
							}}
						/>
					</View>
				</Overlay>
				<Text style={styles.inputText}>
					Non-delinquent loans (money you loaned to otheres and expect to be
					repaid).
				</Text>
				<Input
					style={styles.input}
					placeholder="Non-Delinquent Loans"
					keyboardType="numeric"
					leftIcon={{
						type: "material-community",
						name: "bank"
					}}
					onChangeText={cash =>
						this.setState({
							cash
						})
					}
				/>
				<Text style={styles.inputText}>
					Enter the value of precious metals such as Gold, Silver, Platinum,
					etc.
				</Text>
				<Input
					placeholder="Value of of gold"
					keyboardType="numeric"
					leftIcon={{
						type: "material-community",
						name: "coins"
					}}
					onChangeText={gold =>
						this.setState({
							gold
						})
					}
				/>
				<Text style={styles.inputText}>
					Enter the value of any jewlery over X THRESHOLD
				</Text>
				<Input
					placeholder="Value of extra jewlery"
					keyboardType="numeric"
					leftIcon={{
						type: "material-community",
						name: "ring"
					}}
					onChangeText={jewlery =>
						this.setState({
							jewlery
						})
					}
				/>
				<View style={styles.btnView}>
					<Button
						style={styles.btn}
						title="Loans >>"
						onPress={() => {
							let assetsInput = {
								cash: this.state.cash,
								gold: this.state.gold,
								jewlery: this.state.jewlery
							};
							NavigationService.navigate("Loans", {
								asset: assetsInput
							});
						}}
					/>
				</View>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	mainView: {
		flex: 2,
		alignItems: "center",
		width: width
	},
	btnView: {
		alignSelf: "center"
	},
	btn: {
		alignSelf: "center",
		color: "#860101"
	},
	title: {
		alignItems: "center",
		fontSize: 25
	},
	header: {
		textAlign: "center"
	},
	input: {
		alignSelf: "flex-end"
	},
	inputText: {
		textAlign: "center",
		paddingTop: 20
	}
});

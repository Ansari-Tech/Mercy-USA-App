import React from "react";
import {
	View,
	Button,
	Text,
	StyleSheet,
	ScrollView,
	Alert
} from "react-native";
import NavigationService from "../NavigationService";
import { Input, Overlay } from "react-native-elements";
const Dimensions = require("Dimensions");
const { width } = Dimensions.get("window");

export default class Loans extends React.Component {
	static navigationOptions = {
		title: "Enter your Loans"
	};
	constructor(props) {
		super(props);
		this.state = { isVisible: true };
		this.params = this.props.navigation.state.params;
	}
	render() {
		return (
			<View style={styles.mainView}>
				<Overlay
					isVisible={this.state.isVisible}
					onBackdropPress={() => this.setState({ isVisible: false })}>
					<View>
						<Text>{this.params.cash}</Text>
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
					placeholder="Cash in hand / in bank"
					keyboardType="numeric"
					leftIcon={{
						type: "material-community",
						name: "bank"
					}}
					onChangeText={ndLoans =>
						this.setState({
							ndLoans
						})
					}
				/>
				<Text style={styles.inputText}>Shares of Stock</Text>
				<Input
					placeholder="Shares of Stock"
					keyboardType="numeric"
					leftIcon={{
						type: "material-community",
						name: "coins"
					}}
					onChangeText={stock =>
						this.setState({
							stock
						})
					}
				/>
				<Text style={styles.inputText}>
					Money you borrowed for business purposes
				</Text>
				<Input
					placeholder="Money  borrowed"
					keyboardType="numeric"
					leftIcon={{
						type: "material-community",
						name: "ring"
					}}
					onChangeText={loans =>
						this.setState({
							loans
						})
					}
				/>
				<View style={styles.btnView}>
					<Button
						style={styles.btn}
						title="Business & Real Estate >>"
						onPress={() => {
							let loansInput = {
								ndLoans: this.state.ndLoans,
								stock: this.state.stock,
								loans: this.state.loans
							};
							NavigationService.navigate("Business", {
								asset: this.params.asset,
								loan: loansInput
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

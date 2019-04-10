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

export default class Business extends React.Component {
	static navigationOptions = {
		title: "Business & Real Estate"
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
					Business Inventory (market value of inventory)
				</Text>
				<Input
					style={styles.input}
					placeholder="Business Inventory"
					keyboardType="numeric"
					leftIcon={{
						type: "material-community",
						name: "bank"
					}}
					onChangeText={inventory =>
						this.setState({
							inventory
						})
					}
				/>
				<Text style={styles.inputText}>
					Real Estate Value (Designed for sale)
				</Text>
				<Input
					placeholder="Real Estate Value"
					keyboardType="numeric"
					leftIcon={{
						type: "material-community",
						name: "coins"
					}}
					onChangeText={realEstate =>
						this.setState({
							realEstate
						})
					}
				/>
				<Text style={styles.inputText}>Net Profits from business</Text>
				<Input
					placeholder="MNet Profits from business"
					keyboardType="numeric"
					leftIcon={{
						type: "material-community",
						name: "ring"
					}}
					onChangeText={profit =>
						this.setState({
							profit
						})
					}
				/>
				<View style={styles.btnView}>
					<Button
						style={styles.btn}
						title="View my Zakat"
						onPress={() => {
							let businessInput = {
								inventory: this.state.inventory,
								realEstate: this.state.realEstate,
								profit: this.state.profit
							};
							if(this.state.inventory == null
								|| this.state.realEstate == null 
						        || this.state.profit == null) {
								Alert.alert("Please fill out all fields.")
							}else {
							NavigationService.navigate("ZakatResults", {
								asset: this.params.asset,
								loan: this.params.loan,
								business: businessInput
							});
						}}
						}
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

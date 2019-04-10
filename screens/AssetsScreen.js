import React from "react";
import { View, Button, Text, StyleSheet, ScrollView, Alert} from "react-native";
import NavigationService from "../NavigationService";
import { Input, Overlay } from "react-native-elements";
const Dimensions = require("Dimensions");
const { width } = Dimensions.get("window").width;
const { height } = Dimensions.get("window").height;
const {modalHeight} = height - 50;
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
					<View style={styles.modalView}>
					<Text style={styles.modalTitle}>Evaluating Your Assets</Text>
					<View style={styles.modalSection}>
						<Text style={styles.modalSubtitle}>Money Loaned to Others.</Text>
						<Text style={styles.modalBody}>Any money you have loaned to friends, family, or acquaintances that you expect to be payed back in reasonable amount of time. 
						An example could be money lent to a family member to buy a car, or money borrowed by a friend for bills.</Text>
					</View>
					<View style={styles.modalSection}>
						<Text style={styles.modalSubtitle}>The Value of Gold.</Text>
						<Text style={styles.modalBody}>This could include any gold you own that is not in the form of jewlery, such as gold bars or coins.</Text>
					</View>
					<View style={styles.modalSection}>
						<Text style={styles.modalSubtitle}>Large Amounts of Jewlery.</Text>
						<Text style={styles.modalBody}>While jewlery doesn't count towards the amount of gold you own, large collections of jewlery worth unusually high amounts of money should be counted under this category.</Text>
					</View>
					<View style={styles.modalButton}>
					<Button 
							style={styles.modalButton}
							title="Get Started"
							onPress={() => {
								this.setState({ isVisible: false });
							}}
						/>
					</View>
					</View>
				</Overlay>
				<Text style={styles.inputText}>
					Non-delinquent loans (money you loaned to otheres and expect to be
					repaid).
				</Text>
				<Input
					style={styles.input}
					shake={true}

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
							if(this.state.cash == null
								|| this.state.gold == null 
						        || this.state.jewlery == null) {
								Alert.alert("Please fill out all fields.")
							}else {
								NavigationService.navigate("Loans", {
									asset: assetsInput
								});
							}
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
	},
	modalView: {
		flex: 3,
		justifyContent: 'space-evenly',
	},
	modalTitle: {
		fontSize: 25,
		color: "#045484"

	},
	modalSection: {
	},
	modalSubtitle: {
		fontSize: 20
	},
	modalBody: {

	},
	modalButton: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0
	}
});

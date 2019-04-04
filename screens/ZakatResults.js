import React from "react";
import {
	View,
	Button,
	Text,
	StyleSheet,
	ScrollView,
	Alert,
	ActivityIndicator
} from "react-native";
import NavigationService from "../NavigationService";
import { Input, Overlay } from "react-native-elements";
const Dimensions = require("Dimensions");
const { width } = Dimensions.get("window");

//api call: https://www.quandl.com/api/v3/datasets/WGC/GOLD_DAILY_USD.json?limit=1&api_key=gPxV2UWAz3weZ2UTAzUr
export default class ZakatResults extends React.Component {
	static navigationOptions = {
		title: "Coming soon!"
	};
	constructor(props) {
		super(props);
		this.state = { isVisible: true, isLoading: true, isNoInternet: true };
		this.params = this.props.navigation.state.params;
	}

	componentDidMount() {
		const URL =
			"https://www.quandl.com/api/v3/datasets/WGC/GOLD_DAILY_USD.json?limit=1&api_key=gPxV2UWAz3weZ2UTAzUr";
		return fetch(URL)
			.then(response => response.json())
			.then(responseJson => {
				this.setState(
					{
						isLoading: false,
						goldValue: responseJson.dataset.data[0][1]
					},
					function() {}
				);
			})
			.catch(error => {
				this.state.isNoInternet = true;
			});
	}
	render() {
		if (this.state.isLoading) {
			return (
				<View
					style={{
						flex: 1,
						padding: 20
					}}>
					<ActivityIndicator />
				</View>
			);
		}
		if (this.state.isNoInternet) {
			return (
				<View>
					<Overlay isVisible={this.state.isVisible} height="auto">
						<View>
							<Text>
								Unable to fetch the current price of gold. This might be because
								your internet is turned off or unavailable.
							</Text>
							<Input
								placeholder="Current Value of Gold in USD"
								keyboardType="numeric"
								leftIcon={{
									type: "material-community",
									name: "cash-multiple"
								}}
								onChangeText={goldValue =>
									this.setState({
										goldValue
									})
								}
							/>
							<Button
								title="Continue"
								onPress={() => {
									this.setState({
										isVisible: false,
										isLoading: false,
										isNoInternet: false
									});
								}}
							/>
						</View>
					</Overlay>
				</View>
			);
		}
		let nisab = this.state.goldValue * 3;
		let total =
			parseFloat(this.params.asset.cash) +
			parseFloat(this.params.asset.gold) +
			parseFloat(this.params.asset.jewlery) +
			parseFloat(this.params.loan.ndLoans) +
			parseFloat(this.params.loan.loans) +
			parseFloat(this.params.loan.stock) +
			parseFloat(this.params.business.inventory) +
			parseFloat(this.params.business.realEstate) +
			parseFloat(this.params.business.profit);

		let owed = total < nisab ? 0 : total * 0.025;
		return (
			<View style={{ flex: 1 }}>
				<Text>Cash: {this.params.asset.cash}</Text>
				<Text>GOld: {this.params.asset.gold}</Text>
				<Text>Jewlery: {this.params.asset.jewlery}</Text>
				<Text>ndLoans: {this.params.loan.ndLoans}</Text>
				<Text>stocks: {this.params.loan.stock}</Text>
				<Text>loans: {this.params.loan.loans}</Text>
				<Text>Inventory: {this.params.business.inventory}</Text>
				<Text>Real Estate: {this.params.business.realEstate}</Text>
				<Text>Profit: {this.params.business.profit}</Text>
				<Text>GoldVal: {this.state.goldValue}</Text>
				<Text>Nisab: {nisab}</Text>
				<Text>total: {total}</Text>
				<Text> due: {owed}</Text>
			</View>
		);
	}
}

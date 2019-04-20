import React from "react";
import { View, Button, Text, StyleSheet, Alert, ScrollView, AsyncStorage, TextInput } from "react-native";
import NavigationService from "../NavigationService";
import { Input } from "react-native-elements";
const Dimensions = require("Dimensions");
const { width } = Dimensions.get("window");

export default class Qibla extends React.Component {
	state = {
		'name': ''
	 }
	componentDidMount = () => AsyncStorage.getItem('name').then((value) => this.setState({ 'name': value }))
	setName = (value) => {
		AsyncStorage.setItem('name', value);
		this.setState({ 'name': value });
	 }
	static navigationOptions = {
		title: "Coming soon!"
	};
	render() {
		return (
			<View style = {styles.container}>
            <TextInput style = {styles.textInput} autoCapitalize = 'none'
            onChangeText = {this.setName}/>
            <Text>
               {this.state.name}
            </Text>
         </View>
		);
	}
}
const styles = StyleSheet.create ({
	container: {
	   flex: 1,
	   alignItems: 'center',
	   marginTop: 50
	},
	textInput: {
	   margin: 5,
	   height: 100,
	   borderWidth: 1,
	   backgroundColor: '#7685ed'
	}
 })

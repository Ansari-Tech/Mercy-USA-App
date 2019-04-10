import React from "react";
import { View, Image, Button, Text, StyleSheet, ScrollView, WebView, Alert } from "react-native";
import NavigationService from "../NavigationService";
import { Input } from "react-native-elements";
const Dimensions = require("Dimensions");
const { width } = Dimensions.get("window");
const jscode = `document.getElementByID('input_2_9_3').value = 'Bob'`	
export default class Donate extends React.Component {
	static navigationOptions = {
		headerBackground:  (
			<Image
					source={require("../assets/logo.png")}
					style={{
						width: "auto",
						height: "auto",
					}}
				/>
		)
	};
	
	render() {
		const user = {
			fname: "sajid",
			lname: "ansari",
			phone: "5713090456",
			email: "sajid@ansari.tech",
			street: "1154A East Main St.",
			city: "Radford",
			state: "Virginia",
			zip: "20151",
		}
		let js = `
				function populateUserInfo() {
					document.getElementById("input_2_9_3").value = "${user.fname}";
					document.getElementById("input_2_9_6").value = "${user.lname}";
					document.getElementById("input_2_7").value = "${user.email}";
					document.getElementById("input_2_5").value = "${user.phone}";
					document.getElementById("input_2_4_1").value = "${user.street}";
					document.getElementById("input_2_4_3").value = "${user.city}";
					document.getElementById("input_2_4_4").value = "${user.state}";
					document.getElementById("input_2_4_5").value = "${user.zip}";
					document.getElementById("input_2_5").value = "${user.phone}";
				}
				function hideHeaderFooter() { 
					document.getElementsByClassName("page-header")[0].style.display = "none"; 
					document.getElementsByClassName("main-header")[0].style.display = "none";
					document.getElementsByClassName("main-footer")[0].style.display = "none";
					document.getElementsByClassName("gform_heading")[0].style.display = "none";
				}
				function hideUserInfo() {
					document.getElementById("field_2_42").style.display = "none";
					document.getElementById("field_2_41").style.display = "none";
					document.getElementById("field_2_20").style.display = "none";
					document.getElementById("field_2_49").style.display = "none";
					document.getElementById("field_2_9").style.display = "none";
					document.getElementById("field_2_5").style.display = "none";
					document.getElementById("field_2_6").style.display = "none";
					document.getElementById("field_2_7").style.display = "none";
					document.getElementById("field_2_21").style.display = "none";
					document.getElementById("field_2_4").style.display = "none";
					document.getElementById("field_2_39").style.display = "none";
					document.getElementById("field_2_10").style.display = "none";
					document.getElementById("field_2_50").style.display = "none";
				}
				hideHeaderFooter()
				populateUserInfo()`
		return (
		 <View style={{flex: 1}}>
		   <WebView
			javaScriptEnabled={true}
			domStorageEnabled={true}
			injectedJavaScript={js}
			source={{ uri: "https://mercyusa.org/donate-now/" }} style={{ marginTop: 20  }} />
		</View>
	   )
	}
}

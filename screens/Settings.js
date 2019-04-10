import React from "react";
import { View, Button, Text, StyleSheet, ScrollView } from "react-native";
import NavigationService from "../NavigationService";
import { Input, ListItem } from "react-native-elements";
const Dimensions = require("Dimensions");
const { width } = Dimensions.get("window");
const aboutSection = [
    {
      title: 'About',
      icon: 'av-timer'
    },
    {
      title: 'Privacy Policy',
      icon: 'flight-takeoff'
    },
  ]
  const settingsSection = [
    {
      title: 'About',
      icon: 'av-timer'
    },
    {
      title: 'Notification Settings',
      icon: 'flight-takeoff'
    },
  ]
export default class Settings extends React.Component {

   
	static navigationOptions = {
		title: "Settings"
	};
	render() {
        
		return (<ScrollView style={{flex: 1, backgroundColor: "#EFF0F3"}}>
                <View style={{padding: 10}}>{
                    settingsSection.map((item, i) => (
                    <ListItem
                    key={i}
                    chevron
                    topDivider
                    title={item.title}
                    leftIcon={{ name: item.icon }}/>
              ))}
              </View>
              <View style={{padding: 10}}>{
                    aboutSection.map((item, i) => (
                        <ListItem
                        key={i}
                        chevron
                        topDivider
                        title={item.title}
                        leftIcon={{ name: item.icon }}/>
              ))}
              </View>
          </ScrollView>);
	}
}

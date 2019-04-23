import React from "react";
import { View, Button, Text, StyleSheet, ScrollView } from "react-native";
import NavigationService from "../NavigationService";
import { Input, ListItem } from "react-native-elements";
const Dimensions = require("Dimensions");
const { width } = Dimensions.get("window");
const aboutSection = [
  {
    title: "About",
    icon: "av-timer",
    screen: "About"
  },
  {
    title: "Privacy Policy",
    icon: "flight-takeoff",
    screen: "privacy"
  }
];
const settingsSection = [
  {
    title: "User Information",
    icon: "av-timer",
    screen: "UserInfo"
  },
  {
    title: "Notification Settings",
    icon: "flight-takeoff",
    screen: "Notifications"
  }
];
export default class Settings extends React.Component {
  static navigationOptions = {
    title: "Settings"
  };
  render() {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: "#EFF0F3" }}>
        <View style={{ padding: 10 }}>
          {settingsSection.map((item, i) => (
            <ListItem
              onPress={() => {
                NavigationService.navigate(item.screen);
              }}
              key={i}
              chevron
              topDivider
              title={item.title}
              leftIcon={{ name: item.icon }}
            />
          ))}
        </View>
        <View style={{ padding: 10 }}>
          {aboutSection.map((item, i) => (
            <ListItem
              onPress={() => {
                NavigationService.navigate(item.screen);
              }}
              key={i}
              chevron
              topDivider
              title={item.title}
              leftIcon={{ name: item.icon }}
            />
          ))}
        </View>
      </ScrollView>
    );
  }
}

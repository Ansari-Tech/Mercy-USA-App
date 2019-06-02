import React from "react";
import { View, Button, Linking } from "react-native";
import NavigationService from "../NavigationService";
export default class contact extends React.Component {
  render() {
    return (
      <View>
        <Button
          title="Send us an email"
          onPress={() => {
            Linking.openURL("mailto:info@mercyusa.org");
          }}
        />
        <Button
          title="Give us a call"
          onPress={() => {
            Linking.openURL("tel:7344540011");
          }}
        />
      </View>
    );
  }
}

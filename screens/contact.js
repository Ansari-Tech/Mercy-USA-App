import React from "react";
import { View, Button, Linking, StyleSheet } from "react-native";
import NavigationService from "../NavigationService";
export default class contact extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button
            title="Send us an email"
            onPress={() => {
              Linking.openURL("mailto:info@mercyusa.org");
            }}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Give us a call"
            onPress={() => {
              Linking.openURL("tel:7344540011");
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 10
  },
  container: {
    alignItems: "center",
    alignSelf: "center",
    alignContent: "center"
  }
});

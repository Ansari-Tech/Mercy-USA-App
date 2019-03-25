import React from "react";
import { View, Button, Text, StyleSheet, ScrollView } from "react-native";
import NavigationService from "./NavigationService";
export default class Loans extends React.Component {
  static navigationOptions = {
    header: Loans
  };

  render() {
    return (
      <View style={styles.centerButtonView}>
        <Button
          style={styles.title}
          title="test"
          onPress={() => NavigationService.navigate("Assets")}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  centerButtonView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    alignItems: "center",
    fontSize: 25
  }
});

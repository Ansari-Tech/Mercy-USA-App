import React from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  AsyncStorage,
  KeyboardAvoidingView,
  ActivityIndicator
} from "react-native";
import NavigationService from "../NavigationService";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { Input } from "react-native-elements";
const Dimensions = require("Dimensions");
const { width } = Dimensions.get("window");

export default class UserInfo extends React.Component {
  static navigationOptions = {
    title: "User Info"
  };
  constructor(props) {
    super(props);
    this.state = {
      user: {
        complete: "",
        fname: "",
        lname: "",
        email: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        zip: ""
      },
      isLoading: true
    };
  }
  componentDidMount = () =>
    AsyncStorage.getItem("user").then(value => {
      if (value != null) {
        this.setState({ user: JSON.parse(value), isLoading: false });
      } else {
        this.setState({ isLoading: false });
      }
    });
  setUser() {
    AsyncStorage.setItem(
      "user",
      JSON.stringify(this.state.user),
      Alert.alert("User info saved.")
    );
  }
  render() {
    if (this.state.isLoading) {
      return <ActivityIndicator />;
    }
    return (
      <KeyboardAwareScrollView
        behavior="position"
        enabled
        style={{ flex: 1, backgroundColor: "#EFF0F3" }}
      >
        <View
          style={{ paddingTop: 10, padding: 10, backgroundColor: "#FFFFFF" }}
        >
          <Input
            style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
            placeholder="First Name"
            value={this.state.user.fname}
            onChangeText={text => {
              const user = Object.assign({}, this.state.user, { fname: text });
              this.setState({ user });
            }}
          />
          <Input
            style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
            placeholder="Last Name"
            value={this.state.user.lname}
            onChangeText={text => {
              const user = Object.assign({}, this.state.user, { lname: text });
              this.setState({ user });
            }}
          />
        </View>
        <View
          style={{ paddingTop: 10, padding: 10, backgroundColor: "#FFFFFF" }}
        >
          <Input
            style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
            placeholder="Email"
            value={this.state.user.email}
            onChangeText={text => {
              const user = Object.assign({}, this.state.user, { email: text });
              this.setState({ user });
            }}
          />
          <Input
            style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
            placeholder="Phone Number"
            value={this.state.user.phone}
            onChangeText={text => {
              const user = Object.assign({}, this.state.user, { phone: text });
              this.setState({ user });
            }}
          />
        </View>
        <View
          style={{ paddingTop: 10, padding: 10, backgroundColor: "#FFFFFF" }}
        >
          <Input
            style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
            placeholder="Street Address"
            value={this.state.user.street}
            onChangeText={text => {
              const user = Object.assign({}, this.state.user, { street: text });
              this.setState({ user });
            }}
          />
          <Input
            style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
            placeholder="City"
            value={this.state.user.city}
            onChangeText={text => {
              const user = Object.assign({}, this.state.user, { city: text });
              this.setState({ user });
            }}
          />
          <Input
            style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
            placeholder="State"
            value={this.state.user.state}
            onChangeText={text => {
              const user = Object.assign({}, this.state.user, { state: text });
              this.setState({ user });
            }}
          />
          <Input
            style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
            placeholder="ZIP Code"
            value={this.state.user.zip}
            onChangeText={text => {
              const user = Object.assign({}, this.state.user, { zip: text });
              this.setState({ user });
            }}
          />
        </View>
        <Button
          title="Save"
          onPress={() => {
            const user = Object.assign({}, this.state.user, {});
            this.setState({ user }, this.setUser);
          }}
        />
        <Button
          color="#FF0000"
          title="Clear Personal Info"
          onPress={() => {
            const user = Object.assign({}, this.state.user, {
              fname: "",
              lname: "",
              email: "",
              phone: "",
              street: "",
              city: "",
              state: "",
              zip: ""
            });
            this.setState({ user }, this.setUser);
          }}
        />
      </KeyboardAwareScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 50
  },
  textInput: {
    margin: 5,
    height: 100,
    borderWidth: 1,
    backgroundColor: "#7685ed"
  }
});

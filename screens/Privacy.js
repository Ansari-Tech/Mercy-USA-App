import React from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  AsyncStorage,
  TextInput
} from "react-native";
import NavigationService from "../NavigationService";
import { MKTextField } from "react-native-material-kit";
import { TextInputMask } from "react-native-masked-text";
const Dimensions = require("Dimensions");
const { width } = Dimensions.get("window");
const Textfield = MKTextField.textfield()
  .withPlaceholder("Text...")
  .build();
export default class Privacy extends React.Component {
  render() {
    return (
      <ScrollView style={{ padding: 15, flex: 1 }}>
        <Text>
          Mercy-USA does not sell, lend or share email addresses, postal
          addresses, telephone numbers or any other personal information
          obtained from our donors or the general public with other nonprofit
          organizations or commercial companies. Mercy-USA does not send donor
          mailings on behalf of other organizations. In order to process your
          donation via our “Donate Online” page we require limited personal
          information. We use this information to acknowledge receipt of your
          donation for tax purposes. In addition, your contact information will
          be placed on our mailing list. If you do not wish to be included in
          our direct mail or email donor communications, please specify in the
          comment box of the donate page before you submit your donation. You
          may also opt out of our donor communications by sending an email
          to info@mercyusa.org.
        </Text>
        <Text>
          The Mercy-USA App allows for personal information to be saved locally
          for the purpose of facilitating quick donations. The Mercy-USA App
          does not sell, lend, or share email addresses, postal addresses,
          telephone numbers, or any other personal information obtained through
          the Personal Info screen with other nonprofit organizations or
          commercial companies. The Mercy-USA App passes personal information to
          the Mercy-USA Website for donation purposes only. To fully delete
          personal information, tap “clear personal information” in the Personal
          Info screen located under Settings.
        </Text>
      </ScrollView>
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

import React from "react";
import {
  View,
  Image,
  Button,
  Text,
  StyleSheet,
  Picker,
  ImageBackground,
  TouchableOpacity,
  Alert,
  AsyncStorage,
  ActivityIndicator,
  Linking
} from "react-native";
import NavigationService from "../NavigationService";
import { Input, Overlay, Card } from "react-native-elements";
const Dimensions = require("Dimensions");
const { width, height } = Dimensions.get("window");
import { Constants } from "expo";
export default class Donate extends React.Component {
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
        zip: "",
        complete: ""
      },
      donations: [
        {
          amount: -10,
          comment: "",
          designation: ""
        },
        {
          amount: -10,
          comment: ""
        },
        {
          amount: -10,
          comment: "",
          designation: ""
        }
      ],
      designation: "Syria Humanitarian Relief",
      comment: "",
      isLoading: true,
      amount: 0,
      isVisible: false
    };
  }
  static navigationOptions = {
    title: "Donate"
  };
  componentDidMount = () => {
    AsyncStorage.getItem("user").then(value => {
      if (value != null) {
        this.setState({ user: JSON.parse(value) });
      } else {
        Alert.alert("User info not saved");
      }
    }),
      AsyncStorage.getItem("donations").then(value => {
        if (value != null) {
          this.setState({ donations: JSON.parse(value), isLoading: false });
        } else {
          this.setState({ isLoading: false });
        }
      });
  };
  addDonation() {
    AsyncStorage.setItem("donations", JSON.stringify(this.state.donations));
  }
  donate(url) {
    const donations = Object.assign({}, this.state.donations);
    url +=
      "&donations[]=" +
      this.state.amount +
      "|" +
      this.state.designation +
      "&total=" +
      this.state.amount +
      "&comments=" +
      this.state.comment;
    console.log(url);
    Linking.openURL(url);
    donations[2] = donations[1];
    donations[1] = donations[0];
    donations[0] = {
      amount: this.state.amount,
      comment: this.state.comment,
      designation: this.state.designation
    };
    this.setState({ donations }, this.addDonation);
  }
  donateNoRearrange(url) {
    url +=
      "&donations[]=" +
      this.state.amount +
      "|" +
      this.state.designation +
      "&total=" +
      this.state.amount +
      "&comments=" +
      this.state.comment;
    Linking.openURL(url);
  }
  render() {
    if (this.state.isLoading) {
      return <ActivityIndicator />;
    } else {
      let url =
        "https://mercyusa.org/donate-now/" +
        "?first_name=" +
        this.state.user.fname +
        "&last_name=" +
        this.state.user.lname +
        "&daytime_phone=" +
        this.state.user.phone +
        "&email=" +
        this.state.user.email +
        "&billing_address=" +
        this.state.user.street +
        "&billing_city=" +
        this.state.user.city +
        "&billing_state=" +
        this.state.user.state +
        "&billing_zip=" +
        this.state.user.zip;
      const emptyButton = (
        <Text
          style={{ alignSelf: "center", width: width - 50, color: "#C0C0C0" }}
        />
      );
      const placeHolder = (
        <Text style={{ fontSize: 20 }}>
          Your past donations will appear here.
        </Text>
      );
      let buttonOne;
      let buttonTwo;
      let buttonThree;
      let clearButton;
      if (this.state.donations[0].amount == -10) {
        buttonOne = placeHolder;
        clearButton = emptyButton;
      } else {
        clearButton = (
          <Button
            color="#FF0000"
            title="Clear Recent Donations"
            onPress={() => {
              const donations = Object.assign({}, this.state.donations);
              donations[0].amount = -10;
              donations[0].comment = "";
              donations[1].amount = -10;
              donations[1].comment = "";
              donations[2].amount = -10;
              donations[2].comment = "";
              this.setState({ donations }, this.addDonation);
            }}
          />
        );
        buttonOne = (
          <TouchableOpacity
            style={styles.recent}
            onPress={() => {
              this.setState(
                {
                  amount: this.state.donations[0].amount,
                  comment: this.state.donations[0].comment
                },
                this.donateNoRearrange(url)
              );
            }}
          >
            <ImageBackground
              source={require("../assets/squareglobe.png")}
              style={[styles.itemContainer]}
            >
              <Text style={styles.itemName}>
                {"$" + this.state.donations[0].amount}
              </Text>
              <Text style={styles.itemDesc}>
                {this.state.donations[0].designation}
              </Text>
            </ImageBackground>
          </TouchableOpacity>
        );
      }
      if (this.state.donations[1].amount == -10) {
        buttonTwo = emptyButton;
      } else {
        buttonTwo = (
          <TouchableOpacity
            style={styles.recent}
            onPress={() => {
              this.setState(
                {
                  amount: this.state.donations[1].amount,
                  comment: this.state.donations[1].comment
                },
                this.donateNoRearrange(url)
              );
            }}
          >
            <ImageBackground
              source={require("../assets/squareglobe.png")}
              style={[styles.itemContainer]}
            >
              <Text style={styles.itemName}>
                {"$" + this.state.donations[1].amount}
              </Text>
              <Text style={styles.itemDesc}>
                {this.state.donations[1].designation}
              </Text>
            </ImageBackground>
          </TouchableOpacity>
        );
      }
      if (this.state.donations[2].amount == -10) {
        buttonThree = emptyButton;
      } else {
        buttonThree = (
          <TouchableOpacity
            style={styles.recent}
            onPress={() => {
              this.setState(
                {
                  amount: this.state.donations[2].amount,
                  comment: this.state.donations[2].comment
                },
                this.donateNoRearrange(url)
              );
            }}
          >
            <ImageBackground
              source={require("../assets/squareglobe.png")}
              style={[styles.itemContainer]}
            >
              <Text style={styles.itemName}>
                {"$" + this.state.donations[2].amount}
              </Text>
              <Text numberOfLines={1} style={styles.itemDesc}>
                {this.state.donations[2].designation}
              </Text>
            </ImageBackground>
          </TouchableOpacity>
        );
      }
      return (
        <View style={styles.container}>
          <Button
            title="View & edit your personal information"
            onPress={() => {
              NavigationService.navigate("UserInfo");
            }}
          />
          <Button
            title="Make a Donation"
            onPress={() => {
              this.setState({ isVisible: true });
            }}
          />
          <Overlay
            isVisible={this.state.isVisible}
            onBackdropPress={() => this.setState({ isVisible: false })}
          >
            <View>
              <Input
                placeholder="Donation Amount"
                keyboardType="numeric"
                leftIcon={{
                  type: "material-community",
                  name: "bank"
                }}
                onChangeText={amount => (this.state.amount = amount)}
              />

              <Input
                placeholder="Comments"
                onChangeText={comment => (this.state.comment = comment)}
              />
              <Picker
                selectedValue={this.state.designation}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ designation: itemValue })
                }
              >
                <Picker.Item
                  label="Somalia Safe Water Project"
                  value="Somalia Safe Water Project"
                />
                <Picker.Item
                  label="Measles Prevention and Healthcare in Lebanon"
                  value="Measles Prevention and Healthcare in Lebanon"
                />
                <Picker.Item
                  label="Syria Humanitarian Relief"
                  value="Syria Humanitarian Relief"
                />
                <Picker.Item
                  label="Gaza School for Blind Children"
                  value="Gaza School for Blind Children"
                />
                <Picker.Item
                  label="Vocational Training Program for Palestinian Refugee Youth in Lebanon"
                  value="Vocational Training Program for Palestinian Refugee Youth in Lebanon"
                />
                <Picker.Item
                  label="Somalia Health Programs"
                  value="Somalia Health Programs"
                />
                <Picker.Item label="Ramadan Iftar" value="Ramadan Iftar" />
                <Picker.Item
                  label="Zakat ul-Fitr/Fitra'"
                  value="Zakat ul-Fitr/Fitra'"
                />
                <Picker.Item
                  label="Gaza Humanitarian Relief"
                  value="Gaza Humanitarian Relief"
                />
                <Picker.Item
                  label="Eid Qurbani/Udhia"
                  value="Eid Qurbani/Udhia"
                />
                <Picker.Item
                  label="Bosnia Orphans & Economic Development"
                  value="Bosnia Orphans & Economic Development"
                />
                <Picker.Item
                  label="Indonesia Small Farmer Economic Development"
                  value="Indonesia Small Farmer Economic Development"
                />
                <Picker.Item
                  label="Education Projects"
                  value="Education Projects"
                />
                <Picker.Item
                  label="Albania Orphans & Economic Development"
                  value="Albania Orphans & Economic Development"
                />
                <Picker.Item
                  label="Burma Rohingya Humanitarian Relief"
                  value="Burma Rohingya Humanitarian Relief"
                />
                <Picker.Item label="Zakat Fund" value="Zakat Fund" />
              </Picker>
              <Button
                title="Donate"
                onPress={() => {
                  this.donate(url);
                  this.setState({ isVisible: false });
                }}
              />
            </View>
          </Overlay>
          <Card
            title="Recent Donations"
            style={{ alignSelf: "center", justifyContent: "center" }}
          >
            {buttonOne}
            {buttonTwo}
            {buttonThree}
            {clearButton}
          </Card>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight + 20,
    backgroundColor: "#ecf0f1"
  },
  itemContainer: {
    justifyContent: "flex-end",
    borderRadius: 5,
    width: width - 50,
    height: height * 0.14
  },
  itemName: {
    fontSize: 45,
    color: "#fff",
    fontWeight: "600"
  },
  itemDesc: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600"
  },
  recent: {
    width: width - 50,
    height: height * 0.15
  }
});

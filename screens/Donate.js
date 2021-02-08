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
const Dimensions = require('react-native').Dimensions;
const axios = require('axios');
const cheerio = require('react-native-cheerio');
const { width, height } = Dimensions.get("window");
import { MKTextField } from "react-native-material-kit";
import { TextInputMask } from "react-native-masked-text";
import { Constants } from "expo";
const cashText = MKTextField.textfield()
  .withPlaceholder("Cash in hand")
  .build();

export default class Donate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      designations: [],
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
      amount: "$0.00",
      isVisible: false
    };
    this.params = this.props.navigation.state.params;
  }
  static navigationOptions = {
    title: "Donate"
  };
  componentDidMount = () => {
    if (this.params != null) {
      this.state.isVisible = this.params.isVisible;
      this.state.amount = this.params.amount;
      this.state.designation = this.params.designation;
    }
    AsyncStorage.getItem("user").then(value => {
      if (value != null) {
        this.setState({ user: JSON.parse(value) });
      }
    }),
      AsyncStorage.getItem("donations").then(value => {
        if (value != null) {
          this.setState({ donations: JSON.parse(value), isLoading: false });
        } else {
          this.setState({ isLoading: false });
        }
      });

    this.getDesignations(function(scrapedDesignations) {
        this.setState({designations: scrapedDesignations});
        this.setState({designation: scrapedDesignations[0]});
      }.bind(this))
  };
  addDonation() {
    AsyncStorage.setItem("donations", JSON.stringify(this.state.donations));
  }
  donate(url) {
    const donations = Object.assign({}, this.state.donations);
    let trimmedAmount = this.state.amount.replace("$", "");
    this.state.amount = trimmedAmount;
    url +=
      "&donations[]=" +
      this.state.amount +
      "|" +
      encodeURIComponent(this.state.designation) +
      "&total=" +
      trimmedAmount +
      "&comments=" +
      this.state.comment;
    console.log(encodeURI(url));
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
    console.log(this.state.designation)
    url +=
      "&donations[]=" +
      this.state.amount +
      "|" +
      encodeURIComponent(this.state.designation) +
      "&total=" +
      this.state.amount +
      "&comments=" +
      this.state.comment;
    Linking.openURL(url);
  }

  getDesignations(callback){
    axios("https://mercyusa.org/donate-now/")
    .then(response => {
      let scrapedDesignations = [];
      const html = response.data;
      const $ = cheerio.load(html);
      let selector = cheerio.load($.html($('[data-label="Designation"]')[0].childNodes[0]));
      selector('select').find('option').each((i,op) => {
        scrapedDesignations.push($(op).text());
        let picker= <Picker.Item label={$(op).text()} value={$(op).text()} />
     })
     callback(scrapedDesignations);
    })
    .catch(console.error);
  }
  render() {
    if(this.state.designations.length == 0) {
      return (
        <ActivityIndicator
          animating={true}
          style={styles.indicator}
          size="large"
          color="#005487"
        />
      );
    } else {
      console.log(this.state.designations);
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
        <Text
          style={{
            fontSize: 20,
            justifyContent: "center",
            alignSelf: "center",
            alignContent: "center",
            color: "#ecf0f1"
          }}
        >
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
            style={{ padding: 10 }}
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
              imageStyle={{ borderRadius: 20 }}
            >
              <Text allowFontScaling={false} style={styles.itemName}>
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
              imageStyle={{ borderRadius: 20 }}
            >
              <Text allowFontScaling={false} style={styles.itemName}>
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
              imageStyle={{ borderRadius: 20 }}
            >
              <Text allowFontScaling={false} style={styles.itemName}>
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
          <View style={{ alignSelf: "center", justifyContent: "center" }}>
            <TouchableOpacity
              style={styles.donateView}
              onPress={() => {
                this.setState({ isVisible: true });
              }}
            >
              <ImageBackground
                source={require("../assets/squareglobe.png")}
                style={[styles.donateContainer]}
                imageStyle={{ borderRadius: 20 }}
              >
                <Text style={styles.donate} allowFontScaling={false}>
                  Make a Donation
                </Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
          <Overlay
            isVisible={this.state.isVisible}
            onBackdropPress={() => this.setState({ isVisible: false })}
          >
            <View>
              <Text
                style={{
                  fontSize: 25,
                  color: "#045484",
                  alignSelf: "center",
                  padding: 15
                }}
              >
                Make a Donation
              </Text>
              <TextInputMask
                customTextInput={cashText}
                customTextInputProps={{
                  style: {
                    width: "80%",
                    alignContent: "center",
                    alignSelf: "center"
                  },
                  placeholder: "$0.00        "
                }}
                type={"money"}
                options={{
                  precision: 2,
                  separator: ".",
                  delimiter: ",",
                  unit: "$",
                  suffixUnit: ""
                }}
                value={this.state.amount}
                onChangeText={money => {
                  this.setState({
                    amount: money
                  });
                }}
              />

              <Input
                placeholder="Comments"
                onChangeText={comment => (this.state.comment = comment)}
              />
              <Picker
                selectedValue={this.state.designation}
                pickerTextEllipsesLen={800}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ designation: itemValue })
                }
              >
                              {this.state.designations.map((item, index) => {
                  return (<Picker.Item label={item} value={item} key={index}/>) 
              })}
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
/*
 <Button
            title="View & edit your personal information"
            onPress={() => {
              NavigationService.navigate("UserInfo");
            }}
          />
          */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf0f1"
  },
  itemContainer: {
    justifyContent: "center",
    borderRadius: 5,
    width: width - 50,
    height: height * 0.1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12
  },
  donateContainer: {
    justifyContent: "center",
    borderRadius: 5,
    width: width - 40,
    height: height * 0.14,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12
  },
  itemName: {
    fontSize: 45,
    color: "#fff",
    fontWeight: "600",
    alignSelf: "center"
  },
  donate: {
    fontSize: 35,
    color: "#fff",
    alignSelf: "center"
  },
  itemDesc: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
    alignSelf: "center"
  },
  recent: {
    width: width - 50,
    height: height * 0.11
  },
  donateView: {
    width: width - 50,
    height: height * 0.15,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center"
  }
});

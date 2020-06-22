import React from "react";
import { StyleSheet, View, Dimensions, Text, ActivityIndicator } from "react-native";
import NavigationService from "../NavigationService";
import { Constants } from "expo";
import { FlatGrid } from "react-native-super-grid";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
const { width, height } = Dimensions.get("window");

export default class SalatTimes extends React.Component {
  static navigationOptions = {
    title: "Salat Times"
  };
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      times: [
        { name: "Fajr", time: null },
        { name: "Dhuhr", time: null },
        { name: "Asr", time: null },
        { name: "Maghrib", time: null },
        { name: "Isha", time: null }
      ]
    };
  }

  _toStandardTime(originalTimeString) {
    let originalHours = parseInt(originalTimeString.substring(0, 2), 10);
    let originalMinutes = originalTimeString.substring(3, 5);
    let newHours = originalHours % 12;
    return newHours + ":" + originalMinutes;
  }
  _AMOrPM(inTime) {
    let hours = parseInt(inTime.substring(0, 2), 10);

    return hours > 12 ? "PM" : "AM";
  }
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        locationResult: "Permission to access location was denied"
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({
      latitude: JSON.stringify(location.coords.latitude),
      longitude: JSON.stringify(location.coords.longitude),

    });
    let URL = "http://api.aladhan.com/v1/timings/" +Math.floor(Date.now() / 1000) + "?latitude=";
    URL +=
      this.state.latitude + "&longitude=" + this.state.longitude + "&method=2";
      console.log(URL);
    return fetch(URL)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          times: [
            {
              name: "Fajr",
              time: this._toStandardTime(responseJson.data.timings.Fajr),
              amPM: this._AMOrPM(responseJson.data.timings.Fajr)
            },
            {
              name: "Dhuhr",
              time: this._toStandardTime(responseJson.data.timings.Dhuhr),
              amPM: this._AMOrPM(responseJson.data.timings.Dhuhr)
            },
            {
              name: "Asr",
              time: this._toStandardTime(responseJson.data.timings.Asr),
              amPM: this._AMOrPM(responseJson.data.timings.Asr)
            },
            {
              name: "Maghrib",
              time: this._toStandardTime(responseJson.data.timings.Maghrib),
              amPM: this._AMOrPM(responseJson.data.timings.Maghrib)
            },
            {
              name: "Isha",
              time: this._toStandardTime(responseJson.data.timings.Isha),
              amPM: this._AMOrPM(responseJson.data.timings.Isha)
            }
          ]
        });
      })
      .catch(error => {
        this.setState({ locationResult: null });
      });
  };

  componentDidMount() {
    this._getLocationAsync();
  }
  render() {
    if (!this.state.times[0].time) {
      return (
        <ActivityIndicator
          animating={true}
          style={styles.indicator}
          size="large"
        />
      );
    }
    return (
      <FlatGrid
        itemDimension={width - 10}
        items={this.state.times}
        style={styles.gridView}
        renderItem={({ item, index }) => (
          <View style={[styles.itemContainer, { backgroundColor: "#045384" }]}>
            <Text style={styles.name}>{item.name}</Text>
            <View style={{ flexDirection: "row" }}>
              <Text>
                <Text style={styles.time}>{item.time}</Text>
                <Text style={styles.amPM}>{item.amPM}</Text>
              </Text>
            </View>
          </View>
        )}
      />
    );
  }
}
const styles = StyleSheet.create({
  gridView: {
    flex: 1
  },
  itemContainer: {
    justifyContent: "center",
    borderRadius: 5,
    padding: 10,
    height: 100
  },
  name: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600"
  },
  amPM: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600"
  },
  time: {
    fontWeight: "600",
    fontSize: 50,
    color: "#fff"
  }
});

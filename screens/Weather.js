import React from "react";
import { StyleSheet, View, Dimensions, Text, Alert } from "react-native";
import NavigationService from "../NavigationService";
import { Constants } from "expo";
import { FlatGrid } from "react-native-super-grid";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
const { width, height } = Dimensions.get("window");

export default class Weather extends React.Component {
  static navigationOptions = {
    title: "Local Weather"
  };
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      forecast: [
        {
          day: "One",
          temperature: "",
          high: "",
          low: "",
          weather: "",
          cover: ""
        },
        {
          day: "Two",
          temperature: "",
          high: "",
          low: "",
          weather: "",
          cover: ""
        },
        {
          day: "Three",
          temperature: "",
          high: "",
          low: "",
          weather: "",
          cover: ""
        },
        {
          day: "Four",
          temperature: "",
          high: "",
          low: "",
          weather: "",
          cover: ""
        },
        {
          day: "Five",
          temperature: "",
          high: "",
          low: "",
          weather: "",
          cover: ""
        }
      ]
    };
  }
  _trimEntriesToDays(list, referenceList) {
    newList = [5];
    let i = 0;
    let j = 0;
    for (j = 0; j < referenceList.length; j++) {
      for (i = 0; i < list.length; i++) {
        if (
          list[i].validTime.substring(0, 10) ==
          referenceList[j].validTime.substring(0, 10)
        ) {
          newList[j] = list[i];
        }
      }
    }
    return newList;
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
      longitude: JSON.stringify(location.coords.longitude)
    });
    let URL = "https://api.weather.gov/points/";

    URL += this.state.latitude + "," + this.state.longitude;
    return fetch(URL)
      .then(response => response.json())
      .then(responseJson => {
        let newURL = "https://api.weather.gov/gridpoints/TOP/";
        newURL +=
          responseJson.properties.gridX + "," + responseJson.properties.gridY;
        return fetch(newURL)
          .then(response => response.json())
          .then(responseJson => {
            let i;
            let updatedForecast = [5];
            let temperatures = this._trimEntriesToDays(
              responseJson.properties.temperature.values,
              responseJson.properties.maxTemperature.values
            );
            console.log(URL);
            let covers = this._trimEntriesToDays(
              responseJson.properties.skyCover.values,
              responseJson.properties.maxTemperature.values
            );
            for (i = 0; i <= 4; i++) {
              day = {
                day: responseJson.properties.maxTemperature.values[i].validTime,
                temperature: Math.round(temperatures[i].value * (9 / 5) + 32),
                high:
                  Math.round(
                    responseJson.properties.maxTemperature.values[i].value *
                      (9 / 5)
                  ) + 32,
                low:
                  Math.round(
                    responseJson.properties.minTemperature.values[i].value *
                      (9 / 5)
                  ) + 32,
                weather:
                  responseJson.properties.weather.values[i].value[0].coverage +
                  " " +
                  responseJson.properties.weather.values[i].value[0].weather,
                cover: covers[i].value
              };
              updatedForecast[i] = day;
            }
            this.setState({ forecast: updatedForecast });
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
    return (
      <FlatGrid
        itemDimension={width - 10}
        items={this.state.forecast}
        style={styles.gridView}
        renderItem={({ item, index }) => (
          <View style={[styles.itemContainer, { backgroundColor: "#045384" }]}>
            <Text style={styles.name}>{item.day}</Text>
            <View style={{ flexDirection: "row" }}>
              <Text>
                <Text style={styles.time}>{item.temperature}°</Text>
                <Text style={styles.amPM}>high: {item.high}°</Text>
                <Text style={styles.amPM}>low: {item.low}°</Text>
                <Text style={styles.amPM}>cover: {item.cover}</Text>
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

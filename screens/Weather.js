import React from "react";
import { StyleSheet, View, Dimensions, Text, TouchableOpacity } from "react-native";
import NavigationService from "../NavigationService";
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
    for (let j = 0; j < referenceList.length; j++) {
      for (let i = 0; i < list.length; i++) {
        if (
          list[i].validTime.substring(0, 10) ==
          referenceList[j].validTime.substring(0, 10)
        ) {
          newList[j] = list[i];
        }
      }
      if (typeof newList[j] == "undefined" || newList[j] == null) {
        newList[j] = {
          validTime: "2019-10-13T17:00:00+00:00/PT2H",
          value: [{ coverage: " ", weather: " " }]
        };
      }
    }
    return newList;
  }

  generateURL = (callback) => {
    return fetch("https://api.weather.gov/points/" + this.state.latitude + "," + this.state.longitude)
      .then(response => response.json())
      .then(responseJson => {
        callback("https://api.weather.gov/gridpoints/TOP/" +
        responseJson.properties.gridX + "," + responseJson.properties.gridY);
      });
  }

  setWeather = () => {
    let url = "";
    this.generateURL((generatedURL)=> {
      console.log(generatedURL);
      url = generatedURL;
      return fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({weather: responseJson})
        let updatedForecast = [5];
        let temperatures = this._trimEntriesToDays(
          responseJson.properties.temperature.values,
          responseJson.properties.maxTemperature.values
        );
        let covers = this._trimEntriesToDays(
          responseJson.properties.skyCover.values,
          responseJson.properties.maxTemperature.values
        );
        let trimmedForecast = this._trimEntriesToDays(
          responseJson.properties.weather.values,
          responseJson.properties.maxTemperature.values
        );
        for (let i = 0; i <= 4; i++) {
          day = {
            day: responseJson.properties.maxTemperature.values[
              i
            ].validTime.substring(0, 10),
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
              trimmedForecast[i].value[0].weather != null &&
              trimmedForecast[i].value[0].coverage != null &&
              trimmedForecast[i].value[0].coverage != " " &&
              trimmedForecast[i].value[0].weather != " "
                ? trimmedForecast[i].value[0].coverage.replace("_", " ") +
                  " of " +
                  trimmedForecast[i].value[0].weather.replace("_", " ")
                : "clear"
          };
          updatedForecast[i] = day;
        }
        this.setState({ forecast: updatedForecast });
      }).catch(error=> {
        console.log(error);
      });
    });


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
    this.setWeather();
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
        <TouchableOpacity
              onPress={() => {
                NavigationService.navigate("WeatherDay", {
                  temperature: this.state.weather.properties.temperature.values,
                  chill: this.state.weather.properties.windChill.values,
                  date: item.day,
                });
              }}
            >
          <View style={[styles.itemContainer, { backgroundColor: "#045384" }]}>
            <Text style={styles.name}>{item.day}</Text>
            <View style={{ flexDirection: "row" }}>
              <Text>
                <Text style={styles.time}>{item.temperature}° </Text>
                <Text style={styles.amPM}>high: {item.high}°, </Text>
                <Text style={styles.amPM}>low: {item.low}° </Text>
              </Text>
            </View>
            <Text style={styles.weather}>{item.weather}</Text>
          </View>
          </TouchableOpacity>
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
    height: 150
  },
  name: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600"
  },
  weather: {
    fontSize: 25,
    fontStyle: "italic",
    color: "#fff"
  },
  amPM: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "600"
  },
  time: {
    fontWeight: "600",
    fontSize: 50,
    color: "#fff"
  }
});

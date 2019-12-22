import React, { useCallback } from "react";
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
    this.params = this.props.navigation.state.params;
    this.state = {
    };
  }

  formatTime = (time) => {
    return time > 12 ? ((time - 12)) + " PM" : (time === 0 ? 12 + " AM" : (time === 12 ? "12 PM" : time + " AM"));
  }
  trimEntriesToHours(list, date) {
    let newList = [];
    list.sort((a,b)=>{
      return parseInt(a.validTime.split("T")[1].split(":")[0], 10) > parseInt(b.validTime.split("T")[1].split(":")[0], 10) ? 1 : -1;
    });
    list.forEach(entry => {
      if(date === entry.validTime.substring(0,10)) {
        
        const hour = parseInt(entry.validTime.split("T")[1].split(":")[0], 10);
        const formattedHour = formatTime(hour); 

        while(newList.length > 0 && newList[newList.length -1].hour < 23  && newList[newList.length -1].hour - hour <-1) {
          let duplicate = JSON.parse(JSON.stringify(newList[newList.length -1]));
          duplicate.hour = duplicate.hour + 1;
          duplicate.formattedHour = formatTime(duplicate.hour); 
          console.log(newList[newList.length  -1].hour + " , " + duplicate.hour);
          newList.push(duplicate);
        }
        const correctedEntry = {
          hour: hour,
          formattedHour: formattedHour,
          value: entry.value
        };
        newList.push(correctedEntry);
      }
    });
    return newList.sort((a, b)=> {
      return a.hour > b.hour ? 1 : -1;
    });
  }

componentDidMount() {
  if(this.params.temperature){
    this.setWeather();
  }
}

ctof = (c) => {
  return Math.round(c * (9 / 5) + 32)
}

formatData = (callback)=> {
  const temperatures = this.trimEntriesToHours(this.params.temperature, this.params.date);
  const chill = this.trimEntriesToHours(this.params.chill, this.params.date);
  callback( {
    temperatures: temperatures, 
    chill: chill
  });
}
  setWeather = () => {
    let forecast = [];

    this.formatData((data)=> {
      for(let i = 0; i < data.temperatures.length; i++) {
        let hourEntry = {
          hour: data.temperatures[i].formattedHour,
          temperature: this.ctof(data.temperatures[i].value),
         // chill: this.ctof(data.chill[i].value)
          //add other info here
        }
        forecast.push(hourEntry);
      }
    })
    this.setState({forecast: forecast});
  }


  render() {
    return (
      <FlatGrid
        itemDimension={width - 10}
        items={this.state.forecast}
        style={styles.gridView}
        renderItem={({ item, index }) => (
          <View style={[styles.itemContainer, { backgroundColor: "#045384" }]}>
            <Text style={styles.name}>{item.hour}</Text>
            <View style={{ flexDirection: "row" }}>
              <Text>
                <Text style={styles.time}>{item.temperature}° </Text>
                <Text style={styles.amPM}>{item.chill}°</Text>
              </Text>
            </View>
            <Text style={styles.weather}>{item.weather}</Text>
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
    height: 75
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

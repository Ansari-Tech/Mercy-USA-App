import React from "react";
import { View, Text, Button } from "react-native";
import HijriDate, {toHijri} from "hijri-date/lib/safe"
import NavigationService from "../NavigationService";
import HijrahDate from "hijrah-date";

import {
  Calendar,
} from "react-native-calendars";

export default class IslamicCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 20
    };
  }
  getDate(date) {
   // console.log(toHijri(new Date(date.dateString)));
    return toHijri(new Date(date.dateString)).date;
  }
  render() {
    return (
      <View>
        <Calendar
          style={{ height: 500 }}
          dayComponent={({ date, state, marking }) => {
            return (
              <View
                style={{
                  height: 100
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    elevation: state === "today" ? 2 : 1,
                    color: state === "today" ? "blue" : "black",
                    fontWeight: state === "today" ? "bold" : "normal"
                  }}
                >
                  {this.getDate(date)}
                </Text>
              </View>
            );
          }}
        />
      </View>
    );
  }
}

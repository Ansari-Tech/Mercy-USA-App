import React from "react";
import { View, Text, Button } from "react-native";
import NavigationService from "../NavigationService";
import HijrahDate from "hijrah-date";
import {
  Calendar,
  LocaleConfig,
  CalendarList,
  Agenda
} from "react-native-calendars";

LocaleConfig.locales["islamic"] = {
  monthNames: [
    "Muharram",
    "Safar",
    "Rabi' al-awwal",
    "Rabi' al-thani",
    "Jumada al-awwal",
    "Jumada al-thani",
    "Rajab",
    "Sha'ban",
    "Ramadan",
    "Shawwal",
    "Dhu al-Qi'dah",
    "Dhu al-Hijjah"
  ],
  monthNamesShort: [
    "Muharram",
    "Safar",
    "Rabi' al-awwal",
    "Rabi' al-thani",
    "Jumada al-awwal",
    "Jumada al-thani",
    "Rajab",
    "Sha'ban",
    "Ramadan",
    "Shawwal",
    "Dhu al-Qi'dah",
    "Dhu al-Hijjah"
  ],
  dayNames: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ],
  dayNamesShort: ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"],
  today: "today"
};
LocaleConfig.defaultLocale = "islamic";

export default class IslamicCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 20
    };
  }
  getDate(date) {
    let gregDate = new Date(date.dateString);
    let hijra = new HijrahDate(gregDate);
    console.log(gregDate);
    console.log(hijra);
    return hijra.getDate();
  }
  render() {
    const mark = {
      "2019-10-05": { selected: true, marked: true }
    };
    return (
      <View>
        <Calendar
          style={{ height: 500 }}
          markedDates={mark}
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

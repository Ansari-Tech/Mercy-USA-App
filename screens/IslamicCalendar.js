import React from "react";
import { View, Button } from "react-native";
import NavigationService from "../NavigationService";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";

export default class IslamicCalendar extends React.Component {
  render() {
    return (
      <View>
        <CalendarList
          // Enable horizontal scrolling, default = false
          horizontal={true}
          // Enable paging on horizontal, default = false
          pagingEnabled={true}
          // Set custom calendarWidth.
        />
      </View>
    );
  }
}

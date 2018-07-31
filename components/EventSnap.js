import { Constants } from "expo";
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl
} from "react-native";
import React from "react";
import { Button, ListItem, ListSection, Text, FAB } from "react-native-paper";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";

export default class EventSnap extends React.Component {
  static navigationOptions = {
      header: null
  }
  state = {

  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>Event description</Text>
      </View>
    );
  }
}

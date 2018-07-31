import { Constants } from "expo";
import { View, StyleSheet } from "react-native";
import React from "react";
import { Text } from "react-native-paper";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";

export default class Login extends React.Component {
  state = {

  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>Logged in</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight
  }
});

import { Constants } from "expo";
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl
} from "react-native";
import React from "react";
import {
  Button,
  ListItem,
  ListSection,
  Text,
  FAB,
  Paper,
  Card,
  CardContent,
  Title,
  Paragraph,
  CardActions 
} from "react-native-paper";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";

export default class EventSnap extends React.Component {
  state = {

  }
  render() {
    const event = this.props.navigation.getParam("item");
    return (
      <View style={{ flex: 1 }}>
        <Card>
          <CardContent>
            <Text>Event details:</Text>
            <Title>{event.title}</Title>
            <Paragraph>{event.description}</Paragraph>
            <Paragraph>Speaker {event.speaker}</Paragraph>
            <Paragraph>Date: {event.date}</Paragraph>
            <Paragraph>Time: {event.time}</Paragraph>
            <Paragraph>Place: {event.place}</Paragraph>
          </CardContent>
          <CardActions>
            <Button onPress={() => this.props.navigation.push("GetTicketScreen", {
                    item: event,
            })}>
              Register
            </Button>
          </CardActions>
      </Card>
      </View>
    );
  }
}

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
  handleRegister = () => {
    const event = this.props.navigation.getParam("item");
    const userName = this.props.navigation.getParam("username");
    this.props.navigation.push("GetTicketScreen", {
      item: event,
      username: userName,
    })
  }
  render() {
    const event = this.props.navigation.getParam("item");
    const auth_level = this.props.navigation.getParam("auth_level");
    console.log("auth_level:", auth_level);
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
          <CardContent>
            <Title> {auth_level} </Title>
          </CardContent>
          {
            (auth_level == 'user') &&
            (<CardActions>
              <Button onPress={this.handleRegister}>
                Register
              </Button>
            </CardActions>)
          } 
          {
            (auth_level == 'guest') &&
            (
              <CardContent>
                <Title> Please sign in to register! </Title>
              </CardContent>
            )
          }
          {
            (auth_level == 'admin') && 
            (
              <CardActions>
              <Button>
                Scan QR-codes
              </Button>
            </CardActions>
            )
          }
      </Card>
      </View>
    );
  }
}

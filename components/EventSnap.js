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
  Toolbar,
  ToolbarAction,
  CardActions,
  ToolbarContent
} from "react-native-paper";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import * as firebase from 'firebase'


export default class EventSnap extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
    header: (
      <Toolbar>
        <ToolbarAction icon="arrow-back" onPress={() => navigation.goBack()} />
        <ToolbarContent title = 'Event'/>
      </Toolbar>
    )
    };
  };

  formatDate = date => {
    let d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();
  
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
  
    return [year, month, day].join('-');
  };

  state = {
    
  }

  inPast = (eventDate, currentDate) => {
    return eventDate < currentDate;
  }

  handleRegister = (listOfUsers, event) => {
    if (this.inPast(event.date, this.formatDate(Date()))) {
      alert("Cannot register, event has been passed");
      return;
    }
    const user = firebase.auth().currentUser;
    const userId = user.uid;
    if (listOfUsers.includes(userId)) {
      alert("You already have registered!")
    } else {
      firebase.database().ref('events/all_events/' + event.event_id.toString() + '/registeredUsers').push(user.uid);
      alert("Successfuly registeres to the event!");
      this.props.navigation.goBack();
    }
  }
  render() {
    const event = this.props.navigation.getParam("item");
    const auth_level = this.props.navigation.getParam("auth_level");
    const kek = new Object(event.registeredUsers);
    const listOfUsers = Object.values(kek);
    console.log("auth_level:", auth_level);
    return (
      <View style={{ flex: 1 }}>
        <Card>
          <CardContent>
            <Title style={{textAlign: 'center'}}>{event.title}</Title>
            <Paragraph>{event.description}</Paragraph>
            <Paragraph>Speaker {event.speaker}</Paragraph>
            <Paragraph>Date: {event.date}</Paragraph>
            <Paragraph>Time: {event.time}</Paragraph>
            <Paragraph>Place: {event.place}</Paragraph>
            <Paragraph>Available Seats: {event.seats - listOfUsers.length}</Paragraph>
          </CardContent>
          {
            (auth_level == 'user') &&
            (<CardActions>
              <Button raised primary onPress={() => {this.handleRegister(listOfUsers, event)}}>
                Register
              </Button>
            </CardActions>)
          }
          {
            (auth_level == 'guest') &&
            (
              <CardActions>
                <Button raised  primary onPress={() => this.props.navigation.push('Login')}>
                  Please sign in to register
                </Button>
              </CardActions>
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

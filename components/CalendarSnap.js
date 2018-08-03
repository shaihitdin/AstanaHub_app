import { Constants } from 'expo';
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
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
} from 'react-native-paper';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as firebase from 'firebase'


export default class CalendarSnap extends React.Component {
  state = {
    events: [
      {
        title: 'Opening',
        description: 'Astana Hub opens',
        date: '2018-08-06',
        time: '18:00',
        speaker: 'Batya',
        place: 'AlmatyArena',
      },
      {
        title: 'Working',
        description: 'Astana Hub works',
        date: '2018-08-06',
        time: '18:01',
        speaker: 'Batya',
        place: 'AlmatyArena',
      },
      {
        title: 'Closing',
        description: 'Astana Hub closes',
        date: '2018-08-06',
        time: '18:02',
        speaker: 'Batya',
        place: 'AlmatyArena',
      },

    ], // {date, time, speaker, place}
    tickets: [], // {date, time, speaker, place}
    username: 'otirik_handle',
    auth_level: '', // {guest, user}
    selected_day: '',
  };
  getDay = () => {
    if (
      this.state.selected_day === '' ||
      this.state.selected_day === this.formatDate(Date())
    ) {
      return 'today';
    }
    return 'on ' + this.state.selected_day;
  };
  renderEvents = date => {
    if(!this.state.events.filter((item, index) => { return date === item.date; }).length) {
      return (
        <Card>
          <CardContent>
            <Title>No events!!!</Title>
          </CardContent>
        </Card>
      );
    }
    const num = this.state.events.filter((item, index) => { return date === item.date; }).length;
    return (
      <React.Fragment>
        <Card>
          <CardContent>
            <Title>Found {num} events: </Title>
          </CardContent>
        </Card>
        <FlatList data = {this.state.events.filter((item, index) => { return date === item.date; })} keyExtractor = {(item, index) => index.toString()} renderItem={({ item }) => {
            return (
                <Card onPress={() => this.props.navigation.push("EventScreen", {
                    item: item,
                    username: this.state.username,
                  })}>
                  <CardContent>
                    <Title>
                      {item.title} at {item.time} {item.day}
                    </Title>
                    <Paragraph>
                      Speaker: {item.speaker + '\n'}
                      {item.description}
                    </Paragraph>
                  </CardContent>
                </Card>
            );
          }}
        />
    </React.Fragment>)
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

  componentDidUpdate() {

  }

  handleRefresh = () => {
    firebase.database().ref('/events').on('value', (data) => {
      const now = new Object (data)
      const kek = Object.entries(now);
      console.log(kek);
      
    })
  }

  render() {
    console.log(firebase.auth().currentUser)
    return (
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <CalendarList
            scrollEnabled={true}
            onDayPress={day => {
              this.setState({ selected_day: day.dateString });
            }}
            onDayLongPress={day => {
              console.log('selected day', day);
            }}
            monthFormat={'yyyy MMMM'}
            hideExtraDays={false}
            hideArrows={true}
            firstDay={1}
            horizontal={true}
            // Enable paging on horizontal, default = false
            pagingEnabled={true}
          />
           <Button
            dark
              onPress={() => {
                const user = firebase.auth().currentUser
                firebase.database().ref('users/'+ user.uid).set({'age': 21})
              }
            }
          > Push
          </Button>
          <Button
            dark
            onPress={this.handleRefresh}
          >
            Refresh
          </Button>
          <ListSection title={'Events ' + this.getDay()}>
            {this.renderEvents(this.formatDate(this.state.selected_day ? this.state.selected_day : Date()))}
          </ListSection>
        </View>
      </KeyboardAwareScrollView>

    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
  },
});

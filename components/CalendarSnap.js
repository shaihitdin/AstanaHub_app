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


export default class CalendarSnap extends React.Component {
  static navigationOptions = {
    header: null,
  };
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
    username: '',
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
    {console.log(this.state.events.filter((item, index) => { return date === item.date; }))}
    return (
    <FlatList data = {this.state.events.filter((item, index) => { return date === item.date; })} keyExtractor = {(item, index) => index.toString()} renderItem={({ item }) => {
            return (
                <Card onPress={() => this.props.navigation.push("EventScreen", {
                    item: item,
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
    />)
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
  render() {
    return (
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <CalendarList
            scrollEnabled={true}
            onDayPress={day => {
              console.log(day);
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
            onPress={() => this.props.navigation.push("LoginScreen")}
          >
            Login
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

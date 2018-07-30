import { Constants } from 'expo';
import { StyleSheet, View, FlatList, ActivityIndicator, RefreshControl} from 'react-native';
import React from 'react';
import { Button, ListItem, ListSection, Text, FAB } from 'react-native-paper';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

export default class EventSnap extends React.Component {
  static navigationOptions = {
      header: null
  }
  render() {
    state = {

    }
    return (
      <View style={{flex: 1}}>
        <Calendar
          onDayPress={(day) => {console.log('selected day', day)}}
          onDayLongPress={(day) => {console.log('selected day', day)}}
          monthFormat={'yyyy MM'}
          hideExtraDays={true}
          firstDay={1}
          onPressArrowLeft={substractMonth => substractMonth()}
          onPressArrowRight={addMonth => addMonth()}
        />
      </View>
    );
  }
}

import { Constants } from 'expo';
import { StyleSheet, View, FlatList, ActivityIndicator, RefreshControl} from 'react-native';
import React from 'react';
import { Button, ListItem, ListSection, Text, FAB } from 'react-native-paper';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

export default class CalendarSnap extends React.Component {
  static navigationOptions = {
      header: null
  }
  render() {
    state = {

    }
    return (
      <View style={{flex: 1}, styles.container}>
        <CalendarList
          // Callback which gets executed when visible months change in scroll view. Default = undefined
          onVisibleMonthsChange={(months) => {console.log('now these months are visible', months);}}
          // Max amount of months allowed to scroll to the past. Default = 50
          pastScrollRange={50}
          // Max amount of months allowed to scroll to the future. Default = 50
          futureScrollRange={50}
          // Enable or disable scrolling of calendar list
          scrollEnabled={true}
          // Enable or disable vertical scroll indicator. Default = false
          showScrollIndicator={true}
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

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight
  },
});

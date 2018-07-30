import { Constants } from 'expo';
import { StyleSheet, View, FlatList, ActivityIndicator, RefreshControl} from 'react-native';
import React from 'react';
import { Button, ListItem, ListSection, Text, FAB, Paper } from 'react-native-paper';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

export default class CalendarSnap extends React.Component {
  static navigationOptions = {
      header: null
  }
  render() {
    state = {

    }

    return (
      <View style={styles.container}>
        <CalendarList
          scrollEnabled={true}
          onDayPress={(day) => {console.log('selected day', day)}}
          onDayLongPress={(day) => {console.log('selected day', day)}}
          monthFormat={'yyyy MMMM'}
          hideExtraDays={false}
          hideArrows={true}
          firstDay={1}
          horizontal={true}
          // Enable paging on horizontal, default = false
          pagingEnabled={true}
        />
        <Button primary onPress = { () => this.props.navigation.push('LoginScreen')}>
          Login
        </Button>
        <ListSection title='Events today'>
          
        </ListSection>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight
  },
});

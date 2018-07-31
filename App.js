import { Constants } from 'expo';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Provider as PaperProvider } from 'react-native-paper';
import CalendarSnap from './components/CalendarSnap'
import Login from './components/Login'
import EventSnap from './components/EventSnap'


export default class App extends React.Component {

  render() {
    return (
        <PaperProvider>
          <RootStack />
        </PaperProvider>
    )
  }
}

const RootStack = createStackNavigator(
  {
    CalendarScreen: CalendarSnap,
    LoginScreen: Login,
    EventScreen: EventSnap,
  },
  {
    initialRouteName: 'CalendarScreen',
  }
);

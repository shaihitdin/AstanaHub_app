/* @flow */

import * as React from 'react';
import { createStackNavigator } from 'react-navigation';
import {
  Toolbar,
  ToolbarContent,
  ToolbarAction,
  ToolbarBackAction,
} from 'react-native-paper';
import CalendarSnap from './CalendarSnap'
import Login from './Login'
import EventSnap from './EventSnap'
import GetTicket from './GetTicket'
import * as firebase from 'firebase'
import { StackActions, NavigationActions } from 'react-navigation';

getMail = () => {
  const email = firebase.auth().currentUser;
  if(email === null) {
    return "guest"
  } else {
    return email.email;
  }
}
export default createStackNavigator(
  {
    Home: { screen: CalendarSnap,
     },
    LoginScreen: Login,
    EventScreen: EventSnap,
    GetTicketScreen: GetTicket,
  },

);

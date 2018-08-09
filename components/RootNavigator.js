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
import ScanTicket from './ScanTicket'
import * as firebase from 'firebase'
import { StackActions, NavigationActions } from 'react-navigation';


export default createStackNavigator(
  {
    Home: { screen: CalendarSnap,
     },
    Login: Login,
    EventScreen: EventSnap,
    GetTicketScreen: GetTicket,
    ScanTicketScreen: ScanTicket,
  },

);

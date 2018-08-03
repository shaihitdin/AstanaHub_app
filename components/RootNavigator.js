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


export default createStackNavigator(
  {
    Home: { screen: Login,
      navigationOptions: ({ navigation }) => ({
        header: (
          <Toolbar>
            <ToolbarAction icon="account-circle" onPress={() => navigation.openDrawer()} />
          </Toolbar>
        ),
      }),

     },
    CalendarScreen: { screen: CalendarSnap },
    EventScreen: EventSnap,
    GetTicketScreen: GetTicket,
  },

);

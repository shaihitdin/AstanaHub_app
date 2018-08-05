import { Constants } from 'expo';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import { Provider as PaperProvider } from 'react-native-paper';
import RootNavigator from './components/RootNavigator'
import Login from './components/Login'
import {
  Toolbar,
  ToolbarContent,
  ToolbarAction,
  ToolbarBackAction,
} from 'react-native-paper';

///MAGIC, Don't touch
import 'core-js/es6/map'
import 'core-js/es6/symbol'
import 'core-js/fn/symbol/iterator'
import * as firebase from 'firebase'
///

const firebaseConfig = {
  apiKey: "AIzaSyDKhrKsyhOceNiQ4hyAnO1DNyRPj5B8GxY",
    authDomain: "test-fc5b7.firebaseapp.com",
    databaseURL: "https://test-fc5b7.firebaseio.com",
    projectId: "test-fc5b7",
    storageBucket: "test-fc5b7.appspot.com",
}
firebase.initializeApp(firebaseConfig)

export default class App extends React.Component {
  render() {
    return (
        <PaperProvider>
          <RootDrawer />
        </PaperProvider>
    )
  }
}


const RootDrawer = createDrawerNavigator(
  {
    Home: {screen: RootNavigator},
    Login: { screen: Login},
  }
);

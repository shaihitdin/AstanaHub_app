import { Constants } from 'expo';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import { Provider as PaperProvider, DefaultTheme, Colors } from 'react-native-paper';
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


// const AppInit = async () => {
//   return (
//     firebase.auth().signOut().then(() => {
//
//     })
//   )
// }

const theme = {
  ...DefaultTheme,
  roundness: 15,
};

export default class App extends React.Component {

  state = {
    isLoading: true
  }

  async componentDidMount() {
    try {
      await firebase.auth().signOut();
      this.setState({ isLoading: false })
    } catch(e) {
      console.log('error', e)
    }
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View />
      );
    }

    return (
      <PaperProvider theme={theme}>
        <RootNavigator />
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

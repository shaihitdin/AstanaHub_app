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
    LoginScreen: { screen: Login},
  }
);

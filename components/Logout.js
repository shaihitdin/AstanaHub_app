import { Constants } from "expo";
import { View, StyleSheet } from "react-native";
import React from "react";
import { Text, TextInput, HelperText, Button} from "react-native-paper";
import * as firebase from 'firebase'

export default class Login extends React.Component {


  render() {
    return (
        <View style={styles.container}>
            <Text>
                Logout Screen
            </Text>
        </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight
  }
});

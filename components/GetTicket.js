import { Constants } from 'expo';
import {View, StyleSheet} from 'react-native';
import React from 'react';
import { CardContent, Title, Paragraph, Card, Text } from 'react-native-paper';
import QRCode from 'react-native-qrcode';

export default class GetTicket extends React.Component {
  state = {
  
  }
  getHash = (username) => {
    return username.split('').reduce((prevHash, currVal) =>
    (((prevHash << 5) - prevHash) + currVal.charCodeAt(0))|0, 0);
  }
  addHashtoFirebase = (hash) => {

  }
  render() {
    return (
      <View style={styles.container}>
        <Title>Registered!!!</Title>
        <Paragraph>This is your ticket:</Paragraph>
        <QRCode
          value={this.getHash(this.props.navigation.getParam("username")).toString()}
          size={250}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
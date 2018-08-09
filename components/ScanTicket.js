import { Constants, BarCodeScanner, Permissions } from 'expo';
import {View, StyleSheet, Alert, Dimensions} from 'react-native';
import React from 'react';
import { CardContent, Title, Paragraph, Card, Text } from 'react-native-paper';
import QRCode from 'react-native-qrcode';
import * as firebase from 'firebase';
export default class CheckTicket extends React.Component {
  state = {
    hasCameraPermission: null
  };

  componentDidMount() {
    this._requestCameraPermission();
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };
  
  _handleBarCodeRead = ({data}) => {
    const event = this.props.navigation.getParam("event");
    const event_id = event.event_id;
    const kek = new Object(event.registeredUsers);
    const listOfUsers = Object.values(kek);
    if(listOfUsers.includes(data)) {
        Alert.alert(
           'Scan successful!'
        );
    } else {
        Alert.alert(
           'Scan UNSUCCESSFUL!'
        )
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.hasCameraPermission === null ?
          <Text>Requesting for camera permission</Text> :
          this.state.hasCameraPermission === false ?
            <Text>Camera permission is not granted</Text> :
            <BarCodeScanner
              onBarCodeRead={this._handleBarCodeRead}
              style={{height: Dimensions.get('window').height, width: Dimensions.get('window').width }}
            />
        }
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  }
});
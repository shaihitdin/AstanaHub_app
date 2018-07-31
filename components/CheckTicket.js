import { Constants, BarCodeScanner, Permissions } from 'expo';
import {View, StyleSheet, Alert, Dimensions} from 'react-native';
import React from 'react';
import { CardContent, Title, Paragraph, Card, Text } from 'react-native-paper';
import QRCode from 'react-native-qrcode';
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
  getHash = (username) => {
    return username.split('').reduce((prevHash, currVal) =>
    (((prevHash << 5) - prevHash) + currVal.charCodeAt(0))|0, 0);
  }
  _handleBarCodeRead = ({data}) => {
    Alert.alert(
      'Scan successful!',
      data
    );
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

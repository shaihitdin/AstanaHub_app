import { Constants } from "expo";
import { View, StyleSheet } from "react-native";
import React from "react";
import { Text, TextInput, HelperText} from "react-native-paper";

export default class Login extends React.Component {
  state = {
    phoneNumber: '',
    password: '',
  }
  isError = () => {
    if(this.state.phoneNumber.length < 2) {
      return true;
    }
    if(this.state.phoneNumber[0] !== '+' || this.state.phoneNumber[1] != '7') {
      return true;
    }
    if(this.state.phoneNumber.length === 2) {
      return false;
    }
    return !/^\d+$/.test(this.state.phoneNumber.substring(2, this.state.phoneNumber.length));
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <TextInput
          label="Phone number"
          value={this.state.phoneNumber}
          onChangeText={text => this.setState({ phoneNumber: text })}
          keyboardType='phone-pad'
        />
        <HelperText
          type="error"
          visible={this.isError()}
        >
          Please start with +7
        </HelperText>
        <TextInput
          label="Password"
          secureTextEntry={true}
          onChangeText={text => this.setState({ password: text })}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight
  }
});

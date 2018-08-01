import { Constants } from "expo";
import { View, StyleSheet } from "react-native";
import React from "react";
import { Text, TextInput, HelperText} from "react-native-paper";

export default class Login extends React.Component {
  state = {
    text: '',
  }
  isError = () => {
    if(this.state.text.length < 2) {
      return true;
    }
    if(this.state.text[0] !== '+' || this.state.text[1] != '7') {
      return true;
    }
    if(this.state.text.length === 2) {
      return false;
    }
    return !/^\d+$/.test(this.state.text.substring(2, this.state.text.length));
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <TextInput
          label="Phone number"
          value={this.state.text}
          onChangeText={text => this.setState({ text })}
          keyboardType='phone-pad'
        />
        <HelperText
          type="error"
          visible={this.isError()}
        >
          Please start with +7
        </HelperText>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight
  }
});

import { Constants } from "expo";
import { View, StyleSheet, StatusBar } from "react-native";
import React from "react";
import { Text, TextInput, HelperText, Button, Toolbar, ToolbarAction, ToolbarContent} from "react-native-paper";
import * as firebase from 'firebase';
import { StackActions, NavigationActions } from 'react-navigation';

export default class Login extends React.Component {
  state = {
    email: 'hafizbatyrkhan@gmail.com',
    password: '123456',
  }
  static navigationOptions = ({ navigation }) => {
    return {
    header: (
      <Toolbar>
        <ToolbarAction icon="arrow-back" onPress={() => navigation.goBack()} />

      </Toolbar>
    )
    };
  };

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

  handleLogin = () => {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(
      () => {
       // alert("Signed in");
        alert(firebase.auth().currentUser.email);
        const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Home',
        })],
        });
        this.props.navigation.dispatch(resetAction);
        // this.props.navigation.push('CalendarScreen');
      }, (error) => {
        alert(error.message)
      }
    );
  }
  handleRegister = () => {
    try {

      if (this.state.password.length < 6) {
        alert('Please enter at least 6 characters')
        return
      }

      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(
        () => {
          alert('Account created');
          this.setState({
            email: '',
            password: '',
          })
        }, (error) => {
          alert(error.message)
          return;
        }
      )

    } catch(error) {
      console.log(error.toString())
    }
    this.handleLogin();
  }
  componentWillMount() {
    if(firebase.auth().currentUser !== null) {
      alert('You have already signed in');
      this.props.navigation.goBack();
    }
  }
  handleForgotPassword = () => {

  }

  render() {
    return (
      <View>
       <TextInput
          label="Email"
          autoCapitalize="none"
          value={this.state.email}
          onChangeText={text => this.setState({ email: text })}
        />
        <TextInput
          label="Password"
          autoCapitalize="none"
          value={this.state.password}
          onChangeText={text => this.setState({ password: text })}
          secureTextEntry
        />

        <Button
          full
          rounded
          color='blue'
          onPress={this.handleLogin}
        > Login
        </Button>

        <Button
          full
          rounded
          color='blue'
          onPress={this.handleRegister}
        > Create account
        </Button>


      </View>
    );
  }
}

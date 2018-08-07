import { Constants } from "expo";
import { View, StyleSheet, StatusBar, ActivityIndicator } from "react-native";
import React from "react";
import { Text, TextInput, HelperText, Button, Toolbar, ToolbarAction, ToolbarContent, Paper} from "react-native-paper";
import * as firebase from 'firebase';
import { StackActions, NavigationActions } from 'react-navigation';

export default class Login extends React.Component {
  state = {
    email: 'a@a.com',
    password: '123456',
    clickable: true,
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
    if (!this.state.clickable) {
      return
    }
    this.setState({clickable: false}, () => {
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
        this.setState({clickable: true})
      })
    })
  }
  handleRegister = () => {
    if (!this.state.clickable) {
      return
    }
    this.setState({clickable: false}, () => {
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
      this.setState({clickable: true}, () => {this.handleLogin})
    })
  }
  componentDidMount() {
    console.log(firebase.auth().currentUser);
    if(firebase.auth().currentUser) {
      alert('You have already signed in');
      this.props.navigation.goBack();
    }
  }
  handleForgotPassword = () => {

  }

  render() {
    return (
      <View>
        <View style = {{padding: 20}}>
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
        </View>

        <Button
          rounded
          accent
          onPress={this.handleLogin}
        > Login
        </Button>
        {
          //<Button
         //  rounded
        //    accent
        //    onPress={this.handleRegister}
        //  > Create account
        //  </Button>
        }
        {!this.state.clickable && <ActivityIndicator size="large" color="#0000ff" />}
      </View>
    );
  }
}

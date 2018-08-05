import { Constants } from 'expo';
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import {
  Button,
  ListItem,
  ListSection,
  Text,
  FAB,
  Paper,
  Card,
  CardContent,
  Title,
  Paragraph,
  CardActions,
  Toolbar,
  ToolbarContent,
  ToolbarAction,
  ToolbarBackAction,
} from 'react-native-paper';
import { StackActions, NavigationActions } from 'react-navigation';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as firebase from 'firebase'

getMail = () => {
  const email = firebase.auth().currentUser;
  if(email === null) {
    return "guest"
  } else {
    return email.email;
  }
}
console.disableYellowBox = true;
export default class CalendarSnap extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
    header: (
      <Toolbar>
        <ToolbarAction icon="account-circle" onPress={() => navigation.openDrawer()} />
        <ToolbarContent title="Signed in as" subtitle={getMail()}/>
        {firebase.auth().currentUser !== null && <ToolbarAction icon={require("../icons/ic_exit_to_app_black_48dp.png")} onPress={() => {
            const resetAction = StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({ routeName: 'Home',
            })],
            });
            firebase.auth().signOut().then(() => {
              navigation.dispatch(resetAction);
            });
          }
            } />}
      </Toolbar>
    )
    };
  };
  state = {
    events: [], // {date, time, speaker, place}
    tickets: [], // {date, time, speaker, place}
    username: 'otirik_handle',
    auth_level: 'guest', // {guest, user, admin}
    selected_day: '',
  };
  getDay = () => {
    if (
      this.state.selected_day === '' ||
      this.state.selected_day === this.formatDate(Date())
    ) {
      return 'today';
    }
    return 'on ' + this.state.selected_day;
  };
  updLevel = () => {
    let email = firebase.auth().currentUser;
    if(email === null) {
      this.setState({
        auth_level: 'guest'
      })
      return;
    }
    email = email.email;
    if(email === "hafizbatyrkhan@gmail.com") {
      this.setState({
        auth_level: 'admin'
      })
    } else {
      this.setState({
        auth_level: 'user'
      })
    }
  }
  renderEvents = date => {
    if(!this.state.events.filter((item, index) => { return date === item.date; }).length) {
      return (
        <Card>
          <CardContent>
            <Title>No events!!!</Title>
          </CardContent>
        </Card>
      );
    }
    const num = this.state.events.filter((item, index) => { return date === item.date; }).length;
    return (
      <React.Fragment>
        <Card>
          <CardContent>
            <Title>Found {num} events: </Title>
          </CardContent>
        </Card>
        <FlatList data = {this.state.events.filter((item, index) => { return date === item.date; })} keyExtractor = {(item, index) => index.toString()} renderItem={({ item }) => {
            return (
                <Card onPress={() => this.props.navigation.push("EventScreen", {
                    item: item,
                    username: this.state.username,
                  })}>
                  <CardContent>
                    <Title>
                      {item.title} at {item.time} {item.day}
                    </Title>
                    <Paragraph>
                      Speaker: {item.speaker + '\n'}
                      {item.description}
                    </Paragraph>
                  </CardContent>
                </Card>
            );
          }}
        />
    </React.Fragment>)
  };
  formatDate = date => {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  };
  componentWillMount() {
    firebase.database().ref('events/all_events').on('value', (data) => {
      this.setState({
        events: data.val(),
      })
    })
    this.updLevel();
  }
  handleRefresh = () => {
    firebase.database().ref('/events').on('value', (data) => {
      const now = new Object (data)
      const kek = Object.entries(now);
      console.log(kek);
      
    })
  }

  render() {
    {/*console.log(firebase.auth().currentUser)*/}
    return (
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <CalendarList
            scrollEnabled={true}
            onDayPress={day => {
              this.setState({ selected_day: day.dateString });
            }}
            onDayLongPress={day => {
              console.log('selected day', day);
            }}
            monthFormat={'yyyy MMMM'}
            hideExtraDays={false}
            hideArrows={true}
            firstDay={1}
            horizontal={true}
            // Enable paging on horizontal, default = false
            pagingEnabled={true}
          />
           <Button
            dark
              onPress={() => {
                const user = firebase.auth().currentUser
                firebase.database().ref('users/'+ user.uid).set({'age': 21})
              }
            }
          > Push
          </Button>
          <Button
            dark
            onPress={this.handleRefresh}
          >
            Refresh
          </Button>
          <ListSection title={'Events ' + this.getDay()}>
            {this.renderEvents(this.formatDate(this.state.selected_day ? this.state.selected_day : Date()))}
          </ListSection>
        </View>
      </KeyboardAwareScrollView>

    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
  },
});

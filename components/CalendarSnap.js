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

formatDate = date => {
  let d = new Date(date),
  month = '' + (d.getMonth() + 1),
  day = '' + d.getDate(),
  year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
};

getMail = () => {
  const email = firebase.auth().currentUser;
  if(email === null) {
    return "guest"
  } else {
    return email.email;
  }
}

toObj = (data) => {
  let res = {}
  data.map((item) => {
    res[item.date] = {marked: true, dotColor: 'blue', activeOpacity: 10};
    return item
  })
  return res
}

console.disableYellowBox = true;
export default class CalendarSnap extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
    header: (
      <Toolbar>
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
            {firebase.auth().currentUser === null && <ToolbarAction icon="account-circle" onPress={() => {
                navigation.push('Login')
                }
              }/>
            }

      </Toolbar>
    )
    };
  };
  state = {
    events: [], // {date, time, speaker, place}
    tickets: [], // {date, time, speaker, place}
    username: 'otirik_handle',
    auth_level: 'guest', // {guest, user, admin}
    selected_day: [formatDate(Date())],
    markingDays: {},
    downloading: false,
  };
  getDay = () => {
    if (

      this.state.selected_day == formatDate(Date())
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
            <Title>Found 0 events</Title>
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
                    auth_level: this.state.auth_level
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
  componentDidMount() {
      this.setState({downloading: true}, () => {
        firebase.database().ref('events/all_events').on('value', (data) => {
          this.setState({
            events: data.val(),
            markingDays: toObj(data.val()),
            downloading: false,
          })
        })

      })
    this.updLevel()
  }
  handleRefresh = () => {
    firebase.database().ref('/events').on('value', (data) => {
      const now = new Object (data)
      const kek = Object.entries(now);
      console.log(data.val());

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
            markedDates= {{
              ...this.state.markingDays,
              [this.state.selected_day] : {selected: true, selectedColor: '#81c784'},
            }}
            // Enable paging on horizontal, default = false
            pagingEnabled={true}
          />
          {this.state.downloading ? <ActivityIndicator size="large" color="#0000ff" />
            :
            <ListSection title={'Events ' + this.getDay()}>
            {this.renderEvents(formatDate(this.state.selected_day ? this.state.selected_day : Date()))}
            </ListSection>
          }
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

import React from 'react';
import {
  Image,
  Animated,
  Easing,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  AsyncStorage,
  View,
} from 'react-native';
import { WebBrowser, Constants, Location, Permissions, Notifications } from 'expo';

import { MonoText } from '../components/StyledText';

// const spin = this.state.spinValue.interpolate({
//   inputRange: [0, 1],
//   outputRange: ['0deg', '360deg']
// })




export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
constructor(props) {
  super(props);
  this.spinValue = new Animated.Value(0)
  this.state = {
    location: null,
    errorMessage: null,
    spinValue: new Animated.Value(0),
  };
}
  state = {

  };
// this.spinValue = new Animated.Value(0);
  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  componentDidMount() {
      
  this.spin()
    AsyncStorage
      .getItem("longitude")
      .then(value => {
        if (value !== null) {
          this.setState({ longitude: value})
        }
      })
      .catch(error =>
        console.error("AsyncStorage error: " + error.message))
      .done();
    
    AsyncStorage
      .getItem("latitude")
      .then(value => {
        if (value !== null) {
          this.setState({ latitude: value})
        }
      })
      .catch(error =>
        console.error("AsyncStorage error: " + error.message))
      .done();



      
  } 
  
spin () {
  this.spinValue.setValue(0)
  Animated.timing(
    this.spinValue,
    {
      toValue: 1,
      duration: 4000,
      easing: Easing.linear
    }
  ).start(() => this.spin())
}



  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
    let result = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (result.status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to send push notification was denied',
      });
    }
    if (Constants.lisDevice && result.status === 'granted') {
    console.log('Notification permissions granted.')}
// Getting and setting the compass heading direction
    const setHeader = (header) => {
        this.setState({ header });
    }
    await Location.watchHeadingAsync(setHeader);

// Getting and setting the coordinates
    let locationcoords = await Location.getCurrentPositionAsync({});
    this.setState({ locationcoords });
// Making the Prayer Times API call
    let REQUEST_URL = 'http://api.aladhan.com/timings/'+(~~(Date.now()/1000))+'?latitude=' + this.state.locationcoords.coords.latitude + '&longitude=' + this.state.locationcoords.coords.longitude;
    console.log('REQUEST_URL', REQUEST_URL);
    let timings = {}
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        // (hours + 11)%12 +1   to convert 24 hr to 12 hr
        // responseData.data.timings["Fajr"] = "8:45 am";  // Test notification timing
        // responseData.data.timings["Dhuhr"] = "8:45 am";  // Test notification timing
        // responseData.data.timings["Asr"] = "8:45 am";  // Test notification timing
        
        // Notifications.cancelAllScheduledNotificationsAsync();


        // Aync Storage isn't working within the for loop try doing the async calls before or check the settings screen
        let obj = {}
        AsyncStorage
        .getAllKeys()

        .then(storage => console.log("All Items in the Storage-", storage))
        .catch(error =>
          console.error("AsyncStorage error: " + error.message))
        .done();
        for (var salah in responseData.data.timings) {
            


          _getSalahValues = async (salah) => {
            this.props.navigation.state.update = false;

          // remove existing salah scheduled notifications
            await AsyncStorage
                .getItem(salah+"_noti_id")
                .then(localNotificationId => {
                  if(localNotificationId){
                    console.log(salah, localNotificationId);
                    Expo.Notifications.cancelScheduledNotificationAsync(parseInt(localNotificationId))
                  }
                }).done();
          
            await AsyncStorage
                .getItem(salah)
                // .then(value => value == 'true')
                .then(salahvalue => {
                  // Moved the notification scheduling here 
                  // console.log(salah, salahvalue)
                  if (salahvalue == "true") {
                    let d = new Date(responseData.data.date.readable + " "+ responseData.data.timings[salah])
                    datePrayer = d.getTime();
                    // console.log("the response datePrayer", salah, datePrayer);
                    // console.log("the response date", Date.now());
                    // console.log(responseData.data.date.readable , datePrayer, Date.now(), responseData.data.timings[salah]).getTime() )
                    if (datePrayer < Date.now()){
                      datePrayer += 86400000
                    }
                        let schedulingOptions = {
                          time: datePrayer, 
                          // (date or number) — A Date object representing when to fire the notification or a number in Unix epoch time. Example: (new Date()).getTime() + 1000 is one second from now.
                          // time: 1513120980000, // (date or number) — A Date object representing when to fire the notification or a number in Unix epoch time. Example: (new Date()).getTime() + 1000 is one second from now.
                          repeat: "day"
                        };

                        let localNotification = {
                          title: "Time for " + salah, 
                          body: salah + " is at " + responseData.data.timings[salah],
                          // sound: "./adhanMakkah.wav",
                          ios:{sound:true},
                          android:{sound:true, priority: 'max'}
                        };
                        Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions)
                        .then(res => {
                          console.log("response after notification is set", res);
                          AsyncStorage
                          .setItem( salah + "_noti_id", res.toString() )
                          .then(() => console.log("Saved selection to disk: " + res))
                          .catch(error =>
                            console.error("AsyncStorage error: " + error.message))
                          .done()
                          console.log( salah, "notification set at ", responseData.data.timings[salah])
                        });
                        
                        
                  }
                })
                .done()
          }
          _getSalahValues(salah)

            let stdTime = String((Number(responseData.data.timings[salah].split(':')[0])+ 11) %12 +1);
            let stdTimeArr = responseData.data.timings[salah].split(':');
            stdTimeArr[0] = stdTime;
            timings[salah] = stdTimeArr.join(':');

        }

        // console.log("the response data 1", responseData.data)

        this.setState({
          timings: timings,
        });
        // console.log("responsedata Timings in Homescreen", responseData.data.timings)
        // console.log("Timings in Homescreen", timings)
      })
      .done();

  };

  render() {
   
    
    const spinner = this.spinValue.interpolate({inputRange: [0, 1], outputRange: ['0deg', '360deg'], useNativeDriver: true});
    let text = 'Waiting..';
    let pointer = "0deg";

    if (this.state.errorMessage) {
      text = this.state.errorMessage;
      return (
        <View style={styles.container}>
              <Text style={styles.getStartedText}>
                {text}
              </Text>
        </View>
      );
    } 

    else if (this.state.header && this.state.timings) {
      const timings = this.state.timings;
      let lat1 = this.state.latitude * (Math.PI/180)
      let long1 = this.state.longitude * (Math.PI/180)
      let lat2 = 21.422487 * (Math.PI/180)
      let long2 = 39.826206 * (Math.PI/180)
      var y = Math.sin(long2-long1) * Math.cos(lat2);
      var x = Math.cos(lat1)*Math.sin(lat2) -
              Math.sin(lat1)*Math.cos(lat2)*Math.cos(long2-long1);
      var brng = (Math.atan2(y, x))*(  180 / Math.PI);
      var final = (brng + 360 ) % 360;
         pointer = -this.state.header.trueHeading + final + "deg";
         // pointer = -this.state.header.magHeading + final + "deg";

      return (
        <View style={styles.container}>
          <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.welcomeContainer}>
              <Animated.Image
                style = {{transform: [{rotate: pointer}] }}
                source={require('../assets/images/pointer.png')}
              />
            </View>

            <View style={styles.getStartedContainer}>
              

              <Text onPress={this._googleQiblaFinder} style={styles.helpLinkText}>
                Try this to use the google qiblah finder
              </Text>
              
              <Text style={styles.getStartedText}>
                The Prayer Timings 
              </Text>

              <Text>
                Fajr time:  {timings.Fajr}
              </Text>
              <Text>
                Duhr time:  {timings.Dhuhr}
              </Text>
              <Text>
                Asr time: {timings.Asr}
              </Text>
              <Text>
                Maghrib time: {timings.Maghrib}
              </Text>
              <Text>
                Isha time:  {timings.Isha}
              </Text>

            </View>
          </ScrollView>

        </View>
      );
    }
    else{
      return (
        <View style={styles.container}>
            <Text>
              Calculating Direction
            </Text>
          </View>
      );
    }
    
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _googleQiblaFinder = () => {
    WebBrowser.openBrowserAsync('https://qiblafinder.withgoogle.com/intl/en/onboarding');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});

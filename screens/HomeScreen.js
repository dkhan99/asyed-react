import React, { Component } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  AsyncStorage,
  View,
} from 'react-native';
import LocationButton from "./LocationButton";
// import buttonStyles from "./buttonStyles"
import { WebBrowser, Constants, Location, Accelerometer, Gyroscope, Permissions } from 'expo';
import TimingsScreen from "./TimingsScreen"
import { MonoText } from '../components/StyledText';

const STORAGE_KEY = "@Asyed:location";
// import { Accelerometer, Gyroscope } from 'react-native-sensors';
// import { decorator as sensors } from 'react-native-sensors';
// import RNSensors from 'react-native-sensors';

// const { Accelerometer, Gyroscope } = RNSensors;
// const accelerationObservable = new Accelerometer({
//   updateInterval: 100, // defaults to 100ms
// });

// const gyroscopeObservable = new Gyroscope({
//   updateInterval: 2000, // defaults to 100ms
// });

const style = { backgroundColor: "#DDDDDD"}

class HomeScreen extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
  
    this.state = {

        latitude: null,
        longitude: null,
        error: null,
      };

      // gyroscope: {
      //   x: 'unknown',
      //   y: 'unknown',
      //   z: 'unknown', 

  }
  componentDidMount() {
    AsyncStorage
      .getItem(STORAGE_KEY)
      .then(value => {
        if (value !== null) {
          this._getLocation(value);
        }
      })
      .catch(error =>
        console.error("AsyncStorage error: " + error.message))
      .done();
  } 
    _getLocation = location => {

        AsyncStorage
          .setItem( STORAGE_KEY, location )
          .then(() => console.log("Saved selection to disk: " + location))
          .catch(error =>
            console.error("AsyncStorage error: " + error.message))
          .done();

      LocationButton._onPress().navigator.geolocation.getCurrentPosition(
      initialPosition => {
        this.props.onGetCoords(
          initialPosition.coords.latitude, 
          initialPosition.coords.longitude
        );
      },
      error => {
        alert(error.message);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );  

        
        //   console.log("lat", lat);
      //   LocationButton.onGetCoords.then(lat => {
      //   this.setState ({
      //     latitude: position.coords.latitude,
      //     longitude: position.coords.longitude,
      //     error: null,
      //   });
      // },  

    // );
        // });
      // (error) => this.setState({ error: error.message}),
      // { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
  
    this._toggle();

  };
  componentWillUnmount() {
    this._unsubscribe();
  }

  _toggle = () => {
    if (this._subscription) {
      this._unsubscribe();
    } else {
      this._subscribe();
    }
  }

  // _slow = () => {
  //   Accelerometer.setUpdateInterval(1000); 
  // }

  // _fast = () => {
  //   Accelerometer.setUpdateInterval(16);
  // }

  // _subscribe = () => {
  //   this._subscription = Accelerometer.addListener(accelerometerData => {
  //     this.setState({ accelerometerData });
  //   });
  // }

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  }
  render() {
    // let { x, y, z } = this.state.accelerometerData;
    // let text = 'Waiting..';
    // if (this.state.errorMessage) {
    //   text = this.state.errorMessage;
    // } else if (this.state.location) {
    //   text = JSON.stringify(this.state.location);
    // }

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={require('../assets/images/compass.png')
              }
            />
          </View>

          <View style={styles.getStartedContainer}>
            {this._maybeRenderDevelopmentModeWarning()}
            

      <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Latitude: {this.state.latitude}</Text>
        <Text>Longitude: {this.state.longitude}</Text>
        {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
      </View>
            <View style = { styles.row }>
              <LocationButton
                onGetCoords= { this._getLocation } 
              />
            </View>  
          </View>

        </ScrollView>

        <View style={styles.tabBarInfoContainer}>
          <Text style={styles.tabBarInfoText}>This is a tab bar. You can edit it in:</Text>

          <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
            <MonoText style={styles.codeHighlightText}>navigation/MainTabNavigator.js</MonoText>
          </View>
        </View>
      </View>
    );
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
    row: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
    padding: 24
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
    instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default HomeScreen;
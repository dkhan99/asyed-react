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
import { WebBrowser, Constants, Location, Permissions } from 'expo';

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


    const getLocation = (location) => {
        this.setState({ location });
    }

    let location = await Location.watchHeadingAsync(getLocation);


  };

  render() {
const spinner = this.spinValue.interpolate({inputRange: [0, 1], outputRange: ['0deg', '360deg'], useNativeDriver: true});
    let text = 'Waiting..';
    let pointer = "0deg"

// console.log("------------------------------", this.state.location.trueHeading)
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);

// console.log("------------------------------", spinner)
let lat1 = this.state.latitude * (Math.PI/180)
let long1 = this.state.longitude * (Math.PI/180)
let lat2 = 21.422487 * (Math.PI/180)
let long2 = 39.826206 * (Math.PI/180)
var y = Math.sin(long2-long1) * Math.cos(lat2);
var x = Math.cos(lat1)*Math.sin(lat2) -
        Math.sin(lat1)*Math.cos(lat2)*Math.cos(long2-long1);
var brng = (Math.atan2(y, x))*(  180 / Math.PI);
var final = (brng + 360 ) % 360;
   pointer = -this.state.location.trueHeading + final + "deg";


    }

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
            
            <Text style={styles.getStartedText}>
              {text}
            </Text>

            <Text onPress={this._googleQiblaFinder} style={styles.helpLinkText}>
              Try this to use the google qiblah finder
            </Text>
          </View>
          <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Latitude: {this.state.latitude}</Text>
            <Text>Longitude: {this.state.longitude}</Text>
            {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
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

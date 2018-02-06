import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  AsyncStorage,
  View,
} from 'react-native';

import { Constants, Location, Notifications, Permissions } from 'expo';


export default class TimingsScreen extends React.Component {
  state = {
    location: null,
    errorMessage: null,
  };
  
  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      
    }
  }


  
 


    render() {
	  	if (!this.state.timings) {
	    	return this.renderLoadingView();
	    } 

	    return this.renderPrayerTimesView();

    }
    
    renderLoadingView() {
    	return (
     	  <View style={styles.container}>
    	      <Text>
    	        Calculating Prayer Times
    	      </Text>
   	      </View>
   	    );
	};




	renderPrayerTimesView() {
		// if (this.state.errorMessage) {
	 //      text = this.state.errorMessage;
	 //    } 
	 //    if (this.state.location) {
	 //      let long = JSON.stringify(this.state.location.coords.longitude);
	 //      let lat = JSON.stringify(this.state.location.coords.latitude);
	 //    }

      const timings = this.state.timings

      let long = JSON.stringify(this.state.location.coords.longitude);
      let lat = JSON.stringify(this.state.location.coords.latitude);

      AsyncStorage
        .setItem( "longitude", long )

        .then(() => console.log("Saved selection to disk: " + long))
        .catch(error =>
          console.error("AsyncStorage error: " + error.message))
        .done();

        AsyncStorage
          .setItem( "latitude", lat )
          .then(() => console.log("Saved selection to disk: " + lat))
          .catch(error =>
            console.error("AsyncStorage error: " + error.message))
          .done();

	    return (
	      <View style={styles.container}>
	        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

	          <View style={styles.getStartedContainer}>

	            <Text style={styles.getStartedText}>
	              The Prayer Timings
	            </Text>

	            <Text>
	              Fajr time:	{timings.Fajr}
	            </Text>
	            <Text>
	            	Duhr time:	{timings.Dhuhr}
	            </Text>
	            <Text>
	            	Asr time:	{timings.Asr}
	            </Text>
	            <Text>
	            	Maghrib time:	{timings.Maghrib}
	            </Text>
	            <Text>
	            	Isha time:	{timings.Isha}
	            </Text>

	            <Text>
	            	long: {long}
	            </Text>
	            <Text>
	            	lat: {lat}
	            </Text>

	            
	          </View>

	        </ScrollView>

	        <View style={styles.tabBarInfoContainer}>
	          <Text style={styles.tabBarInfoText}>Today is: Hijri</Text>

	        </View>
	      </View>
	    );
	}
	
  



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
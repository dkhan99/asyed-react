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
      this._getLocationAsync();
    }
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

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
    let REQUEST_URL = 'http://api.aladhan.com/timings/'+(~~(Date.now()/1000))+'?latitude='+this.state.location.coords.latitude+'&longitude='+this.state.location.coords.longitude
    console.log('REQUEST_URL', REQUEST_URL)
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
      	// (hours + 11)%12 +1   to convert 24 hr to 12 hr
      	for (var salah in responseData.data.timings) {
          
   // Moved the notification scheduling here 
          let datePrayer = new Date(responseData.data.date.readable + " "+ responseData.data.timings[salah]).getTime()
          console.log("the reseponse data", datePrayer )
          if (datePrayer > Date.now()){
              let schedulingOptions = {
                time: datePrayer, // (date or number) — A Date object representing when to fire the notification or a number in Unix epoch time. Example: (new Date()).getTime() + 1000 is one second from now.
                // time: 1513120980000, // (date or number) — A Date object representing when to fire the notification or a number in Unix epoch time. Example: (new Date()).getTime() + 1000 is one second from now.
                // repeat: "minute"
              };

              let localNotification = {
                title: "time for " + salah, 
                body: salah + " is at " + responseData.data.timings[salah],
                ios:{sound:true},
                android:{sound:true, priority: 'max'}

              };
              Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions);
          }

          // console.log(salah)
      		let stdTime = String((Number(responseData.data.timings[salah].split(':')[0])+ 11) %12 +1);
      		let stdTimeArr = responseData.data.timings[salah].split(':')
      		stdTimeArr[0] = stdTime;
      		responseData.data.timings[salah] = stdTimeArr.join(':')
      	}
        this.setState({
          timings: responseData.data.timings,
        });
      })
      .done();
  };

  
  // fetchData() {
  // 	console.log('location in fetchData', this.state.location)
  // 	let REQUEST_URL = 'http://api.aladhan.com/timings/1511122450?latitude=32.768768&longitude=-97.2082383'
    
  //    fetch(REQUEST_URL)
  //     .then((response) => response.json())
  //     .then((responseData) => {
  //       this.setState({
  //         timings: responseData.data.timings,
  //       });
  //     })
  //     .done();
  // }

  // componentDidMount() {
  //   this.fetchData();
  // }


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
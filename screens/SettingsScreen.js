import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  AsyncStorage,
  View,
  Switch,
} from 'react-native';

// Accordian for settings
// Move compass and salah timings to same page
// Sliding bar for notifications 0-5


import SwitchExample from "./switch";

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };
  constructor(props) {
    super(props);
  
    this.state = {
    	Fajr: true,
    	Dhuhr: true,
    	Asr: true,
    	Maghrib: true,
    	Isha: true,
    };

  }

  componentWillMount() {
    let prayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"]
    for (var i = 0; i < prayers.length; i++) {
      let prayer = prayers[i];
      AsyncStorage
      .getItem(prayer)
      .then(value => {
        if (value !== null) {
          let object = {};
          object[prayer] = JSON.parse(value);
          this.setState(object);
        }
      })
      .catch(error =>
        console.error("AsyncStorage error: " + error.message))
      .done();
    }
    
      
  } 

  toggleSwitch1 = (value) => {
    this.setState({Fajr: value})
    console.log('Fajr is: ' + value)
    AsyncStorage
      .setItem( "Fajr", value.toString() )
      .then(() => console.log("Saved selection to disk: " + value))
      .catch(error =>
        console.error("AsyncStorage error: " + error.message))
      .done(); 
  };
   
  toggleSwitch2 = (value) => {
    this.setState({Dhuhr: value})
    console.log('Dhuhr is: ' + value)
    AsyncStorage
      .setItem( "Dhuhr", value.toString() )
      .then(() => console.log("Saved selection to disk: " + value))
      .catch(error =>
        console.error("AsyncStorage error: " + error.message))
      .done(); 
  };

  toggleSwitch3 = (value) => {
    this.setState({Asr: value})
    console.log('Asr is: ' + value)
    AsyncStorage
      .setItem( "Asr", value.toString() )
      .then(() => console.log("Saved selection to disk: " + value))
      .catch(error =>
        console.error("AsyncStorage error: " + error.message))
      .done(); 

  };
  
  toggleSwitch4 = (value) => {
    this.setState({Maghrib: value});
    console.log('Maghrib is: ' + value);
    AsyncStorage
      .setItem( "Maghrib", value.toString() )
      .then(() => console.log("Saved selection to disk: " + value))
      .catch(error =>
        console.error("AsyncStorage error: " + error.message))
      .done(); 
  };

  toggleSwitch5 = (value) => {
    this.setState({Isha: value})
    console.log('Isha is: ' + value);
    AsyncStorage
      .setItem( "Isha", value.toString() )
      .then(() => console.log("Saved selection to disk: " + value))
      .catch(error =>
        console.error("AsyncStorage error: " + error.message))
      .done(); 
  } 


  

  render() {
    

    return (
     	  <View>
    	      <Text>
    	        Toggle Prayers time notifications
    	      </Text>
    	      <SwitchExample
    	         toggleSwitch1 = {this.toggleSwitch1}
               toggleSwitch2 = {this.toggleSwitch2}
               toggleSwitch3 = {this.toggleSwitch3}
               toggleSwitch4 = {this.toggleSwitch4}
               toggleSwitch5 = {this.toggleSwitch5}
               switch1Value = {this.state.Fajr}
               switch2Value = {this.state.Dhuhr}
               switch3Value = {this.state.Asr}
               switch4Value = {this.state.Maghrib}
               switch5Value = {this.state.Isha}/>

   	      </View>
   	)
  }
}

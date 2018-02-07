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
    	switch1Value: true,
    	switch2Value: true,
    	switch3Value: true,
    	switch4Value: true,
    	switch5Value: true,
    };

  }

  componentWillMount() {
      
  AsyncStorage
      .getItem("Fajr")
      .then(value => {
        if (value !== null) {
          console.log("is Fajr in Storage", value)
          console.log(JSON.parse(value), "here")
          // this.state.switch1Value = JSON.parse(value);
          this.setState({ switch1Value: JSON.parse(value)});
          console.log(this.state.switch1Value, "here2")
        }
        else{
          console.log("is Fajr in Storage", value)
        }
      })
      .catch(error =>
        console.error("AsyncStorage error: " + error.message))
      .done();
      
  } 

  toggleSwitch1 = (value) => {
    this.setState({switch1Value: value})
    console.log('Fajr is: ' + value)
    AsyncStorage
      .setItem( "Fajr", value.toString() )
      .then(() => console.log("Saved selection to disk: " + value))
      .catch(error =>
        console.error("AsyncStorage error: " + error.message))
      .done(); 
  };
   
  toggleSwitch2 = (value) => {
    this.setState({switch2Value: value})
    console.log('Duhr is: ' + value)
  };

  toggleSwitch3 = (value) => {
    this.setState({switch3Value: value})
    console.log('Asr is: ' + value)
  };
  
  toggleSwitch4 = (value) => {
    this.setState({switch4Value: value})
    console.log('Maghrib is: ' + value)
  };

  toggleSwitch5 = (value) => {
    this.setState({switch5Value: value})
    console.log('Isha is: ' + value)
  } 


  

  render() {
    


    // let switch1Value = JSON.stringify(this.state.switch1Value);
    // AsyncStorage
    // 	.setItem( "Fajr", switch1Value )
    // 	.then(() => console.log("Saved selection fajr to disk: " + switch1Value))
    // 	.catch(error =>
    //  	  console.error("AsyncStorage error: " + error.message))
    // 	.done();  

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
               switch1Value = {this.state.switch1Value}
               switch2Value = {this.state.switch2Value}
               switch3Value = {this.state.switch3Value}
               switch4Value = {this.state.switch4Value}
               switch5Value = {this.state.switch5Value}/>

   	      </View>
   	)
  }
}

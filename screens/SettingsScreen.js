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

import SwitchExample from "./switch";

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'app.json',
  };
  constructor(props) {
    super(props);
  
    this.state = {
    	switch1Value: false,
    	switch2Value: false,
    	switch3Value: false,
    	switch4Value: false,
    	switch5Value: false,
    };
  }

  toggleSwitch1 = (value) => {
    this.setState({switch1Value: value})
    console.log('Fajr is: ' + value)
  };
   
  toggleSwitch2 = (value) => {
    this.setState({switch2Value: value})
    console.log('Switch 2 is: ' + value)
  };

  toggleSwitch3 = (value) => {
    this.setState({switch3Value: value})
    console.log('Switch 3 is: ' + value)
  };
  
  toggleSwitch4 = (value) => {
    this.setState({switch4Value: value})
    console.log('Switch 4 is: ' + value)
  };

  toggleSwitch5 = (value) => {
    this.setState({switch5Value: value})
    console.log('Switch 5 is: ' + value)
  } 
  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    let switch1Value = JSON.stringify(this.state.switch1Value);
    AsyncStorage
    	.setItem( "Fajr", switch1Value )
    	.then(() => console.log("Saved selection to disk: " + switch1Value))
    	.catch(error =>
     	console.error("AsyncStorage error: " + error.message))
    	.done();  

    return (
     	  <View>
    	      <Text>
    	        Calculating Prayer Times: 
    	      </Text>
    	      <SwitchExample
    	         toggleSwitch1 = {this.toggleSwitch1}
               toggleSwitch2 = {this.toggleSwitch2}
               toggleSwitch3 = {this.toggleSwitch2}
               toggleSwitch4 = {this.toggleSwitch2}
               toggleSwitch5 = {this.toggleSwitch2}
               switch1Value = {this.state.switch1Value}
               switch2Value = {this.state.switch2Value}
               switch3Value = {this.state.switch2Value}
               switch4Value = {this.state.switch2Value}
               switch5Value = {this.state.switch2Value}/>

   	      </View>
   	)
  }
}

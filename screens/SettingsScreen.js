import React from 'react';
import { ExpoConfigView } from '@expo/samples';
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
  Slider,
  Switch,
} from 'react-native';

// Accordian for settings

import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';

// Move compass and salah timings to same page
// Sliding bar for notifications 0-5


import SwitchExample from "./switch";



export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };

    _toggleExpanded1 = () => {
    this.setState({ collapsed1: !this.state.collapsed1 });
    }
    _toggleExpanded2 = () => {
    this.setState({ collapsed2: !this.state.collapsed2 });
    }

    _sliderToggleExpanded = () => {
    this.setState({ collapsed: !this.state.collapsed });
    }
    _setSection(section) {
    this.setState({ activeSection: section });
    }

  _renderHeader(section, index, isActive, sections) {
    return (
      <Animatable.View
        duration={300}
        transition="backgroundColor"
        style={{ backgroundColor: (isActive ? 'rgba(255,255,255,1)' : 'rgba(245,252,255,1)') }}>
        <Text style={styles.headerText}>{section.title}</Text>
      </Animatable.View>
    );
  }

  _renderContent(section, i, isActive, sections) {
    return (
      <Animatable.View
        duration={300}
        transition="backgroundColor"
        style={{ backgroundColor: (isActive ? 'rgba(255,255,255,1)' : 'rgba(245,252,255,1)') }}>
        <Animatable.Text
          duration={300}
          easing="ease-out"
          animation={isActive ? 'zoomIn' : false}>
          {section.content}
        </Animatable.Text>
      </Animatable.View>
    );
  }
  constructor(props) {
    super(props);
  
    this.state = {
    	Fajr: true,
    	Dhuhr: true,
    	Asr: true,
    	Maghrib: true,
    	Isha: true,
      activeSection: false,
      collapsed1: true,
      collapsed2: true,
      value: 5,
    };
  }

    change(value) {
      this.setState(() => {
        return {
          value: parseFloat(value),
        };
    });
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
    this.props.navigation.state["update"] = true;
    console.log("--------------", this.props.navigation.state.update)
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
  }; 



  render() {
    const {value} = this.state;

  
    return (

     	<View style={styles.container}>
        <TouchableHighlight onPress={this._toggleExpanded1}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Select Prayer Notifications</Text>
          </View>
        </TouchableHighlight>
        <Collapsible collapsed={this.state.collapsed1} align="center">
          <View style={styles.content}>
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
        </Collapsible>
        <TouchableHighlight onPress={this._toggleExpanded2}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Select other Notifications</Text>
          </View>
        </TouchableHighlight>
        <Collapsible collapsed={this.state.collapsed2} align="center">
          <View style={styles.header}>
            <Text style={styles.headerText}>{String(value)}</Text>
            <Slider
              step={1}
              maximumValue={5}
              onValueChange={this.change.bind(this)}
              value={value}
            />
            <Text style={styles.title}>Notifications per Day</Text>
          </View>
        </Collapsible>

      </View>

     	  

   	)
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 20,
  },
  header: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
  },
  active: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  inactive: {
    backgroundColor: 'rgba(245,252,255,1)',
  },
  selectors: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selector: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  activeSelector: {
    fontWeight: 'bold',
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: '500',
    padding: 10,
  },
  sliderContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  sliderText: {
    fontSize: 50,
    textAlign: 'center',
  },
});
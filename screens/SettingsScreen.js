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


export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'app.json',
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
     	  <View>
    	      <Text>
    	        Calculating Prayer Times: 
    	      </Text>
    	      <Switch value={true} />
    	      <Switch value={false} />
    	      <Switch
    	          value={true}
    	          onValueChange={(val) => console.log(val)}
    	          disabled={false}
    	          activeText={'On'}
    	          inActiveText={'Off'}
    	          circleSize={30}
    	          barHeight={1}
    	          circleBorderWidth={3}
    	          backgroundActive={'green'}
    	          backgroundInactive={'gray'}
    	          circleActiveColor={'#30a566'}
    	          circleInActiveColor={'#000000'}
    	        />
   	      </View>
   	)
  }
}

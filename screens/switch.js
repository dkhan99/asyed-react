import React, { Component } from 'react'
import {
   View,
   Switch,
   StyleSheet,
   Text
} 
from 'react-native'

export default SwitchExample = (props) => {
   return (
      <View style = {styles.container}>
        <Text>Fajr </Text>
         	<Switch
            onValueChange = {props.toggleSwitch1}
            value = {props.switch1Value}/>
        	
        <Text> Dhuhr </Text>
        	<Switch
            onValueChange = {props.toggleSwitch2}
            value = {props.switch2Value}/>
        
        <Text> Asr </Text>
        	<Switch
            onValueChange = {props.toggleSwitch3}
            value = {props.switch3Value}/>
        
        <Text> Maghrib </Text>
        	<Switch
            onValueChange = {props.toggleSwitch4}
            value = {props.switch4Value}/>
        
        <Text> Isha </Text>
        	<Switch
            onValueChange = {props.toggleSwitch5}
            value = {props.switch5Value}/>
        
      </View>
   )
}
const styles = StyleSheet.create ({
   container: {
      flex: 1,
      alignItems: 'center',
      marginTop: 100
   }
})
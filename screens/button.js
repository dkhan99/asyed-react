import React, { Component } from "react";

import { Text, View, TouchableHighlight } from "react-native";

import buttonStyles from "./buttonStyles";

class Button extends Component {
	render () {
		return (
			<TouchableHighlight onPress={this.props.onPress}>
				<View style={[buttonStyles.button, this.props.style]}>
					<Text>
						{this.props.label}
					</Text>
				</View>
			</TouchableHighlight>		
		);
	}
}

export default Button;
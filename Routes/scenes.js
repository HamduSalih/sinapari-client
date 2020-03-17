import React from "react";
import { StyleSheet } from 'react-native';
import { Actions, Scene, ActionConst } from "react-native-router-flux";




const scenes = Actions.create(
	<Scene key="root">
		<Scene key="authLoad" hideNavBar component={AuthLoadScreen} title="AuthLoad"  initial/>
		
	</Scene>

);

const styles = StyleSheet.create({
	tabBar: {
	height: 50,
	borderTopColor: 'darkgrey',
	borderTopWidth: 1,
	opacity: 0.98,
	justifyContent:'space-between'
	}
	});

export default scenes;
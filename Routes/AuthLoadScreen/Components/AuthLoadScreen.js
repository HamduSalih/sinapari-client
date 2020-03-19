import React from "react";
import {View, Text, ImageBackground, StyleSheet, Image} from "react-native";
import { Container }  from "native-base";
import { Actions } from 'react-native-router-flux';
import Constants from 'expo-constants';
import BottomTab from '../../../Navigtions/BottomTabContainer';

const sinalogo = require('../../../assets/img/sinalogo.jpg')
const sinabg = require('../../../assets/img/sina-bg.jpg')

class AuthloadScreen extends React.Component{
	constructor(props){
		super(props);
	}

	state = {
	}

	componentDidMount(){
		setTimeout(
			Actions.login(),
			5000
		)
  	}

  componentDidUpdate(prevProps, prevState){
  } 

render(){
		return(
			<ImageBackground style={
				styles.container
			}
				source={sinabg}
			>
				<Image 
                    source={sinalogo}
                    resizeMode='center'
                    style={{padding:0,marginVertical:-45}} />
                <Text style={{color:'#eef0ef', padding:0}}>The Future of Logistics Transportation</Text>
			</ImageBackground>
		);

	}
}

export default AuthloadScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: null,
        height: null,
        justifyContent: 'center',
        alignItems: 'center',
	}
})
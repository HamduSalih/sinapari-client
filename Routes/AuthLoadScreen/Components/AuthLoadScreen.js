import React from "react";
import {View, Text, ImageBackground, StyleSheet, Image, AsyncStorage} from "react-native";
import { Container }  from "native-base";
import { Actions } from 'react-native-router-flux';
import Constants from 'expo-constants';
import BottomTab from '../../../Navigtions/BottomTabContainer';
import * as firebase from 'firebase';
import '@firebase/firestore';

const database = firebase.firestore()
const sinalogo = require('../../../assets/img/sinalogo.jpg')
const sinabg = require('../../../assets/img/sina-bg.jpg')

class AuthloadScreen extends React.Component{
	constructor(props){
		super(props);
	}

	state = {
	}

	componentDidMount(){
		var version = "1.0.0"
		var versionControl = database.collection('versionControl').doc('versionControl')
		versionControl
		.get()
		.then((doc)=>{
			if((doc.data()).version == version){
				setTimeout(() => {
					this._bootstrapAsync();
				}, 5000);
			}else{
				if(alert('Please close app and update to the latest version')){

				}
			}
		})
		.catch((error)=>{
			console.log(error)
		})		
  	}

	_bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('isLoggedIn');
        const driverLicense = await AsyncStorage.getItem('id_number');
        if(userToken !== '1'){
            Actions.login();
        } else{
			//alert(driverLicense)
			await this.props.getUserData(driverLicense),
			await this.props.getAllJobs(driverLicense),
            Actions.home();
        }
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
				<Text
                        style={{color:'#eef0ef', padding:0, fontSize: 40}}>SinaPari</Text>
                    <Text style={{color:'#eef0ef', padding:0, fontSize: 10}}>The Future of Logistics Transportation</Text>
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
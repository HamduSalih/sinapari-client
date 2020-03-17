import React from "react";
import {View, Text, ImageBackground, StyleSheet} from "react-native";
import { Container }  from "native-base";
import { Actions } from 'react-native-router-flux';
import Constants from 'expo-constants';
import BottomTab from '../../../Navigtions/BottomTabContainer';

const sinaLogo = require("../../../assets/img/sinapari_blue.png");
const truckMarker = require("../../../assets/img/truck_marker.png");

class AuthloadScreen extends React.Component{
	constructor(props){
		super(props);
		if(this.props.from === 'bidProcess'){
			this.state.bids = this.props.bids
		} else {
			this.state.bids = this.props.allBids
		}
		this.state.driverLicense = this.props.userId
	}

	state = {
		//driverLicense: this.props.userId,
	}

	componentDidMount(){
		if( Object.entries(this.props.allBids) < 1){
			this.props.getDriverLocation(this.state.driverLicense)
			this.props.getAllJobs(),
			this.props.getDriverBids(this.state.driverLicense),
			this.props.getUserData(this.state.driverLicense)
		}
  	}

  componentDidUpdate(prevProps, prevState){
	/**if(this.props.booking.status === 'confirmed'){
		Actions.trackDriver({type:'reset'});
	} */
  } 

render(){
	const region = {
		latitude: 5.6604616,
		  longitude: -0.0077599,
		 latitudeDelta: 0.045,
		 longitudeDelta: 0.045
	}
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
		justifyContent: 'center'
	}
})
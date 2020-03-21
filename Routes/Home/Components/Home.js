import React from "react";
import {View, Text, YellowBox} from "react-native";
import { Container }  from "native-base";
import { Actions } from 'react-native-router-flux';
import Constants from 'expo-constants';
import NewJobButton from './NewJobButton'

const sinaLogo = require("../../../assets/img/sinapari_blue.png");
const truckMarker = require("../../../assets/img/truck_marker.png");

class Home extends React.Component{
	constructor(props){
		super(props);
		if(this.props.from === 'bidProcess'){
			this.state.bids = this.props.bids
		} else {
			this.state.bids = this.props.allBids
		}
		this.state.driverLicense = this.props.userId
	}


render(){
		return(
			<Container>
				<View style={{flex:1}}>
					<NewJobButton />
				</View>
			</Container>
		);

	}
}

export default Home;
import React from "react";
import {View, Text, YellowBox} from "react-native";
import { Container }  from "native-base";
import { Actions } from 'react-native-router-flux';
import Constants from 'expo-constants';

const sinaLogo = require("../../../assets/img/sinapari_blue.png");
const truckMarker = require("../../../assets/img/truck_marker.png");

class AllBids extends React.Component{
	constructor(props){
		super(props);
	}


render(){
		return(
			<Container>
				<View style={{flex:1}}>
					
				</View>
			</Container>
		);

	}
}

export default AllBids;
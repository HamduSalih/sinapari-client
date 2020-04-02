import React from "react";
import {View, Text, YellowBox} from "react-native";
import { Container }  from "native-base";
import { Actions } from 'react-native-router-flux';
import MapContainer from "./MapContainer";
import BottomTab from '../../../Navigtions/BottomTabContainer';
import ScrollContainer from './ScrollContainer'
const sinaLogo = require("../../../assets/img/sinapari_blue.png");
const truckMarker = require("../../../assets/img/truck_marker.png");

class CurrentJob extends React.Component{
	constructor(props){
		super(props);
		
	}

	state = {
		driverLicense: this.props.userId,
	}

	componentDidMount(){
		if(this.props.bidDetails.status == 'accepted'){
			this.props.getDriverLocation(this.props.bidDetails)
		}
  	}

  componentDidUpdate(prevProps, prevState){
	/**if(this.props.booking.status === 'confirmed'){
		Actions.trackDriver({type:'reset'});
	} */
  } 

render(){
		return(
			<View style={{flex:1}}>
				{
					this.props.region &&
					<MapContainer 
						region={this.props.region}							
					/>
				}

				<ScrollContainer 
					bidDetails={this.props.bidDetails}
					updateBidTripStatus={this.props.updateBidTripStatus}
				/>
			</View>
		);

	}
}

export default CurrentJob;
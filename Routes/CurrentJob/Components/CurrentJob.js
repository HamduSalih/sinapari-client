import React from "react";
import {View, Text, YellowBox} from "react-native";
import { Container }  from "native-base";
import { Actions } from 'react-native-router-flux';
import MapContainer from "./MapContainer";
import ScrollContainer from './ScrollContainer'
import BottomTabContainer from '../../../Navigtions/BottomTabContainer'
import CallButton from './CallButton'


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
		if(this.props.bidDetails[0].tripStatus == 'live'){
			this.props.getDriverLocation(this.props.bidDetails[0])
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
						bidDetails={this.props.bidDetails}							
					/>
				}

				<ScrollContainer 
					bidDetails={this.props.bidDetails}
					updateBidTripStatus={this.props.updateBidTripStatus}
				/>
				<CallButton />
				<BottomTabContainer />
			</View>
		);

	}
}

export default CurrentJob;
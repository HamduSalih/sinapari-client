import React from "react";
import {View, Dimensions, StyleSheet, ActivityIndicator} from "react-native";
import { Container }  from "native-base";
import { Actions } from 'react-native-router-flux';
import MapContainer from "./MapContainer";
import ScrollContainer from './ScrollContainer'
import RenderJobs from './RenderJobs'
import BottomTabContainer from '../../../Navigtions/BottomTabContainer'

const {width, height} = Dimensions.get("window");
const sinaLogo = require("../../../assets/img/sinapari_blue.png");
const truckMarker = require("../../../assets/img/truck_marker.png");

class CurrentJobs extends React.Component{
	constructor(props){
		super(props);
		
	}

	state = {
		
	}

	componentDidMount(){
		this.props.getCurrentJobs((this.props.userData))
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
					!this.props.currentJobs &&
					<ActivityIndicator
						size="large" 
						color='#141d48'
						style={styles.activityIndicator}/>
				}
				{
						this.props.currentJobs &&
						<RenderJobs
							currentJobs={this.props.currentJobs}/>
					}
				<BottomTabContainer />
			</View>
		);

	}
}
const styles = StyleSheet.create({
	activityIndicator:{
		marginTop: (40/100)*(height),
	}
})

export default CurrentJobs;
import React from "react";
import {View, Text, StyleSheet, ActivityIndicator, Dimensions} from "react-native";
import { Container }  from "native-base";
import { Actions } from 'react-native-router-flux';
import Constants from 'expo-constants';
import RenderJobs from './RenderJobs'
import BottomTabContainer from '../../../Navigtions/BottomTabContainer'

const sinaLogo = require("../../../assets/img/sinapari_blue.png");
const truckMarker = require("../../../assets/img/truck_marker.png");

const {width, height} = Dimensions.get("window");

class JobBids extends React.Component{
	constructor(props){
		super(props);
	}

	componentDidMount(){
		this.props.getJobBids(this.props.jobId)
	}

render(){
		return(
			<Container>
				<View style={{flex:1}}>
					{
						!this.props.jobBids &&
						<ActivityIndicator
							size="large" 
							color='#141d48'
							style={styles.activityIndicator}/>
					}
					{
						this.props.jobBids &&
						<RenderJobs
							jobBids={this.props.jobBids}/>
					}
					<BottomTabContainer />
				</View>
			</Container>
		);

	}
}

const styles = StyleSheet.create({
	activityIndicator:{
		marginTop: (40/100)*(height),
	}
})

export default JobBids;
import React from "react";
import {View, StyleSheet, ActivityIndicator, Dimensions, Text} from "react-native";
import { Container }  from "native-base";
import { Actions } from 'react-native-router-flux';
import Constants from 'expo-constants';
import NewJobButton from './NewJobButton'
import RenderJobs from './RenderJobs'
import BottomTabContainer from '../../../Navigtions/BottomTabContainer'

const {width, height} = Dimensions.get("window");
const sinaLogo = require("../../../assets/img/sinapari_blue.png");
const truckMarker = require("../../../assets/img/truck_marker.png");

class Home extends React.Component{
	constructor(props){
		super(props);
		}


render(){
		return(
			<Container>
				<View style={{flex:1}}>
					{
						this.props.allJobs &&
						<RenderJobs 
							allJobs={this.props.allJobs}
						/>
					}
					{
						!this.props.allJobs &&
						<View style={{
							flex:1,
							justifyContent:'center',
							position: 'absolute',
							alignSelf: 'center',
							top: (35/100)*(height),
						}}>
							<ActivityIndicator
							size="large" 
							color='#141d48'/>
						
							<Text style={{textAlign:'center'}}>
								We are looking for your posted jobs, if there are any.
							</Text>

							<Text style={{textAlign:'center'}}>
								Tap on the PLUS sign below to add a new job.
							</Text>
						</View>
					}
					<NewJobButton />
					<BottomTabContainer />
				</View>
			</Container>
		);

	}
}

export default Home;

const styles = StyleSheet.create({
	activityIndicator:{
		marginTop: (40/100)*(height),
	}
})
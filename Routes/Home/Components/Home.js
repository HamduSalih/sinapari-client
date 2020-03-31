import React from "react";
import {View, Text, YellowBox} from "react-native";
import { Container }  from "native-base";
import { Actions } from 'react-native-router-flux';
import Constants from 'expo-constants';
import NewJobButton from './NewJobButton'
import RenderJobs from './RenderJobs'

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
					<NewJobButton />
				</View>
			</Container>
		);

	}
}

export default Home;
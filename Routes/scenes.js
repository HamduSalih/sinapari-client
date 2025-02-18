import React from "react";
import { StyleSheet } from 'react-native';
import { Actions, Scene, ActionConst } from "react-native-router-flux";
import AuthLoadScreenContainer from './AuthLoadScreen/Containers/AuthLoadScreenContainer'
import LoginContainer from './Login/Containers/LoginContainer'
import RegisterContainer from './Register/Containers/RegisterContainer'
import RegProcessContainer from './RegProcess/Containers/RegProcessContainer'
import HomeContainer from './Home/Containers/HomeContainer'
import AddJobContainer from './AddJob/Containers/AddJobContainer'
import JobBidsContainer from './JobBids/Containers/JobBidsContainer'
import CurrentJobContainer from './CurrentJob/Containers/CurrentJobContainer'
import CurrentJobsContainer from './CurrentJobs/Containers/CurrentJobsContainer'
import ClientProfileContainer from './ClientProfile/Containers/ClientProfileContainer'
import ReportContainer from './Report/Containers/ReportContainer'

const scenes = Actions.create(
	<Scene key="root">
		<Scene key="authLoad" hideNavBar component={AuthLoadScreenContainer} title="AuthLoad"  initial/>
		<Scene key="login" type={ActionConst.RESET} component={LoginContainer} title="Login" />
		<Scene key="register" component={RegisterContainer} title="Register" />
		<Scene key='regprocess' hideNavBar type={ActionConst.RESET} component={RegProcessContainer} title="RegProcess" />
		<Scene key="home" type={ActionConst.RESET} component={HomeContainer} title="Home" />
		<Scene key="addJob" component={AddJobContainer} title="Create Job" />
		<Scene key="jobBids" component={JobBidsContainer} title="Bids" />
		<Scene key="currentJob" component={CurrentJobContainer} title="Current Job" />
		<Scene key="currentJobs" component={CurrentJobsContainer} title="Current Jobs" />
		<Scene key="clientProfile" component={ClientProfileContainer} title="Profile" />
		<Scene key="report" component={ReportContainer} title="Send Report" />
	</Scene>

);

const styles = StyleSheet.create({
	tabBar: {
	height: 50,
	borderTopColor: 'darkgrey',
	borderTopWidth: 1,
	opacity: 0.98,
	justifyContent:'space-between'
	}
	});

export default scenes;
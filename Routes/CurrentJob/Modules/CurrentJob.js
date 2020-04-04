import update from "react-addons-update";
import constants from "./actionConstants";
//helps you get latidue delta from main size of window
import { Dimensions, AsyncStorage } from "react-native"
import RNGooglePlaces from "react-native-google-places";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import request from '../../../util/Request';
import calculateFare from '../../../util/FareCalculator';
import * as Network from 'expo-network';
import Constants from "expo-constants";
import * as firebase from 'firebase';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBICeaakAkGPlVOVjObj7BDaoZvmgibDA8",
    authDomain: "sinapari-6dbbd.firebaseapp.com",
    databaseURL: "https://sinapari-6dbbd.firebaseio.com",
    projectId: "sinapari-6dbbd",
    storageBucket: "sinapari-6dbbd.appspot.com",
    messagingSenderId: "501482455468",
    appId: "1:501482455468:web:4a21086028e2e8237fba09",
    measurementId: "G-Y9TJXZG88L"
  };
//firebase.analytics();

const database = firebase.firestore();

const { manifest } = Constants;

const uri = `http://${manifest.debuggerHost.split(':').shift()}:3000`;

//--------------------
//Constants
//--------------------
//THESE ARE ACTIONS CONSTANTS THEY SHOULD BE CALLED 
//IN actionConstants.js
const {
	GET_JOB_BIDS,
  	DRIVER_LOCATION
	  } = constants;


const {width, height} = Dimensions.get("window");
let ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.035;
const LONGITUDE_DELTA = 0.035; 
//---------------
//Actions
//---------------
export function getDriverLocation(bidDetails){
	//we will get location of driver from locations collections
	//using driver id from the biddetails

	var locationCollection = database.collection('locations').doc((bidDetails.driverId).toString())
	var region 
	return(dispatch)=>{
		 locationCollection
		 .onSnapshot((doc)=>{
			region = {
				latitude: (doc.data()).lat,
				longitude: (doc.data()).long,
				LATITUDE_DELTA,
				LONGITUDE_DELTA
			}
		 })
		 .then(()=>{
			 dispatch({
				 type:DRIVER_LOCATION,
				 payload: region
			 })
		 })
	 }
}


export function updateBidTripStatus(bid, buttonText){
	var collections = database.collection('bids');
	var driverJobsInfoCollection = database.collection('jobsInfo')
	var docId = '';
	var jobsInfoDocId = '';
	var jobBids = [];

	if(buttonText == 'accepted'){
		return (dispatch)=>{
			collections.where('driverId', '==', bid.driverId)
			.where('bidId', '==', bid.bidId)
			.where('status', '==', 'pending')
			.get()
			.then((querySnapshot)=>{
				querySnapshot.forEach((doc)=>{
					docId = doc.id
				})
			})
			.then(()=>{
				collections.doc(docId)
				.update({
					status: 'accepted'
				})
			})
			.then(()=>{
				collections.where('driverId', '==', bid.driverId)
				.where('bidId', '==', bid.bidId)
				.where('status', '==', 'pending')
				.get()
				.then((querySnapshot)=>{
					querySnapshot.forEach((doc)=>{
						collections.doc(doc.id).delete()
					})
				})
			})
			.then(()=>{
			collections.where('jobId', '==', bid.jobId)
			.get()
			.then((querySnapshot)=>{
				querySnapshot.forEach((doc)=>{
				jobBids.push(doc.data());
				})
			})
			.then(()=>{
				dispatch({
				type: GET_JOB_BIDS,
				payload: jobBids
				})
			})
			})}
	}

	if(buttonText == 'canceled'){
		return (dispatch)=>{
			collections.where('driverId', '==', bid.driverId)
			.where('bidId', '==', bid.bidId)
			.get()
			.then((querySnapshot)=>{
				querySnapshot.forEach((doc)=>{
					collections.doc(doc.id).delete()
				})
			})
			.then(()=>{
			collections.where('jobId', '==', bid.jobId)
			.get()
			.then((querySnapshot)=>{
				querySnapshot.forEach((doc)=>{
				jobBids.push(doc.data());
				})
			})
			.then(()=>{
				dispatch({
				type: GET_JOB_BIDS,
				payload: jobBids
				})
			})
			})
		}
	}

	if(buttonText == 'completed'){
		return (dispatch)=>{
			collections.where('driverId', '==', bid.driverId)
			.where('bidId', '==', bid.bidId)
			.where('tripStatus', '==', 'completed')
			.get()
			.then((querySnapshot)=>{
				querySnapshot.forEach((doc)=>{
					docId = doc.id
				})
			})
			.then(()=>{
				collections.doc(docId)
				.update({
					status: 'completed',
					ownerStatus: 'completed'
				})
			})
			.then(()=>{
				driverJobsInfoCollection.where('id', '==', bid.driverId)
				.get()
				.then((querySnapshot)=>{
					querySnapshot.forEach((doc)=>{
						jobsInfoDocId = doc.id
						if((doc.data()).jobsCompleted == null){
							const completedJobs = 0 + 1
							driverJobsInfoCollection.doc(jobsInfoDocId)
							.update({
								jobsCompleted: completedJobs
							})
						}else{
							const completedJobs = parseInt((doc.data()).jobsCompleted) + 1
							driverJobsInfoCollection.doc(jobsInfoDocId)
							.update({
								jobsCompleted: completedJobs
							})
						}
					})
				})
			})
			.then(()=>{
			collections.where('jobId', '==', bid.jobId)
			.get()
			.then((querySnapshot)=>{
				querySnapshot.forEach((doc)=>{
				jobBids.push(doc.data());
				})
			})
			.then(()=>{
				dispatch({
				type: GET_JOB_BIDS,
				payload: jobBids
				})
			})
			})
		}
	}
}


//--------------------
//Action Handlers
//--------------------
function handleGetDriverBids(state, action){
	return update(state, {
		jobBids:{
			$set: action.payload
		}
	})
}

function handleDriverLocation(state, action){
	return update(state, {
		region:{
			$set: action.payload
		}
	})
}


const ACTION_HANDLERS = {
	GET_JOB_BIDS: handleGetDriverBids,
 	DRIVER_LOCATION:handleDriverLocation
}

const initialState = {
  
};

export function CurrentJobReducer (state = initialState, action){
	const handler = ACTION_HANDLERS[action.type];

	return handler ? handler(state, action) : state;
}
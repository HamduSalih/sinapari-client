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

const database = firebase.firestore();

//--------------------
//Constants
//--------------------
//THESE ARE ACTIONS CONSTANTS THEY SHOULD BE CALLED 
//IN actionConstants.js
const { 
	GET_JOB_BIDS
	  } = constants;


const {width, height} = Dimensions.get("window");
let ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.035;
const LONGITUDE_DELTA = 0.035; 
//---------------
//Actions
//---------------
export function getJobBids(jobId){
	var collections = database.collection('bids');
	

	return(dispatch)=>{
		collections.where('jobId', '==', jobId)
		.onSnapshot((querySnapshot)=>{
			var jobBids = []
			querySnapshot.forEach((doc)=>{
				jobBids.push(doc.data())
			})
			dispatch({
				type:GET_JOB_BIDS,
				payload: jobBids
			})
		})
	}
}

//--------------------
//Action Handlers
//--------------------
function handleGetJobBids(state, action){
	return update(state, {
		jobBids:{
			$set: action.payload
		}
	})
}

const ACTION_HANDLERS = {
	GET_JOB_BIDS:handleGetJobBids
}
const initialState = {
  region:{},
};

export function JobBidsReducer (state = initialState, action){
	const handler = ACTION_HANDLERS[action.type];

	return handler ? handler(state, action) : state;
}
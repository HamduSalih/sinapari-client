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
	GET_CURRENT_JOBS
	  } = constants;


const {width, height} = Dimensions.get("window");
let ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.035;
const LONGITUDE_DELTA = 0.035; 
//---------------
//Actions
//---------------
export function getCurrentJobs(userData){
	var bidsCollection = database.collection('bids')
	var currentJobs = []

	return (dispatch)=>{
		bidsCollection.where('status', '==', 'accepted')
		.where('client', '==', userData.client)
		.get()
		.then((querySnapshot)=>{
			querySnapshot.forEach((doc)=>{
				currentJobs.push(doc.data())
			})
		})
		.then(()=>{
			dispatch({
				type: GET_CURRENT_JOBS,
				payload
			})
		})
	}
}


//--------------------
//Action Handlers
//--------------------
function handleCurrentJobs(state, action){
	return update(state, {
		currentJobs:{
			$set: action.payload
		}
	})
}


const ACTION_HANDLERS = {
	GET_CURRENT_JOBS: handleCurrentJobs
}

const initialState = {
  
};

export function CurrentJobsReducer (state = initialState, action){
	const handler = ACTION_HANDLERS[action.type];

	return handler ? handler(state, action) : state;
}
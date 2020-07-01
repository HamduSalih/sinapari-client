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

// Initialize Firebase
	firebase.initializeApp(firebaseConfig);
//firebase.analytics();

const database = firebase.firestore();

//--------------------
//Constants
//--------------------
//THESE ARE ACTIONS CONSTANTS THEY SHOULD BE CALLED 
//IN actionConstants.js
const { 
	GET_USER_DATA,
	GET_USER_JOBS
	  } = constants;


const {width, height} = Dimensions.get("window");
let ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.035;
const LONGITUDE_DELTA = 0.035; 
//---------------
//Actions
//---------------
export function getDriverLocation(userId){
	var dbLocations = database.collection('locations').doc(userId.toString());
	return(dispatch)=>{
		//navigator is used to return geolocation object to display users current location 
		navigator.geolocation.watchPosition(
		  (position)=>{
			dbLocations.update({
				lat: position.coords.latitude,
				long: position.coords.longitude
			})
			.then(()=>{
				dispatch({
					type:GET_DRIVER_LOCATION,
					payload:position
				});
			});
		  },
		  (error) => console.log(error.message),
		  {enableHighAccuracy: true, timeout:2000, maximumAge:10000}
		)
	  }
}

export function getUserData(userId){	
	return (dispatch)=>{
		var clientUserData = database.collection('clients');
		clientUserData.where('id_number', '==', userId)
		.get()
		.then((querySnapshot)=>{
			querySnapshot.forEach((doc)=>{
				dispatch({
					type:GET_USER_DATA,
					payload: doc.data()	
				})
			})
		  })
	}	
}

export function getAllJobs(idnumber){
	var jobsCollection = database.collection('jobs');
	;
	return(dispatch) => {
		jobsCollection.where('client_number', '==', idnumber)
		.onSnapshot(function(querySnapshot) {
			var allJobs = []
			querySnapshot.forEach(function(doc) {
				// doc.data() is never undefined for query doc snapshots
				allJobs.push(doc.data());
			});
			dispatch({
				type:GET_USER_JOBS,
				payload: allJobs	
			})
		})
	}
}

//--------------------
//Action Handlers
//--------------------
function handleGetDriverLocation(state, action){
	return update(state, {
		region:{
			latitude:{
				$set: action.payload.coords.latitude
			},
			longitude:{
				$set: action.payload.coords.longitude
			},
			latitudeDelta:{
			  $set:LATITUDE_DELTA
			},
			longitudeDelta:{
			  $set:LONGITUDE_DELTA
			}	
		}	
	})
}

function handleGetUserData(state, action){
	return update(state, {
		userData:{
			$set: action.payload
		}
	})
}

function handleGetUserAccount(state, action){
	return update(state, {
		userAccount:{
			$set: action.payload
		}
	})
}

function handleGetUserJobs(state, action){
	return update(state, {
		userJobs:{
			$set: action.payload
		}
	})
}

function handleGetAllJobs(state, action){
	return update(state, {
		allJobs:{
			$set: action.payload
		}
	})
}

function handleGetDriverBids(state, action){
	return update(state, {
		allBids:{
			$set: action.payload
		}
	})
}

const ACTION_HANDLERS = {
  GET_USER_DATA:handleGetUserData,
  GET_USER_JOBS:handleGetAllJobs,
}
const initialState = {
};

export function AuthLoadScreenReducer (state = initialState, action){
	const handler = ACTION_HANDLERS[action.type];

	return handler ? handler(state, action) : state;
}
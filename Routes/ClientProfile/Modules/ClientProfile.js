import update from "react-addons-update";
import constants from "./actionConstants";
//helps you get latidue delta from main size of window
import { Dimensions } from "react-native"
import RNGooglePlaces from "react-native-google-places";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import request from '../../../util/Request';
import * as firebase from 'firebase';
import '@firebase/firestore';
import Constants from "expo-constants";
const database = firebase.firestore();

//--------------------
//Constants
//--------------------
//THESE ARE ACTIONS CONSTANTS THEY SHOULD BE CALLED 
//IN actionConstants.js
const { 
	GET_USER_DATA
	  } = constants;


const {width, height} = Dimensions.get("window");
let ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.035;
const LONGITUDE_DELTA = 0.035; 
//---------------
//Actions
//---------------
export function updateProfile(data){
	var collections = database.collection('clients')
	var docId = ''
	return(dispatch)=>{
		collections.where('id_number', '==', data.clientId)
		.get()
		.then((querySnapshot)=>{
			querySnapshot.forEach((doc)=>{
				docId = doc.id
			})
		})
		.then(()=>{
			collections.doc(docId)
			.update({
				username: data.username,
				password: data.password,
				phone_number: data.phone_number
			})
		})
		.then(()=>{
			collections.doc(docId)
			.get()
			.then((doc)=>{
				if(doc.exists){
					dispatch({
						type: GET_USER_DATA,
						payload: doc.data()	
					})
				}
			})
		})
	}
}

//--------------------
//Action Handlers
//--------------------
function handleUpdateProfile(state, action){
	return update(state, {
		userData:{
			$set: action.payload
		}
	})
}

const ACTION_HANDLERS = {
	GET_USER_DATA:handleUpdateProfile
}
const initialState = {
  
};

export function ClientProfileReducer (state = initialState, action){
	const handler = ACTION_HANDLERS[action.type];

	return handler ? handler(state, action) : state;
}
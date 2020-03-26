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

  
const database = firebase.firestore();

const { manifest } = Constants;

const uri = `http://${manifest.debuggerHost.split(':').shift()}:3000`;

//--------------------
//Constants
//--------------------
//THESE ARE ACTIONS CONSTANTS THEY SHOULD BE CALLED 
//IN actionConstants.js
const { 
  TOGGLE_SEARCH_RESULT,
  GET_SELECTED_ADDRESS,
  GET_DISTANCE_MATRIX
  
	  } = constants;


const {width, height} = Dimensions.get("window");
let ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.035;
const LONGITUDE_DELTA = 0.035; 
//---------------
//Actions
//---------------
export function getInputType(payload){
  return{
    type:TOGGLE_SEARCH_RESULT,
    payload
  }
}

export function getSelectedAddress(payload, resType){
  
  return(dispatch, store)=>{
    if(store().home.selectedLoadAddress === true){
      dispatch({
        type:GET_SELECTED_ADDRESS,
        payload,
        resType
      })
      //get the distance and time
      if(store().home.selectedLoadPoint && store().home.selectedDropPoint){
        request.get('https://maps.googleapis.com/maps/api/distancematrix/json')
        .query({
          origins:store().home.selectedLoadAddress.latitude + ',' + store().home.selectedLoadAddress.longitude,
          destinations:store().home.selectedDropAddress.latitude + ',' + store().home.selectedDropAddress.longitude,
          mode:'driving',
          key:'AIzaSyCspx_yMJwX4bTjLXTUHebo9TwYxTaLa6E'
        })
        .finish((error, res)=>{
          dispatch({
            type:GET_DISTANCE_MATRIX,
            payload:res.body
          })
        })
      }
    }else{
      dispatch({
        type:GET_SELECTED_ADDRESS,
        payload,
        resType
      })
    }
  }
}

//--------------------
//Action Handlers
//--------------------
function handleGetInputType(state, action){
  if(action.payload === 'loadPoint'){
    return update(state, {
       resultTypes:{
         pickUp:{
           $set:true,
         },
         dropOff:{
           $set:false,
         }
       },
       selectedLoadPoint:{
         $set:true
       }
    });
  }

  if(action.payload === 'dropPoint'){
    return update(state, {
       resultTypes:{
         pickUp:{
           $set:false,
         },
         dropOff:{
           $set:true,
         }
       },
       selectedDropPoint:{
         $set:true
       }
    });
  }
}

function handleGetSelectedAddress(state, action){
  if (action.resType === 'loadPoint'){
    return update(state, {
      selectedLoadAddress:{
        $set:action.payload
      }
    })
  }
  if (action.resType === 'dropPoint'){
    return update(state, {
      selectedDropAddress:{
        $set:action.payload
      }
    })
  }
}

function handleGetDistanceMatrix(state, action){
  return update(state, {
    distanceMatrix:{
      $set:action.payload
    }
  })
}

const ACTION_HANDLERS = {
  TOGGLE_SEARCH_RESULT:handleGetInputType,
  GET_SELECTED_ADDRESS:handleGetSelectedAddress,
  GET_DISTANCE_MATRIX:handleGetDistanceMatrix
}
const initialState = {
  resultTypes:{},
  selectedLoadAddress:{},
  selectedDropAddress:{},
  selectedLoadPoint:{},
  selectedDropPoint:{},
};

export function AddJobReducer (state = initialState, action){
	const handler = ACTION_HANDLERS[action.type];

	return handler ? handler(state, action) : state;
}
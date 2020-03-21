import React from 'react';
import { View, 
        ActivityIndicator, 
        Text,
        ImageBackground,
        AsyncStorage} from 'react-native';
import styles from './RegProcessStyles';
import { Actions } from 'react-native-router-flux';
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
//firebase.initializeApp(firebaseConfig);
//firebase.analytics();

const database = firebase.firestore();



const sinabg = require('../../../assets/img/sina-bg.jpg')
const sinalogo = require('../../../assets/img/sinalogo.jpg')

export default class RegProcess extends React.Component{

    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = this.props.userInfo
    }

    //first 
    _firstRegister = async() => {
        const userData = this.state;
        
        console.log(this.state)

        database.collection('clients').add(userData)
        .then(async() => {
            await AsyncStorage.setItem('isLoggedIn', '1');
            await AsyncStorage.setItem('id_number', userData.id_number);
        })
        .then(()=>{
            this.props.getUserData(userData.id_number);
        })
        .catch((err)=>{
            console.log(err)
        });
    }

    componentDidMount() {
        //this._bootstrapAsync();
        //setTimeout(this._bootstrapAsync, 5000);
        //this.props.registerUser('Hamdu');
        this._firstRegister();
    }

    //fetch token from storage and navigate to appropriate screen

    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('isLoggedIn');
        this.props.navigation.navigate( userToken !== '1' ? 'Auth' : 'App');
    }

    render(){
        return(
            <ImageBackground 
                source={sinabg} 
                style={styles.container}
                 >
                <ActivityIndicator size="large" color="#eef0ef"/>
                <Text style={{color:'white', padding:10}}>Please be patient as we get things ready</Text>
            </ImageBackground>
        )
    }
}
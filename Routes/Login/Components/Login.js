import React, { Component } from 'react'
import { View, AsyncStorage, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native'
import { Button } from 'native-base'
import { Actions } from 'react-native-router-flux'
import * as firebase from 'firebase';
import '@firebase/firestore';

const database = firebase.firestore();

export default class Login extends Component{

    state = {
        picture: null
    }

    _navigate = () => {
        let params = this.state
        Actions.register({userInfo: params})
    }

    _login = async() => {
        var clientCollection = database.collection('clients')

        clientCollection.where('username', '==', this.state.username)
        .where('password', '==', this.state.password)
        .get()
        .then(async(querySnapshot)=>{
            querySnapshot.forEach(async(doc)=>{
                await AsyncStorage.setItem('isLoggedIn', '1');
                await AsyncStorage.setItem('id_number', doc.data().id_number);
            })
        })
        .then(async()=>{
            const userToken = await AsyncStorage.getItem('isLoggedIn');
            const driverLicense = await AsyncStorage.getItem('id_number');
            if(userToken !== '1'){
                Actions.login();
            } else{
                Actions.authLoad();
            }
        })
        .catch((error)=>{
            console.log(error)
        })

        /**if(userInfo.username === this.state.username && userInfo.password === this.state.password){
            //alert('Logged In');
            await AsyncStorage.setItem('isLoggedIn', '1');
            this.props.navigation.navigate('Root');
        }else{
            alert('User info not corrected')
        } */
    }

    render(){
        return(
            <KeyboardAvoidingView
                behavior="padding" 
                    style={styles.container}>
                <View style={styles.formContainer}>
                    <Text style={styles.labels}>Username</Text>
                    <TextInput
                        placeholder='Input your username'
                        style={styles.textInput}
                        onChangeText={(username)=> this.setState({username})}
                        value={this.state.username}
                        autoCapitalize='none'
                    />
                    <Text style={styles.labels}>Password</Text>
                    <TextInput
                        placeholder='Password'
                        style={styles.textInput}
                        onChangeText={(password)=> this.setState({password})}
                        value={this.state.password}
                        autoCapitalize='none'
                        secureTextEntry
                    />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.userButton}
                            onPress={this._login}
                        >
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.userButton}
                            onPress={this._navigate.bind(this, 'register')}>
                            <Text style={styles.buttonText}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    labels:{
        fontSize: 25,
        marginBottom: 10
    },
    formContainer:{
        flex: 1,
        justifyContent: 'center',
        borderColor: '#141d48',
        borderWidth: 1,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.8,
        elevation: 1
    },
    textInput:{
        borderColor: '#141d48',
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginBottom: 20
    },
    userButton: {
        backgroundColor: '#141d48',
        padding: 15,
        borderRadius: 5,
        width: '45%'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    buttonText:{
        textAlign: 'center',
        fontSize: 15,
        color: 'white'
    }
})
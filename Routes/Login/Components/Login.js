import React, { Component } from 'react'
import { View, ScrollView, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { Button } from 'native-base'
import { Actions } from 'react-native-router-flux'

export default class Login extends Component{

    state = {

    }

    _navigate = (nextScreen) => {
        let params = this.state
        Actions.nextScreen({userInfo: params})
    }

    render(){
        return(
            <View style={{
                flex:1,
                justifyContent: 'center',
                padding: 20
            }}>
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
                        <TouchableOpacity style={styles.userButton}>
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.userButton}
                            onPress={this._navigate.bind(this, register)}>
                            <Text style={styles.buttonText}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    labels:{
        fontSize: 25,
        marginBottom: 10
    },
    formContainer:{
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
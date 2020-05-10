import React, { Component } from 'react'
import { View, ScrollView, Text, KeyboardAvoidingView, StyleSheet, TouchableOpacity } from 'react-native'
import { Button } from 'native-base'
import { Actions } from 'react-native-router-flux'
import ScrollContainer from './ScrollContainer'

export default class Register extends Component{
    constructor(props) {
        super(props);
        this.state = this.props.userInfo
    }

    _navigate = (nextScreen) => {
    }

    componentDidMount(){
        console.log(this.state)
    }

    render(){
        return(
            <KeyboardAvoidingView
                style={styles.container}>
                <ScrollContainer 
                    userInfo={this.state}
                />
            </KeyboardAvoidingView>
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
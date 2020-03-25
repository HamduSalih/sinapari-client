import React, { Component } from 'react'
import { View, ScrollView, Text, TextInput, Image, TouchableOpacity } from 'react-native'
import { Button } from 'native-base'
import { Actions } from 'react-native-router-flux'
import styles from './ScrollContainerStyles'
import * as ImagePicker from 'expo-image-picker';
import * as firebase from 'firebase';

export default class ScrollContainer extends Component{
    constructor(props){
        super(props);
    }

    render(){ 
        return(
            <ScrollView contentContainerStyle>
                <View style={styles.formContainer}>
                    <Text style={styles.labels}>Fullname</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Your fullname'
                        
                    />

                    <Text style={styles.labels}>Age</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Age'
                        keyboardType='number-pad'
                        
                    />
                </View>

                <View style={styles.formContainer2}>
                    <Text style={styles.labels}>Client Firm</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Input your firm name'
                        
                    />

                    <Text style={styles.labels}>Identification Number</Text>
                    <TextInput
                        style={styles.textInput}
                        keyboardType='number-pad'
                        placeholder='Input your id number'
                        
                    />
                    <Text style={styles.labels}>Phone Number</Text>
                    <TextInput
                        style={styles.textInput}
                        keyboardType='number-pad'
                        placeholder='Input your phone number'
                    />
                </View>
                <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.userButton}
                        >
                            <Text style={styles.buttonText}>Register</Text>
                        </TouchableOpacity>
                    </View>
            </ScrollView>
        )
    }
}
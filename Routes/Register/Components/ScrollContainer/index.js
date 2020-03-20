import React, { Component } from 'react'
import { View, ScrollView, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { Button } from 'native-base'
import { Actions } from 'react-native-router-flux'
import styles from './ScrollContainerStyles'

export default class ScrollContainer extends Component{
    state={
        picture: null
    }
    
    render(){
        let { picture } = this.state;   
        return(
            <ScrollView contentContainerStyle>
                <View style={styles.formContainer}>
                    <TouchableOpacity
                        style={{backgroundColor: '#eef0ef',
                        padding: 15,
                        width: '45%',
                        borderRadius: 5,
                        flexDirection:'row',
                        alignSelf: 'flex-start',
                        marginBottom: 20}
                    }
                        onPress={this._pickImage}
                    >
                        <Text>Pick an Image</Text>
                    </TouchableOpacity>

                    {
                        picture && 
                        <Image source={{uri: picture}} style={{width: 200, height:200, padding:10}}/>
                    }
                    
                    <Text style={styles.labels}>Fullname</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Your fullname'
                        onChangeText={(fullname)=> this.setState({fullname})}
                        value={this.state.fullname}
                    />

                    <Text style={styles.labels}>Age</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Age'
                        keyboardType='number-pad'
                        onChangeText={(age)=> this.setState({age})}
                        value={this.state.age}
                    />
                </View>

                <View style={styles.formContainer2}>
                    <Text style={styles.labels}>Client Firm</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Input your firm name'
                        onChangeText={(client)=> this.setState({client})}
                        value={this.state.username}
                    />

                    <Text style={styles.labels}>Identification Number</Text>
                    <TextInput
                        style={styles.textInput}
                        keyboardType='number-pad'
                        placeholder='Input your id number'
                        onChangeText={(id_number)=> this.setState({id_number})}
                        value={this.state.id_number}
                    />
                    <Text style={styles.labels}>Phone Number</Text>
                    <TextInput
                        style={styles.textInput}
                        keyboardType='number-pad'
                        placeholder='Input your phone number'
                        onChangeText={(phone_number)=> this.setState({phone_number})}
                        value={this.state.phone_number}
                    />
                </View>
                <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.userButton}>
                            <Text style={styles.buttonText}>Register</Text>
                        </TouchableOpacity>
                    </View>
            </ScrollView>
        )
    }
}
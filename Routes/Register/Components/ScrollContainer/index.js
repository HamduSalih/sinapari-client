import React, { Component } from 'react'
import { View, ScrollView, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { Button } from 'native-base'
import { Actions } from 'react-native-router-flux'

export default class ScrollContainer extends Component{
    
    
    render(){
        let { picture } = this.state;   
        <ScrollView contentContainerStyle>
            <View>
                <TouchableOpacity
                    style={{backgroundColor: '#eef0ef',
                    padding: 15,
                    width: '45%',
                    borderRadius: 5,
                    flexDirection:'row',
                    alignSelf: 'flex-start',
                    marginLeft: '5%',
                    marginBottom: 20}
                }
                    onPress={this._pickImage}
                >
                    <Text style={styles.buttonText}>Pick an Image</Text>
                </TouchableOpacity>

                {
                    picture && 
                    <Image source={{uri: picture}} style={{width: 200, height:200, padding:10}}/>
                }
                
                <Text >Fullname</Text>
                <TextInput
                    placeholder='Your fullname'
                    onChangeText={(fullname)=> this.setState({fullname})}
                    value={this.state.fullname}
                />

                <Text >Age</Text>
                <TextInput
                    placeholder='Age'
                    keyboardType='number-pad'
                    onChangeText={(age)=> this.setState({age})}
                    value={this.state.age}
                />
            </View>

            <View>
                <Text >Client Firm</Text>
                <TextInput
                    placeholder='Input your firm name'
                    onChangeText={(client)=> this.setState({client})}
                    value={this.state.username}
                />

                <Text >Identification Number</Text>
                <TextInput
                    keyboardType='number-pad'
                    placeholder='Input your id number'
                    onChangeText={(id_number)=> this.setState({id_number})}
                    value={this.state.id_number}
                />
                <Text >Phone Number</Text>
                <TextInput
                    keyboardType='number-pad'
                    placeholder='Input your phone number'
                    onChangeText={(phone_number)=> this.setState({phone_number})}
                    value={this.state.phone_number}
                />
            </View>
        </ScrollView>
    }
}
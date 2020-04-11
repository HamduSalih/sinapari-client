import React from 'react';
import { 
    View,
    Text, 
    TextInput,
    TouchableOpacity,
    Picker,
    ScrollView } from 'react-native'
import { Actions } from 'react-native-router-flux'
import styles from './FormComponentsStyles'

export default class FormComponents extends React.Component{
    state={
        clientId: this.props.userData.id_number
    }

    _updateProfile = (data) => {
        this.props.updateProfile(data)
    }

    render(){
        return(
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <View style={styles.componentContainer}>
                        <Text style={styles.label}>Username</Text>
                        <TextInput style={styles.inputs}
                            onChangeText={(username)=> this.setState({username})}
                            autoCapitalize='none'
                        />
                    </View>
                    <View style={styles.componentContainer}>
                        <Text style={styles.label}>Password</Text>
                        <TextInput style={styles.inputs}
                            onChangeText={(password)=> this.setState({password})}
                            autoCapitalize='none'
                            secureTextEntry
                        />
                    </View>
                    <View style={styles.componentContainer}>
                        <Text style={styles.label}>Phone Number</Text>
                        <TextInput style={styles.inputs}
                            onChangeText={(phone_number)=> this.setState({phone_number})}
                        />
                    </View>
                    <View style={{
                        paddingVertical: 20,
                        flexDirection: 'row',
                        justifyContent: 'space-around'
                    }}>
                        <TouchableOpacity style={styles.button}
                            onPress={this._updateProfile.bind(this, this.state)}
                        >
                            <Text style={styles.buttonText}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                            onPress={()=>Actions.pop()}
                        >
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
        )
    }
}
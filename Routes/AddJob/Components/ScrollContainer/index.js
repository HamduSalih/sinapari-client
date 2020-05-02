import React, { Component } from 'react'
import { View, ScrollView, Text, TextInput, Image, TouchableOpacity,
    Picker } from 'react-native'
import { Button } from 'native-base'
import { Actions } from 'react-native-router-flux'
import styles from './ScrollContainerStyles'
import * as ImagePicker from 'expo-image-picker';
import * as firebase from 'firebase';
import GooglePlacesInput from './GooglePlacesInput'
import * as Random from 'expo-random';

export default class ScrollContainer extends Component{
    constructor(props){
        super(props);
    }

    state={
        accessories: null,
        client: this.props.userData.client,
        clientId: this.props.userData.id_number,
        client_number: this.props.userData.phone_number,
        distanceMatrix: null,
            dropOffTime: null,
            dropOffAddress: null,
            dropOffLat: null,
            dropOffLong: null,      
        goodsDescription: null,
        jobId: null,
            pickUpTime: null,
            pickUpAddress: null,
            pickUpLat: null,
            pickUpLong: null,
        status: 'not live',
        trailerType: null,
        vehicleType: null,
        weight: null
    }

    async componentDidMount(){
        const randomBytes = await Random.getRandomBytesAsync(9);
        var i = 0;
        var jobId = '';
        while(i < randomBytes.length){
            jobId = jobId + randomBytes[i];
            i = i + 1;
        }
        this.setState({jobId: jobId});
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.distanceMatrix !== this.props.distanceMatrix){
            this.setState({
                distanceMatrix: nextProps.distanceMatrix
            })
        }
        
        if(nextProps.selectedDropAddress !== this.props.selectedDropAddress){
            this.setState({
                    dropOffAddress: nextProps.selectedDropAddress.address,
                    dropOffLat: nextProps.selectedDropAddress.latitude,
                    dropOffLong: nextProps.selectedDropAddress.longitude
            })
        }

        if(nextProps.selectedLoadAddress !== this.props.selectedLoadAddress){
            this.setState({
                pickUpAddress: nextProps.selectedLoadAddress.address,
                pickUpLat: nextProps.selectedLoadAddress.latitude,
                pickUpLong: nextProps.selectedLoadAddress.longitude
            })
        }
    }

    //convert input time to timestamp
    _toTimestamp = (strDate, stateOption) => {
        function toTimestamp(){
            var datum = Date.parse(strDate);
            return datum/1000;
        }
    
        if(stateOption == 'pickUpTime'){
            let loadTime = toTimestamp()
            this.setState({
                pickUpTime: loadTime,
            })
            console.log(this.state.pickUpTime)
        }
        if(stateOption == 'dropOffTime'){
            let dropTime = toTimestamp()
            this.setState({
                dropOffTime: dropTime,
            })
            console.log(this.state.dropOffTime)
        }
    }


    //handles adding job to database
    _addJobEvent = (parameter) => {
        const loadBoolean = this.props.selectedLoadPoint //variable to receive load point boolean
        const dropBoolean = this.props.selectedDropPoint //variable to receive drop point boolean


        //error handling to check if fields are not empty
        if(loadBoolean == true && dropBoolean == true){
            if(this.state.dropOffTime !== null ||
                this.state.dropOffTime !== null ||
                this.state.goodsDescription !== null ||
                this.state.weight !== null){
                    this.props.addJob(this.state),
                    alert('Job Added Successfully'),
                    Actions.home();
            }
        }else{
            alert('Please make sure all fields are completed')
        }
    }

    render(){ 
        return(
            <ScrollView keyboardShouldPersistTaps='always' contentContainerStyle>
                <View style={styles.formContainer}>
                    <View style={{paddingBottom: 20}}>
                        <GooglePlacesInput 
                            getInputType={this.props.getInputType}
                            getSelectedAddress={this.props.getSelectedAddress}
                        />
                    </View>
                    <Text style={styles.labels}>Vehicle Type</Text>
                    
                    <View style={styles.pickerInput}>
                        <Picker
                            selectedValue={this.state.vehicleType}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({vehicleType: itemValue})
                            }>
                            <Picker.Item label="Trailer Type" value="" />
                            <Picker.Item label="Flatbed" value="flatbed" />
                            <Picker.Item label="Transit" value="transit" />
                            <Picker.Item label="Box-cargo" value="box-cargo" />
                        </Picker>
                    </View>
                    <Text style={styles.labels}>Trailer Type</Text>

                    <View style={styles.pickerInput}>
                        <Picker
                            selectedValue={this.state.trailerType}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({trailerType: itemValue})
                            }>
                            <Picker.Item label="Trailer Length" value="" />
                            <Picker.Item label="20ft" value="20ft" />
                            <Picker.Item label="40ft" value="40ft" />
                        </Picker>
                    </View>

                    <Text style={styles.labels}>Goods Description</Text>
                    <TextInput
                        multiline={true}
                        style={styles.textInput}
                        placeholder='Describe goods'
                        onChangeText={(goodsDescription)=> this.setState({goodsDescription})}
                    />
                </View>

                <View style={styles.formContainer2}>
                    <Text style={styles.labels}>Weight(Tonnes)</Text>
                    <TextInput
                        style={styles.textInput}
                        keyboardType='number-pad'
                        placeholder='Weight of goods'
                        onChangeText={(weight)=> this.setState({weight})}
                    />

                    <Text style={styles.labels}>Accessories</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Example: pallets or tampoline'
                        onChangeText={(accessories)=> this.setState({accessories})}
                    />

                    <Text style={styles.labels}>Loading Time</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder='mm/dd/yyyy hh:mm'
                        onChangeText={(pickUpTime) => this._toTimestamp(pickUpTime, 'pickUpTime')}
                    />
                    <Text style={styles.labels}>Drop-Off Time</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder='mm/dd/yyyy hh:mm'
                        onChangeText={(dropOffTime) => this._toTimestamp(dropOffTime, 'dropOffTime')}
                    />
                </View>
                <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.userButton}
                            onPress={this._addJobEvent.bind(this, this.state)}
                        >
                            <Text style={styles.buttonText}>Add Job</Text>
                        </TouchableOpacity>
                    </View>
            </ScrollView>
        )
    }
}
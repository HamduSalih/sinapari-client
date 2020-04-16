import React, { Component } from 'react';
import { AsyncStorage, Text, ScrollView, 
        TextInput,
        TouchableOpacity,
        KeyboardAvoidingView,
        Platform} from 'react-native';
import { View } from 'native-base';
import styles from './scrollContainerStyles'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import * as Random from 'expo-random';
import { Actions } from 'react-native-router-flux';

class ScrollContainer extends Component{
    state={
        buttonText: 'Start Job'
    };

    componentDidMount(){
        if(this.props.bidDetails[0].status == 'pending'){
            this.setState({buttonText: 'Accept'});
        }else if(this.props.bidDetails[0].status == 'accepted' && this.props.bidDetails[0].tripStatus !== 'live' && this.props.bidDetails[0].tripStatus !== 'completed'){
            this.setState({buttonText: 'Cancel Job'});
        }else if(this.props.bidDetails[0].status == 'accepted' && this.props.bidDetails[0].tripStatus == 'live' && this.props.bidDetails[0].tripStatus !== 'completed'){
            this.setState({buttonText: 'Job is Live'});
        }else if(this.props.bidDetails[0].tripStatus == 'completed'){
            this.setState({buttonText: 'Confirm Completion'});
        }else if(this.props.bidDetails[0].ownerStatus == 'completed'){
            this.setState({buttonText: 'Job Completed'});
        }
    }

    componentWillReceiveProps(nextProps){
       /**
        *  if(nextProps.bidDetails[0].tripStatus !== 'live'){
            this.setState({buttonText: 'Start Job'});
        }else if(nextProps.bidDetails[0].tripStatus == 'live'){
            this.setState({buttonText: 'Complete Trip'});
        }
        */
    }

    onPressEvent = () => {
        if(this.state.buttonText == 'Accept'){
            this.props.updateBidTripStatus(this.props.bidDetails[0], 'accepted'),
            this.setState({buttonText: 'Cancel Job'})
        }else if(this.state.buttonText == 'Cancel Job'){
            this.props.updateBidTripStatus(this.props.bidDetails[0], 'canceled'),
            this.setState({buttonText: 'Canceled'})
        }else if(this.state.buttonText == 'Confirm Completion'){
            this.props.updateBidTripStatus(this.props.bidDetails[0], 'completed'),
            this.setState({buttonText: 'Job Completed'})
        }
    }

    componentDidUpdate(){
        //console.log(this.state);
    }

    _navigate = () => {
        
    }

    render(){
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var bidDetails = this.props.bidDetails[0]
        return(
            <View
              style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollStyle}>
                    <View style={styles.payoutView}>
                        <View style={styles.payoutViewViews, {borderRightWidth: 1, borderRightColor: 'grey', paddingRight: 40}}>
                            <Text>Payout</Text>
                            <Text style={{fontSize: 20}}>GHS {bidDetails.amount}</Text>
                        </View>
                        <View style={styles.payoutViewViews}>
                            <Text>Driver Id</Text>
                            <Text style={{fontSize: 20}}>{bidDetails.driverId}</Text>
                        </View>
                    </View>
                    <View style={styles.standAloneViews}>
                        <Text>Driver Number: {bidDetails.phone_number}</Text>
                    </View>

                    <View style={styles.standAloneViews, {alignItems: 'center', marginTop: 40}}>
                        <Text
                            style={{
                                width: '50%',
                                textAlign: 'center',
                                textTransform: 'uppercase',
                                borderColor: '#141d48',
                                borderRadius: 10,
                                borderWidth: 1
                            }}
                        >
                            Job Summary</Text>
                    </View>

                    <View
                        style={{
                            padding: 10
                        }}
                    >
                        <View style = {styles.locView}>
                            <FontAwesome style={styles.locIcon} size={20} name='dot-circle-o'/>
                            <Text style={styles.locText}>{bidDetails.pickUpAddress.address}</Text>
                        </View>
                        <View style={styles.locView}>
                          <View style={{ 
                            height:35,
                            borderLeftWidth:2, 
                            marginLeft:7}}/>
                          <Text style={styles.dateStyle}>{new Date(bidDetails.pickUpAddress.time * 1000).getDate() + ' ' + months[new Date(bidDetails.pickUpAddress.time * 1000).getMonth()] + ' ' + new Date(bidDetails.pickUpAddress.time * 1000).getFullYear() + ', ' + new Date(bidDetails.pickUpAddress.time * 1000).getHours()}</Text>
                        </View>
                        <View style={styles.locView}>
                            <Entypo style={styles.locIcon} size={17} name='circle'/>
                            <Text>{bidDetails.dropOffAddress.address}</Text> 
                        </View>
                        <View style={styles.locView}>
                            <View style={{
                            marginLeft:7}}/>
                            <Text style={styles.dateStyle}>{new Date(bidDetails.dropOffAddress.time * 1000).getDate() + ' ' + months[new Date(bidDetails.dropOffAddress.time * 1000).getMonth()] + ' ' + new Date(bidDetails.dropOffAddress.time * 1000).getFullYear() + ', ' + new Date(bidDetails.dropOffAddress.time * 1000).getHours()}</Text>
                        </View>
                    </View>
                </ScrollView>
                <View style={{
                    borderColor: 'grey',
                    borderTopWidth: 1,
                    padding: 10,
                    alignItems: 'center',
                    backgroundColor: 'white',
                }}>
                    <TouchableOpacity style={{
                        width: '90%',
                        backgroundColor: '#141d48',
                        borderRadius: 50
                    }}
                        onPress={ this.onPressEvent }
                    >
                        <Text style={{
                            color: 'white',
                            textAlign: 'center',
                            padding: 7,
                            fontSize: 17
                        }}>{this.state.buttonText}</Text>
                    </TouchableOpacity>
                </View>                 
            </View>
        )
    }
}
export default ScrollContainer;
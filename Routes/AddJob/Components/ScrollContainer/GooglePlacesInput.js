import React from 'react'
import { Image, Text, View } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import styles from './PlacesInputStyles'

const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};

const GooglePlacesInput = ({getSelectedAddress,getInputType}) => {
    function handleGetSelectedAddress(placeID, resType){
        getSelectedAddress(placeID, resType);
    }
    function handleInputType(theInput){
        getInputType(theInput);
    }
    return(
        <View>
            <View style={styles.inputField}>
                <GooglePlacesAutocomplete
                    placeholder='Loading Point'
                    minLength={2} // minimum length of text to search
                    autoFocus={false}
                    returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                    keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
                    listViewDisplayed={false}    // true/false/undefined
                    fetchDetails={true}
                    renderDescription={row => row.description} // custom description render
                    onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                        //console.log(data, details);
                        handleInputType('loadPoint'),
                        handleGetSelectedAddress({
                            name:data.structured_formatting.main_text,
                            address:data.description,
                            placeID:data.place_id,
                            latitude:details.geometry.location.lat,
                            longitude:details.geometry.location.lng
                        }, 'loadPoint');
                    }}

                    query={{
                        // available options: https://developers.google.com/places/web-service/autocomplete
                        key: 'AIzaSyCspx_yMJwX4bTjLXTUHebo9TwYxTaLa6E',
                        language: 'en', // language of the results
                    }}

                    styles={{
                        textInputContainer: {
                            backgroundColor: 'rgba(0,0,0,0)',
                            borderWidth: 2,
                            borderRadius: 5,
                            borderColor: '#141d48',
                            width: '100%'
                        },
                        description: {
                        fontWeight: 'bold'
                        },
                        predefinedPlacesDescription: {
                        color: '#1faadb'
                        },
                    }}

                    nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                    debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                    //renderLeftButton={()  => <Image source={require('path/custom/left-icon')} />}
                    //renderRightButton={() => <Text>Custom text after the input</Text>}
                />
            </View>
            <View style={styles.inputField}>
                <GooglePlacesAutocomplete
                    placeholder='Drop Off'
                    minLength={2} // minimum length of text to search
                    autoFocus={false}
                    returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                    keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
                    listViewDisplayed={false}    // true/false/undefined
                    fetchDetails={true}
                    renderDescription={row => row.description} // custom description render
                    onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                    handleGetSelectedAddress({
                        name:data.structured_formatting.main_text,
                        address:data.description,
                        placeID:data.place_id,
                        latitude:details.geometry.location.lat,
                        longitude:details.geometry.location.lng
                    }, 'dropPoint');
                    handleInputType('dropPoint');
                    }}

                    query={{
                        // available options: https://developers.google.com/places/web-service/autocomplete
                        key: 'AIzaSyCspx_yMJwX4bTjLXTUHebo9TwYxTaLa6E',
                        language: 'en', // language of the results
                    }}

                    styles={{
                        textInputContainer: {
                            backgroundColor: 'rgba(0,0,0,0)',
                            borderWidth: 2,
                            borderRadius: 5,
                            borderColor: '#141d48',
                            width: '100%'
                        },
                        description: {
                        fontWeight: 'bold'
                        },
                        predefinedPlacesDescription: {
                        color: '#1faadb'
                        },
                    }}

                    nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                    debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                    //renderLeftButton={()  => <Image source={require('path/custom/left-icon')} />}
                    //renderRightButton={() => <Text>Custom text after the input</Text>}
                />
            </View>
        </View>
    )
}

export default GooglePlacesInput
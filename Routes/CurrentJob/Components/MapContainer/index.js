import React from "react";
import { View } from "native-base";
import MapView from "react-native-maps";
import styles from "./MapContainerStyles.js";
import MapViewDirections from 'react-native-maps-directions';

const markerImage = require('../../../../assets/img/marker.png')

export const MapContainer = ({
		region,
		bidDetails
	})=>{
		

		const origin = {
			latitude: bidDetails.pickUpAddress.lat,
			longitude: bidDetails.pickUpAddress.long,
			latitudeDelta: 0.9,
		 	longitudeDelta: 0.9};
		const destination = {
			latitude: bidDetails.dropOffAddress.lat,
			longitude: bidDetails.dropOffAddress.long,
			latitudeDelta: 0.9,
			longitudeDelta: 0.9};
			 
		const pickUpOrigin = region
		const pickUpDestination = origin
		const GOOGLE_MAPS_APIKEY = 'AIzaSyCspx_yMJwX4bTjLXTUHebo9TwYxTaLa6E';


		return(
			<MapView
				provider={MapView.PROVIDER_GOOGLE}
				style={styles.map}
				region={region}
			>
				<MapViewDirections 
						origin={origin}
						destination={destination}
						apikey={GOOGLE_MAPS_APIKEY}
						strokeWidth={3}
						strokeColor={'green'}
				/>
				<MapView.Marker
					coordinate={{latitude:region.latitude, longitude:region.longitude}}
					image={markerImage}
				/>
			</MapView>
	)
}

export default MapContainer;
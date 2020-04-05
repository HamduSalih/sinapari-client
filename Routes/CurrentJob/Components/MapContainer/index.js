import React from "react";
import { View } from "native-base";
import MapView from "react-native-maps";
import styles from "./MapContainerStyles.js";
import MapViewDirections from 'react-native-maps-directions';

const markerImage = require('../../../../assets/img/marker.png')

export const MapContainer = ({
		region,
	})=>{
		

		const origin = {
			latitude: 5.6604616,
			longitude: -0.0077599,
			latitudeDelta: 0.9,
		 	longitudeDelta: 0.9};
		const destination = {
			latitude: 5.6060955, 
			longitude: -0.1681235,
			latitudeDelta: 0.045,
			longitudeDelta: 0.045};
			 
		const pickUpOrigin = region
		const pickUpDestination = origin
		const GOOGLE_MAPS_APIKEY = 'AIzaSyCspx_yMJwX4bTjLXTUHebo9TwYxTaLa6E';


		return(
			<MapView
				provider={MapView.PROVIDER_GOOGLE}
				style={styles.map}
				region={region}
			>
				<MapView.Marker
					coordinate={{latitude:region.latitude, longitude:region.longitude}}
					image={markerImage}
				/>
			</MapView>
	)
}

export default MapContainer;
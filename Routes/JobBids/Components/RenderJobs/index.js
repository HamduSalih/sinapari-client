import React from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Card } from 'react-native-elements';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import { Actions } from 'react-native-router-flux';
import StarRating from 'react-native-star-rating'

const RenderJobs = ({jobBids}) => {
  

  var DATA = jobBids //pass allJobs array to data variable 
  //to be used to render all jobs with cards
  
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  
  function _navigate(param){
    Actions.currentJob({bidDetails: jobBids});
  }

  function Item({ title }) {
    const rating = title.rating
    return (
      <Card>
        <TouchableOpacity
          onPress={_navigate.bind(this, title)}
        >
          <View style={styles.itemView}>
            <Text style={styles.itemText}>Driver Name: {title.driverName}</Text>
          </View>
          <View style={styles.itemView}>
            <Text style={styles.itemText}>Amount: GHS {title.amount}</Text>
          </View>
          <View style={styles.itemView}>
            <Text style={styles.itemText}>Truck No.: {title.truck_number}</Text>
          </View>
          <View style={styles.itemView}>
            <Text style={styles.itemText}>Job Id: {title.jobId}</Text>
          </View>
        </TouchableOpacity>
    </Card>
          );
  }

  
    return(
      <SafeAreaView style={styles.container}>
        <View style={{paddingTop:10, paddingHorizontal:15}}>
          <Text style={styles.headerText}>
            Jobs Posted
          </Text>
        </View>
        <FlatList 
          data={DATA}
          renderItem={({item})=>
            <Item title={item}/>
          }
        />
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText:{
    fontSize: 18,
    borderWidth: 1,
    padding: 5,
    borderColor: 'grey',
    width: '50%'
  },
  itemView:{
    paddingVertical: 10
  },
  itemText:{
    fontSize: 15
  }
});

export default RenderJobs;
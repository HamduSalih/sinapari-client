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
    Actions.driverjobdetails({jobDetails: param});
  }

  function Item({ title }) {
    const rating = title.rating
    return (
      <Card>
        <TouchableOpacity
          onPress={_navigate.bind(this, title)}
        >
          <View>
            <Text>Driver Name: {title.driverName}</Text>
            <Text>Amount: GHS{title.amount}</Text>
          </View>
          <View>
            <Text>Truck No.: {title.truck_number}</Text>
          </View>
          <View>
          <StarRating
            starSize={20}
            disabled={true}
            maxStars={5}
            rating={parseInt(rating)}
            starColor='#141d48'
          />
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
  scrollView: {
  },
  text: {
    fontSize: 42,
  },
  locView: {
    flexDirection: 'row',
  },
  locIcon: {
    marginRight: 10,
  },
  locText: {
    fontWeight: 'bold'
  },
  headerText:{
    fontSize: 18,
    borderWidth: 1,
    padding: 5,
    borderColor: 'grey',
    width: '50%'
  },
  dateStyle:{
    fontSize: 12,
    marginLeft: 18,
    fontWeight: '100'
  }
});

export default RenderJobs;
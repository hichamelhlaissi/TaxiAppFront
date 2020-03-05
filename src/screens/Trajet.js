import React, { Component } from 'react';
import { View } from 'react-native';
import { Image, Text , StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


const homePlace = { description: 'Home', geometry: { location: { lat: 34.066645, lng: -6.762011 } }};
const workPlace = { description: 'Work', geometry: { location: { lat: 34.076353, lng: -6.754076 } }};
const mylocation = { description: 'MyLocation', geometry: { location: {} }};
export default class Trajet extends Component{

    constructor(props){
        super(props);
        this.state={
          homePlace,
          workPlace,
          mylocation
        }
        
        if(props.departinfo){
         this.state.mylocation.geometry.location=props.departinfo
        }

    }
    

    render(){ 
return(
        <View style={styles.container}>
        <GooglePlacesAutocomplete
  placeholder='From :'
  minLength={2} // minimum length of text to search
  // autoFocus={true}
  returnKeyType={'search'} // Can be left out for default return key 
  listViewDisplayed={false}    // true/false/undefined
  fetchDetails={true}
  onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
       this.props.handledepart(details.geometry.location);
      // console.log(data.place_id);
      // console.log(details.geometry.location);
  }}
  getDefaultValue={() => mylocation.description} 
  query={{
      key: 'AIzaSyCoIzI4JvkT0MjvaBXH-OSt6d6pYuU1dMg',
      language: 'fr',
      components:'country:mar'
  }}
  styles={{
      container: { width: '100%' , zIndex:1},
      listView:{
        position:'absolute',
        zIndex:1000,
        backgroundColor: '#FFF',
        zIndex: 10,
        elevation: 1,
        marginTop:95
      },
      textInputContainer: {
          backgroundColor: 'rgba(0,0,0,0)',
          borderTopWidth: 0,
          borderBottomWidth:0
        },
        textInput: {
          marginLeft: 5,
          marginRight: 5,
          height: 38,
          color: '#5d5d5d', 
          fontSize: 16
        },
      description: {
        fontWeight: 'bold'
      },
      predefinedPlacesDescription: {
        color: '#1faadb'
      }
    }}
  nearbyPlacesAPI='GooglePlacesSearch'
  debounce={300}
  predefinedPlaces={[this.state.mylocation,this.state.homePlace, this.state.workPlace]} 
 
  // predefinedPlacesAlwaysVisible={true}
  /><GooglePlacesAutocomplete
  placeholder='To :'
  minLength={2} // minimum length of text to search
  // autoFocus={true}
  returnKeyType={'search'} // Can be left out for default return key 
  listViewDisplayed={false}    // true/false/undefined
  fetchDetails={true}
  onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
      // props.notifyChange(details.geometry.location);
      // console.log(data.place_id);
      console.log(details.description)  
      this.props.handledestination(details.geometry.location); 
  }}
  query={{
      key: 'AIzaSyCoIzI4JvkT0MjvaBXH-OSt6d6pYuU1dMg',
      language: 'fr',
      components:'country:mar'
  }}
  styles={{
      container: { width: '100%' , zIndex:1},
      listView:{
        position:'absolute',
        zIndex:1000,
        backgroundColor: '#FFF',
        zIndex: 10,
        marginTop:50
      },
      textInputContainer: {
          backgroundColor: 'rgba(0,0,0,0)',
          borderTopWidth: 0,
          borderBottomWidth:0
        },
        textInput: {
          marginLeft: 5,
          marginRight: 5,
          height: 38,
          color: '#5d5d5d',
          fontSize: 16
        },
      description: {
        fontWeight: 'bold'
      },
      predefinedPlacesDescription: {
        color: '#1faadb'
      }
    }}
  nearbyPlacesAPI='GooglePlacesSearch'
  debounce={300}
  predefinedPlaces={[this.state.homePlace, this.state.workPlace]}
  /> 
        </View>
        
        )
    }
}
const styles = StyleSheet.create({
    container: {
        height:90,
       
    }
});
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout, Circle } from 'react-native-maps';

export default class Start_Destination extends Component  {

     UserLocation;
     TaxiDriver;
    constructor(props){
    super(props);
    const {state} = props.navigation;
    this.UserLocation ={
        latitude: state.params.UserLatitude,
        longitude: state.params.UserLongitude,
    }; 
    this.TaxiDriver = {
        latitude: state.params.TaxiLatitude,
        longitude: state.params.TaxiLongitude,
        latitudeDelta: 0.09,
        longitudeDelta: 0.035
    };
    console.log(this.TaxiDriver)
    }
    
    // console.log('TaxiDriver');
    // console.log(TaxiDriver);
    
     confirmorder(ee){
      console.log(ee)
     }
   

render(){
    return (
        <View style={styles.container}>
            <MapView style={styles.mapStyle}
                    initialRegion={this.TaxiDriver}
            >

                <Marker

                    coordinate={this.TaxiDriver}
                >
                    <Callout>
                        <Text>Taxi Driver </Text>
 
                    </Callout>
                </Marker>

                <Marker
                    draggable
                    coordinate={UserLocation}
                    onDragEnd={(e) => {this.confirmorder( e.nativeEvent.coordinate)}} 
                 // onDragEnd={(e) => this.setState({ dragEnd: e.nativeEvent.coordinate })}

                >
                    <Callout>
                        <Text>user </Text>

                    </Callout>
                </Marker>
            </MapView>

        </View>
    );
}
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapStyle: {
        width: '99%',
        height: '100%',
    },
});

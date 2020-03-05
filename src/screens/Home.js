import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet, Image , Alert, Dimensions, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapView, { PROVIDER_GOOGLE, Marker, Callout, Polygon, Circle } from 'react-native-maps';


import { Linking } from 'expo';
import {AppState} from 'react-native';
import * as IntentLauncher from 'expo-intent-launcher';
import { Button , Spinner} from 'native-base';
import Trajet from './Trajet';
import Carouseltaxis from './Carouseltaxis';

import * as service from '../service';

// const AppNavigator = createStackNavigator(
//     {

//         Start_Destination: Start_Destination
//     },
// );
export default class Home extends Component  { 

    state = {
        locationpermission :false,
        departinfo:{},
        destinationinfo:{},
        location: null,
        errorMessage: null,
        markers: [],
        appState: AppState.currentState,
        coordinates: [
            { name: 'Hamid', latitude: 34.066645, longitude: -6.762011, image: require('../../assets/Images/image.jpg') },
            { name: 'Rachel', latitude: 34.076353, longitude: -6.754076, image: require('../../assets/Images/image.jpg') },
            { name: 'HASHIM', latitude: 34.077499, longitude: -6.759966, image: require('../../assets/Images/image.jpg') },
            { name: 'Fared', latitude: 34.062096, longitude: -6.772277, image: require('../../assets/Images/image.jpg') },
            { name: 'Saber', latitude: 34.056736, longitude: -6.771318, image: require('../../assets/Images/image.jpg') },
        ]
    };



    // componentWillMount() {
    //     if (Platform.OS === 'android' && !Constants.isDevice) {
    //         this.setState({
    //             errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
    //         });
    //     } else {
    //         this._getLocationAsync().then(r =>this._getLocationAsync() );
    //     }
    // }
    constructor(props) {
        super(props);
        // N’appelez pas `this.setState()` ici !
        if (Platform.OS === 'android' && !Constants.isDevice || Platform.OS === 'ios' && !Constants.isDevice) {
            this.setState({
                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
        } else {
            this._getLocationAsync();     
        }
        Location.hasServicesEnabledAsync().then(
            data=>{
                console.log(data)
            }      
        )
      }
      componentDidUpdate(prevrops , prevState){
          if(prevState.departinfo !==  this.state.departinfo){
            this._map.animateToRegion({
                latitude: this.state.departinfo.lat,
                longitude: this.state.departinfo.lng,
                latitudeDelta: 0.09,
                longitudeDelta: 0.035
            });
          }
          if(Object.keys(this.state.destinationinfo).length   != 0 && prevState.destinationinfo && prevState.destinationinfo !==  this.state.destinationinfo){
            this._map.animateToRegion({ 
                latitude: this.state.destinationinfo.lat,
                longitude: this.state.destinationinfo.lng,
                latitudeDelta: 0.09,
                longitudeDelta: 0.035
            });
          }
          if( this.state.departinfo == this.state.destinationinfo){
            this.problem();
          }
      }
      problem=()=>{
        Alert.alert("l'adresse de destination ne peut pas être la même que l'adresse de départ ", " tu dois la changer", [
            { 
              text: 'OK',
              onPress: () => this.setState({destinationinfo:{}}),
              style: 'OK',
            }
          ]);
      }
      notifydepart=(depart)=>{
        if(depart){
            this.setState({departinfo:depart})
        }
      }
      notifydestination=(destination)=>{
        if(destination){
            this.setState({destinationinfo:destination})
        }
      }
      departmarker=()=>{
        if(Object.keys(this.state.departinfo).length   != 0){
            return (
                <Marker
                        pinColor={'rgba(38, 114, 227, 1)'}
                        coordinate={{latitude: this.state.departinfo.lat, longitude: this.state.departinfo.lng}}
                    >
                        <Callout>
                            <Text>FROM</Text>
                        </Callout>
                </Marker>
            )
        }
       }
       destinationmarker=()=>{
        if(Object.keys(this.state.destinationinfo).length   != 0){
            return (
                <Marker
                        pinColor={'rgba(227, 211, 38, 1)'}
                        coordinate={{latitude: this.state.destinationinfo.lat, longitude: this.state.destinationinfo.lng}}
                    >
                        <Callout>
                            <Text>Destination</Text>
                        </Callout>
                </Marker>
            )
        }
       }
  
      componentDidMount() {
        AppState.addEventListener('change', this._handleAppStateChange);
      }
      componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
      }
    _handleAppStateChange = (nextAppState) => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            this._getLocationAsync();
        }
        this.setState({appState: nextAppState});
      }
     
    // _getLocationAsync =  () => { 
    //     // let { status } = await Permissions.askAsync(Permissions.LOCATION);
    //     Location.getPermissionsAsync(Permissions.LOCATION).then(data=>{
    //         console.log(data.status)
    //         if(data.status == 'granted'){ 
    //             Location.getCurrentPositionAsync({}).then(
    //                 data=>{
    //              this.setState({location: data });
    //              let initialPosition = {
    //                  latitude: data.coords.latitude,
    //                  longitude: data.coords.longitude,  
    //                  latitudeDelta: 0.09,
    //                  longitudeDelta: 0.035
    //              };

    //              this.setState({ initialPosition,
    //                              locationpermission:true,
    //                              departinfo:{
    //                                 lat: data.coords.latitude,
    //                                 lng: data.coords.longitude,  
    //                              }});
    //                 }
    //             )
    //         }else{
    //         this.setState({
    //             errorMessage: 'Permission to access location was denied',
    //         });
    //             this.requestlocation();   
    //         }
    //     }) 
    // };
    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.requestlocation();
        }

        let location = await Location.getCurrentPositionAsync({});
        this.setState({ location });

        let initialPosition = { 
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.09,
            longitudeDelta: 0.035,
        };
        this.setState({ 
            initialPosition,
            locationpermission:true, 
            departinfo:{
                lat: location.coords.latitude,
                lng: location.coords.longitude,  
             } });


    };
    requestlocation =()=>{ 
        Alert.alert("alert Message", "Allow Location", [
            { 
              text: 'Open Settings',
              onPress: () => this.goToSettings(),
              style: 'cancel',
            }, 
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
          ]);
    
    }
    goToSettings = () => {
        if (Platform.OS == 'ios') {
          // Linking for iOS
          Linking.openURL('app-settings:')
 
        } else {
        //   IntentLauncher for Android
          IntentLauncher.startActivityAsync(
            IntentLauncher.ACTION_MANAGE_ALL_APPLICATIONS_SETTINGS
          );
        }   
    };
    searchinterface=()=>{
     if(this.state.locationpermission){
        return(<View style={styles.search}>
            <Trajet 
            departinfo={this.state.departinfo}
            handledepart={this.notifydepart} 
            handledestination={this.notifydestination}>
            </Trajet>
            </View>) 
     }else{
         return(
            <View style={styles.search}>
            <Spinner color='black' /> 
            </View>
         )
     }
    }
    onCarouselItemChange = (index) => {
        let location = this.state.coordinates[index];

        this._map.animateToRegion({
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.09,
            longitudeDelta: 0.035
        });

        this.state.markers[index].showCallout()
    };

    onMarkerPressed = (location, index) => {
        this._map.animateToRegion({
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.09,
            longitudeDelta: 0.035
        });

        this._carousel.snapToItem(index);
    };

    taxichose(){
        this.props.navigation.navigate('Choosetaxi', {
            localisation:this.state.departinfo.lat+","+this.state.departinfo.lng,
            departinfo:this.state.departinfo,
            destinationinfo:this.state.destinationinfo
          });
    }
    // 'charset' => 'utf8',
    //         'collation' => 'utf8_unicode_ci',
    confirmOrder=(Info)=>{
        // this.props.navigation.navigate('Choosetaxi', {
        //     localisation:this.state.departinfo.lat+","+this.state.departinfo.lng
        //   });
        console.log(Info);
    }
//    renderCarouselItem = ({ item }) =>
//         <View style={styles.cardContainer}>
//             <Text style={styles.cardTitle}>{item.name}</Text>
//             <Image style={styles.cardImage} source={item.image} />
//             <TouchableOpacity onPress={() =>  this.props.navigation.navigate('Start_Destination', item)}>
//                 <Text>{item.name}</Text>
//             </TouchableOpacity>
//         </View>;
    displaycarosery=()=>{  
        if(Object.keys(this.state.departinfo).length  != 0 && Object.keys(this.state.destinationinfo).length   != 0){
         return(
             <>
                <Carouseltaxis
                        confirmOrder={this.confirmOrder} 
                        containerCustomStyle={styles.carousel}
                        departinfo={this.state.departinfo}
                        destinationinfo={this.state.destinationinfo}>
                </Carouseltaxis>
                <View style={styles.choosetaxi}>
                <Button onPress={()=>{this.taxichose()}} block  light>
                   <Text >List Taxis</Text>
                </Button>
                </View>
                </>
            )   
        }else{
            return 
        }
    
    }
    render() {

        let lat1 = JSON.stringify(this.state.initialPosition);
        let LatLng = {
            latitude: 1,
            longitude: 1,
        };
        if(lat1 !== undefined){
             LatLng = {
                latitude: this.state.initialPosition.latitude,
                longitude: this.state.initialPosition.longitude
            };
            console.log(this.state.initialPosition.latitude)
        }


        let text = 'Waiting...';
        if (this.state.errorMessage) {
            text = this.state.errorMessage;
        } else if (this.state.location) {
            text = JSON.stringify(this.state.location);
        }

        return (
            <View style={styles.container}> 
                <MapView style={styles.map}
                         provider={PROVIDER_GOOGLE}
                         ref={map => this._map = map}
                         showsUserLocation={true}
                         initialRegion={this.state.initialPosition}
                >
                    <MapView.Circle
                        center={LatLng}
                        radius={2000}
                        fillColor={'rgba(255,157,245,0.5)'}
                    />

                    {/* {
                        this.state.coordinates.map((marker, index) => (
                            <Marker
                                key={marker.name}
                                ref={ref => this.state.markers[index] = ref}
                                onPress={() => this.onMarkerPressed(marker, index)}
                                coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                               // icon={require('../../assets/Images/taxi.png')}
                            >
                                <Callout>
                                    <Text>{marker.name}</Text>
                                </Callout>
                            </Marker>
                        ))
                    } */}
                    
                    {this.departmarker()}
                    {this.destinationmarker()}
                </MapView>
                {/* <Carousel
                    ref={(c) => { this._carousel = c; }}
                    data={this.state.coordinates}
                    containerCustomStyle={styles.carousel}
                    renderItem={this.renderCarouselItem}
                    sliderWidth={Dimensions.get('window').width}
                    itemWidth={300}
                    removeClippedSubviews={false}
                    onSnapToItem={(index) => this.onCarouselItemChange(index)}
                /> */}
                {/* search     */}
                {this.searchinterface()}
                {/* search     */}

                {/* liste des Taxi     */}
                {this.displaycarosery()}
                {/* liste des Taxi     */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        textAlign: 'center',
    },
    textStyle: {
        width: 100,
        height: 1000,
    },
    carousel: {
        position: 'absolute',
        bottom: 0,
        marginBottom: 48
    },
    cardContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        height: 200,
        width: 300,
        padding: 24,
        borderRadius: 24
    },
    cardImage: {
        height: 120,
        width: 300,
        bottom: 0,
        position: 'absolute',
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24
    },
    cardTitle: {
        color: 'white',
        fontSize: 22,
        alignSelf: 'center'
    },
    choosetaxi:{ 
        position: 'absolute',
        bottom: 0, 
        alignSelf: 'flex-end',
        width:'100%'
    },
    search:{
        position: 'absolute',
        top: 0,
        width:'100%'
    }
});

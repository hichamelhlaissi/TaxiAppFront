import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet, Image , Alert, Dimensions, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapView, { PROVIDER_GOOGLE, Marker, Callout, Polygon, Circle } from 'react-native-maps';
import Carousel from 'react-native-snap-carousel';
// import { createStackNavigator } from 'react-navigation-stack';
// import Start_Destination from "../screens/Start_Destination";
// import { MaterialIcons} from '@expo/vector-icons';

import { Linking } from 'expo';
import {AppState} from 'react-native';
import * as IntentLauncher from 'expo-intent-launcher';

// const AppNavigator = createStackNavigator(
//     {

//         Start_Destination: Start_Destination
//     },
// );
export default class Home extends Component  {

    state = {
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



   /*  componentWillMount() {
         if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
        } else {
          this._getLocationAsync().then(r =>this._getLocationAsync() );
        }
     }*/
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
      };

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

    };
    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            // this.setState({
            //     errorMessage: 'Permission to access location was denied',
            // });
            this.requestlocation();
        }

        let location = await Location.getCurrentPositionAsync({});
        this.setState({ location });

        let initialPosition = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.09,
            longitudeDelta: 0.035
        };
        this.setState({ initialPosition });


    };
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
    renderCarouselItem;

    render() {

        let lat1 = JSON.stringify(this.state.initialPosition);
        let LatLng = {
            latitude: 1,
            longitude: 1,
        };
        let LatLng1 = {
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

        this.renderCarouselItem = ({ item,  LatLng1}) =>
            <View style={styles.cardContainer}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Image style={styles.cardImage} source={item.image} />
                <TouchableOpacity onPress={() =>
                    this.props.navigation.navigate('Start_Destination', {
                        UserLatitude : this.state.initialPosition.latitude,
                        UserLongitude : this.state.initialPosition.longitude,
                        TaxiLatitude : item.latitude,
                        TaxiLongitude : item.longitude,
                    })}>
                    <Text>{item.name}</Text>
                </TouchableOpacity>
            </View>;


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

                    {
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
                    }
                </MapView>
                <Carousel
                    ref={(c) => { this._carousel = c; }}
                    data={this.state.coordinates}
                    containerCustomStyle={styles.carousel}
                    renderItem={this.renderCarouselItem}
                    sliderWidth={Dimensions.get('window').width}
                    itemWidth={300}
                    removeClippedSubviews={false}
                    onSnapToItem={(index) => this.onCarouselItemChange(index)}
                />
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
    }
});

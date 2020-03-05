import React, { Component } from 'react';
import {Platform, Text, View, StyleSheet, Image, Alert, Dimensions, TouchableOpacity, Button} from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapView, { PROVIDER_GOOGLE, Marker, Callout, Polygon, Circle } from 'react-native-maps';
import Carousel from 'react-native-snap-carousel';
import { Linking } from 'expo';
import {AppState} from 'react-native';
import * as IntentLauncher from 'expo-intent-launcher';

export default class Home extends Component  {

    state = {
        location: null,
        errorMessage: null,
        appState: AppState.currentState,
        LatLng: null,
        markers: [],
        coordinates: [
            { name: 'Hamid', latitude: 34.066645, longitude: -6.762011, image: require('../../assets/Images/image.jpg') },
            { name: 'Rachel', latitude: 34.076353, longitude: -6.754076, image: require('../../assets/Images/image.jpg') },
            { name: 'HASHIM', latitude: 34.077499, longitude: -6.759966, image: require('../../assets/Images/image.jpg') },
            { name: 'Fared', latitude: 34.062096, longitude: -6.772277, image: require('../../assets/Images/image.jpg') },
            { name: 'Saber', latitude: 34.056736, longitude: -6.771318, image: require('../../assets/Images/image.jpg') },

        ]
    };

    constructor(props) {
        super(props);
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
    _getLocationAsync =  () => {
        // let { status } = await Permissions.askAsync(Permissions.LOCATION);
        Location.getPermissionsAsync().then(data=>{
            if(data.status == 'granted'){
                Location.getCurrentPositionAsync({}).then(
                    data=>{
                        this.setState({location: data });
                        let initialPosition = {
                            latitude: data.coords.latitude,
                            longitude: data.coords.longitude,
                            latitudeDelta: 0.09,
                            longitudeDelta: 0.035
                        };

                        this.setState({ initialPosition,
                            locationpermission:true,
                            departinfo:{
                                lat: data.coords.latitude,
                                lng: data.coords.longitude,
                            }});
                    }
                )
            }else{
                this.setState({
                    errorMessage: 'Permission to access location was denied',
                });
                this.requestlocation();
            }
        })
    };
    onCarouselItemChange = (index) => {
        let locationMarker = this.state.coordinates[index];

        this._map.animateToRegion({
            latitude: locationMarker.latitude,
            longitude: locationMarker.longitude,
            latitudeDelta: 0.09,
            longitudeDelta: 0.035
        });

        this.state.markers[index].showCallout()
    };

    onMarkerPressed = (locationMarker, index) => {
        this._map.animateToRegion({
            latitude: locationMarker.latitude,
            longitude: locationMarker.longitude,
            latitudeDelta: 0.09,
            longitudeDelta: 0.035
        });

        this._carousel.snapToItem(index);
    };
    renderCarouselItem;

    UpdateStart =(ee) => {
        this.setState({ ee });
        let AfterChanged = ee;
        let CoordsValues ={
            latitude: AfterChanged.latitude,
            longitude: AfterChanged.longitude,
        };
        this.setState({ CoordsValues });
    };

    SetDestination =(ee) => {
        this.setState({ ee });
        let AfterChanged = ee;
        let CoordsValues ={
            latitude: AfterChanged.latitude,
            longitude: AfterChanged.longitude,
        };
        this.setState({ CoordsValues });
    };

    render() {
        let lat1 = JSON.stringify(this.state.initialPosition);
         this.LatLng = {
            latitude: 1,
            longitude: 1,
        };
        if(lat1 !== undefined){
            this.LatLng = {
                latitude: this.state.initialPosition.latitude,
                longitude: this.state.initialPosition.longitude
            };
        }



        let text = 'Waiting...';
        if (this.state.errorMessage) {
            text = this.state.errorMessage;
        } else if (this.state.location) {
            text = JSON.stringify(this.state.location);
        }

        this.renderCarouselItem = ({item}) =>
            <View style={styles.cardContainer}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Image style={styles.cardImage} source={item.image} />
                <Button title={'Go Order'} onPress={() =>
                    this.props.navigation.navigate('Order_Summary')}>
                </Button>
            </View>;

        return (
            <View style={styles.container}>
                <MapView style={styles.map}
                         ref={map => this._map = map}
                         provider={PROVIDER_GOOGLE}
                         showsUserLocation={true}
                         initialRegion={this.state.initialPosition}
                >
                    <MapView.Circle
                        center={this.LatLng}
                        radius={2000}
                        fillColor={'rgba(255,157,245,0.5)'}
                    />

                    <Marker
                        pinColor={'rgba(124,7,255,0.5)'}
                        coordinate={this.LatLng}
                        draggable
                        onDragEnd={(e) => {this.UpdateStart( e.nativeEvent.coordinate)}}

                    >
                        <Callout>
                            <Text>User</Text>
                        </Callout>
                    </Marker>
                    <Marker
                        pinColor={'rgba(255,10,16,0.5)'}
                        coordinate={{latitude:34.052910, longitude:-6.781228}}
                        draggable
                        onDragEnd={(e) => {this.SetDestination( e.nativeEvent.coordinate)}}

                    >
                        <Callout>
                            <Text>Destination</Text>
                        </Callout>
                    </Marker>

                    {
                        this.state.coordinates.map((marker, index) => (
                            <Marker
                                key={marker.name}
                                ref={ref => this.state.markers[index] = ref}
                                onPress={() => this.onMarkerPressed(marker, index)}
                                coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                                pinColor={'rgba(223,255,22,0.6)'}
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
        flex: 1,
        width: '100%',
        height: '100%',
        position: 'absolute',
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
    ConButton: {
        marginTop: 650,
        width: '100%',
        fontSize: 30
    }
});

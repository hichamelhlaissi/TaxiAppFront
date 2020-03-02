import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert, TextInput, Button, Modal, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ModalWrapper from "react-native-modal-wrapper";
import {APPROX_STATUSBAR_HEIGHT} from "react-native-paper/src/constants";

export default class Order_Summary extends Component {

    constructor(props){
        super(props);
        const {state} = props.navigation;
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.cardStyle}>
                    <View style={styles.infos}>
                        <Text style={styles.name}>Youssef Lahyan</Text>
                        <Text style={styles.car}>Audi 30</Text>
                        <View style={styles.status}>
                            <Text style={styles.statusText}>Available</Text>
                        </View>
                        <View style={styles.distance}>
                            <Text style={styles.distanceText}>300m</Text>
                        </View>
                    </View>
                    <View style={styles.buttonsView}>
                        <TouchableOpacity style={styles.buttons} onPress={() => Alert.alert('Action!','Change')}>
                            <Text style={styles.buttonsText}>Change</Text>
                        </TouchableOpacity >
                    </View>
                </View>
                <View style={styles.cardStyle}>
                    <View style={styles.infos}>
                        <Text style={styles.name}>Starting point</Text>
                        <View style={styles.startingPoint}>
                            <Text style={[styles.startingPointText, {marginRight: 10}]}>Hay Karima - 3199.</Text>
                        </View>
                    </View>
                    <View style={styles.buttonsView}>
                        <TouchableOpacity style={styles.buttons} onPress={() => Alert.alert('Action!','Change')}>
                            <Text style={styles.buttonsText}>Change</Text>
                        </TouchableOpacity >
                    </View>
                </View>
                <View style={styles.cardStyle}>
                    <View style={styles.infos}>
                        <Text style={styles.name}>Destination</Text>
                        <View style={styles.destination}>
                            <Text style={styles.destinationText}>Station Tramway Diar.</Text>
                        </View>
                    </View>
                    <View style={styles.buttonsView}>
                        <TouchableOpacity style={styles.buttons} onPress={() => Alert.alert('Action!','Change')}>
                            <Text style={styles.buttonsText}>Change</Text>
                        </TouchableOpacity >
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    infos: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: 15,
        height: 100,
    },
    cardStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        height: 150,
        width: 370,
        marginTop: 10,
        borderRadius: 30/2,
    },
    name: {
        color: '#000000',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 8,
        marginLeft: 15
    },
    car: {
        color: '#000000',
        fontSize: 14,
        marginLeft: 15
    },
    status: {
        flexDirection: 'row',

        width: 200,
        marginLeft: 15
    },
    statusText: {
        color: '#000000',
        fontSize: 14,
        marginRight: 10
    },
    distance: {
        flexDirection: 'row',
        width: 200,
        marginLeft: 15
    },
    distanceText: {
        color: '#000000',
        fontSize: 14,
        marginRight: 10
    },
    startingPoint: {
        flexDirection: 'row',
        width: 200,
        marginLeft: 15
    },
    startingPointText: {
        color: '#000000',
        fontSize: 14,
        marginRight: 10
    },
    destination: {
        flexDirection: 'row',
        width: 200,
        marginLeft: 15
    },
    destinationText: {
        color: '#000000',
        fontSize: 14,
        marginRight: 10
    },
    buttonsView: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginRight: 15,
    },
    buttons: {
        borderRadius: 30/2,
        backgroundColor: "#E8F7FF",
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 17,
        paddingRight: 17,
    },
    buttonsText: {
        fontSize: 12,
        color: "#5780D9",
        textTransform: "uppercase",
        textAlign: "center",
    },
    textAreaContainer: {
        borderColor: "#333333",
        borderWidth: 1,
        padding: 5
    },
    textArea: {
        height: 150,
        justifyContent: "flex-start"
    },
    reportsButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    }
});

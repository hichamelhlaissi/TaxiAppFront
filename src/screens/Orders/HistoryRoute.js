import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    TextInput,
    Button,
    Modal,
    TouchableHighlight,
    Image
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ModalWrapper from "react-native-modal-wrapper";
import {APPROX_STATUSBAR_HEIGHT} from "react-native-paper/src/constants";
import ajax from '../../services/fetchOrders';
import Geocoder from 'react-native-geocoding';

// const latitude = 41.89;
// const longitude = 12.49;
// export function geoCoding() {
//     Geocoder.init("AIzaSyCoIzI4JvkT0MjvaBXH-OSt6d6pYuU1dMg");
//     Geocoder.from(41.89, 12.49)
//         .then(json => {
//             var addressComponent = json.results[0].address_components[0];
//             return addressComponent.long_name;
//         })
// }

export default class HistoryRoute extends Component {

    state = {
        orders: [],
        modalVisible: false,
        isLoading: true,

    };

    async componentDidMount() {
        const orders = await ajax.fetchOrdersHistory();

        for (const cord of orders) {
            Geocoder.init("AIzaSyCoIzI4JvkT0MjvaBXH-OSt6d6pYuU1dMg");
            Geocoder.from(cord.lat_from, cord.long_from).then(json => {
                var addressComponent = json.results[0].address_components[0];
                const newOrders = orders.map((order) => {
                    return {...order, place_to: addressComponent.long_name};
                });
                this.setState({orders: newOrders, isLoading: false, });
                return addressComponent.long_name;
            });
        }
    }

    // geoCoding() {
    //     for (const cord of this.state.orders) {
    //         Geocoder.init("AIzaSyCoIzI4JvkT0MjvaBXH-OSt6d6pYuU1dMg");
    //         Geocoder.from(cord.lat_from, cord.long_from)
    //             .then(json => {
    //                 var addressComponent = json.results[0].address_components[0];
    //                 const newOrders = this.state.orders.map((order) => {
    //
    //                     return {...order, place_to: addressComponent.long_name};
    //                 });
    //                 this.setState({orders: newOrders });
    //                 return addressComponent.long_name;
    //             });
    //     }
    // }



    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }
    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.isLoading ? <View style={styles.isLoading}><Image source={require('../../../assets/Images/spinner.gif')}/></View>
                    :
                        this.state.orders.length > 0
                            ? this.state.orders.map((order) => {
                                return (
                                    <View style={styles.cardStyle} key={order.id}>
                                        <View style={styles.infos}>
                                            <Text style={styles.name}>{order.taxi_owner}</Text>
                                            <Text style={styles.date}><Icon name="calendar" size={18} color="#fff" />  {order.date_time}</Text>
                                            <View style={styles.fromTo}>
                                                <Text style={[styles.fromToText, {marginRight: 10}]}>From</Text>
                                                <Text style={styles.fromToText}><Icon name="map-marker" size={20} color="#fff" /> {order.place_to}</Text>
                                            </View>
                                            <View style={styles.fromTo}>
                                                <Text style={[styles.fromToText, {marginRight: 10}]}>To</Text>
                                                <Text style={styles.fromToText}><Icon name="map-marker" size={20} color="#fff" /> There</Text>
                                            </View>
                                        </View>
                                        <View style={styles.buttonsView}>
                                            <TouchableOpacity style={styles.buttons} onPress={() => Alert.alert('Action!','Added to favorite')}>
                                                <Text style={styles.buttonsText}><Icon name="star" size={15} color="#EAE114" /> Add to favorite</Text>
                                            </TouchableOpacity >
                                            <TouchableOpacity style={[ styles.buttons, { marginTop: 12 } ]} onPress={() => {this.setModalVisible(true);}}>
                                                <Text style={styles.buttonsText}>Report</Text>
                                            </TouchableOpacity >
                                        </View>
                                    </View>
                                )
                            })
                            : <View style={styles.noOrders}><Text>No orders</Text></View>
                }
                <ModalWrapper
                    animationType="slide"
                    style={{ width: 280, height: 400, paddingLeft: 24, paddingRight: 24 }}
                    transparent={false}
                    visible={this.state.modalVisible}
                >
                    <View style={{marginTop: 22}}>
                        <View>
                            <View style={styles.textAreaContainer} >
                                <TextInput
                                    style={styles.textArea}
                                    underlineColorAndroid="transparent"
                                    placeholder="Enter your report here"
                                    placeholderTextColor="grey"
                                    numberOfLines={10}
                                    multiline={true}
                                />
                            </View>
                            <View style={styles.reportsButtons}>

                                <Button title="CANCEL" type="regular" onPress={() => {this.setModalVisible(!this.state.modalVisible);}} />
                                <Button title="SEND" type="primary" onPress={() => {this.setModalVisible(!this.state.modalVisible);}} />
                            </View>
                        </View>
                    </View>
                </ModalWrapper>
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
    noOrders : {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    isLoading : {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    infos: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: 15,
        height: 100,
    },
    tabBar: {
        marginTop: APPROX_STATUSBAR_HEIGHT,
        backgroundColor: '#5780D9',
    },
    cardStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#5780D9',
        height: 150,
        width: 370,
        marginTop: 10,
        borderRadius: 30/2,
    },
    name: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 8,
        marginLeft: 15
    },
    date: {
        color: '#fff',
        fontSize: 14,
        marginLeft: 15
    },
    fromTo: {
        flexDirection: 'row',

        width: 200,
        marginLeft: 15
    },
    fromToText: {
        color: '#fff',
        fontSize: 14,
    },
    buttonsView: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginRight: 10,
    },
    buttons: {
        borderRadius: 30/2,
        backgroundColor: "#E8F7FF",
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 12,
        paddingRight: 12,
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

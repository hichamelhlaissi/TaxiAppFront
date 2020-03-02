import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Orders from '../screens/Orders/Orders'
import Header from "../shared/header";
import React from 'react';

const screens = {
    Orders:{
        screen: Orders,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header navigation={navigation} title='Orders'/>,
            }
        }
    },




};
const OrdersStack = createStackNavigator(screens);
export default OrdersStack;

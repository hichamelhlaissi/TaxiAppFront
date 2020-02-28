import { createStackNavigator } from 'react-navigation-stack';
import Home from '../screens/Home'
import Header from "../shared/header";
import HeaderNone from "../shared/headerNone";
import Order_Summary from '../screens/Order_Summary';
import About from "../screens/About";
import React from 'react';
const screens = {
    Home:{
        screen: Home,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header navigation={navigation} title='Home'/>,
            }
        }
    },
    Order_Summary:{
        screen: Order_Summary,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <HeaderNone navigation={navigation} title='Order Summary'/>,
            }
        }
    },

};
const HomeStack = createStackNavigator(screens);
export default HomeStack;

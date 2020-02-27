import { createStackNavigator } from 'react-navigation-stack';
import Home from '../screens/Home'
import Header from "../shared/header";
import Start_Destination from "../screens/Start_Destination";
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

    Start_Destination:{
        screen: Start_Destination,
        navigationOptions: ({ navigation }) => {

        }
    },

};
const HomeStack = createStackNavigator(screens);
export default HomeStack;

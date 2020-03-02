import {createDrawerNavigator, DrawerItems} from "react-navigation-drawer";
import {createAppContainer} from "react-navigation";
import AboutStack from "./AboutStack";
import HomeStack from "./HomeStack";
import ProfileStack from "./ProfileStack";
import OrdersStack from "./OrdersStack";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image} from 'react-native';
import {Container, Header, Body, Content} from 'native-base';
import React from "react";


const RootDrawerNavigator = createDrawerNavigator({
    Home: {
        screen: HomeStack,
    },
    Profile: {
        screen: ProfileStack,
    },
    Orders: {
        screen: OrdersStack,
    },
    About: {
        screen: AboutStack,
    },
},{
    contentComponent: (props) => (
        <Container>
            <Header style={{height: 200, backgroundColor: 'white'}}>
                <Body>
                    <Image
                        style={styles.DrawerImage}
                        source={require('../../assets/Images/image.jpg')} />
                </Body>
            </Header>
            <Content>
                <DrawerItems {...props}/>
            </Content>
        </Container>
    ),
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
});


export default createAppContainer(RootDrawerNavigator);

const styles = StyleSheet.create({
    DrawerImage:{
        height: 150,
        width: 150,
        borderRadius:75,
        marginLeft: 50,
    }
});

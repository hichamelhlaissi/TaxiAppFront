import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Button, KeyboardAvoidingView} from 'react-native';
//import { Button } from "native-base";
import { Icon } from 'react-native-elements'
import { Formik } from 'formik';


export default function Profile() {
    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior="position">
            <View style={styles.header}/>
            <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>

                    <Formik initialValues={{Name : '', Phone_Number : '', Email : '', Password : '', Gender : '', Language : ''}}
                            onSubmit={(values) =>{
                                console.log(values);
                            }}>
                        {(props) =>(
                            <View style={styles.Form}>
                                <Text>Name </Text>
                                <TextInput style={styles.input}
                                    placeholder='Hicham ELHLAISSI'
                                    onChangeText={props.handleChange('Name')}
                                    value={props.values.Name}
                                />
                                <Text>Phone Number </Text>
                                <TextInput style={styles.input}
                                    placeholder='0690870138'
                                    onChangeText={props.handleChange('Phone_Number')}
                                    value={props.values.Phone_Number}
                                />
                                <Text>Email </Text>
                                <TextInput style={styles.input}
                                    placeholder='elhlaissihicham@gmail.com'
                                    onChangeText={props.handleChange('Email')}
                                    value={props.values.Email}
                                />
                                <Text>Change Password </Text>
                                <TextInput style={styles.input}
                                           placeholder='**********'
                                           onChangeText={props.handleChange('Password')}
                                           value={props.values.Password}
                                />
                                <Text>Gender </Text>
                                <TextInput style={styles.input}
                                           placeholder='Male'
                                           onChangeText={props.handleChange('Gender')}
                                           value={props.values.Gender}
                                />
                                <Text>Language </Text>
                                <TextInput style={styles.input}
                                           placeholder='Language'
                                           onChangeText={props.handleChange('Language')}
                                           value={props.values.Language}
                                />
                                <Button title='submit' style={styles.Button} onPress={props.handleSubmit}/>
                            </View>
                        )}


                    </Formik>


            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    header:{
        backgroundColor: "#00BFFF",
        height:100,
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom:10,
        alignSelf:'center',
        position: 'absolute',
        marginTop:50
    },
    name:{
        fontSize:22,
        color:"#FFFFFF",
        fontWeight:'600',
    },
    body:{
        marginTop:40,
    },
    bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding:30,
    },
    info:{
        fontSize:16,
        color: "#00BFFF",
        marginTop:10
    },
    description:{
        fontSize:16,
        color: "#696969",
        marginTop:10,
        textAlign: 'center'
    },
    socialIcon: {
        marginLeft: 14,
        marginRight: 14,
        marginTop: 480,
    },
    socialRow: {
        flexDirection: 'row',
    },
    input: {
        borderWidth: 0,
        borderColor: '#000',
        padding: 15,
        fontSize: 18,
        borderRadius: 10,
        marginBottom: 5,
        height: 50,
        width: 380,
        borderBottomColor: '#debaff',
        borderBottomWidth: 1,

    },
    Button:{
        color: '#ff0a10',
        borderWidth: 5,
        borderColor: '#000',
    },
    Form:{
        marginTop: 90,

    }
});

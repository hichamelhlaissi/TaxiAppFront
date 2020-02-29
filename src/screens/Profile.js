import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Button, KeyboardAvoidingView, ScrollView} from 'react-native';
import { Icon } from 'react-native-elements'
import { Formik } from 'formik';
import * as yup from 'yup';

export default class Profile extends Component{
    render() {

        const CheckField = yup.object({
            Name: yup.string().required().max(40).min(5),
            Email: yup.string().required().email(),
            Password: yup.string().required().max(40).min(5),
            Gender: yup.string().required().max(40).min(5),
            Language: yup.string().required().max(40).min(5),
            Phone_Number : yup.number().required()
                .test('is-num-1-10','Phone number most be 10 numbers', (val)=>{
                    return parseInt(val) <1234567899 && parseInt(val) >=123456789;
                })

        });
        return (
            <View style={styles.container}>
                <ScrollView>
                <KeyboardAvoidingView behavior="position">
                    <View style={styles.header}/>
                    <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>

                    <Formik
                        initialValues={{Name : '', Phone_Number : '', Email : '', Password : '', Gender : '', Language : ''}}
                            onSubmit={(values) =>{
                                console.log(values);
                            }}
                        validationSchema={CheckField}
                    >
                        {(props) =>(
                            <View style={styles.Form}>
                                <Text>Name </Text>
                                <TextInput style={styles.input}
                                           placeholder='Hicham ELHLAISSI'
                                           onChangeText={props.handleChange('Name')}
                                           value={props.values.Name}
                                           onBlur={props.handleBlur('Name')}
                                />
                                <Text style={styles.errorText}>{props.touched.Name && props.errors.Name}</Text>

                                <Text>Phone Number </Text>
                                <TextInput style={styles.input}
                                           placeholder='0690870138'
                                           onChangeText={props.handleChange('Phone_Number')}
                                           value={props.values.Phone_Number}
                                           onBlur={props.handleBlur('Phone_Number')}
                                           keyboardType='numeric'
                                />
                                <Text style={styles.errorText}>{props.touched.Phone_Number && props.errors.Phone_Number}</Text>

                                <Text>Email </Text>
                                <TextInput style={styles.Email}
                                           placeholder='elhlaissihicham@gmail.com'
                                           onChangeText={props.handleChange('Email')}
                                           value={props.values.Email}
                                           onBlur={props.handleBlur('Email')}
                                />
                                <Text style={styles.errorText}>{props.touched.Email && props.errors.Email}</Text>

                                <Text>Change Password </Text>
                                <TextInput style={styles.input}
                                           placeholder='**********'
                                           onChangeText={props.handleChange('Password')}
                                           value={props.values.Password}
                                           onBlur={props.handleBlur('Password')}
                                />
                                <Text style={styles.errorText}>{props.touched.Password && props.errors.Password}</Text>

                                <Text>Gender </Text>
                                <TextInput style={styles.input}
                                           placeholder='Male'
                                           onChangeText={props.handleChange('Gender')}
                                           value={props.values.Gender}
                                           onBlur={props.handleBlur('Gender')}
                                />
                                <Text style={styles.errorText}>{props.touched.Gender && props.errors.Gender}</Text>

                                <Text>Language </Text>
                                <TextInput style={styles.input}
                                           placeholder='Language'
                                           onChangeText={props.handleChange('Language')}
                                           value={props.values.Language}
                                           onBlur={props.handleBlur('Language')}
                                />
                                <Text style={styles.errorText}>{props.touched.Language && props.errors.Language}</Text>

                                <Button title='submit' style={styles.Button} onPress={props.handleSubmit}/>
                            </View>
                        )}


                    </Formik>


                </KeyboardAvoidingView>
                </ScrollView>
            </View>
        );
    }


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
        marginBottom: 4,
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
    },
    errorText: {
        color: 'crimson',
        fontWeight: 'bold',
        textAlign: 'center',
    }
});

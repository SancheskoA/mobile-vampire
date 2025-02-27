import React, { useState } from 'react'
import {StyleSheet,Text,View,Button,Alert,TouchableOpacity,Image,TextInput, ScrollView} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import {DOMEN_SERVER} from '../config';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const type = {
    people: "Заказ жителя",
    blood: "Заказ крови",
    meet: "Встреча"
}

const OrderListScreen = (props) => {
    const navigation = useNavigation();
    const {user, orders, NameOrders} = props.route.params;


    return (
        <ScrollView
            backgroundColor= '#FFC0CB'
            contentContainerStyle={{ flexGrow: 1, alignItems: 'center', marginTop:20}}
        >
            <Text style={{color:'#8B0000',fontSize:40,fontWeight:"bold",marginBottom:20}} >{NameOrders ?? "Заказы"}</Text>
            {orders.map((order) => {
                return <TouchableOpacity style = {styles.textFieldComment} key = {order.id} onPress={()=> navigation.navigate('OrderScreen', {user, order})}>
                            <Text style={{color:'#8B0000'}} >{"Номер " + order.id}</Text>
                            <Text style={{color:'#8B0000',  fontSize: 20, fontWeight: "bold"}} >{type[order.type]}</Text>
                            <Text style={{color:'#000000'}}>{order.mapPoint}</Text>
                       </TouchableOpacity>
            })}
            <TouchableOpacity
                style={styles.btn}
                onPress={()=> navigation.navigate('VampireMainScreen', user)}>
                <Text style={styles.btnText}>Назад</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFC0CB',
        justifyContent:'center',
        alignItems: 'center'
    },
    inputContainer: {
        width: '80%',
        paddingBottom:"2%",
    },
    textField: {
        backgroundColor:"#fff0e1",
        padding:"4%",
        borderRadius:6,
    },
    textFieldComment: {
        backgroundColor:"#fff0e1",
        padding:"5%",
        borderRadius:6,
        marginBottom:20,
        width: '80%',
    },
    headField: {
        marginTop:15,
        color:"white",
        fontSize:20,
        fontWeight:"bold",
        marginBottom:10,
    },
    btn : {
        marginTop: 20,
        backgroundColor:'#8B0000',
        borderRadius:10,
        width:250,
        alignItems: "center"
    },
    btnText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        padding:10
    }
});


export default OrderListScreen
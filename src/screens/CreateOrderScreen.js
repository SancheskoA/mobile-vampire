import React, { useState } from 'react'
import {StyleSheet,Text,View,Button,Alert,TouchableOpacity,Image,TextInput,} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import {DOMEN_SERVER} from '../config';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TYPE = {
    "Заказ жителя": "people",
    "Заказ крови": "blood",
    "Встреча с вампиром": "meet"
}

const CreateOrderScreen = (props) => {
    const navigation = useNavigation();
    let {user, type} = props.route.params;
    const [address, setAddress] = useState('');
    const [comment, setComment] = useState('');

    const reg = async () => {
        try {
            const {data} = await axios.post(DOMEN_SERVER + "/api/requests?user_id=" + user.id, {
                mapPoint: address,
                type: TYPE[type],
                comment
            })
            navigation.navigate('VampireMainScreen', user) //
        } catch (error) {
            Alert.alert('Ошибка', JSON.stringify(error.response));
        }
        
    }

    return (
        <View style={styles.container}>
            <Text style={{color:'#8B0000',fontSize:30,fontWeight:"bold",marginBottom:20}} >{type}</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.headField}>Адрес</Text>
                <TextInput style={styles.textField} 
                    placeholder={'Введите свой адрес...'}
                    autoCapitalize='none'
                    onChangeText={(address) => setAddress(address)} 
                    value={address}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.headField}>Комментарий</Text>
                <TextInput 
                    style={styles.textFieldComment} 
                    autoCapitalize='none'
                    placeholder={'Комментарий к заказу'}
                    onChangeText={(comment) => setComment(comment)} 
                    value={comment}
                />
            </View>
            
            <TouchableOpacity
                style={styles.btn}
                onPress={reg}>
                <Text style={styles.btnText}>Запросить</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.btn}
                onPress={()=> navigation.navigate('VampireMainScreen', user)}>
                <Text style={styles.btnText}>Назад</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFC0CB',
        justifyContent:'center',
        alignItems: 'center',
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
        padding:"10%",
        borderRadius:6,
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


export default CreateOrderScreen
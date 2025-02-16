import React, { useState, useEffect } from 'react'
import {StyleSheet,Text,View,TouchableOpacity,TextInput, Alert} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import {DOMEN_SERVER} from '../config';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const SignIn = () => {
    const navigation = useNavigation();
    const [login, setlogin] = useState('');
    const [password, setPassword] = useState('');

    const auth = async () => {
        try {

            const {data} = await axios.post(DOMEN_SERVER + "/api/auth", {
                login, password
            })
            
            await AsyncStorage.setItem(
                'token',
                data.token
            );
                
            navigation.navigate('VampireMainScreen', data.user)
            

        } catch (error) {
            console.log(error);
            Alert.alert('Ошибка', JSON.stringify(error.response.data.error));
        }
        
    }

    

    return (
        <View style={styles.container}>
            <Text style={{color:'#8B0000',fontSize:25,fontWeight:"bold"}} >Добро пожаловать!</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.headField}>Логин</Text>
                <TextInput 
                    style={styles.textField} 
                    placeholder={'Введите свой логин...'} 
                    onChangeText={(login) => setlogin(login)} 
                    value={login}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.headField} >Пароль</Text>
                <TextInput 
                    style={styles.textField} 
                    secureTextEntry={true} 
                    placeholder={'Введите свой пароль...'} 
                    onChangeText={(password) => setPassword(password)}
                    value={password}

                />
            </View>
            <TouchableOpacity
                style={styles.btn}
                onPress={auth}>
                <Text style={styles.btnText}>Войти</Text>
            </TouchableOpacity>
            <Text style={{color:"white",marginTop:10,fontWeight:"bold"}}>Нет аккаунта?</Text>
            <TouchableOpacity>
                <Text style={{color:'#8B0000'}} onPress={()=> navigation.navigate('SignUp')}>Создать новый аккаунт</Text>
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
        paddingTop:"2%",
        paddingBottom:"2%",
    },
    textField: {
        backgroundColor:"#fff0e1",
        padding:"2%",
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
        borderRadius:20,
        width:100,
        alignItems: "center"
    },
    btnText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        padding:10
    }
});


export default SignIn
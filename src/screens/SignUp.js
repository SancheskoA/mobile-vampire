import React, { useState } from 'react'
import {StyleSheet,Text,View,Button,Alert,TouchableOpacity,Image,TextInput,} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import {DOMEN_SERVER} from '../config';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUp = () => {
    const navigation = useNavigation();
    const [code, setCode] = useState('');
    const [login, setlogin] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const reg = async () => {
        try {
            const {data} = await axios.post(DOMEN_SERVER + "/api/auth/registration", {
                code,
                login,
                password
            })
            
            
            await AsyncStorage.setItem(
                'token',
                data.token
            );

            await AsyncStorage.setItem(
                'user_id',
                data.id
            );
            navigation.navigate('VampireMainScreen', data.user)

        } catch (error) {
            console.log(error.response.data.error)
            Alert.alert('Ошибка', JSON.stringify(error.response.data.error));
        }
        
    }

    return (
        <View style={styles.container}>
            <Text style={{color:'#8B0000',fontSize:30,fontWeight:"bold",marginBottom:20}} >Регистрация</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.headField}>Код приглашения</Text>
                <TextInput style={styles.textField} 
                    placeholder={'Введите код'}
                    autoCapitalize='none'
                    onChangeText={(code) => setCode(code)} 
                    value={code}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.headField}>Логин</Text>
                <TextInput 
                    style={styles.textField} 
                    autoCapitalize='none'
                    placeholder={'Введите логин'}
                    onChangeText={(login) => setlogin(login)} 
                    value={login}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.headField} >Пароль</Text>
                <TextInput 
                    style={styles.textField} 
                    secureTextEntry={true} 
                    placeholder={'Введите пароль'} 
                    onChangeText={(password) => setPassword(password)}
                    value={password}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.headField} >Пароль</Text>
                <TextInput 
                    style={styles.textField} 
                    secureTextEntry={true} 
                    placeholder={'Введите пароль еще раз'} 
                    onChangeText={(repeatPassword) => setRepeatPassword(repeatPassword)}
                    value={repeatPassword}
                />
            </View>
            <TouchableOpacity
                style={styles.btn}
                onPress={reg}>
                <Text style={styles.btnText}>Создать аккаунт</Text>
            </TouchableOpacity>
            <Text style={{color:"white",marginTop:10,fontWeight:"bold"}}>Есть аккаунт?</Text>
            <TouchableOpacity>
                <Text style={{color:'#8B0000'}} onPress={()=> navigation.navigate('SignIn')}>Войти</Text>
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


export default SignUp
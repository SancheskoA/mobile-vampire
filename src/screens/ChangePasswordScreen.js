import React, { useState } from 'react'
import {StyleSheet,Text,View,Button,Alert,TouchableOpacity,Image,TextInput,} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import {DOMEN_SERVER} from '../config';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChangePasswordScreen = (props) => {
    const navigation = useNavigation();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    let user = props.route.params;

    const changePassword = async () => {
        try {
            console.log('1')

            await axios.put(DOMEN_SERVER + "/api/auth/password?user_id=" + user.id, {
                oldPassword,
                newPassword
            })
            
            navigation.navigate('SignIn')

        } catch (error) {
            console.log(error.response.data.error)
            Alert.alert('Ошибка', JSON.stringify(error.response.data.error));
        }
        
    }

    return (
        <View style={styles.container}>
            <Text style={{color:'#8B0000',fontSize:30,fontWeight:"bold",marginBottom:20}}>Сменить пароль</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.headField}>Старый пароль</Text>
                <TextInput 
                    style={styles.textField} 
                    autoCapitalize='none'
                    placeholder={'Введите старый логин'}
                    onChangeText={(oldPassword) => setOldPassword(oldPassword)} 
                    value={oldPassword}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.headField} >Новый пароль</Text>
                <TextInput 
                    style={styles.textField} 
                    secureTextEntry={true} 
                    placeholder={'Введите новый пароль'} 
                    onChangeText={(newPassword) => setNewPassword(newPassword)}
                    value={newPassword}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.headField} >Повторите пароль</Text>
                <TextInput 
                    style={styles.textField} 
                    secureTextEntry={true} 
                    placeholder={'Введите новый пароль еще раз'} 
                    onChangeText={(repeatPassword) => setRepeatPassword(repeatPassword)}
                    value={repeatPassword}
                />
            </View>
            <TouchableOpacity
                style={styles.btn}
                onPress={changePassword}>
                <Text style={styles.btnText}>Сменить пароль</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.btn}
                onPress={()=> navigation.navigate('ProfileScreen', user)}>
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


export default ChangePasswordScreen
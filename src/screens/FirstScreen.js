import React from 'react'
import {StyleSheet, Text, View,TouchableOpacity, Image,} from 'react-native'
import { useNavigation } from '@react-navigation/native';

const FirstScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Text style={{color:'#000000', fontSize:28, fontWeight:"bold",}}>Welcome to</Text>
            <Text style={{color:'#000000', fontSize:36, fontWeight:"bold",}}>Vampire</Text>
            <TouchableOpacity
                style={styles.btn}
                onPress={()=> navigation.navigate('SignIn')}>
                <Text style={styles.btnText}>Войти</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.btn}
                onPress={()=> navigation.navigate('SignUp')}>
                <Text style={styles.btnText}>Регистрация</Text>
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
    
    btn : {
        marginTop: 40,
        padding:10,
        backgroundColor:'#8B0000',
        width:"70%",
        alignItems: "center",
        borderRadius:30,
    },
    btnText: {
        color: '#DAA520',
        fontSize: 30,
        fontWeight: "bold",
        padding:2,
    }
});


export default FirstScreen
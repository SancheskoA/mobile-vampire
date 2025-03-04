import React from 'react'
import {StyleSheet, Text, View,TouchableOpacity, Image, Alert} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import {DOMEN_SERVER} from '../config';
import axios from 'axios';

const VampireMainScreen = (props) => {
    const navigation = useNavigation();
    let user = props.route.params;
    const isVampire = user.role != 'familiar';
    const isNewVampir = user.role == 'vampire';

    const getOrder = (type) => {
        return async () => {
            try {
                const {data: order} = await axios.get(DOMEN_SERVER + "/api/requests/active?user_id=" + user.id + "&type=" + type)

                if (order) {
                    navigation.navigate('OrderScreen',{user, order});
                    return
                }
                
                if (!isVampire) {
                    const {data} = await axios.get(DOMEN_SERVER + "/api/requests/vampire")
                    navigation.navigate('OrderListScreen', {user, orders: data});
                } else {
                    navigation.navigate('CreateOrderScreen', {user, type: type == 'people' ? 'Заказ жителя' :'Заказ крови' });
                }

            } catch (error) {
                console.log('Ошибка ' + JSON.stringify(error));
            }

            
        }
    }
        
    const meets = async () => {
        try {
            let {data: order} = await axios.get(DOMEN_SERVER + "/api/requests/active?user_id=" + user.id + "&type=meet")
            if (order) {
                navigation.navigate('OrderScreen', {user, order});
                return
            }

            let {data: meets} = await axios.get(DOMEN_SERVER + "/api/requests/meets?user_id=" + user.id)
            console.log(meets);

            navigation.navigate('OrderListScreen', {user, orders: meets ?? [], NameOrders: "Встречи"});
        } catch (err) {
          Alert.alert('Ошибка', JSON.stringify(err));
        }
    }

    const profile = async () => {
        try {
            
            const {data} = await axios.get(DOMEN_SERVER + "/api/auth/user/" + user.id)
            navigation.navigate('ProfileScreen', data.user)
            
        } catch (error) {

            Alert.alert('Ошибка', JSON.stringify(error.response.data), [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ]);
        }
    }
        

    return (
        <View style={styles.container}>
            <Text style={{color:'#000000', fontSize:36, fontWeight:"bold",}}>{isVampire ? 'Vampire' : 'Familiar'}</Text>
            {!isNewVampir && <TouchableOpacity
                style={styles.btn}
                onPress={getOrder('people')}>
                <Text style={styles.btnText}>{isVampire ? "Заказ жителя" : "Заказы вампиров"}</Text>
            </TouchableOpacity>}
            {isVampire &&
            <>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={getOrder('blood')}>
                    <Text style={styles.btnText}>{isVampire ? "Заказ крови" : "Поиск крови"}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={meets}>
                    <Text style={styles.btnText}>Встречи</Text>
                </TouchableOpacity>
            </>}
            <TouchableOpacity
                style={styles.btn}
                onPress={profile}>
                <Text style={styles.btnText}>Профиль</Text>
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
        width:"80%",
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


export default VampireMainScreen
import React from 'react'
import {StyleSheet, Text, View,TouchableOpacity, Image, Alert} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import {DOMEN_SERVER} from '../config';
import axios from 'axios';

const ProfileScreen = (props) => {
    const navigation = useNavigation();
    let user = props.route.params;

    const isVampire = user.role != 'familiar';
    const isNewVampir = user.role == 'vampire';

    const history = async () => {
      try {
        const {data} = await axios.get(DOMEN_SERVER + "/api/requests/history?user_id=" + user.id)
        navigation.navigate('OrderListScreen', {user, orders: data, NameOrders: "История"});
      } catch (err) {
        Alert.alert('Ошибка', JSON.stringify(err.response));
      }
    }



    const stateVampire = async () => {
      try {
        console.log('stateVampire')
        const {data: order} = await axios.get(DOMEN_SERVER + "/api/requests/active?user_id=" + user.id + "&type=meet")
        if (order) {
            navigation.navigate('OrderScreen',{user, order});
            return
        }
        navigation.navigate('CreateOrderScreen', {user, type: "Встреча с вампиром", NameOrders: "История"});
      } catch (err) {
        Alert.alert('Ошибка', JSON.stringify(err));
      }
  }


    const MAX_KPI = 1000;

    return (
        <View style={styles.container}>
            <Text style={{color:'#000000', fontSize:36, fontWeight:"bold",}}>{user.username}</Text>
            <Text style={{color:'#000000', fontSize:20, marginBottom: 20, fontWeight:"bold",}}>{
              isNewVampir ? "Новообращенный" : isVampire ? "Высший вампир" : "Фамильяр"
            }</Text>

            { !isVampire &&
              <>
                <Text style={{color:'#000000', fontSize:28, fontWeight:"bold",}}>KPI: {user.kpi}/1000</Text>
                {user.kpi > MAX_KPI && <TouchableOpacity
                  style={styles.btn}
                  onPress={stateVampire}>
                  <Text style={styles.btnText}>Стать вампиром</Text>
              </TouchableOpacity>}
              </>  
            }
            <Text style={{color:'#000000', fontSize:28, marginTop: 20, fontWeight:"bold",}}>Код приглашения:</Text>
            <Text style={{color:'#000000', fontSize:28, fontWeight:"bold",}}>{user.invitationCode}</Text>
            <TouchableOpacity
                style={styles.btn}
                onPress={history}>
                <Text style={styles.btnText}>История</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.btn}
                onPress={()=> navigation.navigate('ChangePasswordScreen', user)}>
                <Text style={styles.btnText}>Сменить пароль</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.btn}
                onPress={()=> navigation.navigate('FirstScreen')}>
                <Text style={styles.btnText}>Выйти из аккаунта</Text>
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
    
    btn : {
        marginTop: 20,
        marginBottom: 20,

        padding:10,
        backgroundColor:'#8B0000',
        width:"70%",
        alignItems: "center",
        borderRadius:30,
    },
    btnText: {
        color: '#DAA520',
        fontSize: 25,
        fontWeight: "bold",
        padding:2,
    }
});


export default ProfileScreen
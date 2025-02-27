import React, { useState } from 'react'
import {StyleSheet, Text, View,TouchableOpacity, Image, ScrollView, Alert,TextInput} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import {DOMEN_SERVER} from '../config';
import axios from 'axios';

const STATUS = {
    DONE: "Выполнен",
    NEW: "Новый",
    RESIDENT_FOUND: "Житель найден",
    SEARCH_FOR_RESIDENT: "Поиск жителя",
    ACCEPTED: "Принят",
    CANCELED: "Отменен",
    СOURIER: "У курьера"
}

const type = {
    people: "Заказ жителя",
    blood: "Заказ крови",
    meet: "Встреча с вампиром"
}

const OrderScreen = (props) => {
    const navigation = useNavigation();
    const {user, order} = props.route.params;

    const [people, setPeople] = useState('');

    const [review, setReview] = useState('');

    const cancel = async () => {
        try {
            const {data} = await axios.delete(DOMEN_SERVER + `/api/requests/${order.id}/cancel`, {
                user_id: user.id
            })
            navigation.navigate('VampireMainScreen', user) //
        } catch (error) {
            Alert.alert('Ошибка', JSON.stringify(error.response));
        }
    }

    const done = async () => {
        try {
            const {data} = await axios.put(DOMEN_SERVER + `/api/requests/${order.id}/done`);
            navigation.navigate('VampireMainScreen', user) //
        } catch (error) {
            Alert.alert('Ошибка', JSON.stringify(error.response));
        } 
    }

    const isVampire = async () => {
        try {
            const {data} = await axios.put(DOMEN_SERVER + `/api/requests/${order.id}/createVampire`);
            navigation.navigate('FirstScreen') //
        } catch (error) {
            Alert.alert('Ошибка', JSON.stringify(error.response));
        } 
    }

    const take = async () => {
        try {
            const {data} = await axios.put(DOMEN_SERVER + `/api/requests/${order.id}/take?user_id=` + user.id);
            navigation.navigate('VampireMainScreen', user) //
        } catch (error) {
            Alert.alert('Ошибка', JSON.stringify(error.response));
        }
    }

    const find = async () => {
        try {
            const {data} = await axios.put(DOMEN_SERVER + `/api/requests/${order.id}/find`, {
                people
            });
            navigation.navigate('VampireMainScreen', user) //
        } catch (error) {
            Alert.alert('Ошибка', JSON.stringify(error.response));
        }
    }

    const accept = async () => {
        try {
            const {data} = await axios.put(DOMEN_SERVER + `/api/requests/${order.id}/accept?user_id=` + user.id);
            navigation.navigate('VampireMainScreen', user) //
        } catch (error) {
            Alert.alert('Ошибка', JSON.stringify(error.response));
        }
    }

    const courier = async () => {
        try {
            const {data} = await axios.put(DOMEN_SERVER + `/api/requests/${order.id}/courier`, {
                people
            });
            navigation.navigate('VampireMainScreen', user) //
        } catch (error) {
            Alert.alert('Ошибка', JSON.stringify(error.response));
        }
    }

    const refuse = async () => {
        try {
            const {data} = await axios.put(DOMEN_SERVER + `/api/requests/${order.id}/refuse`, {
                people
            });
            navigation.navigate('VampireMainScreen', user) //
        } catch (error) {
            Alert.alert('Ошибка', JSON.stringify(error.response));
        }
    }

    const leaveFeedback = async () => {
        try {
            const {data} = await axios.put(DOMEN_SERVER + `/api/requests/${order.id}/review`, {
                review
            });
            navigation.navigate('OrderScreen', {user, order: data}) //
        } catch (error) {
            Alert.alert('Ошибка', JSON.stringify(error), [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]);
        }
    }


    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}
        >
            <Text style={{color:'#A9A9A9', fontSize:28, marginTop: 20}} >{"Номер заказа " + order.id}</Text>
            <Text style={{color:'#000000', fontSize:36, marginBottom: 20, fontWeight:"bold", marginTop:20}}>{type[order.type]}</Text>
            <Text style={{color:'#8B0000', fontSize:28, fontWeight:"bold",}}>Статус:</Text>
            <Text style={{color:'#000000', fontSize:28, marginBottom: 20,fontWeight:"bold",}}>{order.status}</Text>
            <Text style={{color:'#8B0000', fontSize:28, fontWeight:"bold",}}>Место:</Text>
            <Text style={{color:'#000000', fontSize:28, marginBottom: 20, fontWeight:"bold",}}>{order.mapPoint}</Text>
            <Text style={{color:'#8B0000', fontSize:28, fontWeight:"bold",}}>Комментарий:</Text>
            <Text style={{color:'#000000', fontSize:28, marginBottom: 20, fontWeight:"bold",}}>{order.comment}</Text>
            {order.people && <>
                <Text style={{color:'#8B0000', fontSize:28, fontWeight:"bold",}}>Человек:</Text>
                <Text style={{color:'#000000', fontSize:28, fontWeight:"bold",}}>{order.people}</Text>
            </>}
            {order.review && <>
                <Text style={{color:'#8B0000', fontSize:28, fontWeight:"bold",}}>Отзыв:</Text>
                <Text style={{color:'#000000', fontSize:28, fontWeight:"bold",}}>{order.review}</Text>
            </>}

            {
                user.role != 'familiar' && (order.status == STATUS.СOURIER || order.status == STATUS.RESIDENT_FOUND) && 
                <TouchableOpacity style={styles.btn} onPress={done}>
                    <Text style={styles.btnText}>Заказ выполнен</Text>
                </TouchableOpacity>
            }

            {
                user.role == 'familiar' && order.type == 'meet' && order.status == STATUS.ACCEPTED && 
                <TouchableOpacity style={styles.btn} onPress={isVampire}>
                    <Text style={styles.btnText}>Я вампир</Text>
                </TouchableOpacity>
            }

            {
                user.role != 'familiar' && order.type != 'meet' && order.status != STATUS.DONE && order.status != STATUS.DONE && order.status != STATUS.CANCELED && 
                <TouchableOpacity style={styles.btn} onPress={cancel}>
                    <Text style={styles.btnText}>Отменить заказ</Text>
                </TouchableOpacity>
            }

            {
                user.role == 'familiar' && order.type != 'meet' && order.status == STATUS.NEW && 
                <TouchableOpacity style={styles.btn} onPress={order.type == 'people' ? take : accept}>
                    <Text style={styles.btnText}>Взять заказ</Text>
                </TouchableOpacity>
            }   

            {
                user.role != 'familiar' && order.type == 'meet' && order.status == STATUS.NEW && 
                <TouchableOpacity style={styles.btn} onPress={accept}>
                    <Text style={styles.btnText}>Сделать фамильяра вампиром</Text>
                </TouchableOpacity>
            }

            {
                user.role == 'familiar' && order.status == STATUS.ACCEPTED && order.type != 'meet' && 
                <TouchableOpacity style={styles.btn} onPress={courier}>
                    <Text style={styles.btnText}>Передан курьеру</Text>
                </TouchableOpacity>
            } 

            {
                user.role == 'familiar' && order.status == STATUS.SEARCH_FOR_RESIDENT && 
                <>
                    <View style={styles.inputContainer}>
                    <Text style={styles.headField}>Описание жертвы</Text>
                    <TextInput 
                        style={styles.textFieldComment} 
                        autoCapitalize='none'
                        placeholder={'Жертва'}
                        onChangeText={(people) => setPeople(people)} 
                        value={people}
                    />
                    </View>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={find}>
                        <Text style={styles.btnText}>Жертва найдена</Text>
                    </TouchableOpacity>
                </>
            }
            
            {
                user.role == 'familiar' && (order.status == STATUS.ACCEPTED || order.status == STATUS.SEARCH_FOR_RESIDENT) && order.type != 'meet' && 
                <TouchableOpacity style={styles.btn} onPress={refuse}>
                    <Text style={styles.btnText}>Отказаться</Text>
                </TouchableOpacity>
            } 

            {
                user.role != 'familiar' && order.status == STATUS.DONE && !order.review &&
                <>
                    <View style={styles.inputContainer}>
                    <Text style={styles.headField}>Отзыв</Text>
                    <TextInput 
                        style={styles.textFieldComment} 
                        autoCapitalize='none'
                        placeholder={'Отзыв'}
                        onChangeText={(review) => setReview(review)} 
                        value={review}
                    />
                    </View>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={leaveFeedback}>
                        <Text style={styles.btnText}>Оставить отзыв</Text>
                    </TouchableOpacity>
                </>

            }

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
        backgroundColor:'#FFC0CB',
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
    },
    headField: {
        marginTop:15,
        color:"white",
        fontSize:20,
        fontWeight:"bold",
        marginBottom:10,
    }
});


export default OrderScreen
import AppNavigation from './src/navigation';
import React, { useEffect } from 'react';
import {Alert} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {DOMEN_SERVER} from './src/config';

export default function App() {
  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const value = await AsyncStorage.getItem('user_id');
        console.log(value)
        if (value !== null) {
          const {data} = await axios.get(DOMEN_SERVER + "/api/notification?user_id=" + value)
          console.log(data)
          for (const notification of data) {
            Alert.alert('Внимание', notification.body,[
              {text: 'OK', onPress: () => console.log('OK')},
            ]);
          }
        }
      }
      catch (err) {
        console.error(err);
      }
      
      // Ваша логика здесь
    }, 5000); // 5000 миллисекунд = 5 секунд

    // Очистка интервала при размонтировании компонента
    return () => clearInterval(intervalId);
  }, []);
  
  return (
    <AppNavigation />
  );
}
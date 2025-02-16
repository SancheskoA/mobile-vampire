import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FirstScreen from '../screens/FirstScreen';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import VampireMainScreen from '../screens/VampireMainScreen'
import ProfileScreen from '../screens/ProfileScreen'
import CreateOrderScreen from '../screens/CreateOrderScreen'
import OrderScreen from '../screens/OrderScreen'
import OrderListScreen from '../screens/OrderListScreen'



const Stack = createNativeStackNavigator();

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='FirstScreen' screenOptions={{headerShown: false}}>
        <Stack.Screen name="FirstScreen" component={FirstScreen} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="VampireMainScreen" component={VampireMainScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="CreateOrderScreen" component={CreateOrderScreen} />
        <Stack.Screen name="OrderScreen" component={OrderScreen} />
        <Stack.Screen name="OrderListScreen" component={OrderListScreen} />
        
      </Stack.Navigator> 
    </NavigationContainer>
  );
}

export default AppNavigation;
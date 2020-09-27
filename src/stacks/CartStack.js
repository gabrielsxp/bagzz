import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ShoppingCart from '../screens/ShoppingCart';
import CartResumme from '../screens/CartResume';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="ShoppingCart">
    <Stack.Screen name="ShoppingCart" component={ShoppingCart}></Stack.Screen>
    <Stack.Screen headerShown={true} name="CartResume" component={CartResumme}></Stack.Screen>
  </Stack.Navigator >
);

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ShoppingCart from '../screens/ShoppingCart';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="ShoppingCart">
    <Stack.Screen name="ShoppingCart" component={ShoppingCart}></Stack.Screen>
  </Stack.Navigator >
);

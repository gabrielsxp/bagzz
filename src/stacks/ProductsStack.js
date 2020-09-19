import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LastProducts from '../screens/LastProducts';
import Product from '../screens/Product';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator initialRouteName="LastProducts">
    <Stack.Screen name="LastProducts" component={LastProducts}></Stack.Screen>
    <Stack.Screen name="Product" component={Product}></Stack.Screen>
  </Stack.Navigator >
);

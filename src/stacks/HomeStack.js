import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import CategoryProducts from '../screens/CategoryProducts';
import BannerProducts from '../screens/BannerProducts';
import LastProducts from '../screens/LastProducts';
import AllCategories from '../screens/AllCategories';
import Product from '../screens/Product';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen name="Home" component={Home}></Stack.Screen>
    <Stack.Screen name="CategoryProducts" component={CategoryProducts}></Stack.Screen>
    <Stack.Screen name="BannerProducts" component={BannerProducts}></Stack.Screen>
    <Stack.Screen name="AllCategories" component={AllCategories}></Stack.Screen>
    <Stack.Screen name="LastProducts" component={LastProducts}></Stack.Screen>
    <Stack.Screen name="Product" component={Product}></Stack.Screen>
  </Stack.Navigator >
);

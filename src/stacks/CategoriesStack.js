import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AllCategories from '../screens/AllCategories';
import CategoryProduct from '../screens/CategoryProduct';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator initialRouteName="LastAllCategoriesProducts">
    <Stack.Screen name="AllCategories" component={AllCategories}></Stack.Screen>
    <Stack.Screen name="CategoryProduct" component={CategoryProduct}></Stack.Screen>
  </Stack.Navigator >
);

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="SignIn">
    <Stack.Screen name="SignIn" component={SignIn}></Stack.Screen>
    <Stack.Screen name="SignUp" component={SignUp}></Stack.Screen>
  </Stack.Navigator >
);

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Preload from '../screens/Preload';
import MainTab from './MainTab';
import HamburgerIcon from '../assets/menu.svg';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator initialRouteName="Preload">
    <Stack.Screen screenOptions={{ headerShown: false }} name="Preload" component={Preload}></Stack.Screen>
    <Stack.Screen option={{
      title: 'bagzz',
    }} name="MainTab" component={MainTab}></Stack.Screen>
  </Stack.Navigator >
);

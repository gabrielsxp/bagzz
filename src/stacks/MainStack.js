import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Preload from '../screens/Preload';
import MainTab from './MainTab';
import HamburgerIcon from '../assets/menu.svg';
import RegisterStack from '../stacks/RegisterStack';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Preload">
    <Stack.Screen name="Preload" component={Preload}></Stack.Screen>
    <Stack.Screen name="RegisterStack" component={RegisterStack}></Stack.Screen>
    <Stack.Screen option={{
      title: 'bagzz',
    }} name="MainTab" component={MainTab}></Stack.Screen>
  </Stack.Navigator >
);

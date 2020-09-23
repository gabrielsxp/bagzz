import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Search from '../screens/Search';
import CustomTabBar from '../components/CustomTabBar';
import HomeStack from '../stacks/HomeStack';
import CartStack from '../stacks/CartStack';

const Tab = createBottomTabNavigator();

export default () => {
  return (
    <Tab.Navigator initialRouteName="HomeStack" tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen name="HomeStack" component={HomeStack}></Tab.Screen>
      <Tab.Screen name="CartStack" component={CartStack}></Tab.Screen>
      <Tab.Screen name="Search" component={Search}></Tab.Screen>
    </Tab.Navigator>
  );
}
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Search from '../screens/Search';
import CustomTabBar from '../components/CustomTabBar';
import CategoryProduct from '../screens/CategoryProduct';
import ProductsStack from '../stacks/ProductsStack';
import CategoriesStack from '../stacks/CategoriesStack';
import Product from '../screens/Product';

const Tab = createBottomTabNavigator();

export default () => {
  return (
    <Tab.Navigator initialRouteName="Home" tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen name="Home" component={Home}></Tab.Screen>
      <Tab.Screen name="Product" component={Product}></Tab.Screen>
      <Tab.Screen name="CategoryProduct" component={CategoryProduct}></Tab.Screen>
      <Tab.Screen name="ProductsStack" component={ProductsStack}></Tab.Screen>
      <Tab.Screen name="CategoriesStack" component={CategoriesStack}></Tab.Screen>
      <Tab.Screen name="Search" component={Search}></Tab.Screen>
    </Tab.Navigator>
  );
}
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './src/stacks/MainStack';
import ProductProvider from './src/contexts/ProductContext';

export default () => {
  return (
    <ProductProvider>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </ProductProvider>
  );
}
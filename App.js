import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './src/stacks/MainStack';
import ProductProvider from './src/contexts/ProductContext';
import UserProvider from './src/contexts/UserContext';

export default () => {
  return (
    <UserProvider>
      <ProductProvider>
        <NavigationContainer>
          <MainStack />
        </NavigationContainer>
      </ProductProvider>
    </UserProvider>
  );
}
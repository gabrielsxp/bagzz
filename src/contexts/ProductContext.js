import React, { createContext, useReducer } from 'react';
import { initialState, ProductReducer } from '../reducers/ProductReducer';

export const ProductContext = createContext('default');

export default ({ children }) => {
  const [state, dispatch] = useReducer(ProductReducer, initialState);

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
}
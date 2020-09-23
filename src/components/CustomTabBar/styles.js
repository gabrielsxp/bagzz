import React from 'react';
import styled from 'styled-components/native';

export const TabArea = styled.View`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  flex-direction: row;
  height: 65px;
  background-color: white;
  border-radius: 70px;
  shadow-color: #000;
  shadow-offset: 0 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;
  margin: 10px 5px;
`;

export const CartCounterWrapper = styled.View`
  position: absolute;
  bottom: 15px;
  right: 25px;
  border-width: 1px;
  border-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 18px;
  height: 18px;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  background-color: black;
`;

export const CartCounterText = styled.Text`
  font-size: 12px;
  color: white;
  font-weight: bold;
`;

export const TabIcon = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
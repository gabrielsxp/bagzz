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

export const TabIcon = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
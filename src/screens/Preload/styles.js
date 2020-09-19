import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1
  background-color: #F1F1F1;
  justify-content: center;
  align-items: center;
`;

export const Loader = styled.ActivityIndicator`
  margin-top: 50px;
`;
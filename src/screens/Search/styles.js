import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #FFFFFF;
  justify-content: center
  padding: 20px;
`;

export const InputContainer = styled.View`
  margin-top: 60px;
`;

export const IconContainer = styled.View`
  width: 100%;
  justify-content: flex-end;
  align-items: flex-end;
`;

export const Input = styled.TextInput`
  font-size: 18px;
  color: #000000;
  border-bottom-width: 1px;
  border-bottom-color: #000000;
`;

export const Results = styled.View`
  flex: 1;
  padding: 20px 0;
`;

export const Searching = styled.View`
  width: 100%;
  padding: 40px;
  justify-content: center;
  align-items: center;
`;

export const Loading = styled.ActivityIndicator``;

export const SearchResultWrapper = styled.TouchableOpacity``;
export const SearchResult = styled.Text`
  font-size: 22px;
  color: #000000;
  line-height: 28px;
  margin-bottom: 20px;
`;

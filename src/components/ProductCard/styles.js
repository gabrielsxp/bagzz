import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  flexGrow: 1;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 210px;
  background: #F1F1F1;
  padding-horizontal: 20px;
`;

export const CardTitle = styled.Text`
  font-weight: bold;
  font-size: 18px;
  line-height: 24px;
  color: #000000;
  margin-top: auto;
`;

export const CardLink = styled.Text`
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  border-bottom-width: 2px;
  border-bottom-color: black;
  color: #000000;
  text-transform: uppercase;
  margin-top: auto;
  padding-bottom: 5px;
  margin-bottom: 20px;
`;

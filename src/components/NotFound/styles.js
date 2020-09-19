import styled from 'styled-components/native';

export const ActionButton = styled.TouchableOpacity`
  width: ${props => props.full ? '100%' : '48%'};
  border-width: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${props => props.full ? '4px' : '10px'};
  margin-top: ${props => props.full ? '15px' : '0px'};
  border-color: ${props => props.border ?? 'black'};
  background-color: ${props => props.background ?? 'white'};
`;

export const ProductTitle = styled.Text`
  font-size: 22px;
  line-height: 26px;
  font-weight: bold;
  color: black;
  margin-top: 20px;
`;
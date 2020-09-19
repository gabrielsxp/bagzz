import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';

export const ModalWrapper = styled.View`
  width: ${props => props.width === '100%' ? '100%' : props.width + 'px'};
  height: ${props => props.height + 'px'};
  padding: 20px;
`;

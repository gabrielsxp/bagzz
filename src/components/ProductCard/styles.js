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
  margin-bottom: 10px;
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

export const CardOldPrice = styled.Text`
  font-size: 16px;
  line-height: 18px;
  font-weight: bold;
  text-decoration: line-through;
  color: #848484;
`;

export const CardPrice = styled.Text`
  font-size: 16px;
  line-height: 18px;
  font-weight: bold;
  color: black;
`;

export const DiscountWrapper = styled.View`
  position: absolute;
  top: 5px;
  right: 5px;
  height: 30px;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-horizontal: 5px;
`;

export const DiscountPrice = styled.Text`
  font-size: 12px;
  color: white;
  font-weight: bold;
  line-height: 12px;
`;
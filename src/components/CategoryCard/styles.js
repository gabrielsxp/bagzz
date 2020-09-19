import styled from 'styled-components/native';


export const Container = styled.TouchableOpacity`
  flexGrow: 1;
  width: 40%;
  justify-content: flex-end;
  align-items: flex-end;
  flex-direction: column;
  height: 225px;
  background: #F1F1F1;
  padding-left: 20px;
  overflow: hidden;
`;

export const Image = styled.Image`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  aspectRatio: 1;
`;

export const CategoryText = styled.Text`
  font-weight: bold;
  font-size: 16px;
  line-height: 21px;
  color: #FBFBFB;
  align-self: flex-end;
  padding-vertical: 8px;
  padding-horizontal: 12px;
  backgroundColor: #000000;
`;
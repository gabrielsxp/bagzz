import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  padding: 10px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ForgotPasswordLink = styled.Text`
  font-size: 14px;
  color: black;
  text-decoration: underline;
`;

export const InputTextWrapper = styled.View`
  border-width: 2px;
  border-color: #000000;
  padding: 2px;
  margin-top: 10px;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-right: 10px;
`;

export const SignInText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #ffffff;
  text-transform: uppercase;
`;

export const SignInButton = styled.TouchableOpacity`
  width: 100%;
  background-color: #000000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin-top: 10px;
`;

export const Loader = styled.ActivityIndicator`
  margin-top: 50px;
`;
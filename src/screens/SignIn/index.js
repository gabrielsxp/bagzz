import React, { useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Container, SignInText, Loader, InputTextWrapper, SignInButton, ForgotPasswordLink } from './styles';
import MainLogo from '../../assets/logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncActions from '../../AsyncActions';
import Api from '../../Api';


export default () => {
  const { dispatch: userDispatch } = useContext(UserContext);
  const navigation = useNavigation();

  const goto = (route) => {
    navigation.reset({
      routes: [{ name: route }]
    });
  }

  const signIn = async () => {
    setMakingLogin(true);
    const response = await Api.signIn(email, password);
    console.log(response);
    setMakingLogin(false);
    if (response.error === 1) {
      Alert.alert('Algo deu errado', response.data);
    } else {
      await AsyncActions.setToken(response.token);
      console.log('saved token: ', response.token);
      userDispatch({
        type: 'setUser',
        payload: response.user
      })
      userDispatch({
        type: 'setToken',
        payload: response.token
      });
      goto('MainTab');
    }
  }

  const [email, setEmail] = useState('a2@gmail.com');
  const [password, setPassword] = useState('123456');
  const [makingLogin, setMakingLogin] = useState(false);
  const [displayPassword, setDisplayPassword] = useState(true);

  return <Container>
    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
      <MainLogo />
    </View>
    <View style={{ flexDirection: 'column', width: '100%', alignItems: 'center', paddingHorizontal: 20 }}>
      <InputTextWrapper>
        <TextInput value={email} onChangeText={t => setEmail(t)} placeholder={'E-mail'}></TextInput>
      </InputTextWrapper>
      <InputTextWrapper>
        <TextInput value={password} onChangeText={t => setPassword(t)} secureTextEntry={displayPassword} placeholder={'Senha'}></TextInput>
        <TouchableOpacity onPress={() => setDisplayPassword(!displayPassword)}>
          <FontAwesomeIcon icon={displayPassword ? faEye : faEyeSlash} />
        </TouchableOpacity>
      </InputTextWrapper>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginVertical: 10 }}>
        <ForgotPasswordLink>Esqueceu sua senha ?</ForgotPasswordLink>
        <ForgotPasswordLink onPress={() => goto('SignUp')}>Criar uma conta</ForgotPasswordLink>
      </View>
      <SignInButton disable={makingLogin} onPress={signIn}>
        <SignInText>
          {
            makingLogin ? <Loader color="#ffffff" /> : 'Entrar'
          }
        </SignInText>
      </SignInButton>
    </View>
  </Container>
}
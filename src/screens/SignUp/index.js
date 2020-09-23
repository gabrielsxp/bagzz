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

  const signUp = async () => {
    if (password !== passwordConfirm) {
      return Alert.alert('Algo deu errado', 'Senhas não correspondem !');
    }
    setSigninUp(true);
    const response = await Api.signUp(name, email, password);
    console.log(response);
    setSigninUp(false);
    if (response.error === 0) {
      console.log(response);
      const { user, token } = response;
      userDispatch({
        type: 'setUser',
        payload: user
      });
      userDispatch({
        type: 'setToken',
        payload: token
      });
      await AsyncActions.setToken(token);
      goto('MainTab');
    } else {
      Alert.alert('Algo deu errado', response.data);
    }
  }

  const [signinUp, setSigninUp] = useState(false);
  const [name, setName] = useState('Gabriel');
  const [email, setEmail] = useState('gabrielsxp2@gmail.com');
  const [password, setPassword] = useState('qwedr7859');
  const [passwordConfirm, setPasswordConfirm] = useState('qwedr7859');
  const [displayPassword, setDisplayPassword] = useState(true);
  const [displayPasswordConfirm, setDisplayPasswordConfirm] = useState(true);

  return <Container>
    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
      <MainLogo />
    </View>
    <View style={{ flexDirection: 'column', width: '100%', alignItems: 'center', paddingHorizontal: 20 }}>
      <InputTextWrapper>
        <TextInput value={name} onChangeText={t => setName(t)} placeholder={'Seu nome'}></TextInput>
      </InputTextWrapper>
      <InputTextWrapper>
        <TextInput value={email} onChangeText={t => setEmail(t)} placeholder={'E-mail'}></TextInput>
      </InputTextWrapper>
      <InputTextWrapper>
        <TextInput value={password} onChangeText={t => setPassword(t)} secureTextEntry={displayPassword} placeholder={'Senha'}></TextInput>
        <TouchableOpacity onPress={() => setDisplayPassword(!displayPassword)}>
          <FontAwesomeIcon icon={displayPassword ? faEye : faEyeSlash} />
        </TouchableOpacity>
      </InputTextWrapper>
      <InputTextWrapper>
        <TextInput value={passwordConfirm} onChangeText={t => setPasswordConfirm(t)} secureTextEntry={displayPasswordConfirm} placeholder={'Digite sua senha novamente'}></TextInput>
        <TouchableOpacity onPress={() => setDisplayPasswordConfirm(!displayPasswordConfirm)}>
          <FontAwesomeIcon icon={displayPasswordConfirm ? faEye : faEyeSlash} />
        </TouchableOpacity>
      </InputTextWrapper>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', marginVertical: 10 }}>
        <ForgotPasswordLink onPress={() => goto('SignIn')}>Já possui conta ? Faça o Login</ForgotPasswordLink>
      </View>
      <SignInButton disabled={signinUp} onPress={signUp}>
        <SignInText>
          {
            signinUp ? <Loader color="#ffffff" /> : 'CADASTRAR'
          }
        </SignInText>
      </SignInButton>
    </View>
  </Container>
}
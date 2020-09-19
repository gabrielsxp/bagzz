import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Container, Loader } from './styles';
import MainLogo from '../../assets/logo.svg';

export default () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.reset({
      routes: [{ name: 'MainTab' }]
    })
  }, []);
  return (
    <Container>
      <MainLogo />
      <Loader width="40" height="40" color="#333333" />
    </Container>
  )
}
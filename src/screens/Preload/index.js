import React, { useEffect, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Container, Loader } from './styles';
import MainLogo from '../../assets/logo.svg';
import AsyncActions from '../../AsyncActions';
import Api from '../../Api';
import { ProductContext } from '../../contexts/ProductContext';
import { UserContext } from '../../contexts/UserContext';

export default () => {
  const navigation = useNavigation();
  const { dispatch: discountDispatch } = useContext(ProductContext);
  const { dispatch: userDispatch } = useContext(UserContext);

  useEffect(() => {

    const renovateUserToken = async () => {
      const currentToken = await AsyncActions.getToken();
      const token = await Api.renovateToken(currentToken);
      console.log('token:', token);

      if (!token) {
        navigation.reset({
          routes: [{ name: 'RegisterStack' }]
        });
      } else {
        await AsyncActions.setToken(token);
        const coupons = await Api.getUserActiveCoupons(token);
        userDispatch({
          type: 'setToken',
          payload: token
        });
        userDispatch({
          type: 'setCoupons',
          payload: coupons
        });
        navigation.reset({
          routes: [{ name: 'MainTab' }]
        });
      }
    }

    const getDiscounts = async () => {
      const discounts = await Api.getGlobalDiscounts();
      if (discounts) {
        discountDispatch({
          type: 'setDiscounts',
          payload: discounts
        })
      }
    }
    getDiscounts();
    renovateUserToken();
  }, []);
  return (
    <Container>
      <MainLogo />
      <Loader width="40" height="40" color="#333333" />
    </Container>
  )
}
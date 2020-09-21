import React, { useEffect, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Container, Loader } from './styles';
import MainLogo from '../../assets/logo.svg';
import Api from '../../Api';
import { ProductContext } from '../../contexts/ProductContext';

export default () => {
  const navigation = useNavigation();
  const { dispatch: discountDispatch } = useContext(ProductContext);

  useEffect(() => {

    const getDiscounts = async () => {
      const discounts = await Api.getGlobalDiscounts();
      console.log('discounts: ', discounts);
      if (discounts) {
        discountDispatch({
          type: 'setDiscounts',
          payload: discounts
        })
      }
      navigation.reset({
        routes: [{ name: 'MainTab' }]
      })
    }
    getDiscounts();
  }, []);
  return (
    <Container>
      <MainLogo />
      <Loader width="40" height="40" color="#333333" />
    </Container>
  )
}
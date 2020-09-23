import React, { useEffect, useContext, useState } from 'react';
import { ProductContext } from '../../contexts/ProductContext';
import { View, Image, Text } from 'react-native';
import { styles, Container, ProductsContainer, ProductPriceCheckout, ProductName, ProductDescription, ProductDescriptionSpan, ProductPrice, CheckoutText, CheckoutButton, ContainerTop, AddProductWrapper, ProductQuantityChangeButton, ProductQuantityValueWrapper, ProductQuantityValueText } from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';


export default () => {
  const { state: context } = useContext(ProductContext);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const totalPrice = context.cart.products.reduce((acc, current) => {
      acc += parseFloat(current.newPrice);
      return acc;
    }, 0);
    setTotal(totalPrice.toFixed(2));
  }, [context.cart.products]);

  return <Container>
    <ContainerTop>
      <ProductPriceCheckout><Text style={{ fontSize: 12, color: 'black' }}>Total:</Text> R$ {total}</ProductPriceCheckout>
      <CheckoutButton>
        <CheckoutText>FINALIZAR</CheckoutText>
      </CheckoutButton>
    </ContainerTop>
    <ProductsContainer contentContainerStyle={styles}>
      {
        context && context.cart.products && context.cart.products.map((product, index) => {
          return <View key={index} style={{ flexDirection: 'row', alignItems: 'center', height: 200 }}>
            <View style={{ flexDirection: 'column', width: '40%' }}>
              <Image style={{ width: '100%', height: undefined, aspectRatio: 1 }} resizeMode="contain" source={{ uri: product.image }} />
              <AddProductWrapper>
                <ProductQuantityChangeButton>
                  <FontAwesomeIcon color="#ffffff" size={12} icon={faPlus} />
                </ProductQuantityChangeButton>
                <ProductQuantityValueWrapper>
                  <ProductQuantityValueText>2</ProductQuantityValueText>
                </ProductQuantityValueWrapper>
                <ProductQuantityChangeButton>
                  <FontAwesomeIcon color="#ffffff" size={12} icon={faMinus} />
                </ProductQuantityChangeButton>
              </AddProductWrapper>
            </View>
            <View style={{ flexDirection: 'column', width: '60%', paddingHorizontal: 10 }}>
              <ProductName>{product.name}</ProductName>
              <ProductDescription>Cor: <ProductDescriptionSpan>{product.color.name}</ProductDescriptionSpan></ProductDescription>
              <ProductDescription>Tamanho: <ProductDescriptionSpan>{product.size.name}</ProductDescriptionSpan></ProductDescription>
              <ProductPrice>R$ {product.newPrice}</ProductPrice>
            </View>
          </View>
        })
      }
    </ProductsContainer>
  </Container >
}
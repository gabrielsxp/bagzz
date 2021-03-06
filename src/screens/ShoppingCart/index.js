import React, { useEffect, useContext, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { ProductContext } from '../../contexts/ProductContext';
import { View, Image, Text } from 'react-native';
import { styles, Container, ProductsContainer, RemoveProductButtonWrapper, ProductPriceDashed, ProductPriceCheckout, ProductName, ProductDescription, ProductDescriptionSpan, ProductPrice, CheckoutText, CheckoutButton, ContainerTop, AddProductWrapper, ProductQuantityChangeButton, ProductQuantityValueWrapper, ProductQuantityValueText } from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus, faMinus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import NotFound from '../../components/NotFound';
import { useNavigation } from '@react-navigation/native';


export default () => {
  const navigation = useNavigation();
  const { state: context, dispatch: productDispatch } = useContext(ProductContext);
  const [total, setTotal] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [totalWithDiscount, setTotalWithDiscount] = useState(0);
  const [resume, setResume] = useState([]);

  const incrementQuantity = (index) => {
    const cart = Object.assign({}, context.cart);
    const products = Object.assign([], context.cart.products);
    const nextQuantity = products[index].quantity + 1
    if (nextQuantity <= products[index].maxAmount) {
      products[index].quantity++
      cart.products = products
      productDispatch({
        type: 'setCart',
        payload: cart
      })
    }
  }

  const goto = (name) => {
    navigation.navigate(name, { resume });
  }

  const removeProduct = (index) => {
    const cart = Object.assign({}, context.cart);
    const products = Object.assign([], context.cart.products);
    products.splice(index, 1);
    cart.products = products;

    productDispatch({
      type: 'setCart',
      payload: cart
    });
  }

  const decrementQuantity = (index) => {
    const cart = Object.assign({}, context.cart);
    const products = Object.assign([], context.cart.products);
    const nextQuantity = products[index].quantity - 1
    console.log('next quantity: ', nextQuantity);
    console.log('max quantity: ', products[index].maxQuantity);
    console.log('quantity: ', products[index].quantity);
    if (nextQuantity >= 1) {
      products[index].quantity--
      cart.products = products
      productDispatch({
        type: 'setCart',
        payload: cart
      })
    }
  }

  useEffect(() => {
    let discounts = 0
    let resumeObj = { resumes: [], price: 0, discounts: 0 };
    const totalPrice = context.cart.products.reduce((acc, current, index) => {
      let resumeData = {};
      resumeData.product = current;
      resumeData.totalPrice = parseFloat(current.newPrice)
      resumeData.price = current.price
      resumeData.discounts = current.quantity * (current.price - current.newPrice)
      acc += current.quantity * parseFloat(current.newPrice);
      if (current.price !== current.newPrice) {
        discounts += current.quantity * (current.price - current.newPrice)
      }

      resumeObj.resumes.unshift(resumeData);
      resumeObj.price += current.quantity * parseFloat(current.newPrice);
      resumeObj.discounts += current.quantity * (current.price - current.newPrice);
      if (index === context.cart.products.length - 1) {
        resumeObj.discounts = resumeObj.discounts.toFixed(2);
      }

      return acc;
    }, 0);
    setResume(Object.assign({}, resumeObj));
    setTotalDiscount(discounts.toFixed(2));
    setTotalWithDiscount((discounts + totalPrice).toFixed(2));
    setTotal(totalPrice.toFixed(2));
  }, [context.cart.products]);

  return <Container>
    <ContainerTop>
      <View style={{ flexDirection: 'column' }}>
        {
          totalWithDiscount > total && <ProductPriceDashed>R$ {(totalWithDiscount)}</ProductPriceDashed>
        }
        {
          totalDiscount > 0 && <Text style={{ fontSize: 12, color: '#848484' }}>Descontos: R$ {totalDiscount}</Text>
        }
        <ProductPriceCheckout><Text style={{ fontSize: 12, color: 'black' }}>Total:</Text> R$ {total}</ProductPriceCheckout>
      </View>
      <CheckoutButton onPress={() => goto('CartResume')} disabled={context.cart.products.length === 0}>
        <CheckoutText>AVANÇAR</CheckoutText>
      </CheckoutButton>
    </ContainerTop>
    <ProductsContainer contentContainerStyle={styles.containerStyle}>
      {
        context && context.cart.products && context.cart.products.map((product, index) => {
          return <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginTop: index > 0 ? 40 : 0 }}>
            <View style={{ flexDirection: 'column', width: '40%' }}>
              <Image style={{ width: '100%', height: undefined, aspectRatio: 1 }} resizeMode="contain" source={{ uri: product.image }} />
              <AddProductWrapper>
                <ProductQuantityChangeButton onPress={() => decrementQuantity(index)}>
                  <FontAwesomeIcon color="#ffffff" size={12} icon={faMinus} />
                </ProductQuantityChangeButton>
                <ProductQuantityValueWrapper>
                  <ProductQuantityValueText>{product.quantity}</ProductQuantityValueText>
                </ProductQuantityValueWrapper>
                <ProductQuantityChangeButton onPress={() => incrementQuantity(index)}>
                  <FontAwesomeIcon color="#ffffff" size={12} icon={faPlus} />
                </ProductQuantityChangeButton>
              </AddProductWrapper>
            </View>
            <View style={{ flexDirection: 'column', width: '60%', paddingHorizontal: 10 }}>
              <RemoveProductButtonWrapper onPress={() => removeProduct(index)}>
                <FontAwesomeIcon icon={faTrashAlt} />
              </RemoveProductButtonWrapper>
              <ProductName>{product.name}</ProductName>
              <ProductDescription>Cor: <ProductDescriptionSpan>{product.color.name}</ProductDescriptionSpan></ProductDescription>
              <ProductDescription>Tamanho: <ProductDescriptionSpan>{product.size.name}</ProductDescriptionSpan></ProductDescription>
              {
                product.price !== product.newPrice && <ProductPriceDashed>R$ {product.price}</ProductPriceDashed>
              }
              <ProductPrice>R$ {product.newPrice}</ProductPrice>
              <Text style={{ fontSize: 12, color: 'grey' }}>Total deste produto: R$ {(product.newPrice * product.quantity).toFixed(2)}</Text>
              {
                product.price !== product.newPrice && <Text style={{ fontSize: 12, color: '#848484' }}>Total de descontos: R$ {((product.price - product.newPrice) * product.quantity).toFixed(2)}</Text>
              }
            </View>
          </View>
        })
      }
      {
        context && context.cart.products.length === 0 && <NotFound text={'Você não adicionou nenhum produto no carrinho ainda'} />
      }
    </ProductsContainer>
  </Container >
}
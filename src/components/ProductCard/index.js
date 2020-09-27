import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Container, CardTitle, CardOldPrice, CardPrice, DiscountPrice, DiscountWrapper } from './styles';
import { Image, View, Text } from 'react-native';

export default ({ title, image, price, uri, category, index, full, discount }) => {
  const navigation = useNavigation();
  const goto = (uri) => {
    navigation.navigate('Product', { uri });
  }
  const [newPrice, setNewPrice] = useState(null)
  const [discountPercentage, setDiscountPercentage] = useState(null)

  useEffect(() => {
    if (discount) {
      const { discounts } = discount
      let values = []
      if (typeof discounts['all'] === 'object') {
        const value = discounts['all'].value
        values.push(value)
      }
      if (typeof discounts[category] === 'object') {
        const value = discounts[category].value
        values.push(value)
      }
      if (typeof discounts[uri] === 'object') {
        const value = discounts[uri].value
        values.push(value)
      }
      let value = 0
      if (values.length > 0) {
        value = values.sort((a, b) => a < b)[0]
      }
      if (value > 0) {
        let newPrice = (price - (price * value)).toFixed(2)
        setNewPrice(newPrice)
        setDiscountPercentage(`-${value * 100}%`)
      }
    }
  })

  return (
    <Container style={{ marginBottom: full ? 15 : (index % 2 === 0) ? 15 : 0, marginRight: full ? 0 : (index % 2 === 0) ? 15 : 0 }} onPress={() => goto(uri)}>
      {
        discountPercentage && <DiscountWrapper>
          <DiscountPrice>{discountPercentage}</DiscountPrice>
        </DiscountWrapper>
      }
      {/* {
        title && <FavoriteIcon style={{ position: 'absolute', right: 10, top: 10 }} width="16" height="12" />
      } */}
      <Image style={{ width: 120, height: undefined, aspectRatio: 1 }} resizeMode="contain" source={{ uri: image }} />
      <CardTitle>{title}</CardTitle>
      {
        price && newPrice && <View style={{ flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <CardOldPrice>R$ {price.toLocaleString()}</CardOldPrice>
          <CardPrice>R$ {newPrice.toLocaleString()}</CardPrice>
        </View>
      }
      {
        price && !newPrice && < CardPrice ><Text style={{ fontSize: 10, color: 'black' }}>a partir de</Text> R$ {price.toLocaleString()}</CardPrice>
      }
    </Container >
  );
}
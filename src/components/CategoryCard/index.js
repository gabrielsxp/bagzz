import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Container, Image, CategoryText } from './styles';

export default ({ title, image, uri, index }) => {
  const navigation = useNavigation();
  const goto = () => {
    navigation.navigate('CategoryProduct', { category: uri });
  }
  return (
    <Container style={{ marginBottom: (index % 2 === 0) ? 15 : 0, marginRight: (index % 2 === 0) ? 15 : 0 }} onPress={() => goto()}>
      <Image resizeMode="cover" source={{ uri: image }} />
      {
        title && <CategoryText>{title}</CategoryText>
      }
    </Container>
  );
}
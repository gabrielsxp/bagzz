import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Container, CardTitle, CardLink } from './styles';
import { Image } from 'react-native';

export default ({ title, image, uri, index, full }) => {
  const navigation = useNavigation();
  const goto = (uri) => {
    navigation.navigate('Product', { uri });
  }
  return (
    <Container style={{ marginBottom: full ? 15 : (index % 2 === 0) ? 15 : 0, marginRight: full ? 0 : (index % 2 === 0) ? 15 : 0 }} onPress={() => goto(uri)}>
      {/* {
        title && <FavoriteIcon style={{ position: 'absolute', right: 10, top: 10 }} width="16" height="12" />
      } */}
      <Image style={{ width: 120, height: undefined, aspectRatio: 1 }} resizeMode="contain" source={{ uri: image }} />
      <CardTitle>{title}</CardTitle>
      {
        title && <CardLink>SHOW NOW</CardLink>
      }
    </Container>
  );
}
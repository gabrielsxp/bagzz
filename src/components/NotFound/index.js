import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ActionButton, ProductTitle } from './styles';
import { View, Text } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

export default ({ text }) => {
  const navigation = useNavigation();

  return <View style={{ width: '100%', marginTop: 40, justifyContent: 'center', alignItems: 'center' }}>
    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
      <FontAwesomeIcon size={50} icon={faTimesCircle}></FontAwesomeIcon>
      <ProductTitle style={{ marginTop: 20, textAlign: 'center' }}>{text}</ProductTitle>
      <ActionButton style={{ marginTop: 20 }} onPress={() => navigation.navigate('Home')}>
        <Text style={{ fontSize: 16, textTransform: 'uppercase', lineHeight: 18, color: 'black', fontWeight: 'bold' }}>
          Voltar
        </Text>
      </ActionButton>
    </View>
  </View>
}
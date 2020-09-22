import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { styles } from './styles'

export const Slide = ({ title, image, cover = true, navigate }) => {
  const navigation = useNavigation();

  const goto = () => {
    if (navigate) {
      console.log(navigate);
      const { name, products, banner } = navigate;
      navigation.navigate(name, { products, banner });
    }
  }

  return (
    <TouchableOpacity onPress={goto} style={styles.slide}>
      <Image resizeMode={cover ? 'cover' : 'contain'} source={{ uri: `${image}` }} style={styles.image} />
      {
        typeof title !== 'undefined' && title !== '' && <View style={styles.containerText}>
          {
            title.split(',').map((excerpt, index) => {
              return <Text key={index}>
                <Text style={{ ...styles.slideText }}>
                  {excerpt}
                </Text>
              </Text>
            })
          }
        </View>
      }
    </TouchableOpacity>
  );
}

export default Slide;
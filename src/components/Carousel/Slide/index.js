import React from 'react'
import { View, Text, Image } from 'react-native'
import { styles } from './styles'

export const Slide = ({ title, image, cover = true }) => {

  return (
    <View style={styles.slide}>
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
    </View>
  );
}

export default Slide;
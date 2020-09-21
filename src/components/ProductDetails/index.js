import React from 'react';
import Modal from 'react-native-modal';
import { Dimensions, Text, View, TouchableOpacity } from 'react-native';
import { BlurView } from '@react-native-community/blur'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

export default ({ details, show, toggle }) => {
  const deviceHeight = Dimensions.get('window').height;

  return <Modal hideModalContentWhileAnimating={false} swipeThreshold={0.3 * deviceHeight} onBackdropPress={toggle} onSwipeComplete={toggle} swipeDirection={['down']} style={{ justifyContent: 'flex-end', margin: 0 }} hasBackdrop={false} isVisible={show}>

    <View
      style={{ height: 0.7 * deviceHeight, width: '100%', borderTopLeftRadius: 80, borderTopRightRadius: 80, padding: 20 }}
    >
      <BlurView
        blurType="light"
        style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }}
        blurAmount={3}
        blurRadius={5} />
      <View style={{ width: 125, position: 'absolute', top: 10, borderColor: '#3E3E3E', borderWidth: 2, borderRadius: 22, left: '35%' }} ></View>
      <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', width: '100%' }}>
        <Text style={{ fontSize: 24, color: 'black', fontWeight: 'bold' }}>Detalhes</Text>
        <TouchableOpacity onPress={() => toggle()}>
          <FontAwesomeIcon onP icon={faChevronDown} size={20} />
        </TouchableOpacity>
      </View>
      <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'column', width: '100%', marginTop: 10 }}>
        <Text style={{ fontSize: 14, color: 'black', fontWeight: 'bold' }}>Descrição</Text>
        <Text style={{ fontSize: 16, lineHeight: 18, color: 'black' }}>{details.description}</Text>
      </View>
    </View>
  </Modal>
}
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  slide: {
    paddingBottom: 10,
    paddingTop: 30,
    flexBasis: '100%',
    flex: 1,
    maxWidth: '100%',
    height: 250,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'flex-end'
  },
  image: {
    width: '100%',
    aspectRatio: 4 / 3
  },
  containerText: {
    position: 'absolute',
    height: '100%',
    right: 20,
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: '100%'
  },
  slideText: {
    textAlign: 'right',
    fontSize: 28,
    fontWeight: 'bold',
    backgroundColor: 'white',
    textTransform: 'uppercase'
  },
});

export default styles;
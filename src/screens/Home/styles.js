import styled from 'styled-components/native';
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  containerStyle: {
    paddingTop: 20,
    paddingBottom: 100,
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'visible'
  }
});

export const ContainerCheckAll = styled.View`
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding-vertical: 20px;
`;

export const ContainerSection = styled.View`
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
  justify-content: flex-start;
  padding-vertical: 20px;
`;

export const CheckAllButton = styled.TouchableOpacity`
  align-self: center;
  border-width: 2px;
  border-color: #000000;
  padding-horizontal: 20px;
  padding-vertical: 10px;
  justify-content: center;
  align-items: center;
`;

export const CheckAllButtonText = styled.Text`
  font-size: 16px;
  line-height: 19px;
  font-weight: bold;
  text-transform: uppercase;
`;

export const Container = styled.SafeAreaView`
  background-color: #FFFFFF;
  flex: 1;
  padding: 10px;
`;

export const LoadingContainer = styled.View`
  background: #e0e0e0;
  height: 250px;
  width: 100%;
`;

export const Scroller = styled.ScrollView`
    flex: 1;
`;

export const SectionText = styled.Text`
  font-weight: bold;
  font-size: 24px;
  line-height: 30px;
  color: black;
  text-align: left;
`;

export const CategoriesContainer = styled.ScrollView`
  flex-grow: 1;
`;
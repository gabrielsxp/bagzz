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

export const ProductTitle = styled.Text`
  font-size: 22px;
  line-height: 26px;
  font-weight: bold;
  color: black;
  margin-top: 20px;
`;

export const ProductDashed = styled.Text`
  font-size: 18px;
  line-height: 20px;
  font-weight: bold;
  text-decoration: line-through;
  color: #848484;
`;

export const ProductPrice = styled.Text`
  font-size: 22px;
  line-height: 24px;
  font-weight: bold;
  color: black;
`;

export const ProductDescription = styled.Text`
  font-size: 14px;
  line-height: 16px;
  color: #848484;
`;

export const ProductSectionDescription = styled.Text`
  font-size: 14px;
  line-height: 16px;
  color: #333333;
  font-weight: bold;
`;

export const ColorWrapper = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  border-width: 2px;
  border-color: ${props => props.selected ? '#38ace1' : '#848484'};
  margin-right: 10px;
`;
export const ColorCircle = styled.TouchableOpacity`
  width: 25px;
  height: 25px;
  border-radius: 100px;
  border-width: 1px;
  border-color: #dedede;
  background-color: ${props => props.color};
`;

export const SizeWrapper = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border-width: 2px;
  border-color: ${props => props.selected ? '#38ace1' : '#848484'};
  margin-right: 10px;
`;
export const SizeText = styled.Text`
  font-size: 18px;
  line-height: 18px;
  font-weight: bold;
  color: ${props => props.selected ? '#38ace1' : '#848484'};
`;

export const ActionButton = styled.TouchableOpacity`
  width: ${props => props.full ? '100%' : '48%'};
  border-width: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${props => props.full ? '4px' : '10px'};
  margin-top: ${props => props.full ? '15px' : '0px'};
  border-color: ${props => props.border ?? 'black'};
  background-color: ${props => props.background ?? 'white'};
`;

export const FavoriteButton = styled.TouchableOpacity`
  position: absolute;
  left: 10px;
  bottom: -20px;
  width: 50px;
  height: 50px;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-width: 2px;
  border-color: ${props => props.added ? '#ef233c' : 'black'};
`;
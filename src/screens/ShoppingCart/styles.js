import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  containerStyle: {
    paddingTop: 10,
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

export const Container = styled.SafeAreaView``;

export const ProductsContainer = styled.ScrollView`
  flex-grow: 1;
  height: ${props => props.height ? props.height + 'px' : '100%'};
`;

export const ProductName = styled.Text`
  font-size: 18px;
  color: black;
  font-weight: bold;
`;

export const ProductDescription = styled.Text`
  font-size: 16px;
  color: black;
  font-weight: bold;
`;

export const ProductDescriptionSpan = styled.Text`
  font-size: 16px;
  color: #333333;
`;

export const ProductPriceDashed = styled.Text`
  font-size: 16px;
  color: #848484;
  font-weight: bold;
  margin-top: 20px;
  text-decoration: line-through;
`;

export const ProductPrice = styled.Text`
  font-size: 20px;
  color: #000000;
  font-weight: bold;
`;

export const ProductPriceCheckout = styled.Text`
  font-size: 20px;
  color: black;
  font-weight: bold;
`;

export const ContainerTop = styled.View`
  width: 100%;
  padding: 5px;
  background-color: white;
  border-bottom-width: 1px;
  border-bottom-color: #848484;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const CheckoutButton = styled.TouchableOpacity`
  width: 60%;
  background-color: black;
  justify-content: center;
  align-items: center;
  padding-vertical: 5px;
  padding-horizontal: 10px;
`;

export const CheckoutText = styled.Text`
  font-size: 18px;
  text-transform: uppercase;
  font-weight: bold;
  color: white;
`;

export const AddProductWrapper = styled.View`
  flex: 1;
  margin-horizontal: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

export const ProductQuantityChangeButton = styled.TouchableOpacity`
  width: 30%;
  height: 30px;
  background: black;
  justify-content: center;
  align-items: center;
`;

export const ProductQuantityValueWrapper = styled.View`
  width: 30%;
  height: 30px;
  align-items: center;
  background-color: white;
  justify-content: center;
`;

export const ProductQuantityValueText = styled.Text`
  font-size: 16px;
  color: black;
`;

export const RemoveProductButtonWrapper = styled.TouchableOpacity`
  align-self: flex-end;
  background-color: transparent;
  width: 40px;
  height: 40px;
  border-width: 2px;
  border-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
`;
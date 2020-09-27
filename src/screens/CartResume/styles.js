import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  containerStyle: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingBottom: 80
  }
});

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const ProductsContainer = styled.ScrollView``;

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

export const Ruler = styled.View`
  height: 1px;
  background-color: transparent;
  border-top-width: 1px
  border-top-color: #848484;
  width: 100%;
  margin-vertical: 10px
`;

export const ProductPriceCheckout = styled.Text`
  font-size: 20px;
  color: black;
  font-weight: bold;
`;

export const Loader = styled.ActivityIndicator``;

export const ContainerTop = styled.View`
  width: 100%;
  padding-horizontal: 10px;
  padding-vertical: 10px;
  background-color: white;
  border-bottom-width: 1px;
  border-bottom-color: #848484;
  flex-direction: row;
  align-items: center;
  margin-bottom: 0px;
  justify-content: space-between;
`;

export const OrderButton = styled.TouchableOpacity`
  flex: 1
  background-color: ${props => props.disabled ? 'rgba(0,0,0,0.5)' : 'black'};
  justify-content: center;
  align-items: center;
  padding-vertical: 5px;
  padding-horizontal: 10px;
`;

export const CheckoutButton = styled.TouchableOpacity`
  width: 20%;
  height: 54px;
  border-width: 2px;
  border-color: ${props => props.disabled ? 'rgba(255,255,255,0.5)' : 'black'};
  background-color: ${props => props.disabled ? 'rgba(255,255,255,0.5)' : 'transparent'};
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

export const CheckoutTextDark = styled.Text`
  font-size: 18px;
  text-transform: uppercase;
  font-weight: bold;
  color: black;
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

export const PostalCodeInput = styled.View`
  align-self: flex-start;
  border-color: black;
  border-width: 2px;
  padding: 0px;
  width: 38%;
`;

export const CouponInput = styled.View`
  align-self: flex-start;
  border-color: black;
  border-width: 2px;
  padding: 0px;
  width: 78%;
`;

export const DiscountContainer = styled.View`
  padding: 15px;
  background-color: rgba(56, 172, 225, 0.2);
  border-width: 1px;
  border-color: #38ace1;
  border-radius: 5px;
  margin: 10px;
`;

export const DiscountText = styled.Text`
  font-size: 16px;
  line-height: 18px;
  color: #38ace1;
`;

export const DiscountTextSpan = styled.Text`
  font-size: 18px;
  line-height: 20px;
  color: #38ace1;
  font-weight: bold;
`;
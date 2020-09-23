import React, { useEffect, useState, useContext } from 'react';
import { ProductContext } from '../../contexts/ProductContext';
import { TabArea, TabIcon, CartCounterWrapper, CartCounterText } from './styles';
import HomeIcon from '../../assets/home.svg';
import SearchIcon from '../../assets/search.svg';
import FavoriteIcon from '../../assets/favorite.svg';
import CartIcon from '../../assets/shopping_cart.svg';

export default ({ state, navigation }) => {

  const { state: context } = useContext(ProductContext);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    console.log('rodei fi');
    console.log(context);
    setTotalProducts(context.cart.products.length);
  }, [context.cart.products]);

  const goto = (screenName) => {
    console.log(screenName);
    navigation.navigate(screenName);
  }

  return (
    <TabArea>
      <TabIcon onPress={() => goto('Home')}>
        <HomeIcon width="20" height="20" fill="#000000" />
      </TabIcon>
      <TabIcon onPress={() => goto('Search')}>
        <SearchIcon width="20" height="20" fill="#000000" />
      </TabIcon>
      <TabIcon onPress={() => goto('Home')}>
        <FavoriteIcon width="20" height="20" fill="#000000" />
      </TabIcon>
      <TabIcon onPress={() => goto('CartStack')}>
        <CartIcon width="20" height="20" fill="#000000" />
        {
          totalProducts > 0 && <CartCounterWrapper>
            <CartCounterText>{totalProducts}</CartCounterText>
          </CartCounterWrapper>
        }
      </TabIcon>
    </TabArea>
  );
}
import React from 'react';
import { TabArea, TabIcon } from './styles';
import HomeIcon from '../../assets/home.svg';
import SearchIcon from '../../assets/search.svg';
import FavoriteIcon from '../../assets/favorite.svg';
import CartIcon from '../../assets/shopping_cart.svg';

export default ({ state, navigation }) => {

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
      <TabIcon onPress={() => goto('Home')}>
        <CartIcon width="20" height="20" fill="#000000" />
      </TabIcon>
    </TabArea>
  );
}
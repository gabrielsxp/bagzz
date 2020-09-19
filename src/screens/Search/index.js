import React, { useState, useEffect } from 'react';
import CloseIcon from '../../assets/close.svg';
import { Container, IconContainer, InputContainer, Input, Results, SearchResult, SearchResultWrapper, Searching, Loading } from './styles';
import { useNavigation } from '@react-navigation/native';
import Api from '../../Api';

export default () => {
  const navigation = useNavigation();
  const [value, setValue] = useState('');
  const [products, setProducts] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const search = async () => {
    const name = value
    setLoadingSearch(true)
    const products = await Api.searchProductsByName(name)
    setProducts(products);
    setLoadingSearch(false)
  }
  const resetSearch = () => {
    setLoadingSearch(false)
    setValue('')
    setProducts([]);
  }
  const goto = (route, uri) => {
    return navigation.navigate(route, { uri });
  }
  return (
    <Container>
      <InputContainer>
        {
          value !== '' && <IconContainer>
            <CloseIcon onPress={() => resetSearch()} width="38" height="38" fill="#000000" />
          </IconContainer>
        }
        <Input onEndEditing={search} placeholder="Digite sua busca" placeholderTextColor="rgba(0,0,0,0.5)" value={value} onChangeText={v => setValue(v)} />
      </InputContainer>
      {
        loadingSearch && <Searching>
          <Loading width="30" height="30" color="#000000" />
        </Searching>
      }
      <Results>
        {
          products && products.length > 0 && products.map((product, index) => {
            return <SearchResultWrapper key={index} onPress={() => goto('Product', product._id)}>
              <SearchResult>{product.name}</SearchResult>
            </SearchResultWrapper>
          })
        }
        {
          products && products.length === 0 && products && <SearchResult>No products found</SearchResult>
        }
      </Results>
    </Container>
  );
}
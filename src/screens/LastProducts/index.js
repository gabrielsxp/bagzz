import React, { useEffect, useState, useContext } from 'react';
import { ProductContext } from '../../contexts/ProductContext';
import ProductCard from '../../components/ProductCard';
import { Container, ProductsContainer, styles, ContainerCheckAll, CheckAllButton, CheckAllButtonText } from './styles';
import Api from '../../Api';

export default ({ route }) => {
  const { state: discounts } = useContext(ProductContext);
  const [endOfList, setEndOfList] = useState(false);
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const getProducts = async () => {
    setLoadingProducts(true);

    let currentPage = page
    const p = await Api.getProducts(currentPage);
    if (p.length === 0) {
      setEndOfList(true);
    }

    currentPage++;
    setPage(currentPage);
    setLoadingProducts(false);
    const currentProducts = products;
    let newProducts = Object.assign([], [...currentProducts, ...p]);
    setProducts(newProducts);
  }
  useEffect(() => {
    getProducts();
  }, []);

  return < Container >
    <ProductsContainer contentContainerStyle={styles}>
      {
        loadingProducts && Array.from(new Array(10)).map((_, index) => {
          return <ProductCard full={true} key={index} />
        })
      }
      {
        products && products.length > 0 && products.map((product, index) => {
          return <ProductCard
            index={index}
            key={index}
            title={product.name}
            image={product.mainImage}
            uri={product._id}
            price={product.price}
            category={product.category}
            discount={discounts}
          />
        })
      }
      {
        !endOfList && <ContainerCheckAll>
          <CheckAllButton disabled={loadingProducts} onPress={() => getProducts()}>
            <CheckAllButtonText>
              {loadingProducts ? 'CARREGANDO' : endOfList ? 'SEM MAIS PRODUTOS NO MOMENTO' : 'CARREGAR MAIS'}
            </CheckAllButtonText>
          </CheckAllButton>
        </ContainerCheckAll>
      }
    </ProductsContainer>
  </Container >
}
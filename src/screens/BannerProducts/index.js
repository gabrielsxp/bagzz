import React, { useEffect, useState, useContext } from 'react';
import NotFound from '../../components/NotFound';
import { ProductContext } from '../../contexts/ProductContext';
import ProductCard from '../../components/ProductCard';
import { Container, ProductsContainer, styles, ContainerCheckAll, CheckAllButton, CheckAllButtonText } from './styles';

export default ({ route }) => {
  const { state: discounts } = useContext(ProductContext);
  const [products, setProducts] = useState([]);
  const [banner, setBanner] = useState(null);
  useEffect(() => {
    setProducts(route.params.products);
    setBanner(route.params.banner);
  }, []);

  return < Container >
    <ProductsContainer contentContainerStyle={styles}>
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
            banner={banner}
            discount={discounts}
            full={true}
          />
        })
      }
      {
        products.length === 0 && <NotFound text={'Sem produtos cadastrados nesse banner'} />
      }
    </ProductsContainer>
  </Container >
}
import React, { useEffect, useState } from 'react';
import { RefreshControl } from 'react-native';
import { Container, LoadingContainer, Scroller, CategoriesContainer, styles, ContainerSection, SectionText, ContainerCheckAll, CheckAllButton, CheckAllButtonText } from './styles';
import Carousel from '../../components/Carousel';
import ProductCard from '../../components/ProductCard';
import CategoryCard from '../../components/CategoryCard';
import Api from '../../Api';
import { useNavigation } from '@react-navigation/native';

export default () => {
  const [banners, setBanners] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  RefreshControl
  const navigator = useNavigation();
  const buscarTudo = async () => {
    let promises = []
    const getBanners = () => {
      return Api.getBanners();
    }
    const getProducts = () => {
      return Api.getLastProducts();
    }
    const getCategories = () => {
      return Api.getCategories();
    }
    promises.push(getBanners())
    promises.push(getProducts())
    promises.push(getCategories());
    setRefreshing(true);
    try {
      const response = await Promise.all(promises)
      if (response) {
        const banners = response[0].banners
        const products = response[1].products
        const categories = response[2].categories

        setBanners(banners);
        setProducts(products);
        setCategories(categories);

        setRefreshing(false);
      }
    } catch (error) {
      console.warn(error);
      setRefreshing(false);
    }
  }
  useEffect(() => {
    buscarTudo();
  }, []);
  const onRefresh = () => {
    buscarTudo();
  }
  const changeStack = (stackName) => {
    navigator.navigate(stackName);
  }
  return (
    <Container>
      <Scroller refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
        <CategoriesContainer contentContainerStyle={styles.containerStyle}>
          {
            refreshing ? <LoadingContainer /> :
              <Carousel
                itemsPerInterval={1}
                showBullets={true}
                items={banners}
              />
          }
          {
            refreshing && Array.from(new Array(4)).map((_, index) => {
              return <ProductCard key={index} index={index} />
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
              />
            })
          }
          <ContainerCheckAll>
            <CheckAllButton onPress={() => changeStack('ProductsStack')}>
              <CheckAllButtonText>
                TODOS OS LANÇAMENTOS
            </CheckAllButtonText>
            </CheckAllButton>
          </ContainerCheckAll>

          <ContainerSection>
            <SectionText>
              Conheças nossas categorias
          </SectionText>
          </ContainerSection>
          {
            refreshing && Array.from(new Array(4)).map((_, index) => {
              return <CategoryCard
                index={index}
                key={index}
              />
            })
          }
          {
            categories && categories.length > 0 && categories.map((category, index) => {
              return <CategoryCard
                index={index}
                key={index}
                title={category.name}
                image={category.image}
                uri={category.name}
              />
            })
          }
          <ContainerCheckAll>
            <CheckAllButton>
              <CheckAllButtonText onPress={() => changeStack('CategoriesStack')}>
                TODAS AS CATEGORIAS
            </CheckAllButtonText>
            </CheckAllButton>
          </ContainerCheckAll>
        </CategoriesContainer>
      </Scroller>
    </Container >
  );
}
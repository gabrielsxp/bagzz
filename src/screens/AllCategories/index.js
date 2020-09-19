import React, { useEffect, useState } from 'react';
import CategoryCard from '../../components/CategoryCard';
import { Container, CategoriesContainer, styles, ContainerCheckAll, CheckAllButton, CheckAllButtonText } from './styles';
import Api from '../../Api';

export default () => {
  const [endOfList, setEndOfList] = useState(false);
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const getCategories = async () => {
    setLoadingCategories(true);

    let currentPage = page
    const c = await Api.getCategories(currentPage);
    console.log(c.categories);
    if (c.categories.length === 0) {
      setEndOfList(true);
    }

    currentPage++;
    setPage(currentPage);
    setLoadingCategories(false);
    const currentCategories = categories;
    let newCategories = Object.assign([], [...currentCategories, ...c.categories]);
    setCategories(newCategories);
  }
  useEffect(() => {
    getCategories();
  }, []);

  return <Container>
    <CategoriesContainer contentContainerStyle={styles.containerStyle}>
      {
        loadingCategories && Array.from(new Array(6)).map((_, index) => {
          return <CategoryCard key={index} index={index} />
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
      {
        !endOfList && <ContainerCheckAll>
          <CheckAllButton disabled={loadingCategories} onPress={() => getCategories()}>
            <CheckAllButtonText>
              {loadingCategories ? 'CARREGANDO' : endOfList ? 'SEM MAIS CATEGORIES NO MOMENTO' : 'CARREGAR MAIS'}
            </CheckAllButtonText>
          </CheckAllButton>
        </ContainerCheckAll>
      }
    </CategoriesContainer>
  </Container >
}
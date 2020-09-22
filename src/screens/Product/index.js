import React, { useEffect, useState, useContext } from 'react';
import { ProductContext } from '../../contexts/ProductContext';
import { RefreshControl, View, Text, TextInput } from 'react-native';
import { Container, Scroller, LoadingContainer, FavoriteButton, PostalCodeInput, ProductTitle, ActionButton, ProductSectionDescription, SizeWrapper, SizeText, ColorWrapper, ColorCircle, ProductPrice, ProductDashed, ProductDescription } from './styles';
import { useNavigation } from '@react-navigation/native';
import Carousel from '../../components/Carousel';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faRulerVertical, faRulerHorizontal, faRulerCombined, faHeart } from '@fortawesome/free-solid-svg-icons'
import ProductDetails from '../../components/ProductDetails';
import NotFound from '../../components/NotFound';
import Api from '../../Api'
import AsyncActions from '../../AsyncActions';

export default ({ route }) => {
  const navigation = useNavigation();
  const { state: discount } = useContext(ProductContext);
  const [originalPrice, setOriginalPrice] = useState(0);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [productSizes, setProductSizes] = useState({
    x: 0,
    y: 0,
    z: 0
  });
  const [product, setProduct] = useState({});
  const [favoriteAdded, setFavoriteAdded] = useState(false);
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentSizeIndex, setCurrentSizeIndex] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [productDetails, setProductDetails] = useState({});
  const [displayProductDetails, setDisplayProductDetails] = useState(false);

  useEffect(() => {
    checkFavorite(route.params.uri)
    getStock();
  }, [route.params.uri]);

  const getStock = async () => {
    setRefreshing(true);
    try {
      const { uri: uid } = route.params;
      const stocks = await Api.getStock(uid);
      if (stocks.length > 0) {
        const { product } = stocks[0]
        setProduct(product);
        setOriginalPrice(product.price)
        const imgs = stocks.reduce((acc, a, index) => {
          acc[index] = a.images
          return acc;
        }, {});
        setImages(imgs);

        setColors(getColors(stocks));
        setSizes(getSizes(stocks));

        defineProductSizes(stocks[0].size, 0, { colors: getColors(stocks), sizes: getSizes(stocks), product });

        const sizes = getSizes(stocks);
        console.log(product);
        setProductDetails({
          description: product.description,
          x: 20,
          y: 20,
          z: 20,
          weight: product.weight,
        })

      } else {
        setProduct(null);
      }
      setRefreshing(false);
    } catch (error) {
      console.log(error);
      setRefreshing(false);
    }
  }

  const onRefresh = () => {
    getStock()
  }

  const checkFavorite = async (productId) => {
    const isFavorited = await AsyncActions.isProductFavorited(productId);
    setFavoriteAdded(isFavorited);
  }

  const addProductToFavorites = async () => {
    const productId = route.params.uri
    const finishedAction = await AsyncActions.addToFavorites(productId);
    setFavoriteAdded(finishedAction);
  }

  const removeProductOfTheFavorites = async () => {
    const productId = route.params.uri;
    const finishedAction = await AsyncActions.removeFavorite(productId);
    setFavoriteAdded(finishedAction);
  }

  const getNewPrice = (price, percentage, start) => {
    const p = start
    let value = 0;
    if (discount) {
      const { discounts } = discount;
      let values = [];
      if (typeof discounts['all'] === 'object') {
        const value = discounts['all'].value;
        values.push(value);
      }
      if (typeof discounts[p.category] === 'object') {
        const value = discounts[p.category].value;
        values.push(value);
      }
      if (typeof discounts[p._id] === 'object') {
        const value = discounts[p._id].value;
        values.push(value);
      }
      if (values.length > 0) {
        console.log(values);
        value = values.sort((a, b) => b - a)[0];
      }
    }
    const factor = 1 + percentage;
    if (value > 0) {
      console.log(price, percentage, value, factor, price * value * factor);
      return (price - (price * value * factor)).toFixed(2);
    } else {
      return (price * factor).toFixed(2);
    }
  }

  const getColors = (stocks) => {
    const colors = stocks.reduce((acc, current) => {
      const color = current.color
      acc.push(color);
      return acc;
    }, []);
    console.log(colors);
    return colors;
  }

  const getSizes = (stocks) => {
    const sizes = stocks.reduce((acc, current) => {
      const size = current.size;
      acc.unshift(size);
      return acc;
    }, []);

    return sizes;
  }

  const defineProductSizes = (size, index, start = null) => {
    const sizes = {
      x: size.chest,
      y: size.waist,
      z: size.hips
    }
    setCurrentSizeIndex(index);
    setProductSizes(Object.assign({}, sizes));
    if (start) {
      calculateFlutuation(0, 0, { colors: start.colors, sizes: start.sizes, product: start.product });
    } else {
      calculateFlutuation(currentIndex, index);
    }
  }

  const changeImages = (index) => {
    setCurrentIndex(index);
    calculateFlutuation(index, currentSizeIndex);
  }

  const calculateFlutuation = (colorIndex, sizeIndex, data = null) => {
    let factors = 0;
    let p = product;
    let currentPriceUpdated = 0
    if (data) {
      factors = data.colors[colorIndex].valueFlutuation + data.sizes[sizeIndex].valueFlutuation;
      p = data.product;
      currentPriceUpdated = ((1 + factors) * p.price).toFixed(2);
    } else {
      factors = colors[colorIndex].valueFlutuation + sizes[sizeIndex].valueFlutuation;
      currentPriceUpdated = ((1 + factors) * originalPrice).toFixed(2);
      console.log(currentPriceUpdated);
    }
    let currentProduct = Object.assign({}, p);
    currentProduct = { ...currentProduct, price: currentPriceUpdated, newPrice: getNewPrice(currentPriceUpdated, factors, currentProduct) };
    setProduct(Object.assign({}, currentProduct));
  }

  const toggleDetailsModal = () => {
    setDisplayProductDetails(!displayProductDetails);
  }

  return <Container>
    {
      !refreshing && product && <Scroller refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
        {
          refreshing && <LoadingContainer />
        }
        {
          !refreshing && images && images[currentIndex] && <View>
            <Carousel
              itemsPerInterval={1}
              showBullets={true}
              onlyImages={true}
              items={images[currentIndex]}
            />
            <FavoriteButton added={favoriteAdded} onPress={() => favoriteAdded ? removeProductOfTheFavorites() : addProductToFavorites()}>
              <FontAwesomeIcon style={{ color: favoriteAdded ? '#ef233c' : 'black' }} size={20} icon={faHeart}></FontAwesomeIcon>
            </FavoriteButton>
          </View>
        }
        {
          product && product.price && <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ width: '60%', flexDirection: 'column', alignItems: 'flex-start' }}>
              <ProductTitle>
                {product.name}
              </ProductTitle>
              <ProductDescription>
                Ref: {product._id}
              </ProductDescription>
            </View>
            <View style={{ width: '40%', flexDirection: 'column', alignItems: 'flex-end', marginTop: 10 }}>
              {
                product.price && product.newPrice && product.price > product.newPrice && < ProductDashed >
                  R$ {product.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </ProductDashed>
              }
              {
                product && product.newPrice && <ProductPrice>
                  R$ {product.newPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </ProductPrice>
              }
            </View>
          </View>
        }
        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ width: '70%', flexDirection: 'column' }}>
            {
              colors && colors.length > 0 && <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: 10 }}>
                <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                  <ProductSectionDescription>Colors</ProductSectionDescription>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, width: '100%' }}>
                    {
                      colors.map((color, index) => {
                        return <ColorWrapper selected={currentIndex === index} onPress={() => changeImages(index)} key={index}>
                          <ColorCircle onPress={() => changeImages(index)} color={color.hex} />
                        </ColorWrapper>
                      })
                    }
                  </View>
                </View>
              </View>
            }
            {
              sizes && sizes.length > 0 && <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: 10 }}>
                <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                  <ProductSectionDescription>Sizes</ProductSectionDescription>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, width: '100%' }}>
                    {
                      sizes.map((size, index) => {
                        return <SizeWrapper selected={currentSizeIndex === index} onPress={() => defineProductSizes(size, index)} key={index}>
                          <SizeText selected={currentSizeIndex === index}>
                            {size.name}
                          </SizeText>
                        </SizeWrapper>
                      })
                    }
                  </View>
                </View>
              </View>
            }
          </View>
          <View style={{ width: '30%', flexDirection: 'column' }}>
            <ProductSectionDescription style={{ marginBottom: 20 }}>Medidas</ProductSectionDescription>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <FontAwesomeIcon style={{ fontSize: 30, color: '#848484' }} icon={faRulerHorizontal}></FontAwesomeIcon>
              <ProductSectionDescription>{productSizes.x} cm</ProductSectionDescription>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between', alignItems: 'center' }}>
              <FontAwesomeIcon style={{ fontSize: 30, color: '#848484' }} icon={faRulerVertical}></FontAwesomeIcon>
              <ProductSectionDescription>{productSizes.y} cm</ProductSectionDescription>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between', alignItems: 'center' }}>
              <FontAwesomeIcon style={{ fontSize: 30, color: '#848484' }} icon={faRulerCombined}></FontAwesomeIcon>
              <ProductSectionDescription>{productSizes.z} cm</ProductSectionDescription>
            </View>
            <ActionButton onPress={() => setDisplayProductDetails(true)} full={true}>
              <Text style={{ fontSize: 12, textTransform: 'uppercase', lineHeight: 18, color: 'black', fontWeight: 'bold' }}>
                Detalhes
              </Text>
            </ActionButton>
          </View>
        </View>
        <View style={{ width: '100%', marginTop: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <ActionButton>
            <Text style={{
              fontSize: 16, textTransform: 'uppercase', lineHeight: 18, color: 'black', fontWeight: 'bold'
            }}>
              + carrinho
              </Text>
          </ActionButton>
          <ActionButton background={'black'}>
            <Text style={{ fontSize: 16, textTransform: 'uppercase', lineHeight: 18, color: 'white', fontWeight: 'bold' }}>
              Comprar
              </Text>
          </ActionButton>
        </View>
      </Scroller >
    }
    {
      !refreshing && !product && <NotFound text={'Produto sem estoque no momento'} />
    }
    {
      displayProductDetails && <ProductDetails details={productDetails} toggle={toggleDetailsModal} show={displayProductDetails} />
    }
  </Container >
}
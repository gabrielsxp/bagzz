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
  const { state: discount, dispatch: productDispatch } = useContext(ProductContext);
  const [allStocks, setAllStocks] = useState([]);
  const [originalPrice, setOriginalPrice] = useState(0);
  const [amount, setAmount] = useState(0);
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
  const [currentSizeIndex, setCurrentSizeIndex] = useState(null);
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
        const { product, amount } = stocks[0]
        setAllStocks(stocks);
        setProduct(product);
        setAmount(amount);
        setOriginalPrice(product.price)
        const imgs = stocks.reduce((acc, a, index) => {
          acc[index] = a.images
          return acc;
        }, {});
        setImages(imgs);

        const colors = getColors(stocks);
        const sizes = getSizes(stocks);
        console.log('colors: ', colors);
        setColors(colors);
        setSizes(sizes);
        console.log(sizes[colors[currentIndex]._id])

        defineProductSizes(sizes[colors[0]._id][0], 0, 0, { colors, sizes, product });
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

  const addProductToCart = () => {
    let cart = Object.assign({}, discount.cart);
    let p = { ...product, image: images[currentIndex][0], color: colors[currentIndex], size: sizes[colors[currentIndex]._id][currentSizeIndex], price: product.price, newPrice: product.newPrice < product.price ? product.newPrice : product.price, maxAmount: allStocks[currentIndex].amount, quantity: 1, stock: allStocks[currentIndex]._id };
    let products = Object.assign([], cart.products);
    if (!cart.products.find(p => p.stock === allStocks[currentIndex]._id)) {
      products = products.concat(p);
    } else {
      let index = cart.products.findIndex(p => p.stock === allStocks[currentIndex]._id)
      cart.products[index].quantity++
    }

    cart.products = Object.assign([], products);

    productDispatch({
      type: 'setCart',
      payload: cart
    })
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
        value = values.sort((a, b) => b - a)[0];
      }
    }
    const factor = 1 + percentage;
    if (value > 0) {
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
    return colors;
  }

  const getSizes = (stocks) => {
    const sizes = stocks.reduce((acc, current) => {
      if (typeof acc[current.color._id] === 'undefined') {
        acc[current.color._id] = []
      }
      acc[current.color._id].unshift(current.size);
      return acc;
    }, {});

    return sizes;
  }

  const defineProductSizes = (size, index, colorIndex, start = null) => {
    const sizes = {
      x: size.chest,
      y: size.waist,
      z: size.hips
    }
    setCurrentIndex(colorIndex);
    setCurrentSizeIndex(index);
    setProductSizes(Object.assign({}, sizes));
    if (start) {
      calculateFlutuation(0, 0, { colors: start.colors, sizes: start.sizes, product: start.product });
    } else {
      calculateFlutuation(colorIndex, index);
    }
  }

  const changeImages = (index) => {
    // calculateFlutuation(index, currentSizeIndex);
    defineProductSizes(sizes[colors[index]._id][currentSizeIndex], currentSizeIndex, index)
  }

  const calculateFlutuation = (colorIndex, sizeIndex, data = null) => {
    let factors = 0;
    let p = product;
    let currentPriceUpdated = 0
    console.log(colorIndex, sizeIndex);
    if (data) {
      console.log('data: ', data);
      let c = data.colors[colorIndex].valueFlutuation;
      let s = data.sizes[data.colors[colorIndex]._id][sizeIndex].valueFlutuation ?? 0;
      console.log('c: ', c);
      console.log('s: ', s);
      factors = c + s;
      p = data.product;
      currentPriceUpdated = ((1 + factors) * p.price).toFixed(2);
    } else {
      factors = colors[colorIndex].valueFlutuation + sizes[colors[colorIndex]._id][sizeIndex].valueFlutuation;
      console.log('factors: ', factors);
      currentPriceUpdated = ((1 + factors) * originalPrice).toFixed(2);
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
                          <Text style={{ fontSize: 30, color: 'black' }}>{index}</Text>
                          <ColorCircle onPress={() => changeImages(index)} color={color.hex} />
                        </ColorWrapper>
                      })
                    }
                  </View>
                </View>
              </View>
            }
            {
              colors && colors[currentIndex] && sizes[colors[currentIndex]._id] && sizes[colors[currentIndex]._id].length > 0 && <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: 10 }}>
                <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                  <ProductSectionDescription>Sizes</ProductSectionDescription>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, width: '100%' }}>
                    {
                      sizes[colors[currentIndex]._id].map((size, index) => {
                        return <SizeWrapper selected={currentSizeIndex === index} onPress={() => defineProductSizes(size, index, currentIndex)} key={index}>
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
          <ActionButton onPress={() => addProductToCart()}>
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
import React, { useEffect, useContext, useState } from 'react';
import { View, Alert, Text, TouchableOpacity, TextInput } from 'react-native';
import { TextInputMask } from 'react-native-masked-text'
import { Picker } from '@react-native-community/picker';
import { styles, Container, DiscountContainer, CouponInput, DiscountText, DiscountTextSpan, Ruler, Loader, OrderButton, ProductsContainer, PostalCodeInput, ProductPriceDashed, ProductPriceCheckout, ProductName, ProductDescription, ProductDescriptionSpan, ProductPrice, CheckoutText, CheckoutTextDark, CheckoutButton, ContainerTop } from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPercentage } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../../contexts/UserContext';
// import Snackbar from '../../components/Snackbar';
import Api from '../../Api';

export default ({ route }) => {
  const { state: context } = useContext(UserContext);
  const [activeOption, setActiveOption] = useState('type-coupon');
  const [selectedCoupon, setSelectedCoupon] = useState(0);
  const [gettingCoupon, setGettingCoupon] = useState(false);
  const [resume, setResume] = useState({});
  const [originalPrice, setOriginalPrice] = useState(0);
  const [originalDiscount, setOriginalDiscount] = useState(0);
  const [resumes, setResumes] = useState([]);
  const [coupon, setCoupon] = useState('');
  const [gettingPostalPrices, setGettingPostalPrices] = useState(false);
  const [postalType, setPostalType] = useState('PAC');
  const [postalPrices, setPostalPrices] = useState(null);
  const [zipCode, setZipCode] = useState('');

  useEffect(() => {
    const { resume: r } = route.params;
    const { resumes } = r;
    console.log(r);
    setResume(r);
    setOriginalPrice(r.price);
    setOriginalDiscount(r.discounts);
    setResumes(resumes);
  }, []);

  const getPostalPrices = () => {
    const data = resumes.reduce((acc, current, index) => {
      const keys = ['x', 'y', 'z', 'weight'];
      const counts = ['totalWeight', 'totalZ'];

      keys.forEach(key => {
        if (!acc[key]) {
          acc[key] = [];
        }
      });

      counts.forEach(key => {
        if (!acc[key]) {
          acc[key] = 0;
        }
      });

      const { postalX, postalY, postalZ, packageWeight } = current.product.postalData;
      console.log('postalZ: ', postalZ);
      console.log('package weight: ', packageWeight);
      acc['x'].push(postalX ?? 0);
      acc['y'].push(postalY ?? 0);
      acc['z'].push(postalZ ?? 0);
      acc['weight'].push(packageWeight ?? 0);
      acc['totalWeight'] += packageWeight ?? 0;
      acc['totalZ'] += postalZ ?? 0;

      if (index === resumes.length - 1) {
        keys.forEach(key => {
          acc[key] = acc[key].sort((a, b) => b - a)[0]
          if (key === 'z') {
            acc[key] = acc['totalZ'];
          }
        })
      }

      return acc
    }, {});

    return data;
  }

  const validateZipCode = () => {
    const zipCodeLength = zipCode.length;
    if (zipCodeLength === 9) {
      let validatedZipCode = zipCode.replace('-', '');
      return validatedZipCode;
    } else {
      return null;
    }
  }

  const createOrder = () => {
    if (postalPrices === null) {
      Alert.alert('Atenção', 'Primeiramente calcule o frete preenchendo os campos abaixo !');
    }
  }

  const pullPostalPrices = async () => {
    resetResumePrices();
    const postalCodeDestiny = validateZipCode();
    let data = getPostalPrices();
    setPostalPrices(null);
    const r = Object.assign({}, resume);
    r.price = originalPrice;
    setResume(r);

    if (postalCodeDestiny) {
      data = { ...data, postalCodeDestiny, typeOfService: postalType };
      try {
        setGettingPostalPrices(true);
        const response = await Api.getPostalPrices(data);
        setGettingPostalPrices(false);
        if (response.Erro !== "0") {
          Alert.alert('Erro', 'Erro ao obter as informações de frete no momento !');
          setPostalPrices(null);
        } else {
          const prices = {
            price: parseFloat(response.Valor).toFixed(2),
            estimatedTime: response.PrazoEntrega,
            typeOfService: postalType
          }
          const r = Object.assign({}, resume);
          let price = 0;
          price = (parseFloat(prices.price) + parseFloat(r.price)).toFixed(2);
          r.price = price
          console.log('valor total: ', r.price);
          setResume(r);

          setPostalPrices(prices);
        }
      } catch (error) {
        setGettingPostalPrices(false);
        console.log(error);
      }
    } else {
      Alert.alert('Atenção', 'Digite um CEP Válido !');
    }
  }

  const changeOption = () => {
    setActiveOption(activeOption === 'type-coupon' ? 'my-coupons' : 'type-coupon');
  }

  const applyCoupon = (c) => {
    const r = Object.assign({}, resume);
    const price = parseFloat(originalPrice);
    const postalValue = parseFloat(postalPrices ? postalPrices.price : 0);
    const discounts = parseFloat(originalDiscount);
    const discountPercentage = parseFloat(c.value);
    const totalDiscount = parseFloat(price * discountPercentage);
    const priceDiscounted = parseFloat((price + postalValue) - totalDiscount);
    console.log(priceDiscounted, discountPercentage, totalDiscount);
    console.log(typeof priceDiscounted, typeof discountPercentage, typeof totalDiscount);
    r.price = priceDiscounted.toFixed(2);

    r.discounts = (totalDiscount + discounts).toFixed(2);
    console.log('descontos: ', r.discounts);
    setResume(r);
  }

  const checkCouponConditions = (c) => {
    if (!c) {
      return Alert.alert('Atenção', 'Cupom inválido !');
    }
    if (c.minValue) {
      if (originalPrice >= c.minValue) {
        applyCoupon(c);
      } else {
        return Alert.alert('Atenção', 'O valor atual é menor que o valor mínimo para a ativação deste cupom');
      }
    } else {
      applyCoupon(c);
    }
  }

  const resetResumePrices = () => {
    const r = Object.assign({}, resume);
    r.price = originalPrice;
    r.discounts = originalDiscount;
    setResume(r);
  }

  const chooseCouponApplication = () => {
    resetResumePrices();
    setTimeout(async () => {
      let c = null
      console.log('active option: ', activeOption);
      switch (activeOption) {
        case 'my-coupons':
          console.log('selected coupon: ', selectedCoupon);
          c = Object.assign({}, context.coupons[selectedCoupon]);
          checkCouponConditions(c);
          break;

        case 'type-coupon':
          c = await findCoupon(coupon);
          console.log('cupom pego: ', c);
          if (c !== null) {
            checkCouponConditions(c);
          } else {
            Alert.alert('Atenção', 'Cupom não encontrado ou fora do prazo de utilização.');
          }
          break;
        default:
          break;
      }
    }, 1000);
  }

  const findCoupon = async () => {
    const keyword = coupon;
    setGettingCoupon(true);
    const c = await Api.findCouponByKeyword(keyword);
    setGettingCoupon(false);

    return c;
  }

  return <Container>
    <ProductsContainer contentContainerStyle={styles.containerStyle}>
      <ContainerTop>
        <View style={{ width: '40%', marginHorizontal: 10 }}>
          <ProductPriceCheckout>Resumo</ProductPriceCheckout>
        </View>
        <OrderButton onPress={() => createOrder()}>
          <CheckoutText>
            Pagar R$ {parseFloat(resume.price).toFixed(2)}
          </CheckoutText>
        </OrderButton>
      </ContainerTop>
      {
        resume.discounts > 0 && <DiscountContainer>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: '10%' }}>
              <FontAwesomeIcon style={{ color: '#38ace1' }} icon={faPercentage}></FontAwesomeIcon>
            </View>
            <View style={{ flex: 1 }}>
              <DiscountText>Você está economizando <DiscountTextSpan>R$ {resume.discounts} nessa compra !</DiscountTextSpan></DiscountText>
            </View>
          </View>
        </DiscountContainer>
      }
      <View style={{ flexDirection: 'column', justifyContent: 'flex-start', margin: 10 }}>
        <Text style={{ fontSize: 12, color: '#333' }}>Calcular o frete</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <PostalCodeInput>
            <TextInputMask
              placeholder={'Digite seu CEP'}
              onEndEditing={() => pullPostalPrices()}
              type={'zip-code'}
              value={zipCode}
              onChangeText={text => setZipCode(text)}
            />
          </PostalCodeInput>
          <PostalCodeInput>
            <Picker
              selectedValue={postalType}
              onValueChange={(itemValue) => setPostalType(itemValue)}
            >
              <Picker.Item label="PAC" value="PAC" />
              <Picker.Item label="Sedex" value="SEDEX" />
            </Picker>
          </PostalCodeInput>
          <CheckoutButton disable={gettingPostalPrices} onPress={() => pullPostalPrices()}>
            <CheckoutTextDark>
              {gettingPostalPrices ? <Loader color={'black'} /> : 'OK'}
            </CheckoutTextDark>
          </CheckoutButton>
        </View>
      </View>
      <View style={{ flexDirection: 'column', justifyContent: 'flex-start', margin: 10 }}>
        <Text style={{ fontSize: 12, color: '#333' }}>Aplicar cupom</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          {
            activeOption === 'my-coupons' && context.coupons.length === 0 ? <Text style={{ fontWeight: 'bold', color: '#333333', fontSize: 16 }}>Sem cupons ativos disponíveis</Text> : <CouponInput>
              {
                activeOption === 'my-coupons' && context.coupons.length > 0 && <Picker
                  selectedValue={selectedCoupon}
                  onValueChange={(itemValue) => setSelectedCoupon(itemValue)}
                >
                  {
                    context.coupons && context.coupons.map((c, index) => {
                      return <Picker.Item key={index} label={c.keyword} value={index} />
                    })
                  }
                </Picker>
              }
              {
                activeOption === 'type-coupon' && <TextInput onEndEditing={() => chooseCouponApplication()} value={coupon} onChangeText={(t) => setCoupon(t)} placeholder={'Digite um código'} />
              }
            </CouponInput>
          }
          <CheckoutButton disable={gettingCoupon} onPress={() => chooseCouponApplication()}>
            <CheckoutTextDark>
              {gettingCoupon ? <Loader color={'black'} /> : 'OK'}
            </CheckoutTextDark>
          </CheckoutButton>
        </View>
        <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'flex-end' }}>
          <TouchableOpacity onPress={() => changeOption()}><Text style={{ color: '#38ace1' }}>{activeOption === 'my-coupons' ? 'Digite um código' : 'Meus cupons'}</Text></TouchableOpacity>
        </View>
      </View>
      <Ruler />
      {
        postalPrices !== null && <View style={{ margin: 10, flexDirection: 'row', justifyContent: 'flex-start', width: '100%' }}>
          <View style={{ flexDirection: 'column', justfiyContent: 'flex-start' }}>
            <ProductDescription>Valor: R$ <ProductDescriptionSpan>{postalPrices.price}</ProductDescriptionSpan></ProductDescription>
            <ProductDescription>Prazo estimado: <ProductDescriptionSpan>{postalPrices.estimatedTime} dias úteis</ProductDescriptionSpan></ProductDescription>
          </View>
        </View>
      }
      {
        resumes && resumes.map((row, index) => {
          return <View key={index} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white', borderWidth: 1, borderColor: '#848484', borderRadius: 5, padding: 15, margin: 10 }}>
            <View style={{ flexDirection: 'column', width: '70%' }}>
              <ProductDescription>Ref:{row.product._id}</ProductDescription>
              <ProductName>{row.product.name}</ProductName>
              <ProductDescription>Cor: <ProductDescriptionSpan>{row.product.color.name}</ProductDescriptionSpan></ProductDescription>
              <ProductDescription>Tamanho: <ProductDescriptionSpan>{row.product.size.name}</ProductDescriptionSpan></ProductDescription>
              <ProductDescription>Quantidade: <ProductDescriptionSpan>{row.product.quantity} itens</ProductDescriptionSpan></ProductDescription>
            </View>
            <View style={{ flexDirection: 'column', width: '30%', alignSelf: 'flex-end', alignItems: 'flex-end' }}>
              {
                row.discounts > 0 && <ProductPriceDashed>R$ {row.price}</ProductPriceDashed>
              }
              <ProductPrice>R$ {row.product.newPrice}</ProductPrice>
            </View>
          </View>
        })
      }
    </ProductsContainer>
  </Container >
}
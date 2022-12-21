import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {Dot, IconContainer, NavHeader, Row, Space} from '../../components';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import {getData} from '../../utils';
import axios from 'axios';
import AwesomeAlert from 'react-native-awesome-alerts';

function currencyFormat(num) {
  return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

const ProductDetail = ({navigation, route}) => {
  const product = route.params;
  let check = false;
  const [showAlertLoad, setShowAlertLoad] = useState(false);

  const [number, setNumber] = useState(1);
  const onNumberChage = isAdd => {
    if (isAdd == true) {
      setNumber(number + 1);
    } else if (isAdd == false && number >= 1) {
      setNumber(number - 1);
    }
  };

  const [data_Favorite, setData_Favorite] = useState([]);

  const loadDataFavorite = () => {
    getData('user').then(user => {
      axios({
        method: 'GET',
        url: `https://doantotnghiepfood.herokuapp.com/api/favorite/get/${user._id}`,
        headers: {authorization: `Bearer ${user.access_token}`},
      })
        .then(res => {
          setData_Favorite(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    });
  };
  useEffect(() => {
    loadDataFavorite();
  }, []);
  console.log('data favorite: ' + data_Favorite);

  const NavBottomBetween = () => (
    <View style={styles.navBottomContainer}>
      <TouchableOpacity style={styles.touchAddCartContainer} onPress={addCart}>
        <View style={styles.addCartContainer}>
          <Text style={styles.addCart}>🛒 Add Cart</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  const addCart = () => {
    setShowAlertLoad(true);
    getData('user').then(user => {
      axios({
        method: 'POST',
        url: 'http://192.168.31.68:3000/api/cart/add',
        headers: {
          authorization: `Bearer ${user.access_token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        data: {
          user_id: user._id,
          product_id: product._id,
          quantity: number,
          grant_type: 'text',
        },
      })
        .then(res => {
          setShowAlertLoad(false);
          if (res.data._id) {
            showMessage({
              message: '😍',
              type: 'success',
              description: 'Add Success',
            });
          } else {
            showMessage({
              message: '😍',
              type: 'success',
              description: res.data,
            });
          }
        })
        .catch(err => {
          showMessage({
            message: '🚨',
            type: 'danger',
            description: err.message,
          }),
            console.log(err);
        });
    });
  };

  const addFavorite = () => {
    setShowAlertLoad(true);
    getData('user').then(user => {
      axios({
        method: 'POST',
        url: 'http://192.168.31.68:3000/api/favorite/add',
        headers: {
          authorization: `Bearer ${user.access_token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        data: {
          user_id: user._id,
          product_id: product._id,
          grant_type: 'text',
        },
      })
        .then(res => {
          setShowAlertLoad(false);
          loadDataFavorite();
        })
        .catch(err => {
          showMessage({
            message: '🚨',
            type: 'danger',
            description: err.message,
          }),
            console.log(err);
        });
    });
  };

  const deleteFavorite = () => {
    setShowAlertLoad(true);
    getData('user').then(user => {
      axios({
        method: 'POST',
        url: 'http://192.168.31.68:3000/api/favorite/delete/',
        headers: {
          authorization: `Bearer ${user.access_token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        data: {
          user_id: user._id,
          product_id: product._id,
          grant_type: 'text',
        },
      })
        .then(res => {
          setShowAlertLoad(false);
          loadDataFavorite();
        })
        .catch(err => {
          showMessage({
            message: '🚨',
            type: 'danger',
            description: err.message,
          }),
            console.log(err);
        });
    });
  };

  for (let checkFavorite of data_Favorite) {
    if (checkFavorite._id === product._id) {
      check = true;
      break;
    }
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <NavHeader navigation={navigation} title={product.name} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          style={styles.featImage}
          source={{uri: product.image}}
        />
        {product.description ? (
          <View style={styles.promoStickerProductContainer}>
            <Text style={styles.promoText}>🎉 Hot</Text>
          </View>
        ) : (
          <></>
        )}
        <Row>
          <View style={styles.priceWeightLove}>
            <View style={styles.priceWeight}>
              <Text style={styles.price}>{currencyFormat(product.price)}</Text>
              <Dot />
              <Text style={styles.weight}>VND</Text>
            </View>
            {check ? (
              <TouchableOpacity onPress={deleteFavorite}>
                <IconContainer>
                  <Image
                    source={require('../../assets/icons/icon-favorite-active.png')}
                  />
                </IconContainer>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={addFavorite}>
                <IconContainer>
                  <Image
                    source={require('../../assets/icons/icon-favorite.png')}
                  />
                </IconContainer>
              </TouchableOpacity>
            )}
          </View>

          <Text style={styles.name}>{product.name}</Text>
          <Space height={10} />
          <Text style={styles.desc}>{product.description}</Text>
        </Row>
        <Row flexDirection={true}>
          <Text style={styles.rowTitle}>Quantity</Text>
          <Space width={30} />
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => onNumberChage(false)}>
              <View style={styles.iconMinusCircle}>
                <Image source={require('../../assets/icons/icon-minus.png')} />
              </View>
            </TouchableOpacity>
            <View style={styles.numberOrderContainer}>
              <Text style={styles.numberOrder}>{number}</Text>
            </View>
            <TouchableOpacity onPress={() => onNumberChage(true)}>
              <View style={styles.iconPlusCircle}>
                <Image source={require('../../assets/icons/icon-plus.png')} />
              </View>
            </TouchableOpacity>
          </View>
        </Row>
      </ScrollView>
      <NavBottomBetween />
      <FlashMessage
        textStyle={{fontFamily: 'CircularStd-Bold'}}
        hideOnPress={true}
        duration={1000}
      />
      <AwesomeAlert
        show={showAlertLoad}
        showProgress={true}
        showCancelButton={false}
        showConfirmButton={false}
      />
    </SafeAreaView>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  featImage: {
    height: Dimensions.get('window').height / 3,
  },
  promoStickerProductContainer: {
    position: 'absolute',
    borderBottomLeftRadius: 10,
    backgroundColor: '#03CC3085',
    paddingLeft: 6,
    paddingTop: 4,
    paddingBottom: 4,
    paddingRight: 4,
    right: 0,
  },
  promoText: {
    color: '#fff',
    fontSize: 18,
    textTransform: 'capitalize',
    fontFamily: 'CircularStd-Bold',
  },
  priceWeightLove: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20,
  },
  priceWeight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontFamily: 'CircularStd-Bold',
    paddingRight: 10,
  },
  weight: {
    fontFamily: 'CircularStd-Book',
    fontSize: 16,
    paddingLeft: 10,
  },
  name: {
    fontFamily: 'CircularStd-Bold',
    lineHeight: 20,
    paddingRight: 30,
    fontSize: 16,
  },
  desc: {
    paddingRight: 30,
    fontFamily: 'CircularStd-Book',
    fontSize: 16,
    lineHeight: 20,
  },
  labelGroupContainer: {
    flexDirection: 'row',
  },
  labelContainer: {
    left: 60,
    width: 50,
    marginRight: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  label: {
    fontFamily: 'CircularStd-Book',
    fontSize: 14,
  },
  radioFormContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    left: 0,
    height: 30,
  },
  radioTitleContainer: {
    width: 60,
    fontSize: 15,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  radioTitle: {
    fontFamily: 'CircularStd-Bold',
    fontSize: 16,
  },
  rowTitle: {
    fontSize: 16,
    fontFamily: 'CircularStd-Bold',
  },
  iconMinusCircle: {marginRight: 4},
  numberOrderContainer: {
    borderBottomWidth: 3,
    borderColor: '#cecece',
    borderStyle: 'solid',
  },
  numberOrder: {
    paddingHorizontal: 8,
    marginHorizontal: 6,
    fontSize: 16,
    fontFamily: 'CircularStd-Bold',
  },

  iconPlusCircle: {marginLeft: 4},

  navBottomContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderTopColor: '#efefef',
    borderTopWidth: 0.5,
    backgroundColor: '#fff',
    shadowColor: '#bdbdbd',
    shadowOffset: {width: 0, height: -6},
    shadowOpacity: 0.1,
  },
  touchFastBuyContainer: {
    paddingVertical: 6,
  },
  touchAddCartContainer: {
    paddingVertical: 6,
  },
  fastBuyContainer: {
    // backgroundColor: "cyan",
  },
  addCartContainer: {
    // backgroundColor: "red" ,
  },
  fastBuy: {
    fontSize: 16,
    fontFamily: 'CircularStd-Medium',
  },
  addCart: {
    fontSize: 16,
    fontFamily: 'CircularStd-Medium',
  },
});

import React, {useRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Image,
} from 'react-native';
import {Space, TextButtonRow, Button} from '../../components';
import {useScrollToTop} from '@react-navigation/native';
import TouchableScale from 'react-native-touchable-scale';
import axios from 'axios';
import {getData} from '../../utils';
import AwesomeAlert from 'react-native-awesome-alerts';

function currencyFormat(num) {
  return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' VND';
}

const Cart = ({navigation}) => {
  const ref = useRef();
  const [data_cart, set_cart] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [cartId, setCartId] = useState();
  const [quantity, setQuantity] = useState();
  const [minus, setMinus] = useState(false);
  const [plus, setPlus] = useState(false);

  let totals = 0;
  for (let cart of data_cart) {
    totals += cart.quantity * cart.product_id.price;

    // console.log(cart.product_id.price);
  }

  const FlatListFooterCart = ({navigation}) => (
    <View
      style={{
        bottom: 10,
      }}>
      <TextButtonRow
        title="Total Price"
        Subtitle={currencyFormat(totals)}
        textButton="Buy"
        borderBottomWidth={0}
        onPressButton={natigate}
      />
    </View>
  );

  const natigate = () => {
    if (data_cart.length == 0) {
      navigation.navigate('Home');
    } else {
      navigation.navigate('Order Shipment', data_cart);
    }
  };

  const loadData = () => {
    getData('user').then(user => {
      axios({
        method: 'GET',
        url: `http://192.168.31.68:3000/api/cart/get/${user._id}`,
        headers: {authorization: `Bearer ${user.access_token}`},
      })
        .then(res => {
          set_cart(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    });
  };

  useEffect(() => {
    loadData();
  }, []);
  setTimeout(() => {
    loadData();
  }, 10000);

  useScrollToTop(ref);

  const renderItem = ({item}) => (
    <View style={styles.listItemContainer}>
      <View style={styles.firstRowContainer}>
        <View style={styles.titleDescPriceContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Product Detail', item.product_id)
            }>
            <Text style={styles.price}>
              {currencyFormat(item.product_id.price)}
            </Text>
            <Space height={8} />
            <Text style={styles.title}>{item.product_id.name}</Text>
            <Space height={8} />
            <Text style={styles.desc}>{item.product_id.description}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.featImageContainer}>
          <ImageBackground
            source={{uri: item.product_id.image}}
            style={styles.featImage}
          />
        </View>
      </View>
      <Space height={20} />

      <View style={styles.secondRowContainer}>
        <TouchableScale
          onPress={() => {
            setCartId(item._id);
            setShowAlert(true);
          }}>
          <View style={styles.iconTrash}>
            <Image source={require('../../assets/icons/icon-remove.png')} />
          </View>
        </TouchableScale>
        <View style={{flexDirection: 'row'}}>
          <TouchableScale
            onPress={() => {
              setCartId(item._id);
              setQuantity(item.quantity);
              setMinus(true);
            }}>
            <View style={styles.iconMinusCircle}>
              <Image source={require('../../assets/icons/icon-minus.png')} />
            </View>
          </TouchableScale>
          <View style={styles.numberOrderContainer}>
            <Text style={styles.numberOrder}>{item.quantity}</Text>
          </View>
          <TouchableScale
            onPress={() => {
              setCartId(item._id);
              setQuantity(item.quantity);
              setPlus(true);
            }}>
            <View style={styles.iconPlusCircle}>
              <Image source={require('../../assets/icons/icon-plus.png')} />
            </View>
          </TouchableScale>
        </View>
      </View>
    </View>
  );

  if (minus) {
    getData('user').then(user => {
      axios({
        method: 'POST',
        url: 'http://192.168.31.68:3000/api/cart/update-cart',
        headers: {
          authorization: `Bearer ${user.access_token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        data: {
          _id: cartId,
          quantity: quantity - 1,
          grant_type: 'text',
        },
      })
        .then(res => {
          console.log(res);
          loadData();
          setMinus(false);
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  if (plus) {
    const quantityPlus = Number(quantity) + 1;
    getData('user').then(user => {
      axios({
        method: 'POST',
        url: 'http://192.168.31.68:3000/api/cart/update-cart',
        headers: {
          authorization: `Bearer ${user.access_token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        data: {
          _id: cartId,
          quantity: quantityPlus,
          grant_type: 'text',
        },
      })
        .then(res => {
          console.log(res);
          loadData();
          setPlus(false);
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  const deleteCart = () => {
    setShowAlert(false);
    getData('user').then(user => {
      axios({
        method: 'GET',
        url: `http://192.168.31.68:3000/api/cart/delete/${cartId}`,
        headers: {authorization: `Bearer ${user.access_token}`},
      })
        .then(res => {
          loadData();
        })
        .catch(err => {
          console.log(err);
        });
    });
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      {data_cart.length > 0 ? (
        <View style={{height: '100%'}}>
          <View style={styles.stackContainer}>
            <FlatList
              ref={ref}
              data={data_cart}
              renderItem={renderItem}
              keyExtractor={Math.random}
              style={styles.flatList}
              showsVerticalScrollIndicator={false}
            />
          </View>
          <FlatListFooterCart style={{height: '10%'}} navigation={navigation} />
          <AwesomeAlert
            show={showAlert}
            showProgress={false}
            title="Are you sure!"
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showCancelButton={true}
            showConfirmButton={true}
            cancelText="No"
            confirmText="Yes, delete it"
            confirmButtonColor="#DD6B55"
            onCancelPressed={() => {
              setShowAlert(false);
            }}
            onConfirmPressed={() => {
              deleteCart();
            }}
          />
        </View>
      ) : (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image
            style={{height: 200, width: 200, marginTop: 100}}
            source={require('../../assets/icons/icon-nocart.jpg')}
          />
          <Text>Giỏ hàng của bạn rỗng</Text>
          <View
            style={{
              height: 100,
              width: '100%',
              marginTop: 20,
              paddingHorizontal: 150,
            }}>
            <Button
              label="Mua hàng"
              radius={6}
              txtSize={14}
              bgColor="#C82E31"
              padSizeX={20}
              borderWidth={0}
              fontFam="CircularStd-Bold"
              txtDecorationLine="none"
              onPress={() => navigation.navigate('Home')}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    // paddingTop: 20,
    // paddingBottom: 10,
    backgroundColor: '#fff',
  },
  stackContainer: {
    paddingBottom: 10,
    backgroundColor: '#fff',
    height: '90%',
  },
  listItemContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e7e7e7',
  },
  flatList: {marginBottom: 10},
  firstRowContainer: {flexDirection: 'row', justifyContent: 'space-between'},
  secondRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleDescPriceContainer: {
    flex: 1,
    paddingRight: 16,
  },
  price: {fontFamily: 'CircularStd-Bold', fontSize: 18},
  title: {fontFamily: 'CircularStd-Bold', fontSize: 14, lineHeight: 17.5},
  desc: {fontFamily: 'CircularStd-Book', lineHeight: 17.5},
  featImageContainer: {
    width: 80,
    borderRadius: 10,
  },
  featImage: {
    overflow: 'hidden',
    resizeMode: 'cover',
    borderRadius: 10,
    height: 80,
    justifyContent: 'center',
    paddingBottom: 10,
    paddingLeft: 10,
  },
  iconTrash: {marginLeft: 4},
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

  modalTitle: {
    fontFamily: 'CircularStd-Medium',
    fontSize: 18,
    textAlign: 'center',
  },
});

import React, {useState, useRef, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Platform,
  ToastAndroid,
} from 'react-native';
import {
  Border,
  IconTextNav,
  Space,
  TextButtonRow,
  TextSubtext,
  NavHeader,
  ModalBottom,
  TextInput,
  Button,
} from '../../components';
import {getData} from '../../utils';
import axios from 'axios';
import {useScrollToTop} from '@react-navigation/native';
import {KeyboardScrollUpForms, useForm} from '../../utils';
import AwesomeAlert from 'react-native-awesome-alerts';
import FlashMessage, {showMessage} from 'react-native-flash-message';

import {
  CardField,
  StripeProvider,
  useStripe,
} from '@stripe/stripe-react-native';

function currencyFormat(num) {
  return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' VND';
}

const OrderShipment = ({navigation, route}) => {
  //payment
  const [publishableKey, setPublishableKey] = useState('');

  async function getStripeApiKey() {
    const {data} = await axios.get(
      'http://192.168.31.68:3000/api/payment/stripeapikey',
    );
    setPublishableKey(data.stripeApiKey);
  }

  useEffect(() => {
    getStripeApiKey();
  }, []);

  console.log('publishableKey', publishableKey);

  const ref = useRef();
  const [data_cart, setData_Cart] = useState([]);
  const [discount, setDiscount] = useForm({});
  const [isTienMat, setIsTienMat] = useState(true);
  const [isPaypal, setIsPaypal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertLoad, setShowAlertLoad] = useState(false);
  const [showAlertSuccess, setShowAlertSuccess] = useState(false);

  const [orderDetail, setOrderDetail] = useState([]);

  const [form] = useForm({
    user_id: '',
    customer: '',
    address: '',
    phone: '',
    status: false,
    discount: null,
  });

  const [isModalDiscount, setModalDiscount] = useState(false);
  const [isModalPaypal, setModalPaypal] = useState(false);

  const toggleModal = () => {
    setModalDiscount(true);
  };

  useScrollToTop(ref);

  const tienMat = () => {
    setIsTienMat(true);
    setIsPaypal(false);
    form.status = false;
  };

  const paypal = () => {
    setIsPaypal(true);
    setIsTienMat(false);
    form.status = true;
  };

  let totalPrice = 0;
  data_cart.map(item => {
    totalPrice += item.product_id.price * item.quantity;
  });

  // console.log('totalPrice', totalPrice);

  const {createPaymentMethod} = useStripe();

  const paymentData = {
    amount: Math.round(totalPrice * 100), //totalPrice * 100, vì stripe tính theo đơn vị cent nên phải nhân 100 để đổi sang cent (1$ = 100 cent)
  };

  //api order
  const order = {
    user_id: form.user_id,
    customer: form.customer,
    address: form.address,
    phone: form.phone,
    status: form.status,
    cart_id: data_cart.map(item => item._id),
    discount: discount.discount,
    total: totalPrice,
  };

  const submitHandler = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const {data} = await axios.post(
      'http://192.168.31.68:3000/api/payment/process',
      paymentData,
      config,
    );
    const clientSecret = data.client_secret;
    // console.log(clientSecret);
    const billingDetails = {
      name: form.customer,
      email: form.email,
      phone: form.phone,
      address: {
        city: form.address,
      },
    };

    const paymentIntent = await createPaymentMethod({
      paymentIntentClientSecret: clientSecret,
      paymentMethodType: 'Card',
      paymentMethodData: {
        billingDetails,
      },
    });

    console.log('paymentIntent', paymentIntent);

    if (paymentIntent.error) {
      ToastAndroid.showWithGravity(
        'Something went wrong',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    } else if (paymentIntent) {
      order.paymentInfo = {
        id: paymentIntent.paymentMethod.id,
        status: 'success',
      };
      ToastAndroid.showWithGravity(
        'Payment Successful',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
      //thêm dữ liệu vào database order
      getData('user').then(user => {
        axios({
          method: 'POST',
          url: 'http://192.168.31.68:3000/api/order/checkout',
          headers: {authorization: `Bearer ${user.access_token}`},
          data: order,
        })
          .then(res => {
            console.log('data' + res.data);
            setOrderDetail(res.data);
            setShowAlertSuccess(true);
          })
          .catch(err => {
            console.log(err);
          });
      });

      setModalPaypal(false);
    }
  };

  console.log('order', orderDetail);

  useEffect(() => {
    getData('user').then(user => {
      axios({
        method: 'GET',
        url: `http://192.168.31.68:3000/api/cart/get/${user._id}`,
        headers: {authorization: `Bearer ${user.access_token}`},
      })
        .then(res => {
          setData_Cart(res.data);
          form.user_id = user._id;
        })
        .catch(err => {
          console.log(err);
        });
    });
    return () => {
      setData_Cart([]);
    };
  }, []);
  console.log('data cart: ' + data_cart);

  let totals = 0;
  for (let cart of data_cart) {
    totals += cart.quantity * cart.product_id.price;
  }

  if (discount) {
    form.discount = discount.discount;
  }

  const CouponBadge = () => {
    return (
      <View style={styles.couponContainer}>
        <View
          style={{
            backgroundColor: isTienMat ? '#CCFF99' : '',
            color: isTienMat ? 'white' : '',
            paddingVertical: 10,
            borderWidth: 0.8,
            width: 145,
            justifyContent: 'center',
            borderRadius: 8,
            flexDirection: 'row',
            alignItems: 'center',
            marginRight: 10,
          }}>
          <Image source={require('../../assets/icons/icon-cash.png')} />
          <TextSubtext
            text="Tiền mặt"
            textFam="CircularStd-Bold"
            textSize={14}
            onPressButton={tienMat}
          />
        </View>
        <View
          style={{
            backgroundColor: isPaypal ? '#CCFF99' : '',
            color: isPaypal ? 'white' : '',
            paddingVertical: 10,
            borderWidth: 0.8,
            width: 145,
            justifyContent: 'center',
            borderRadius: 8,
            flexDirection: 'row',
            alignItems: 'center',
            marginRight: 10,
          }}>
          <Image source={require('../../assets/icons/icon-payment.png')} />
          <TextSubtext
            midHeight={2}
            text="PayPal"
            textFam="CircularStd-Bold"
            textSize={14}
            onPressButton={paypal}
          />
        </View>
      </View>
    );
  };

  // const axiosCheckout = () => {
  //   getData('user').then(user => {
  //     axios({
  //       method: 'POST',
  //       url: `https://doantotnghiepfood.herokuapp.com/api/order/checkout`,
  //       headers: {
  //         'authorization': `Bearer ${user.access_token}`,
  //         'Content-Type': 'application/json',
  //         'Accept': 'application/json'
  //       },
  //       data: {
  //         "user_id": form.user_id,
  //         "address": form.address,
  //         "customer": form.customer,
  //         "phone": form.phone,
  //         "status": form.status,
  //         "discount": form.discount,
  //         "grant_type": "text"
  //       }
  //     })
  //       .then(res => {
  //         if (res.data.message) {
  //           console.log(res.data.message)
  //         }
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       });
  //   });
  // }

  const checkout = () => {
    if (!form.customer || !form.address || !form.phone) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    } else {
      if (form.status) {
        setModalPaypal(true);
        console.log('paypal');
      } else {
        setShowAlertLoad(true);
        setTimeout(() => {
          setShowAlertLoad(false);
        }, 2000);
        getData('user').then(user => {
          axios({
            method: 'POST',
            url: 'http://192.168.31.68:3000/api/order/checkout',
            headers: {
              authorization: `Bearer ${user.access_token}`,
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            data: {
              user_id: String(form.user_id),
              address: String(form.address),
              customer: String(form.customer),
              phone: Number(form.phone),
              status: Boolean(form.status),
              discount: form.discount,
            },
          })
            .then(res => {
              setShowAlertLoad(false);
              if (res.data.message) {
                console.log(res.data.message);
                showMessage({
                  message: '🚨',
                  type: 'danger',
                  description: res.data.message,
                });
              } else {
                setShowAlertSuccess(true);
              }
            })
            .catch(err => {
              console.log(err);
            });
        });
      }
    }
  };

  const Render = ({data, navigation}) => {
    form.customer = data.customer;
    form.address = data.address;
    form.phone = data.phone;
    return (
      <>
        <View style={styles.addressContainer}>
          <TextButtonRow
            showSubtitle={false}
            bgButton="transparent"
            buttonTextColor="#1440FF"
            title="Shipment Address"
            titleTextSize={14}
            titleTextFam="CircularStd-Bold"
            buttonPaddingX={0}
            buttonPaddingY={0}
            textButton="Change"
            borderBottomColor={0}
            paddingHorizontal={0}
            onPressButton={() => navigation.navigate('ChangeAddress', form)}
          />
          {data ? (
            <View>
              <Text style={styles.titleAddress}>Tên: {data.customer}</Text>
              <Text style={styles.descAddress}>Địa chỉ {data.address}</Text>
              <Text style={styles.footAddress}>Điện thoại: {data.phone}</Text>
              <Space height={20} />
            </View>
          ) : (
            <></>
          )}
        </View>
        <Border />
        {data_cart.map((item, index) => (
          <View style={styles.cardOrderItemContainer} key={index}>
            <View style={styles.firstRowCardOrderItem}>
              <Image
                source={{uri: item.product_id.image}}
                style={{height: 80, width: 80, borderRadius: 10}}
              />
              <View style={styles.titleDescProduct}>
                <Text style={styles.titleProduct}>{item.product_id.name}</Text>
                <Text style={styles.descProduct}>
                  {item.product_id.description}
                </Text>
                <Text style={styles.descProduct}>
                  Số lượng: {item.quantity}
                </Text>
              </View>
            </View>
            <Space height={20} />
            <View style={styles.thirdRowCardOrderItem}>
              <Text style={styles.subtotalTitle}>Tổng tiền</Text>
              <View style={styles.subtotalPriceDropdownContainer}>
                <Text style={styles.subtotalPrice}>
                  {currencyFormat(item.quantity * item.product_id.price)}
                </Text>
              </View>
            </View>
          </View>
        ))}
        <Border />
        <View style={{paddingHorizontal: 20, flexDirection: 'row'}}>
          <IconTextNav icon="🚛" text="Discount" onPress={toggleModal} />
          <Text style={{marginTop: 20, color: '#110000'}}>
            {discount.discount}
          </Text>
        </View>
        <Border />
        <View style={{paddingHorizontal: 20, paddingVertical: 20}}>
          <TextButtonRow
            showSubtitle={false}
            borderBottomWidth={0}
            titleTextFam="CircularStd-Bold"
            titleTextSize={14}
            title="Hình thức thanh toán"
            showIcon={true}
            buttonRadius={0}
            paddingHorizontal={0}
            paddingVertical={0}
            bgButton="transparent"
          />
          <Space height={10} />
          <CouponBadge />
        </View>
        <Border />
        <TextButtonRow
          borderBottomWidth={0}
          title="Tổng tiền"
          Subtitle={currencyFormat(totals)}
          textButton="Thanh toán"
          buttonPaddingX={10}
          onPressButton={checkout}
        />
      </>
    );
  };

  return (
    <StripeProvider publishableKey={publishableKey}>
      <SafeAreaView style={styles.safeContainer}>
        <NavHeader title={'Payment'} navigation={navigation} />
        <ScrollView
          style={styles.mainContainer}
          showsVerticalScrollIndicator={false}>
          <Render data={route.params} navigation={navigation} />
        </ScrollView>
        <KeyboardScrollUpForms
          enabled
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
          <ModalBottom
            isVisible={isModalDiscount}
            showButton={false}
            onBackdropPress={toggleModal}
            onSwipeComplete={toggleModal}
            showSwipeCloseButton={true}
            useNativeDriverForBackdrop
            swipeDirection={['down']}>
            <View>
              <TouchableOpacity>
                <View
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 14,
                  }}>
                  <TextInput
                    label="Discount"
                    placeholder="write here"
                    value={form.discount}
                    onChangeText={e => setDiscount('discount', e)}
                  />
                </View>
              </TouchableOpacity>
              <Border height={1} />
              <TouchableOpacity>
                <View
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 14,
                  }}>
                  <Button
                    label="Change"
                    radius={6}
                    txtSize={14}
                    bgColor="#0030FF"
                    padSizeX={20}
                    borderWidth={0}
                    fontFam="CircularStd-Bold"
                    txtDecorationLine="none"
                    onPress={() => {
                      setModalDiscount(false);
                    }}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </ModalBottom>

          {/* <ModalBottom
          isVisible={isModalPaypal}
          showButton={false}
          onBackdropPress={toggleModal}
          onSwipeComplete={toggleModal}
          showSwipeCloseButton={true}
          useNativeDriverForBackdrop
          swipeDirection={['down']}>
          <View>
            <TouchableOpacity>
              <View
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 14,
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <Image
                    source={require('../../assets/icons/icon-payment.png')}
                  />
                  <Text
                    style={{
                      color: 'green',
                      marginLeft: 15,
                    }}>
                    Paypal
                  </Text>
                </View>
                <TextInput
                  placeholder="cart"
                  onChangeText={e => setDiscount('discount', e)}
                />
              </View>
            </TouchableOpacity>
            <Border height={1} />
            <TouchableOpacity>
              <View
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 14,
                }}>
                <Button
                  label="Thanh toán"
                  radius={6}
                  txtSize={14}
                  bgColor="#0030FF"
                  padSizeX={20}
                  borderWidth={0}
                  fontFam="CircularStd-Bold"
                  txtDecorationLine="none"
                  onPress={() => {
                    setModalPaypal(false);
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
        </ModalBottom> */}

          <ModalBottom
            isVisible={isModalPaypal}
            showButton={false}
            onBackdropPress={toggleModal}
            onSwipeComplete={toggleModal}
            showSwipeCloseButton={true}
            useNativeDriverForBackdrop
            swipeDirection={['down']}>
            <View>
              <TouchableOpacity>
                <Text style={styles.textCartInfo}>Enter your Card Info</Text>
                <CardField
                  postalCodeEnabled={true}
                  placeholders={{
                    number: '4242 4242 4242 4242',
                    expiry: 'MM/YY',
                    cvc: 'CVC',
                    postalCode: '12345',
                  }}
                  cardStyle={{
                    backgroundColor: '#FFFFFF',
                    textColor: '#000000',
                  }}
                  style={{
                    width: '100%',
                    height: 50,
                    marginVertical: 30,
                  }}
                />
              </TouchableOpacity>
              <Border height={1} />
              <TouchableOpacity>
                <View
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 14,
                  }}>
                  <Button
                    label="Thanh toán"
                    radius={6}
                    txtSize={14}
                    bgColor="#0030FF"
                    padSizeX={20}
                    borderWidth={0}
                    fontFam="CircularStd-Bold"
                    txtDecorationLine="none"
                    onPress={
                      // setModalPaypal(false);
                      submitHandler
                    }
                  />
                </View>
              </TouchableOpacity>
            </View>
          </ModalBottom>
        </KeyboardScrollUpForms>

        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Thông báo"
          message="Vui lòng nhập thông tin nhận hàng!"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText="OK"
          confirmButtonColor="red"
          onConfirmPressed={() => {
            setShowAlert(false);
          }}
        />
        <AwesomeAlert
          show={showAlertSuccess}
          showProgress={false}
          title="Thông báo"
          message="Đặt hàng thành công!"
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText="Back to home"
          confirmButtonColor="green"
          onConfirmPressed={() => {
            setShowAlertSuccess(false), navigation.navigate('Home');
          }}
        />
        <AwesomeAlert
          show={showAlertLoad}
          showProgress={true}
          showCancelButton={false}
          showConfirmButton={false}
        />
        <FlashMessage
          textStyle={{fontFamily: 'CircularStd-Bold'}}
          hideOnPress={true}
          duration={2000}
        />
      </SafeAreaView>
    </StripeProvider>
  );
};

export default OrderShipment;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flatList: {marginBottom: 50},
  navHeaderContainer: {},
  iconBackNavContainer: {
    left: -10,
  },
  addressContainer: {
    paddingHorizontal: 20,
  },
  titleAddress: {
    fontSize: 14,
    fontFamily: 'CircularStd-Bold',
    textTransform: 'capitalize',
    lineHeight: 20,
  },
  descAddress: {
    fontSize: 14,
    textTransform: 'capitalize',
    fontFamily: 'CircularStd-Book',
    paddingRight: 60,
    lineHeight: 20,
  },
  footAddress: {
    fontSize: 14,
    lineHeight: 20,
    textTransform: 'capitalize',
    fontFamily: 'CircularStd-Book',
    paddingRight: 60,
  },
  cardOrderItemContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  firstRowCardOrderItem: {
    flexDirection: 'row',
  },
  titleDescProduct: {
    paddingHorizontal: 20,
    marginRight: Dimensions.get('window').width / 2.5,
  },
  titleProduct: {
    fontFamily: 'CircularStd-Bold',
    fontSize: 14,
    lineHeight: 20,
    paddingBottom: 10,
  },
  descProduct: {
    fontFamily: 'CircularStd-Book',
    fontSize: 12,
    lineHeight: 20,
  },
  secondRowCardOrderItem: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  thirdRowCardOrderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subtotalTitle: {
    fontSize: 14,
    fontFamily: 'CircularStd-Bold',
  },
  subtotalPriceDropdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subtotalPrice: {
    color: 'red',
    fontSize: 14,
    fontFamily: 'CircularStd-Bold',
  },

  cartResumeContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: 'column',
  },
  detailTotalPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cartResumeText: {
    fontFamily: 'CircularStd-Bold',
    lineHeight: 20,
  },
  detailTotalPriceText: {
    fontFamily: 'CircularStd-Book',
    lineHeight: 20,
    fontSize: 12,
  },
  detailTotalPriceNumber: {
    fontSize: 12,
    fontFamily: 'CircularStd-Bold',
    lineHeight: 20,
  },
  detailTotalPriceTextCoupon: {
    fontFamily: 'CircularStd-Book',
    lineHeight: 20,
    fontSize: 12,
    color: 'red',
  },
  detailTotalPriceNumberCoupon: {
    fontSize: 12,
    fontFamily: 'CircularStd-Bold',
    lineHeight: 20,
    color: 'red',
  },
  touchModalShipment: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  rowModalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textShipmentPrice: {
    fontSize: 16,
    fontFamily: 'CircularStd-Bold',
  },
  shipmentPlatformChoosenContainer: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  couponContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  modalTitle: {
    fontFamily: 'CircularStd-Medium',
    fontSize: 18,
    textAlign: 'center',
  },
});

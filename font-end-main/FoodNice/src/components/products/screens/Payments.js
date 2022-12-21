import { StyleSheet, Text, View, Pressable, Image, TextInput, TouchableOpacity,ToastAndroid,Alert } from 'react-native'
import React, { useState } from 'react'


const Payments = () => {

  const options = ['Thanh toán trực tiếp', 'Paypal',];
  const [pay, setPay] = useState([]);

  function pickPay(selectedPay) {
    if (pay.includes(selectedPay)) {
      setPay(pay.filter(Pay => Pay !== selectedPay));
      return;
    }
    setPay(Pay => Pay.concat(selectedPay));
  }

  const showAlert = () =>
  Alert.alert(
    "Notyfi !!!",
    "Are you sure to complete the transaction ?",
    [
      {
        text: "Cancel",
        style: "cancel",
      },
      { text: "OK", onPress: () => ToastAndroid.show('Chưa sử lý nha mấy cưng', ToastAndroid.CENTER) }
    ]
  );

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 18, fontWeight: '400', color: 'black', marginBottom: 30 }}>___ THÔNG TIN NHẬN HÀNG ___</Text>
      </View>
      <View>
        <View>
          <Text>Họ và tên</Text>
          <TextInput style={{ borderRadius: 8, borderColor: 'black', borderWidth: 0.5 }} placeholder="Nhập họ tên người nhận hàng" />
        </View>
        <View>
          <Text>Địa chỉ</Text>
          <TextInput style={{ borderRadius: 8, borderColor: 'black', borderWidth: 0.5 }} placeholder="Nhập địa chỉ nhận hàng" />
        </View>
        <View>
          <Text>Số điện thoại</Text>
          <TextInput style={{ borderRadius: 8, borderColor: 'black', borderWidth: 0.5 }} placeholder="Nhập số điện thoại nhận hàng" />
        </View>
        <View>
          <Text>Ghi chú</Text>
          <TextInput style={{ borderRadius: 8, borderColor: 'black', borderWidth: 0.5 }} placeholder="Ghi chú" multiline />
        </View>
      </View>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 18, fontWeight: '400', color: 'black', marginBottom: 20, marginTop: 20 }}>____ HÌNH THỨC THANH TOÁN ___</Text>
      </View>
      <View style={styles.options}>
        {
          options.map(option => (
            <View key={option} style={styles.language}>
              <TouchableOpacity style={styles.checkBox}
                onPress={() => pickPay(option)}>
                {
                  pay.includes(option) && (
                    <Text style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: '#22A45D' }}></Text>
                  )
                }
              </TouchableOpacity>
              <Text style={styles.textOption}>{option}</Text>
            </View>
          ))
        }
      </View>
      <Pressable style={{
        borderRadius: 8, backgroundColor: "#22A45D",
        marginTop: 40, height: 50, alignItems: 'center', justifyContent: 'center'
      }} onPress={showAlert}>
        <Text style={{color:'white', fontSize:16, fontWeight:'500'}}>CONFIRM</Text>
      </Pressable>
    </View>
  )
}

export default Payments

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 20,
    // alignItems: 'center',
    backgroundColor: 'white',
  },
  options: {
    alignSelf: 'flex-start',
    marginHorizontal: 20
  },
  language: {
    flexDirection: 'row',
    marginTop: 14,
  },
  checkBox: {
    width: 24,
    height: 24,
    borderWidth: 0.5,
    borderColor: '#868686',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textOption: {
    marginLeft: 10,
    fontSize: 16
  },
})
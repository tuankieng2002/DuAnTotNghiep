import { Text, View, Image, FlatList, ScrollView, Pressable } from 'react-native'
import React, { useState } from 'react'
import styles from './styles/StyleOrder'



const Order = (props) => {

  const { navigation } = props

  const [number, setNumber] = useState(0);
  const onNumberChage = (isAdd) => {
    if (isAdd == true) {
      setNumber(number + 1);
    } else if (isAdd == false && number >= 1) {
      setNumber(number - 1);
    }
  }

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.items}>
          <View>
            <Pressable style={styles.number}>
              <Text onPress={() => onNumberChage(true)} style={styles.action}>+</Text>
            </Pressable>
            <View style={styles.number}>
              <Text style={{ color: '#22A45D' }}>{number}</Text>
            </View>
            <Pressable style={styles.number}>
              <Text onPress={() => onNumberChage(false)} style={styles.action}>-</Text>
            </Pressable>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <View style={{ width: 210 }}>
              <Text style={{ color: 'black', fontSize: 18, fontWeight: '500' }}>{item.name}</Text>
              <Text style={{ numberOfLines: 1, fontSize: 16 }}>{item.title}</Text>
            </View>
            <View>
              <Text style={{ color: '#22A45D', fontSize: 14, fontWeight: '500', marginLeft: 15 }}>USD{item.price*number}</Text>
              <Image resizeMode='cover' source={require('../../../../assets/images/card.png')} style={{marginLeft:25, marginTop:25, width:30, height:30}}/>
            </View>

          </View>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View >
        <View style={styles.headerContainer}>
          <Text style={{ fontSize: 16, fontWeight: '500', color: 'black' }}>Your Orders</Text>
        </View>
        <Pressable style={{ position: 'absolute', left: 10 }}>
          <Image source={require('../../../../assets/images/close.png')} />
        </Pressable>
      </View>
      <FlatList data={data}
        renderItem={renderItem}
        keyExtractor={Math.random}
        showVerticalScrollIndicator={false} />
      <View style={{ marginBottom: 10 }}>
        <View style={styles.cartContainer}>
          <Text style={styles.textContainer}>Subtotal</Text>
          <Text style={styles.textPrice}>$29.4</Text>
        </View>
        <View style={styles.cartContainer}>
          <Text style={styles.textContainer}>Delivery</Text>
          <Text style={styles.textPrice}>$0</Text>
        </View>
        <View style={styles.cartContainer}>
          <Text style={{ color: '#010F07', fontSize: 16, fontWeight: '600' }}>Total <Text style={{ fontWeight: '400' }}>(incl. VAT)</Text></Text>
          <Text style={styles.textPrice}>$29.4</Text>
        </View>
        <View style={styles.cartContainer}>
          <Text style={{ color: '#22A45D', fontSize: 16 }}>Add more items</Text>
          <Text style={styles.textPrice}></Text>
        </View>
        <View style={styles.cartContainer}>
          <Text style={styles.textContainer}>Promo code</Text>
          <Text style={styles.textPrice}></Text>
        </View>
      </View>
      <Pressable style={styles.buttunContainer} onPress={() => navigation.navigate('Payments')}>
        <Text style={{ color: 'white', fontSize: 14, fontWeight: '700' }}>Continue ($11.98)</Text>
      </Pressable>
    </View>
  )
}

export default Order



var data = [
  {
    "_id": "61d12f0c555401c8610fb8da",
    "name": "McDonald's",
    "price": 7.4,
    "madein": "Russia",
    "quantity": 4593942547,
    "category": "61d11c4b86511f0016f490ed",
    "images": require('../../../../assets/images/bg1.png'),
    "sold": 372,
    "size": "S",
    "createdAt": "2021-09-09T10:51:16.000Z",
    "updatedAt": "2021-11-03T17:51:12.000Z",
    "title": "Shortbread, chocolate turtle cookies, and red velvet."
  },
  {
    "_id": "61d12f0c555401c8610fb8d2",
    "name": "Cafe Brichor’s",
    "price": 4.7,
    "madein": "Russia",
    "quantity": 4639829816,
    "category": "61d11c4b86511f0016f490ed",
    "images": require('../../../../assets/images/bg2.png'),
    "sold": 307,
    "size": "3XL",
    "createdAt": "2021-07-25T08:56:22.000Z",
    "updatedAt": "2021-08-21T13:12:26.000Z",
    "title": "Shortbread, chocolate turtle cookies, and red velvet."
  },
  {
    "_id": "61d12f0c555401c8610fb8dc",
    "name": "Daylight Coffee",
    "price": 5.0,
    "madein": "Finland",
    "quantity": 6045438052,
    "category": "61d11c4b86511f0016f490ed",
    "images": require('../../../../assets/images/bg3.png'),
    "sold": 107,
    "size": "M",
    "createdAt": "2021-04-17T09:05:36.000Z",
    "updatedAt": "2021-06-16T06:42:00.000Z",
    "title": "Shortbread, chocolate turtle cookies, and red velvet."
  },

]
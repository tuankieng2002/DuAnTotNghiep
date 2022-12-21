import { StyleSheet, Text, View, StatusBar, Image, Pressable, ScrollView, CheckBox, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { Ionicons } from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-ionicons'



const ProductDetail = (props) => {

  const { navigation } = props

  const [topCookie, setTopCookie] = useState([]);
  const [bottomCookie, setBottomCookie] = useState([]);

  const options = ['Chocolate Chip', 'Cookies and Cream', 'Funfetti', 'Red Velvet', 'Snickerdoodle', 'Peanut Butter'];

  function pickTopCookie(selectedTopCookie) {
    if (topCookie.includes(selectedTopCookie)) {
      setTopCookie(topCookie.filter(TopCookie => TopCookie !== selectedTopCookie));
      return;
    }
    setTopCookie(TopCookie => TopCookie.concat(selectedTopCookie));
  }

  function pickBottomCookie(selectedBottomCookie) {
    if (bottomCookie.includes(selectedBottomCookie)) {
      setBottomCookie(bottomCookie.filter(BottomCookie => BottomCookie !== selectedBottomCookie));
      return;
    }
    setBottomCookie(BottomCookie => BottomCookie.concat(selectedBottomCookie));
  }

  const [number, setNumber] = useState(0);
  const onNumberChage = (isAdd) => {
    if (isAdd == true) {
      setNumber(number + 1);
    } else if (isAdd == false && number >= 1) {
      setNumber(number - 1);
    }
  }

  const showAlert = () =>
  Alert.alert(
    "Notyfi !!!",
    "The function is currently being completed, please come back later",
    [
      {
        text: "Cancel",
        style: "cancel",
      },
    ]
  );

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        animated={true}
        backgroundColor="white"
      >
      </StatusBar>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Image source={require('../../../../assets/images/bg1.png')} style={{ position: 'relative', width: '100%', height: 250 }} resizeMode='cover' />
          <Pressable onPress={navigation.goBack} style={{ position: 'absolute', left: 20, width: 30, height: 30, top: 20 }}>
            <Image source={require('../../../../assets/images/closeblack.png')} />
          </Pressable>
        </View>
        <View style={styles.productInfoContainer}>
          <Text style={{ fontSize: 24, fontWeight: '500', color: '#010F07' }}>{listImg[0].name}</Text>
          <View style={styles.productStar}>
            <Image source={require('../../../../assets/images/Group391.png')} />
          </View>
          <Text style={{ fontSize: 16, marginVertical: 10 }}>{listImg[0].title}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
            <Text style={{ fontSize: 16, marginRight: 5 }}>$$</Text>
            <Text style={styles.productText}>.</Text>
            <Text style={styles.productText}>VietNam</Text>
            <Text>.</Text>
            <Text style={styles.productText}>{listImg[0].madein}</Text>
            <Text>.</Text>
            <Text style={styles.productText}>{listImg[0].category}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 25, marginBottom: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: '500', color: 'black' }}>Choice of top Cookie</Text>
            <Pressable style={styles.require}>
              <Text style={styles.requireText}>REQUIRED</Text>
            </Pressable>
          </View>
          <View style={styles.options}>
            {
              options.map(option => (
                <View key={option} style={styles.language}>
                  <TouchableOpacity style={styles.checkBox}
                    onPress={() => pickTopCookie(option)}>
                    {
                      topCookie.includes(option) && (
                        <Text style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: '#22A45D' }}></Text>
                      )
                    }
                  </TouchableOpacity>
                  <Text style={styles.textOption}>{option}</Text>
                </View>
              ))
            }
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 25, marginBottom: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: '500', color: 'black' }}>Choice of Bottom Cookie</Text>
            <Pressable style={styles.require}>
              <Text style={styles.requireText}>Required</Text>
            </Pressable>
          </View>
          <View style={styles.options}>
            {
              options.map(option => (
                <View key={option} style={styles.language}>
                  <TouchableOpacity style={styles.checkBox} onPress={() => pickBottomCookie(option)}>
                    {
                      bottomCookie.includes(option) && (
                        <Text style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: '#22A45D' }}></Text>
                      )
                    }
                  </TouchableOpacity>
                  <Text style={styles.textOption}>{option}</Text>
                </View>
              ))
            }
          </View>
          <View style={{ marginVertical: 20 }}>
            <Text>Add Special Instructions</Text>
            <Pressable>
              <Image />
            </Pressable>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center',marginBottom:20 }}>
            <Pressable style={styles.numberContainer}>
              <Text onPress={() => onNumberChage(false)} style={styles.action}>-</Text>
            </Pressable>
            <Text style={styles.quantity}>{number}</Text>
            <Pressable style={styles.numberContainer}>
              <Text onPress={() => onNumberChage(true)} style={styles.action}>+</Text>
            </Pressable>
          </View>
          <View style={styles.buttonContainer}>
            <Pressable style={[styles.button, number > 0 ? styles.checkColor : null]} onPress={showAlert}>
              <Text style={[styles.buttonText, number > 0 ? styles.checkColorText : null]}>Add to Order ( ${listImg[0].price *number} )</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  productInfoContainer: {
    paddingHorizontal: 20
  },
  productText: {
    fontSize: 16,
    marginHorizontal: 5
  },
  //CheckBox
  options: {
    alignSelf: 'flex-start'
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
  require:{
    width:90,
    height:32,
    backgroundColor: '#FFEFD5',
    justifyContent:'center',
    alignItems: 'center',
    borderRadius: 5
  },
  requireText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FF8C00'
  },
  // number
  numberContainer:{
    width:50,
    height:50,
    borderWidth: 0.5,
    borderColor:'#868686',
    borderRadius:25,
    backgroundColor:'#F8F8F8',
    justifyContent:'center',
    alignItems:'center',
  },
  action:{
    fontSize:28,
    fontWeight:'400',
    color:'#000000'
  },
  quantity:{
    marginHorizontal:20,
    fontSize:20,
    fontWeight:'500',
    color:'#000000'
  },
  //Button
  button:{
    height:48,
    backgroundColor:'#868686',
    borderRadius:8,
    justifyContent:'center',
    alignItems:'center',
    marginBottom:20,
  },
  checkColor:{
    backgroundColor:'#22A45D',
  },
  buttonText:{
    color:'white',
    fontSize:14,
    fontWeight:'500',
  },
  checkColorText:{},

})

var listImg = [
  {
    "_id": "61d12f0c555401c8610fb8da",
    "name": "McDonald's",
    "price": 299.43,
    "madein": "Russia",
    "quantity": 45,
    "category": "Eat",
    "images": require('../../../../assets/images/bg1.png'),
    "sold": 372,
    "size": "S",
    "createdAt": "2021-09-09T10:51:16.000Z",
    "updatedAt": "2021-11-03T17:51:12.000Z",
    "title": "Shortbread, chocolate turtle cookies, and red velvet."
  }]
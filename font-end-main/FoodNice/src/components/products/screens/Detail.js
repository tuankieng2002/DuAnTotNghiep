import {
  Text,
  View,
  Image,
  Pressable,
  FlatList,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, { useState } from 'react';
import styles from './styles/StyleDetail';

const Detail = props => {
  const { navigation } = props;
  const [item, setItem] = useState(props.route.params.item);
  const [products, setProducts] = useState(props.route.params.products);
  const [productNew, setProductNew] = useState(props.route.params.productNew);
  const [category, setCategory] = useState(props.route.params.categories);

  const [active, setActive] = useState('All');
  const [data, setData] = useState(products);

  const productsFilter = active => {
    //console.log(active);
    if (active === 'All') {
      setData(products);
    } else {
      setData([...products.filter(item => item.category_id.name === active)]); //tại sao đúng category_id mà vẫn không hiển thị ra. trả lời: vì category_id là số, active là chuỗi nên phải chuyển active thành số để so sánh.
    }
    setActive(active);
  };
  console.log(data.length);

  const [number, setNumber] = useState(0);
  const onNumberChage = (isAdd) => {
    if (isAdd == true) {
      setNumber(number + 1);
    } else if (isAdd == false && number >= 1) {
      setNumber(number - 1);
    }
  }

  // const renderItemOne = ({item}) => {
  //   return (
  //     <View style={styles.categoryContainerOne}>
  //       <Pressable
  //         style={styles.productOne}
  //         onPress={() => navigation.navigate('Detail')}>
  //         <View style={styles.productImageContainerOne}>
  //           <Image
  //             style={styles.productImageOne}
  //             resizeMode="cover"
  //             source={{uri: item.image}}
  //           />
  //         </View>
  //         <Text numberOfLines={1} style={styles.productNameOne}>
  //           {item.name}
  //         </Text>
  //       </Pressable>
  //     </View>
  //   );
  // };

  // const renderItemCategory = ({item, index}) => {
  //   return (
  //     <TouchableOpacity
  //       onPress={() => productsFilter(item.name)}
  //       style={[styless.name, active === item.name && styless.nameActive]}
  //       key={index}>
  //       <Text
  //         style={{
  //           fontSize: 24,
  //           fontWeight: '500',
  //           color: 'white',
  //           textAlign: 'center',
  //         }}>
  //         {item.name}
  //       </Text>
  //     </TouchableOpacity>
  //   );
  // };

  // const renderItem = ({item}) => {
  //   return (
  //     <View>
  //       <View style={styles.itemContainer}>
  //         <View style={styles.item}>
  //           <View style={{width: 110, height: 110}}>
  //             <Pressable>
  //               <Image
  //                 source={{uri: item.image}}
  //                 style={{width: '100%', height: '100%', borderRadius: 8}}
  //               />
  //             </Pressable>
  //           </View>
  //           <View style={{paddingLeft: 10, width: '90%'}}>
  //             <Text style={{fontSize: 18, fontWeight: '500', color: '#010F07'}}>
  //               {item.name}
  //             </Text>
  //             <Text numberOfLines={2} style={{fontSize: 16}}>
  //               {item.description}
  //             </Text>
  //             <View style={styles.itemPrice}>
  //               <View
  //                 style={{
  //                   flexDirection: 'row',
  //                   justifyContent: 'center',
  //                   // marginTop: 20,
  //                   alignItems: 'center',
  //                   color: '#010F07',
  //                   fontSize: 14,
  //                 }}>
  //                 <Text>{item.size}</Text>
  //                 <Text style={{marginHorizontal: 10}}>.</Text>
  //                 <Text
  //                   style={{fontSize: 14, fontWeight: '500', color: 'black'}}>
  //                   {item.address}
  //                 </Text>
  //               </View>
  //               <Text
  //                 style={{
  //                   color: '#22A45D',
  //                   fontSize: 14,
  //                   fontWeight: '500',
  //                   // marginTop: 20,
  //                   position: 'absolute',
  //                   right: 0,
  //                 }}>
  //                 USD{item.price}
  //               </Text>
  //             </View>
  //           </View>
  //         </View>
  //       </View>
  //     </View>
  //   );
  // };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{ uri: item.image }}
            resizeMode={'contain'}
          />
        </View>
        <View style={styles.iconsContainer}>
          <Pressable style={styles.back} onPress={navigation.goBack}>
            <Image source={require('../../../../assets/images/back.png')} />
          </Pressable>
          <View style={styles.shareSearch}>
            <Pressable style={styles.share}>
              <Image source={require('../../../../assets/images/shape.png')} />
            </Pressable>
            <Pressable style={styles.search}>
              <Image
                source={require('../../../../assets/images/search1.png')}
              />
            </Pressable>
          </View>
        </View>
          <View style={{ paddingHorizontal: 20 }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: '700',
                color: 'black',
                marginTop: 20,
              }}>
              {item.name}
            </Text>
            <View style={styles.addressContainer}>
              <Text style={styles.textAddress}>$ {item.price} </Text>
              <Text style={styles.textAddress}>:</Text>
              <Text style={styles.textAddress}>{item.quantity}</Text>
              <Text style={styles.textAddress}>:</Text>
              <Text style={styles.textAddress}>{item.category_id.name} </Text>
              <Text style={styles.textAddress}>:</Text>
              <Text style={styles.textAddress}>{item.quantity_purchased} </Text>
            </View>
            <View style={styles.mapContainer}>
              <Text style={styles.textMap}>4.3</Text>
              <Image
                style={{ width: 11, height: 11, marginRight: 8 }}
                source={require('../../../../assets/images/rating.png')}
              />
              <Text style={styles.textMap}>200+ Ratings</Text>
            </View>
            <View style={styles.orderContainer}>
              <View style={styles.textOrderContainer}>
                <View style={styles.textContainer}>
                  <Image
                    style={{ width: 16, height: 16, margin: 3 }}
                    source={require('../../../../assets/images/delivery.png')}
                  />
                  <View>
                    <Text
                      style={{ fontSize: 16, fontWeight: '500', color: 'black' }}>
                      Free
                    </Text>
                    <Text>Delivery</Text>
                  </View>
                </View>
                <View style={styles.textContainer}>
                  <Image
                    style={{ width: 16, height: 16, margin: 3 }}
                    source={require('../../../../assets/images/clock.png')}
                  />
                  <View>
                    <Text
                      style={{ fontSize: 16, fontWeight: '500', color: 'black' }}>
                      25
                    </Text>
                    <Text>Minutes</Text>
                  </View>
                </View>
              </View>
              {/* <Pressable
              style={styles.buttonContainer}
              onPress={() => navigation.navigate('ProductDetail')}>
              <Text style={styles.textButton}>Take away</Text>
            </Pressable> */}
            </View>
          </View>

          <View style={{
            marginHorizontal: 20, borderTopColor: 'black', borderTopWidth: 0.5,
            marginTop: 20, marginBottom: 20, paddingTop: 20, paddingBottom: 20,
            borderBottomWidth: 0.5, borderBottomColor: 'black'
          }}>
            <Text>{item.description}</Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
            <Pressable style={styles.numberContainer}>
              <Text onPress={() => onNumberChage(false)} style={styles.action}>-</Text>
            </Pressable>
            <Text style={styles.quantity}>{number}</Text>
            <Pressable style={styles.numberContainer}>
              <Text onPress={() => onNumberChage(true)} style={styles.action}>+</Text>
            </Pressable>
          </View>
          <View style={styles.buttonContainer}>
            <Pressable style={[styles.button, number > 0 ? styles.checkColor : null]} >
              <Text style={[styles.buttonText, number > 0 ? styles.checkColorText : null]}>Add to Order ( ${item.price * number} )</Text>
            </Pressable>
          </View>
      </View>

      {/* <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.textContainerOne}>
          <Text style={styles.sanfranciscoOne}>Featured Items</Text>
        </View>
        <FlatList
          data={productNew}
          horizontal={true}
          renderItem={renderItemOne}
          keyExtractor={Math.random}
          showsHorizontalScrollIndicator={false}
        />
        <FlatList
          data={category}
          horizontal={true}
          renderItem={renderItemCategory}
          keyExtractor={Math.random}
          showsHorizontalScrollIndicator={false}
        />
        <View style={styles.textContainerOne}>
          <Text style={styles.sanfranciscoOne}>Most Populars</Text>
        </View>
        <View>
          {data.length === 0 ? (
            <View
              style={{
                width: '100%',
                height: 200,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={styles.textNoProduct}>No products</Text>
            </View>
          ) : (
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={Math.random}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </ScrollView> */}
    </View>
    </ScrollView>
  );
};

export default Detail;

const styless = StyleSheet.create({
  name: {
    backgroundColor: 'crimson',
    borderRadius: 15,
    marginHorizontal: 5,
    paddingHorizontal: 8,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  nameActive: {
    backgroundColor: '#000',
  },
});

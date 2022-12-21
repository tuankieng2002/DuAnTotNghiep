import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Pressable,
  StatusBar,
  ScrollView,
  Dimensions,
  Button,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {ProductContext} from '../ProductContext';
import styles from './styles/StyleHome';

import {baseURL} from '../../../utils/baseURL';
import axios from 'axios';
import {UserContext} from '../../users/UserContext';

var {width} = Dimensions.get('window');
var height = Dimensions.get('window').height;

export default function Home(props) {
  const {navigation} = props;
  const number = 3;

  const [hidden, setHidden] = useState(false);

  const isLoading = false;

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [productNew, setProductNew] = useState([]);

  // const { products, onGetProducts } = useContext(ProductContext);

  // const { onGetProductForHomePage } = useContext(ProductContext);
  // const [data, setData] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(async () => {
  //     await onGetProducts();
  //     return () => {
  //         res;
  //     }
  // }, []);

  useEffect(() => {
    //api product
    axios
      .get(`${baseURL}/products/getAll`)
      .then(res => {
        setProducts(res.data);
      })
      .catch(err => {
        console.log(err);
      });

    //api category
    axios
      .get(`${baseURL}/categories/getAll`)
      .then(res => {
        setCategories(res.data);
      })
      .catch(err => {
        console.log(err);
      });

    //api product new
    // axios
    //   .get(`${baseURL}/products/getLatestProducts`)
    //   .then(res => {
    //     setProductNew(res.data);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });

    return () => {
      setCategories([]);
      setProducts([]);
    };
  }, []);

  // console.log('products', products);

  const renderItem = ({item}) => {
    return (
      <View style={styles.categoryContainer}>
        {products && products.length > 0 ? (
          <View style={styles.productsContainer}>
            <Pressable
              style={styles.product}
              onPress={() => navigation.navigate('Detail')}>
              <View style={styles.productImageContainer}>
                <Image
                  style={styles.productImage}
                  resizeMode="cover"
                  source={require('../../../../assets/images/abcd.png')}
                />
              </View>
              {console.log('item', item.name)}
              <View>
                <Image
                  source={require('../../../../assets/images/Group391.png')}
                />
              </View>
              <View style={styles.productNameContainer}>
                <Text numberOfLines={1} style={styles.productName}>
                  {item.name}
                </Text>
              </View>
              <View style={styles.productPriceContainer}>
                <Text style={styles.productPrice}>${item.price}</Text>
              </View>
              <View style={styles.productSaleContainer}>
                <Text style={styles.productSale}>$534.33</Text>
                <Text style={styles.productSaleOff}>24% Off</Text>
              </View>
            </Pressable>
          </View>
        ) : (
          <View>
            <Text> No products found</Text>
          </View>
        )}
      </View>
    );
  };

  const renderItemOne = ({item}) => {
    return (
      <View style={styles.categoryContainerOne}>
        <Pressable
          style={styles.productOne}
          onPress={() => navigation.navigate('Detail')}>
          <View style={styles.productImageContainerOne}>
            <Image
              style={styles.productImageOne}
              resizeMode="cover"
              source={{uri: item.image}}
            />
          </View>
          <Text numberOfLines={1} style={styles.productNameOne}>
            {item.name}
          </Text>
        </Pressable>
      </View>
    );
  };

  const renderItemTwo = ({item}) => {
    return (
      <View style={styles.categoryContainerTwo}>
        <Pressable
          style={styles.productTwo}
          onPress={() => navigation.navigate('Detail')}>
          <View style={styles.productImageContainerTwo}>
            <Image
              style={styles.productImageTwo}
              resizeMode="cover"
              source={item.images}
            />
          </View>
          <Text numberOfLines={1} style={styles.productNameTwo}>
            {item.name}
          </Text>
          <Text numberOfLines={1} style={styles.productMadein}>
            {item.madein}
          </Text>
        </Pressable>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        animated={true}
        backgroundColor="white"
        hidden={hidden}
      />
      {/**Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.deliveryto}>DELIVERY TO</Text>
      </View>
      {/* <ScrollView showsVerticalScrollIndicator={false}> */}
      {/**FlatList 1 */}
      {/* <View>
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={Math.random}
          showsVerticalScrollIndicator={false}
        />
      </View> */}
      <View style={styles.categoryContainer}>
        {products && products.length > 0 ? (
          products.map((item, index) => (
            <Pressable
              key={index}
              style={styles.productsContainer}
              onPress={() =>
                navigation.navigate('Detail', {
                  item: item,
                  productNew: productNew,
                  categories: categories,
                  products: products,
                })
              }>
              {/* <Pressable style={styles.product}> */}
              <View style={styles.productImageContainer}>
                <Image
                  style={styles.productImage}
                  resizeMode="cover"
                  source={{
                    uri: item.image,
                  }}
                />
              </View>
              <View>
                <Image
                  source={require('../../../../assets/images/Group391.png')}
                />
              </View>
              <View style={styles.productNameContainer}>
                <Text numberOfLines={1} style={styles.productName}>
                  {item.name}
                </Text>
              </View>
              <View style={styles.productPriceContainer}>
                <Text style={styles.productPrice}>${item.price}</Text>
              </View>
              <View style={styles.productSaleContainer}>
                <Text style={styles.productSale}>$534.33</Text>
                <Text style={styles.productSaleOff}>24% Off</Text>
              </View>
              {/* </Pressable> */}
            </Pressable>
          ))
        ) : (
          <View>
            <Text> No products found</Text>
          </View>
        )}
      </View>
      {/**Header */}
      <View style={styles.textContainerOne}>
        <Text style={styles.sanfranciscoOne}>Type of Foods</Text>
        <Text style={styles.filterOne}>See all</Text>
      </View>
      {/**FlatList 2 */}
      {/* <View>
        <FlatList
          data={products}
          horizontal={true}
          renderItem={renderItemOne}
          keyExtractor={Math.random}
          showsHorizontalScrollIndicator={false}
        />
      </View> */}
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {categories && categories.length > 0 ? (
          categories.map((item, index) => (
            <View key={index} style={styles.categoryContainerTwo}>
              {console.log('item', item)}
              <Pressable
                style={styles.productTwo}
                onPress={() => navigation.navigate('Detail')}>
                <View style={styles.productImageContainerTwo}>
                  <Image
                    style={styles.productImageTwo}
                    resizeMode="contain"
                    source={{uri: item.image}}
                  />
                </View>
                <Text numberOfLines={1} style={styles.productNameTwo}>
                  {item.name}
                </Text>
                <Text numberOfLines={1} style={styles.productMadein}>
                  {item.madein}
                </Text>
              </Pressable>
            </View>
          ))
        ) : (
          <View>
            <Text> No categories found</Text>
          </View>
        )}
      </ScrollView>
      {/**Header */}
      <View style={styles.textContainerOne}>
        <Text style={styles.sanfranciscoOne}>New Restaurants</Text>
        <Text style={styles.filterOne}>See all</Text>
      </View>
      {/**FlatList 3 */}
      {/* <View>
        <FlatList
          data={data}
          horizontal={true}
          renderItem={renderItemTwo}
          keyExtractor={Math.random}
          showsHorizontalScrollIndicator={false}
        />
      </View> */}

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {productNew && productNew.length > 0 ? (
          productNew.map((item, index) => (
            <View key={index} style={styles.categoryContainerTwo}>
              <Pressable
                style={styles.productTwo}
                onPress={() => navigation.navigate('Detail')}>
                <View style={styles.productImageContainerTwo}>
                  <Image
                    style={styles.productImageTwo}
                    resizeMode="cover"
                    source={{uri: item.image}}
                  />
                </View>
                <Text numberOfLines={1} style={styles.productNameTwo}>
                  {item.name}
                </Text>
                <Text numberOfLines={1} style={styles.productMadein}>
                  {item.address}
                </Text>
              </Pressable>
            </View>
          ))
        ) : (
          <View>
            <Text> No products found</Text>
          </View>
        )}
      </ScrollView>

      {/* </ScrollView> */}
    </ScrollView>
  );
}

var data = [
  {
    _id: '61d12f0c555401c8610fb8da',
    name: "McDonald's",
    price: 299.43,
    madein: 'Russia',
    quantity: 4593942547,
    category: '61d11c4b86511f0016f490ed',
    images: require('../../../../assets/images/bg1.png'),
    sold: 372,
    size: 'S',
    createdAt: '2021-09-09T10:51:16.000Z',
    updatedAt: '2021-11-03T17:51:12.000Z',
  },
  {
    _id: '61d12f0c555401c8610fb8d2',
    name: 'Cafe Brichor’s',
    price: 299.43,
    madein: 'Russia',
    quantity: 4639829816,
    category: '61d11c4b86511f0016f490ed',
    images: require('../../../../assets/images/bg2.png'),
    sold: 307,
    size: '3XL',
    createdAt: '2021-07-25T08:56:22.000Z',
    updatedAt: '2021-08-21T13:12:26.000Z',
  },
  {
    _id: '61d12f0c555401c8610fb8dc',
    name: 'Daylight Coffee',
    price: 299.43,
    madein: 'Finland',
    quantity: 6045438052,
    category: '61d11c4b86511f0016f490ed',
    images: require('../../../../assets/images/bg3.png'),
    sold: 107,
    size: 'M',
    createdAt: '2021-04-17T09:05:36.000Z',
    updatedAt: '2021-06-16T06:42:00.000Z',
  },
  {
    _id: '61d12f0c555401c8610fb8dd',
    name: 'Nike Air Max 270 React ENG',
    price: 299.43,
    madein: 'Armenia',
    quantity: 2518305581,
    category: '61d11c4b86511f0016f490ed',
    images: require('../../../../assets/images/bg2.png'),
    sold: 104,
    size: 'S',
    createdAt: '2021-05-24T19:12:38.000Z',
    updatedAt: '2021-12-27T15:12:21.000Z',
  },
  {
    _id: '61d12f0c555401c8610fb8df',
    name: 'Nike Air Max 270 React ENG',
    price: 299.43,
    madein: 'Ireland',
    quantity: 4194160884,
    category: '61d11c4b86511f0016f490ed',
    images: require('../../../../assets/images/bg3.png'),
    sold: 137,
    size: '3XL',
    createdAt: '2021-03-18T14:52:14.000Z',
    updatedAt: '2021-01-28T02:59:57.000Z',
  },
  {
    _id: '61d12f0c555401c8610fb8d5',
    name: 'Nike Air Max 270 React ENG',
    price: 299.43,
    madein: 'China',
    quantity: 6865976422,
    category: '61d11c4b86511f0016f490ed',
    images: require('../../../../assets/images/bg1.png'),
    sold: 109,
    size: 'L',
    createdAt: '2021-07-27T12:19:46.000Z',
    updatedAt: '2021-05-12T02:18:43.000Z',
  },
];

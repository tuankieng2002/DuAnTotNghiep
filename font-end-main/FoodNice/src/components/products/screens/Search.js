import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Pressable,
  TextInput,
} from 'react-native';
import styles from './styles/StyleSearch';

export default function Home(props) {
  const {navigation} = props;

  const isLoading = false;

  // const { onGetProductForHomePage } = useContext(ProductContext);
  // const [data, setData] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(async () => {
  //     setIsLoading(false);
  //     const res = await onGetProductForHomePage();
  //     setData(res);
  //     setIsLoading(true);
  //     return () => {
  //         res;
  //     }
  // }, []);

  const renderItem = ({item}) => {
    const {name, products} = item;
    return (
      <View style={styles.categoryContainer}>
        <View style={styles.productsContainer}>
          {products.map(product => {
            return (
              <Pressable
                onPress={() => navigation.navigate('Detail')}
                style={styles.product}>
                <View style={styles.productImageContainer}>
                  <Image
                    style={styles.productImage}
                    resizeMode="cover"
                    source={{
                      uri: 'https://vuongquocanh.com/wp-content/uploads/2018/03/england-wal.jpg',
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
                    {product.name}
                  </Text>
                </View>
                <View style={styles.productPriceContainer}>
                  <Text style={styles.productPrice}>${product.price}</Text>
                </View>
                <View style={styles.productSaleContainer}>
                  <Text style={styles.productSale}>$534.33</Text>
                  <Text style={styles.productSaleOff}>24% Off</Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.searchContainer}>
          <View style={styles.searchTextContainer}>
            <Image
              style={styles.imageSearchInputContainer}
              source={require('../../../../assets/images/searchBlue.png')}
            />
            <TextInput style={styles.textInput} placeholder={'Pizza'} />
          </View>
          <Pressable style={styles.searchRightContainer}>
            <Image
              style={styles.imageInputContainer}
              source={require('../../../../assets/images/pheu.png')}
            />
          </Pressable>
        </View>
        <View>
          <Text style={styles.textLine} />
        </View>
      </View>
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsText}>145 Result</Text>
        <View style={styles.manShoesContainer}>
          <Text style={styles.manShoes}>Man Shoes</Text>
        </View>
      </View>
      {isLoading == true ? (
        <Text style={styles.loadingText}>Đang tải giữ liệu</Text>
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
}

var data = [
  {
    _id: '61d11c4b86511f0016f490ed',
    name: 'LIST OF FEATURED PRODUCTS',
    products: [
      {
        _id: '61d12f0c555401c8610fb8da',
        name: 'Nike Air Max 270 React ENG',
        price: 299.43,
        madein: 'Russia',
        quantity: 4593942547,
        category: '61d11c4b86511f0016f490ed',
        images: '',
        sold: 372,
        size: 'S',
        createdAt: '2021-09-09T10:51:16.000Z',
        updatedAt: '2021-11-03T17:51:12.000Z',
      },
      {
        _id: '61d12f0c555401c8610fb8d2',
        name: 'Nike Air Max 270 React ENG',
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
        name: 'Nike Air Max 270 React ENG',
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
        _id: '61d12f0c555401c8610fb8dc',
        name: 'Nike Air Max 270 React ENG',
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
        _id: '61d12f0c555401c8610fb8dc',
        name: 'Nike Air Max 270 React ENG',
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
        _id: '61d12f0c555401c8610fb8dc',
        name: 'Nike Air Max 270 React ENG',
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
    ],
  },
];

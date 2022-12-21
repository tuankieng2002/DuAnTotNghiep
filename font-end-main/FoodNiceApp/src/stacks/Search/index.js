import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  ImageBackground,
} from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation, useScrollToTop } from '@react-navigation/native';
import { Space } from '../../components';
import axios from 'axios';
import { getData } from '../../utils';

const numColumns = 2;

const SearchScreen = () => {
  const navigation = useNavigation();
  const ref = useRef();

  const [data_categories, setData_categories] = useState([]);
  const [data_products, setData_products] = useState([]);

  const loadDataProducts = (name) => {
    console.log('name ' + name)
    // setData_products(null)
    getData('user').then(user => {
      axios({
        method: 'GET',
        url: `https://doantotnghiepfood.herokuapp.com/api/products/find/${name}`,
        headers: { authorization: `Bearer ${user.access_token}` }
      })
        .then(res => {
          setData_products(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  useEffect(() => {
    getData('user').then(user => {
      axios({
        method: 'GET',
        url: 'https://doantotnghiepfood.herokuapp.com/api/categories/getAll',
        headers: { authorization: `Bearer ${user.access_token}` }
      })
        .then(res => {
          setData_categories(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    });
  }, []);

  useScrollToTop(ref);

  const QueryMap = ({ data }) => {
    const listData = item => {
      return (
        <TouchableOpacity activeOpacity={0.7} key={item._id} onPress={() => {
          setData_products(null)
          getData('user').then(user => {
            axios({
              method: 'GET',
              url: `https://doantotnghiepfood.herokuapp.com/api/products/category/${item._id}`,
              headers: { authorization: `Bearer ${user.access_token}` }
            })
              .then(res => {
                setData_products(res.data);
              })
              .catch(err => {
                console.log(err);
              });
          });
        }}>
          <View style={{ paddingRight: 14, paddingBottom: 14 }}>
            <View
              style={{
                paddingHorizontal: 14,
                paddingVertical: 8,
                justifyContent: 'center',
                borderRadius: 5,
                borderColor: '#e7e7e7',
                borderStyle: 'solid',
                borderWidth: 1,
              }}>
              <Text
                style={{
                  fontFamily: 'CircularStd-Book',
                  textAlign: 'center',
                  fontSize: 14,
                }}>
                {item.name}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    };

    const collectionData = data.map(item => listData(item));

    return <>{collectionData}</>;
  };

  const FlatListHeaderMenu = () => (
    <>
      <Space height={30} />
      <View style={styles.sectionSecondContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Search By Categories</Text>
          <Space height={14} />
          <Text>
            <QueryMap data={data_categories} />
          </Text>
        </View>
        <Space height={20} />
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Our Products</Text>
        </View>
      </View>
    </>
  );

  const ProductList = ({ item }) => (
    <>
      <View style={styles.itemContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Product Detail', item)}>
          <View style={styles.featImageContainer}>
            <ImageBackground
              source={{ uri: item.image }}
              style={styles.featImage}
            />
          </View>
          <Space height={6} />
          <View style={styles.item}>
            <Text style={styles.itemTitle}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.stackContainer}>
        <View style={styles.sectionFirstContainer}>
          <View style={styles.searchInputContainer}>
            <TextInput style={styles.searchInput}
              placeholder="type here..."
              onChangeText={loadDataProducts} />
          </View>
        </View>
      </View>

      <FlatList
        ref={ref}
        numColumns={numColumns}
        data={data_products}
        ListHeaderComponent={FlatListHeaderMenu}
        keyExtractor={Math.random}
        renderItem={ProductList}
        columnWrapperStyle={styles.containerFlatList}
        showsVerticalScrollIndicator={false}
        style={{
          marginHorizontal: 10,
        }}
      />
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },

  stackContainer: { paddingHorizontal: 18, paddingTop: 10, paddingBottom: 10 },

  sectionFirstContainer: {
    // backgroundColor: 'blue',
  },

  sectionSecondContainer: {
    marginTop: 0,
    marginBottom: 10,
    marginHorizontal: 10,
  },

  headerTitle: { fontFamily: 'CircularStd-Bold', fontSize: 18 },

  searchInputContainer: {
    backgroundColor: '#f1f1f1',
    padding: 4,
    borderRadius: 6,
  },

  searchInput: {
    fontSize: 16,
    fontFamily: 'CircularStd-Medium',
    color: '#000',
    padding: 6,
  },

  featImageContainer: {
    overflow: 'hidden',
    borderRadius: 10,
  },

  featImage: {
    flex: 1,
    height: 120,
    justifyContent: 'center',
    paddingBottom: 10,
    paddingLeft: 14,
    margin: 0,
  },

  itemContainer: {
    margin: 10,
    flex: 1,
  },

  item: {
    justifyContent: 'center',
  },

  itemTitle: {
    fontFamily: 'CircularStd-Bold',
    textAlign: 'left',
    textTransform: 'capitalize',
  },
});

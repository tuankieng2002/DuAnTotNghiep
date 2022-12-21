import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  Dimensions,
  ImageBackground,
  StatusBar,
  Platform,
} from 'react-native';
import {useScrollToTop} from '@react-navigation/native';

import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  BannerHome,
  IconText,
  ListText,
  ModalBottom,
  Space,
} from '../../components';
import {getData} from '../../utils';
import ContentLoader, {Rect} from 'react-content-loader/native';
import axios from 'axios';

const numColumns = 2;

const styles = StyleSheet.create({
  container: {
    paddingTop: Dimensions.get('screen').height / 200,
    flex: 1,
  },

  screen: {
    flex: 1,
  },

  containerProduct: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },

  subContainerProduct: {
    paddingHorizontal: 12,
    flex: 1,
    flexWrap: 'wrap',
  },

  containerList: {
    flexDirection: 'column',
  },

  subContainerList: {
    alignContent: 'stretch',
    padding: 6,
  },

  contentHeader: {
    justifyContent: 'space-between',
    flexDirection: 'column',
    marginTop: 30,
    height: Dimensions.get('screen').height / 3.3,
    alignItems: 'flex-start',
  },

  notifContainer: {
    position: 'absolute',
    right: 2,
    top: 30,
  },

  notifTouch: {
    width: 40,
    height: 40,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },

  notifText: {
    fontSize: 20,
    padding: 5,
  },

  homeHeader: {
    fontSize: 26,
    fontFamily: 'CircularStd-Bold',
    marginRight: 20,
  },

  headerContainer: {
    flex: 1,
    alignItems: 'flex-start',
    height: Dimensions.get('screen').height / 4,
    backgroundColor: 'transparent',
    position: 'relative',
    resizeMode: 'cover',
    paddingLeft: 20,
  },

  titleHeaderContainer: {
    position: 'relative',
    justifyContent: 'center',
    marginTop: 0,
  },

  iconTitleUserContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline',
  },

  iconTitle: {
    fontSize: 34,
  },

  textTitle: {
    fontSize: 30,
    fontFamily: 'CircularStd-Bold',
    color: '#fff',
  },

  subTitle: {
    fontFamily: 'CircularStd-Book',
    fontSize: 14,
    color: '#fff',
  },

  textPoint: {
    fontSize: 22,
    textAlign: 'left',
    fontFamily: 'CircularStd-Bold',
    color: '#fff',
  },

  homeBannerContainer: {
    backgroundColor: '#fff',
    height: Dimensions.get('screen').height / 4.3,
    position: 'absolute',
    width: Dimensions.get('screen').width - 36,
    top: Dimensions.get('screen').height / 7.6,
    borderRadius: 20,
    borderWidth: 8,
    borderColor: '#fff',
    marginHorizontal: 18,
    zIndex: 4,
    overflow: 'hidden',
  },

  promoStickerProductContainer: {
    position: 'absolute',
    borderBottomRightRadius: 10,
    backgroundColor: 'green',
    paddingRight: 6,
    paddingBottom: 4,
    paddingTop: 4,
    paddingLeft: 4,
  },

  promoText: {
    color: '#fff',
    textTransform: 'capitalize',
    fontFamily: 'CircularStd-Bold',
  },

  carrouselContainer: {
    flexDirection: 'row',
  },

  categoriesGroupName: {
    flexDirection: 'row',
    paddingHorizontal: 18,
  },

  categoriesContainer: {
    borderColor: '#efefef',
    borderWidth: 1,
    borderRadius: 6,
    marginRight: 20,
  },

  categoriesTouchable: {
    borderRadius: 6,
    paddingVertical: 10,
  },

  categoriesNameContainer: {
    paddingHorizontal: 12,
  },

  categoriesName: {
    justifyContent: 'center',
    fontSize: 16,
  },

  //FlatList
  containerFlatlist: {
    flex: 1,
    marginVertical: 0,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
  },

  itemContainer: {
    overflow: 'hidden',
    flex: 1,
    margin: 10,
    borderRadius: 10,
    borderColor: '#efefef',
    borderStyle: 'solid',
    borderWidth: 1,
  },

  titlePriceContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  itemText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'CircularStd-Book',
    lineHeight: 20,
  },

  itemTextPrice: {
    fontSize: 16,
    fontFamily: 'CircularStd-Bold',
  },

  itemImage: {
    height: 120,
  },
  itemRateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },

  itemStar: {
    paddingRight: 2,
  },

  itemStars: {
    flexDirection: 'row',
  },

  itemNumRate: {
    fontFamily: 'CircularStd-Book',
    color: '#979797',
  },
});

function currencyFormat(num) {
  return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' VND';
}

const CategoryLoader = props => (
  <ContentLoader
    speed={2}
    width={120}
    height={60}
    viewBox="0 0 150 60"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <Rect x="0" y="0" rx="6" ry="6" width="120" height="60" />
  </ContentLoader>
);

const ProductLoader = props => (
  <View style={styles.itemContainer}>
    <ContentLoader
      speed={2}
      width="200"
      height="150"
      viewBox="0 0 200 150"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}>
      <Rect x="0" y="0" rx="0" ry="0" width="200" height="70" />
      <Rect
        x="10"
        y="80"
        rx="4"
        ry="4"
        width={Dimensions.get('window').width / 3}
        height="16"
      />
      <Rect
        x="10"
        y="105"
        rx="4"
        ry="4"
        width={Dimensions.get('window').width / 4}
        height="16"
      />
    </ContentLoader>
  </View>
);

const Home = ({navigation, route}) => {
  const ref = useRef();
  const [data_products, setData_products] = useState([]);
  const [get_categories, setGet_categories] = useState([]);
  const data = [
    {id: 1},
    {id: 2},
    {id: 3},
    {id: 4},
    {id: 5},
    {id: 6},
    {id: 7},
    {id: 8},
  ];

  useEffect(() => {
    getData('user').then(user => {
      axios({
        method: 'GET',
        url: 'http://192.168.31.68:3000/api/products/getAll',
        headers: {authorization: `Bearer ${user.access_token}`},
      })
        .then(res => {
          setData_products(res.data);
        })
        .catch(err => {
          console.log(err);
        });

      axios({
        method: 'GET',
        url: 'http://192.168.31.68:3000/api/categories/getAll',
        headers: {authorization: `Bearer ${user.access_token}`},
      })
        .then(res => {
          setGet_categories(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    });
    return () => {
      setGet_categories([]);
      setData_products([]);
    };
  }, []);
  console.log('data product: ' + data_products);
  console.log('data cate: ' + get_categories);

  useScrollToTop(ref);

  const FlatListHeaderHome = () => (
    <View style={styles.container}>
      {Platform.OS === 'android' && <StatusBar backgroundColor="#000000" />}

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            position: 'absolute',
            backgroundColor: '#fff',
            height: Dimensions.get('screen').height / 5,
            width: Dimensions.get('screen').width,
            bottom: 0,
          }}
        />
        <View style={styles.screen}>
          <ImageBackground style={styles.headerContainer}>
            <View style={styles.contentHeader}>
              <View style={styles.titleHeaderContainer}>
                <View style={styles.iconTitleUserContainer}>
                  <Text style={styles.iconTitle}>
                    <Image
                      source={require('../../assets/icons/icon-welcome.png')}
                    />
                  </Text>
                  <Space width={4} />
                  <Text style={styles.textTitle} adjustsFontSizeToFit={true}>
                    FoodNice!
                  </Text>
                </View>
                <Space height={3} />
              </View>
            </View>
            <Space height={20} />
            <View style={styles.homeBannerContainer}>
              <BannerHome />
            </View>
          </ImageBackground>

          <Space height={Dimensions.get('screen').height / 40} />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{marginTop: Dimensions.get('screen').height / 10}}>
            <View style={styles.categoriesGroupName}>
              {get_categories && get_categories.length <= 0 ? (
                <>
                  <CategoryLoader />
                  <CategoryLoader />
                  <CategoryLoader />
                  <CategoryLoader />
                </>
              ) : (
                <>
                  {get_categories.map((item, index) => (
                    <View style={styles.categoriesContainer} key={index}>
                      <TouchableOpacity
                        style={styles.categoriesTouchable}
                        onPress={() => navigation.navigate('Category', item)}>
                        <View style={styles.categoriesNameContainer}>
                          <Image source={{uri: item.image}} />
                          <ListText
                            text={`${item.name}`}
                            style={styles.categoriesName}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                  ))}
                </>
              )}
            </View>
          </ScrollView>
          <Space height={10} />
        </View>
      </ScrollView>
    </View>
  );

  const renderItem = ({item}) => {
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Product Detail', item)}>
          <Image source={{uri: item.image}} style={styles.itemImage} />

          <View style={styles.titlePriceContainer}>
            <Text style={styles.itemText}>{item.name}</Text>
            <Space height={12} />
            <Text style={styles.itemTextPrice}>
              {currencyFormat(item.price)}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <View
        style={{
          backgroundColor: '#fff',
          width: Dimensions.get('screen').width,
          height: Dimensions.get('screen').height / 4,
          position: 'absolute',
          bottom: 0,
          zIndex: -1,
        }}
      />
      <Image
        source={require('../../assets/images/bg-gradient.jpg')}
        style={{
          width: Dimensions.get('screen').width,
          height: Dimensions.get('screen').height / 1.25,
          backgroundColor: '#0030FF',
          top: 0,
          position: 'absolute',
          zIndex: -4,
        }}
      />
      <FlatList
        ref={ref}
        data={data_products.length <= 0 ? data : data_products}
        renderItem={data_products.length <= 0 ? ProductLoader : renderItem}
        numColumns={numColumns}
        keyExtractor={Math.random}
        ListHeaderComponent={FlatListHeaderHome}
        ListFooterComponent={() => <Space height={20} />}
        columnWrapperStyle={styles.containerFlatlist}
        showsVerticalScrollIndicator={false}
        scrollsToTop={true}
      />
    </>
  );
};

export default Home;

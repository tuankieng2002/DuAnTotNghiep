import { useNavigation } from '@react-navigation/native';
import React, { useCallback, memo, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  ImageBackground,
} from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

const slideList = [
  {
    id: 1,
    emoji: '🔖',
    image: require('../../../assets/images/banner_header.png'),
    title: 'Lets Create Account For More Benefit',
    subtitle: 'subtitle',
  },
  {
    id: 2,
    emoji: '🤝',
    image: require('../../../assets/images/banner_dummy.jpg'),
    title: 'Buy 1 Get 1. Buy 10 Get 10.',
    subtitle: 'subtitle',
  },
  {
    id: 3,
    emoji: '🎊',
    image: require('../../../assets/images/banner_coin.jpeg'),
    title: 'Order More To Get More Point!',
    subtitle: 'subtitle',
  },
];

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: 'black',
  },
  slideImage: {
    height: Dimensions.get('screen').height / 4.3,
    width: Dimensions.get('screen').width - 52,
  },
  slideTitle: {
    fontSize: 24,
  },
  slideSubtile: {
    fontSize: 18,
  },
  pagination: {
    position: 'absolute',
    bottom: 8,
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  paginationDot: {
    borderRadius: 4,
    marginHorizontal: 2,
  },
  paginationDotActive: {
    backgroundColor: '#fff',
    width: 12,
    height: 4,
  },
  paginationDotInactive: {
    backgroundColor: '#fff',
    width: 4,
    height: 4,
  },
  carousel: {
    flex: 1,
  },
});

const Slide = memo(function Slide({ data }) {
  const navigation = useNavigation();

  return (
    <View style={styles.slide}>
      <TouchableOpacity
        activeOpacity={0.7}
        // onPress={() => navigation.navigate('Message Detail', data)}
        >
        <ImageBackground source={data.image} style={styles.slideImage}>
          <LinearGradient
            style={{
              width: '100%',
              height: '100%',
            }}
            colors={['rgba(0,0,0,0.5)', 'transparent']}>
            <View
              style={{
                top: Dimensions.get('screen').height / 50,
                left: Dimensions.get('screen').width / 26,
                width: 200,
                height: 100,
                flex: 1,
                flexDirection: 'column',
                overflow: 'hidden',
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'CircularStd-Bold',
                  fontSize: 32,
                }}>
                {data.emoji}
              </Text>
              <Text
                adjustsFontSizeToFit={true}
                style={{
                  color: '#fff',
                  fontFamily: 'CircularStd-Black',
                  fontSize: 18,
                  width: 180,
                  lineHeight: 22,
                  textTransform: 'capitalize',
                }}>
                {data.title}
              </Text>
            </View>
          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
});

function Pagination({ index }) {
  return (
    <View style={styles.pagination} pointerEvents="none">
      {slideList.map((_, i) => {
        return (
          <View
            key={i}
            style={[
              styles.paginationDot,
              index === i
                ? styles.paginationDotActive
                : styles.paginationDotInactive,
            ]}
          />
        );
      })}
    </View>
  );
}

const BannerHome = ({ navigation }) => {
  const [index, setIndex] = useState(0);
  const indexRef = useRef(index);

  indexRef.current = index;

  const onScroll = useCallback(event => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;

    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);

    const distance = Math.abs(roundIndex - index);

    const isNoMansLand = 0.6 < distance;

    console.log(slideSize, index);

    if (roundIndex !== indexRef.current && !isNoMansLand) {
      setIndex(roundIndex);
    }
  }, []);

  const flatListOptimizationProps = {
    intialNumRender: 0,
    maxToRenderPerBatch: 1,
    removeClippedSubviews: true,
    scrollEventThrottle: 16,
    windowSize: 2,
    keyExtractor: useCallback(s => String(s.id), []),
    getItemLayout: useCallback(
      (_, index) => ({
        index,
        length: windowWidth,
        offset: index * windowWidth,
      }),
      [],
    ),
  };

  const renderItem = useCallback(function renderitem({ item }) {
    return <Slide data={item} />;
  }, []);

  return (
    <>
      <FlatList
        data={slideList}
        style={styles.carousel}
        renderItem={renderItem}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onScroll={onScroll}
        {...flatListOptimizationProps}
      />
      <Pagination index={index} />
    </>
  );
};

export default BannerHome;

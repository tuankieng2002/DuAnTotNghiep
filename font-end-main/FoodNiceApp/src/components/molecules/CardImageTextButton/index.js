import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import { IconContainer, Space } from '../../atoms';

function currencyFormat(num) {
  return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' VND'
}

const CardImageTextButton = ({
  item,
  onPressDetailProduct,
  onPressDeleteItem,
  showIconBottom = false,
}) => {
  if (item !== undefined)
    return (
      <View style={styles.itemContainer}>
        <View style={styles.touchContainer}>
          <TouchableOpacity activeOpacity={0.7} onPress={onPressDetailProduct}>
            <Image source={{ uri: item.image }} style={styles.featImage()} />
            <View style={styles.titlePriceContainer}>
              <Text style={styles.title}>{item.name}</Text>
              <Space height={12} />
              <Text style={styles.price}>{currencyFormat(item.price)}</Text>
            </View>
          </TouchableOpacity>
          {showIconBottom ? (
            <TouchableOpacity
              style={{ position: 'absolute', right: 10, bottom: 10 }}
              onPress={onPressDeleteItem}>
              <IconContainer>
                <Image source={require('../../../assets/icons/icon_trash.png')} />
              </IconContainer>
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>
      </View>
    );
  else return <></>;
};

export default CardImageTextButton;

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    margin: 10,
    justifyContent: 'space-around',
  },
  touchContainer: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: 10,
    borderColor: '#efefef',
    borderStyle: 'solid',
    borderWidth: 1,
  },
  featImage: () => ({
    height: 120,
  }),
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
  titlePriceContainer: {
    // flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 10,
    paddingTop: 10,
    // backgroundColor: 'red',
  },
  title: { fontFamily: 'CircularStd-Book', lineHeight: 20 },
  price: { fontFamily: 'CircularStd-Bold' },
  buttonContainer: {
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#efefef',
    paddingVertical: 5,
  },
  button: {
    fontFamily: 'CircularStd-Book',
    textAlign: 'center',
    fontSize: 14,
  },
});

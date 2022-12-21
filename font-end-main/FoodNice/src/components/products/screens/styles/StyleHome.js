import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  //FlatList 3
  productMadein: {
    fontSize: 16,
    color: '##868686',
    fontWeight: '500',
  },
  productNameTwo: {
    fontSize: 16,
    color: '#221F1F',
    fontWeight: '500',
  },
  productImageTwo: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  productImageContainerTwo: {
    width: 200,
    height: 160,
    borderRadius: 8,
  },
  productTwo: {
    width: 205,
    height: 250,
  },
  categoryContainerTwo: {
    marginLeft: 20,
  },

  //FlatList 2
  productNameOne: {
    fontSize: 16,
    color: '#221F1F',
    fontWeight: '500',
  },
  productImageOne: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  productImageContainerOne: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  productOne: {
    width: 105,
  },
  filterOne: {
    color: '#22A45D',
    fontSize: 16,
    fontWeight: '500',
  },
  sanfranciscoOne: {
    color: '#010F07',
    fontSize: 24,
  },
  textContainerOne: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  categoryContainerOne: {
    marginLeft: 20,
    height: 134,
  },

  //FlatList 1
  productSaleOff: {
    marginLeft: 8,
    fontSize: 10,
    color: '#FB7181',
  },
  productSale: {
    fontSize: 10,
    fontWeight: '400',
    textDecorationLine: 'line-through',
    color: '#9098B1',
  },
  productSaleContainer: {
    flexDirection: 'row',
    marginTop: 4,
  },
  loadingText: {},
  categoryName: {
    color: 'red',
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 34,
    marginTop: 24,
    borderBottomWidth: 0.5,
    borderBottomColor: '#EBF0FF',
  },
  productPrice: {
    color: '#40BFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  productPriceContainer: {
    marginTop: 16,
  },
  productName: {
    fontSize: 16,
    color: '#221F1F',
    fontWeight: '500',
  },
  productNameContainer: {
    marginTop: 4,
  },
  productImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  productImageContainer: {
    width: 150,
    height: 185,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    marginBottom: 8,
  },
  product: {
    borderWidth: 0.5,
    borderColor: '#EBF0FF',
    // width: '48%',
    marginTop: 12,
    borderRadius: 8,
  },
  productsContainer: {
    marginRight:20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:20
  },
  next: {
    color: '#010F07',
    marginLeft: 8,
    marginTop: 10,
    width: 24,
    height: 24,
  },
  deliveryto: {
    fontSize: 12,
    fontWeight: '500',
    color: '#22A45D',
    marginTop: 25,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#868686',
    borderBottomWidth: 1,
    paddingBottom: 20,
  },
  categoryContainer: {
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection:'row',
    flexWrap:'wrap'
  },
  container: {
    width: '100%',
    height: '100%',
    flexGrow: 1,
    backgroundColor: 'white',
  },
});
export default styles;

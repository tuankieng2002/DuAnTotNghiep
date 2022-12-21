import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    textLine: {
        borderBottomWidth: 1,
        borderBottomColor: '#EBF0FF',
        width: "100%"
    },
    manShoes: {
        color: '#223263',
        fontSize: 15
    },
    manShoesContainer: {
        flexDirection: 'row',
    },
    resultsText: {
        color: '#9098B1',
        fontSize: 15
    },
    resultsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical:15,
        marginHorizontal:20

    },
    imageInputContainer: {
        height: 25,
        width: 25,
        marginRight: 15,
        marginTop: 12
    },
    imageSearchInputContainer: {
        height: 20,
        width: 20,
        marginTop: 15,
        marginLeft: 7
    },
    textInput: {
        marginLeft: 15
    },
    searchRightContainer: {
        flexDirection: 'row',
    },
    searchTextContainer: {
        flexDirection: 'row',
        borderColor: '#EBF0FF',
        borderWidth: 1,
        borderRadius: 5,
        width: '75%',
        marginLeft: 10,
        height: 50
    },
    searchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 40

    },
    productSaleOff: {
        marginLeft: 8,
        fontSize: 10,
        color: '#FB7181'
    },
    productSale: {
        fontSize: 10,
        fontWeight: '400',
        textDecorationLine: 'line-through',
        color: '#9098B1'
    },
    productSaleContainer: {
        flexDirection: 'row',
        marginTop: 4
    },
    loadingText: {

    },

    productPrice: {
        color: '#40BFFF',
        fontSize: 14,
        fontWeight: '700'
    },
    productPriceContainer: {
        marginTop: 16
    },
    productName: {
        fontSize: 16,
        color: '#221F1F',
        fontWeight: '500'
    },
    productNameContainer: {
        marginTop: 4,
    },
    categoryContainer: {
        paddingHorizontal: 24,
    },
    productImage: {
        width: 100,
        height: 100
    },
    productImageContainer: {
        height: 134,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F6F6F6',
        borderRadius: 10,
        marginBottom: 8
    },
    product: {
        borderWidth: 0.5,
        borderColor: '#EBF0FF',
        width: '48%',
        marginTop: 12,
        borderRadius: 8,
        padding: 10,
    },
    productsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'

    },
    imageText2: {
        color: 'white',
        marginTop: 16

    },
    imageText1: {
        color: 'white',
        fontSize: 24,
        fontWeight: '700'
    },
    imageTextContainer: {
        position: 'absolute',
        marginTop: 48,
        marginLeft: 24
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    imageContainer: {
        width: '100%',
        height: 205,
        // marginTop: 30,
        position: 'relative'
    },
    container: {
        width: '100%',
        height: '100%',
        flexGrow: 1,
        backgroundColor: 'white'
    },
})

export default styles;

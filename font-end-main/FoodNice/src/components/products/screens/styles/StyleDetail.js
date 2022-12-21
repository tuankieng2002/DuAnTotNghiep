import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
      },
      topContainer: {},
      imageContainer: {
        width: '100%',
        height: 250,
        position: 'relative',
      },
      image: {
        width: '100%',
        height: '100%'
      },
      iconsContainer: {
        position: 'absolute',
        top: 30,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
      },
      back: {
        color: 'white',
        height: 34,
        width: 34
      },
      shareSearch: {
        flexDirection: 'row',
      },
      share: {
        width: 22,
        color: 'white',
        height:22,
        marginRight: 15,
        top : 5
      },
      search: {
        color: 'white',
        width:34,
        height: 34
      },
      addressContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 10
      },
      textAddress: {
        color: '#868686',
        paddingRight: 10,
      },
      mapContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 12
      },
      textMap: {
        color: '#010F07',
        fontSize: 12,
        fontWeight: '500',
        paddingRight: 8,
      },
      orderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      textOrderContainer: {
        flexDirection: 'row',
        marginTop: 10,
        
      },
      textContainer: {
        flexDirection: 'row',
        marginRight:8
      },
      // buttonContainer: {
      //   borderRadius: 5,
      //   borderWidth: 1,
      //   borderColor: '#22A45D',
      //   justifyContent: 'center',
      //   alignItems: 'center',
      //   width: 110,
      //   height: 35,
      //   marginTop: 16,
       
      // },
      textButton: {
        color: '#22A45D',
        fontSize: 12,
        fontWeight: '500'
      },
      //FlatList 1
      productNameOne: {
        fontSize: 16,
        color: '#221F1F',
        fontWeight: '500'
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
        fontSize: 20,
        fontWeight: '500'
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
        height:134
    },
    //FlatList 2
     itemContainer:{
      paddingTop: 15,
      borderBottomWidth: 0.5,
      borderBottomColor:"#C4C4C4",
      paddingBottom: 15,
      marginHorizontal: 20,
      paddingRight: 85
     },
     item:{
      flexDirection:'row',
      justifyContent:'flex-start',
      
     },
     itemPrice: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
     },
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
    buttonContainer:{
      marginHorizontal:20,
    }
})

export default styles;
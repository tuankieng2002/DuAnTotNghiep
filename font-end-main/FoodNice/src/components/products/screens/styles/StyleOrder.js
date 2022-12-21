import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    textPrice: {
        color: '#010F07',
        fontSize: 16
      },
      textContainer: {
        color: '#010F07',
        fontSize: 16
      },
      cartContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: '#6767671A',
        borderBottomWidth: 0.5,
        paddingVertical: 10
      },
      buttunContainer: {
        height: 48,
        backgroundColor: '#22A45D',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginBottom: 20
      },
      items: {
        flexDirection: 'row',
        // alignItems: 'center',
        justifyContent: 'flex-start',
        borderBottomWidth: 1,
        borderBottomColor: '#868686',
        paddingTop: 20,
        paddingBottom: 20
      },
      itemContainer: {
      },
      headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    
      },
      container: {
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        paddingHorizontal: 20
      },
      number:{
        width: 24, height: 24, borderRadius: 8,
            borderColor: '#868686', borderWidth: 0.5,
            justifyContent: 'center', marginRight: 16,
            alignItems: 'center', marginTop: 5
      }
})

export default styles;
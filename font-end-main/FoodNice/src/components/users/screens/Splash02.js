import { StyleSheet, Text, View, Image, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'

const Splash02 = (props) => {
    const { navigation } = props;

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={require('../images/splash2.png')} resizeMode="cover">
                </Image>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.textYourFood}>Free delivery offers</Text>
                <Text style={styles.textFindFood}>Free delivery for new customers via Apple</Text>
                <Text style={styles.textFindFood}>Pay and others payment methods.</Text>
            </View>

            <TouchableOpacity>
                <View style={styles.buttonContainer}>
                    <Pressable style={styles.button}
                        onPress={() => navigation.navigate("Splash03")}>
                        <Text style={styles.next}>Get Started</Text>
                    </Pressable>
                </View>
            </TouchableOpacity>

        </View>
    )
}

export default Splash02

const styles = StyleSheet.create({
    next: {
        color: '#22A45D',
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 20
    },
    button: {
        height: 57,
        width: 157,
        backgroundColor: '#53E88B',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
        marginTop: 42,
        alignItems: 'center',
    },
    textFindFood: {
        fontSize: 12,
        fontWeight: '400',
        color: '#000000',
        lineHeight: 21
    },
    textYourFood: {
        fontWeight: 'bold',
        fontSize: 22,
        color: '#010F07',
        textAlign: 'center',
    },
    textContainer: {
        alignItems: 'center',
        marginTop: 69,
    },
    image: {
        width: 408,
        height: 434
    },
    imageContainer: {
        marginTop: 120,
        alignItems: 'center'//ngang
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        width: '100%',
        height: '100%'
    },
})
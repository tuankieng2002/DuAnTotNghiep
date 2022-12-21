import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';

const ChangePassword = props => {
  const {navigation} = props;
  const [getPasswordVisible, setPasswordVisible] = useState(false);
  return (
    <View style={styles.viewContainer}>
      <View style={styles.backContainer}>
        <Text style={styles.forgotContainer}>Profile Setting</Text>
      </View>
      <View style={styles.imageContainer}>
        <Pressable onPress={() => navigation.goBack()}>
          <Image
            resizeMode="cover"
            source={require('../../../../assets/images/back.png')}
          />
        </Pressable>
      </View>

      <View style={styles.textInputContainer}>
        <TextInput
          placeholder="PASSWORD"
          style={styles.textInput}
          secureTextEntry={getPasswordVisible ? false : true}
        />

        <TouchableOpacity
          onPress={() => {
            setPasswordVisible(!getPasswordVisible);
          }}>
          {getPasswordVisible ? (
            <Image
              style={styles.imageEmail}
              resizeMode="cover"
              source={require('../../../../assets/images/invisible.png')}
            />
          ) : (
            <Image
              style={styles.imageEmail}
              resizeMode="cover"
              source={require('../../../../assets/images/invisible.png')}
            />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.textInputContainer}>
        <TextInput
          placeholder="NEW PASSWORD"
          style={styles.textInput}
          secureTextEntry={getPasswordVisible ? false : true}
        />

        <TouchableOpacity
          onPress={() => {
            setPasswordVisible(!getPasswordVisible);
          }}>
          {getPasswordVisible ? (
            <Image
              style={styles.imageEmail}
              resizeMode="cover"
              source={require('../../../../assets/images/invisible.png')}
            />
          ) : (
            <Image
              style={styles.imageEmail}
              resizeMode="cover"
              source={require('../../../../assets/images/invisible.png')}
            />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.textInputContainer}>
        <TextInput
          placeholder="CONFIRM PASSWORD"
          style={styles.textInput}
          secureTextEntry={getPasswordVisible ? false : true}
        />

        <TouchableOpacity
          onPress={() => {
            setPasswordVisible(!getPasswordVisible);
          }}>
          {getPasswordVisible ? (
            <Image
              style={styles.imageEmail}
              resizeMode="cover"
              source={require('../../../../assets/images/invisible.png')}
            />
          ) : (
            <Image
              style={styles.imageEmail}
              resizeMode="cover"
              source={require('../../../../assets/images/invisible.png')}
            />
          )}
        </TouchableOpacity>
      </View>

      <Pressable style={styles.button}>
        <Text style={styles.signIn}>CHANGE PASSWORD</Text>
      </Pressable>
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  viewContainer: {
    height: '100%',
    flex: 1,
    marginHorizontal: 20,
  },
  textInputContainer: {
    marginTop: 20,
    paddingLeft: 28,
    marginVertical: 6,
    borderRadius: 15,
    borderColor: '#EBF0FF',
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    width: '80%',
    fontSize: 16,
    fontWeight: '400',
  },
  backContainer: {
    alignItems: 'center',
    position: 'relative',
    marginTop: 10,
  },
  forgotContainer: {
    color: '#010F07',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageContainer: {
    position: 'absolute',
    top: 20,
  },
  button: {
    backgroundColor: '#22A45D',
    width: 350,
    height: 48,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    marginBottom: 20,
  },
  signIn: {
    color: 'white',
  },
});

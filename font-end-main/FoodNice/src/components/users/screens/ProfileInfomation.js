import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {UserContext} from '../UserContext';

const ProfileInfomation = props => {
  const {navigation} = props;
  const [getPasswordVisible, setPasswordVisible] = useState(false);

  const {loadUser} = useContext(UserContext);

  //get user information
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const loadUserMe = async () => {
    const result = await loadUser();
    // console.log(result);
    if (result) {
      setName(result.name);
      setEmail(result.email);
      setPhone(result.phone);
      setAddress(result.address);
    }
  };
  loadUserMe();

  return (
    <View style={styles.viewContainer}>
      <View style={styles.backContainer}>
        <Text style={styles.forgotContainer}>Profile Settings</Text>
      </View>
      <View style={styles.imageContainer}>
        <Pressable onPress={() => navigation.goBack()}>
          <Image
            style={{width: 30, height: 30, tintColor: 'black'}}
            resizeMode="cover"
            source={require('../../../../assets/images/back.png')}
          />
        </Pressable>
      </View>

      <View style={styles.textInputContainer}>
        <TextInput
          placeholder={`${name}`}
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
          placeholder={`${email}`}
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
          placeholder={`${phone}`}
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

      <View
        style={{
          alignItems: 'center',
          position: 'absolute',
          bottom: 0,
          width: '100%',
        }}>
        <Pressable style={styles.button}>
          <Text style={styles.signIn}>CHANGE SETTINGS</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ProfileInfomation;

const styles = StyleSheet.create({
  viewContainer: {
    height: '100%',
    flex: 1,
    marginHorizontal: 20,
    position: 'relative',
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
    width: '90%',
    fontSize: 16,
    fontWeight: '400',
  },
  backContainer: {
    alignItems: 'center',
    // position: 'relative',
    marginTop: 16,
  },
  forgotContainer: {
    color: '#010F07',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageContainer: {
    position: 'absolute',
    top: 15,
  },
  button: {
    backgroundColor: '#22A45D',
    width: 350,
    height: 48,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  signIn: {
    color: 'white',
  },
});

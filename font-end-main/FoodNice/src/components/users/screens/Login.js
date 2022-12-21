import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  ToastAndroid,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {UserContext} from '../UserContext';

export const Login = props => {
  const {navigation} = props;
  const [getPasswordVisible, setPasswordVisible] = useState(false);

  const {onLogin} = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    // if (
    //   !email ||
    //   !password ||
    //   email.trim().length === 0 ||
    //   password.trim().length === 0
    // ) {
    //   ToastAndroid.show('Vui lòng nhập đầy đủ thông tin', ToastAndroid.CENTER);
    //   return;
    // }
    const result = await onLogin(email, password);
    if (result === false) {
      ToastAndroid.show('Đăng nhập thất bại', ToastAndroid.CENTER);
    }
    // console.log(result);
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.welconme}>Welcome to</Text>
        <View style={styles.EnterContainer}>
          <Text style={styles.enter}>Enter your Phone number or Email</Text>
          <Text style={styles.enter}>address for sign in. Enjoy your food</Text>
        </View>
      </View>

      <View style={styles.textContainer2}>
        <View style={styles.textInputContainer}>
          <Image
            style={styles.imageEmail}
            resizeMode="cover"
            source={require('../../../../assets/images/Email.png')}
          />
          <TextInput
            placeholder="Email"
            style={styles.textInput}
            value={email}
            onChangeText={text => setEmail(text)}
          />
        </View>
        <View style={styles.textInputContainer}>
          <Image
            style={styles.imageEmail}
            resizeMode="cover"
            source={require('../../../../assets/images/lock.png')}
          />
          <TextInput
            placeholder="Password"
            style={styles.textInput}
            secureTextEntry={getPasswordVisible ? false : true}
            value={password}
            onChangeText={text => setPassword(text)}
          />

          <TouchableOpacity
            onPress={() => {
              setPasswordVisible(!getPasswordVisible);
            }}>
            {getPasswordVisible ? (
              <Image
                style={styles.imageEmail}
                resizeMode="cover"
                source={require('../../../../assets/images/visible.png')}
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
      </View>

      <View style={styles.forgetContainer}>
        <Text
          onPress={() => navigation.navigate('ForgotPassword')}
          style={styles.forgetText}>
          Forget Password?
        </Text>
      </View>

      <View style={{alignItems: 'center'}}>
        <Pressable onPress={() => login()} style={styles.button}>
          <Text style={styles.signIn}>SIGN IN</Text>
        </Pressable>
      </View>

      <View style={styles.createContainer}>
        <Text style={styles.dontaccount}>Dont't have account?</Text>
        <Text
          style={styles.create}
          onPress={() => navigation.navigate('Register')}>
          {' '}
          Create new account.
        </Text>
      </View>
      <View style={styles.orContainer}>
        <Text style={styles.or}>Or</Text>
      </View>
      <View style={styles.socialNetworkContainer}>
        <TouchableOpacity style={styles.facebookContainer}>
          <Image
            style={styles.imageFacebook}
            resizeMode="cover"
            source={require('../../../../assets/images/facebook.png')}
          />
          <Text style={styles.textFacebook}>CONNECT WITH FACEBOOK</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.facebookContainer}>
          <Image
            style={styles.imageFacebook}
            resizeMode="cover"
            source={require('../../../../assets/images/google.png')}
          />
          <Text style={styles.textFacebook}>CONNECT WITH GOOGLE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
  },
  textContainer: {
    marginTop: 50,
    marginLeft: 20,
  },
  welconme: {
    color: '#010F07',
    fontSize: 34,
  },
  EnterContainer: {
    marginTop: 20,
  },
  enter: {
    color: '#868686',
    fontSize: 16,
  },
  textContainer2: {
    marginTop: 34,
    marginHorizontal: 25,
  },
  textInputContainer: {
    paddingLeft: 28,
    marginVertical: 6,
    borderRadius: 15,
    borderColor: '#EBF0FF',
    borderWidth: 1,
    height: 57,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    width: '100%',
  },
  textInput: {
    width: '80%',
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    // paddingRight: 10
  },
  forgetContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgetText: {
    color: '#010F07',
    fontSize: 12,
  },
  button: {
    marginTop: 24,
    marginHorizontal: 20,
    backgroundColor: '#22A45D',
    width: 340,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonFace: {
    marginTop: 24,
    marginHorizontal: 20,
    backgroundColor: '#395998',
    width: 340,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonGoogle: {
    marginTop: 16,
    marginHorizontal: 20,
    backgroundColor: '#4285F4',
    width: 340,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signIn: {
    color: 'white',
  },
  createContainer: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dontaccount: {
    fontSize: 12,
    color: '#010F07',
  },
  create: {
    color: '#22A45D',
    fontSize: 12,
  },
  orContainer: {
    marginTop: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  or: {
    fontSize: 16,
  },
  socialNetworkContainer: {
    marginHorizontal: 25,
    marginTop: 20,
    position: 'relative',
    alignItems: 'center',
  },
  imageFacebook: {
    marginLeft: 22,
    marginVertical: 8,
    width: 30,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 4,
  },
  textFacebook: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 40,
  },
  facebookContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#395998',
    borderRadius: 15,
    width: 335,
    height: 44,
    elevation: 8,
    marginTop: 16,
    justifyContent: 'flex-start',
  },
});
